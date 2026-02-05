import type { Request, Response } from "express";
import { z } from "zod";
import { imageSize } from "image-size";
import { supabaseAdmin } from "../config/supabase";
import { env } from "../config/env";
import { ok, fail } from "../utils/response";
import { imageGenerationService } from "../services/imageGenerationService";

const createSchema = z.object({
  templateId: z.string().uuid(),
  businessType: z.string().min(1),
  platformTarget: z.string().min(1),
  quantityRequested: z.coerce.number().int().min(1).max(4),
  additionalNotes: z.string().optional()
});

async function uploadToStorage(buffer: Buffer, mimeType: string, path: string, bucket: string) {
  const { error } = await supabaseAdmin.storage.from(bucket).upload(path, buffer, {
    contentType: mimeType,
    upsert: true
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

async function fetchImageBuffer(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Falha ao baixar imagem original");
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function createGeneration(req: Request, res: Response) {
  if (!req.userId) return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));

  const parse = createSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json(fail("Dados invalidos", "VALIDATION_ERROR"));
  }

  const file = req.file;
  if (!file) {
    return res.status(400).json(fail("Imagem obrigatoria", "FILE_REQUIRED"));
  }

  const { templateId, businessType, platformTarget, quantityRequested, additionalNotes } = parse.data;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("credits_balance")
    .eq("id", req.userId)
    .single();

  if (profileError || !profile) return res.status(400).json(fail("Erro ao buscar usuario"));

  if ((profile.credits_balance || 0) < quantityRequested) {
    return res.status(400).json(fail("Creditos insuficientes", "INSUFFICIENT_CREDITS"));
  }

  const { data: template, error: templateError } = await supabaseAdmin
    .from("photo_templates")
    .select("id, internal_prompt, aspect_ratio")
    .eq("id", templateId)
    .eq("is_active", true)
    .single();

  if (templateError || !template) {
    return res.status(404).json(fail("Template nao encontrado", "NOT_FOUND"));
  }

  const originalPath = `${req.userId}/${Date.now()}-${file.originalname}`;
  const originalUrl = await uploadToStorage(
    file.buffer,
    file.mimetype,
    originalPath,
    env.SUPABASE_STORAGE_ORIGINALS
  );

  const { data: job, error: jobError } = await supabaseAdmin
    .from("generation_jobs")
    .insert({
      user_id: req.userId,
      template_id: template.id,
      original_image_url: originalUrl,
      business_type: businessType,
      platform_target: platformTarget,
      quantity_requested: quantityRequested,
      additional_notes: additionalNotes,
      status: "PROCESSING",
      credits_used: quantityRequested
    })
    .select()
    .single();

  if (jobError || !job) return res.status(400).json(fail("Erro ao criar job"));

  const newBalance = (profile.credits_balance || 0) - quantityRequested;
  await supabaseAdmin.from("profiles").update({ credits_balance: newBalance }).eq("id", req.userId);
  await supabaseAdmin.from("credit_transactions").insert({
    user_id: req.userId,
    type: "SPEND_GENERATION",
    amount: -quantityRequested,
    description: `Geracao de ${quantityRequested} imagens`
  });

  try {
    const base64 = file.buffer.toString("base64");
    const generatedBase64List = await imageGenerationService({
      originalImageBase64: base64,
      originalMimeType: file.mimetype,
      templateInternalPrompt: template.internal_prompt,
      businessType,
      platformTarget,
      notes: additionalNotes,
      quantity: quantityRequested,
      aspectRatio: template.aspect_ratio
    });

    const generatedImages = [] as { image_url: string; width: number; height: number }[];

    for (let i = 0; i < generatedBase64List.length; i += 1) {
      const buffer = Buffer.from(generatedBase64List[i], "base64");
      const dimensions = imageSize(buffer);
      const width = dimensions.width || 0;
      const height = dimensions.height || 0;
      const generatedPath = `${req.userId}/${job.id}/image-${i + 1}.png`;
      const publicUrl = await uploadToStorage(buffer, "image/png", generatedPath, env.SUPABASE_STORAGE_GENERATED);

      generatedImages.push({ image_url: publicUrl, width, height });
    }

    if (generatedImages.length > 0) {
      await supabaseAdmin.from("generated_images").insert(
        generatedImages.map((img) => ({
          generation_job_id: job.id,
          image_url: img.image_url,
          width: img.width,
          height: img.height
        }))
      );
    }

    await supabaseAdmin.from("generation_jobs").update({ status: "COMPLETED" }).eq("id", job.id);

    return res.json(
      ok({
        jobId: job.id,
        status: "COMPLETED",
        creditsUsed: quantityRequested,
        images: generatedImages
      })
    );
  } catch (error) {
    await supabaseAdmin
      .from("generation_jobs")
      .update({ status: "FAILED", error_message: (error as Error).message })
      .eq("id", job.id);

    return res.status(500).json(fail("Falha ao gerar imagens", "GENERATION_FAILED"));
  }
}

export async function listGenerations(req: Request, res: Response) {
  if (!req.userId) return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));

  const { data, error } = await supabaseAdmin
    .from("generation_jobs")
    .select(
      "id, template_id, original_image_url, business_type, platform_target, quantity_requested, status, credits_used, created_at, generated_images(image_url, width, height)"
    )
    .eq("user_id", req.userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return res.status(400).json(fail("Erro ao buscar geracoes"));

  return res.json(ok({ generations: data || [] }));
}

export async function getGenerationById(req: Request, res: Response) {
  if (!req.userId) return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));

  const { id } = req.params;
  const { data, error } = await supabaseAdmin
    .from("generation_jobs")
    .select(
      "id, template_id, original_image_url, business_type, platform_target, quantity_requested, status, credits_used, created_at, generated_images(image_url, width, height)"
    )
    .eq("id", id)
    .eq("user_id", req.userId)
    .single();

  if (error || !data) return res.status(404).json(fail("Job nao encontrado", "NOT_FOUND"));

  return res.json(ok({ job: data }));
}

export async function retryGeneration(req: Request, res: Response) {
  if (!req.userId) return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));

  const { id } = req.params;
  const { data: job, error } = await supabaseAdmin
    .from("generation_jobs")
    .select(
      "id, template_id, original_image_url, business_type, platform_target, quantity_requested, additional_notes"
    )
    .eq("id", id)
    .eq("user_id", req.userId)
    .single();

  if (error || !job) return res.status(404).json(fail("Job nao encontrado", "NOT_FOUND"));

  const { data: template, error: templateError } = await supabaseAdmin
    .from("photo_templates")
    .select("internal_prompt, aspect_ratio")
    .eq("id", job.template_id)
    .single();

  if (templateError || !template) return res.status(404).json(fail("Template nao encontrado", "NOT_FOUND"));

  const buffer = await fetchImageBuffer(job.original_image_url);
  const base64 = buffer.toString("base64");

  try {
    const generatedBase64List = await imageGenerationService({
      originalImageBase64: base64,
      originalMimeType: "image/jpeg",
      templateInternalPrompt: template.internal_prompt,
      businessType: job.business_type,
      platformTarget: job.platform_target,
      notes: job.additional_notes || undefined,
      quantity: job.quantity_requested,
      aspectRatio: template.aspect_ratio
    });

    const generatedImages = [] as { image_url: string; width: number; height: number }[];

    for (let i = 0; i < generatedBase64List.length; i += 1) {
      const imageBuffer = Buffer.from(generatedBase64List[i], "base64");
      const dimensions = imageSize(imageBuffer);
      const generatedPath = `${req.userId}/${job.id}/retry-${Date.now()}-${i + 1}.png`;
      const publicUrl = await uploadToStorage(imageBuffer, "image/png", generatedPath, env.SUPABASE_STORAGE_GENERATED);

      generatedImages.push({
        image_url: publicUrl,
        width: dimensions.width || 0,
        height: dimensions.height || 0
      });
    }

    if (generatedImages.length > 0) {
      await supabaseAdmin.from("generated_images").insert(
        generatedImages.map((img) => ({
          generation_job_id: job.id,
          image_url: img.image_url,
          width: img.width,
          height: img.height
        }))
      );
    }

    await supabaseAdmin.from("generation_jobs").update({ status: "COMPLETED" }).eq("id", job.id);

    return res.json(ok({ jobId: job.id, images: generatedImages }));
  } catch (err) {
    await supabaseAdmin
      .from("generation_jobs")
      .update({ status: "FAILED", error_message: (err as Error).message })
      .eq("id", job.id);

    return res.status(500).json(fail("Falha ao gerar imagens", "GENERATION_FAILED"));
  }
}
