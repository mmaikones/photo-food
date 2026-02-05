import type { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase";
import { ok, fail } from "../utils/response";

export async function listTemplates(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("photo_templates")
    .select("id, slug, name, description, category, aspect_ratio, platform_suggestions, example_image_url, is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json(fail("Erro ao buscar templates"));
  return res.json(ok({ templates: data || [] }));
}

export async function getTemplateById(req: Request, res: Response) {
  const { id } = req.params;
  const { data, error } = await supabaseAdmin
    .from("photo_templates")
    .select("id, slug, name, description, category, aspect_ratio, platform_suggestions, internal_prompt, example_image_url, is_active")
    .eq("id", id)
    .single();

  if (error || !data) return res.status(404).json(fail("Template nao encontrado", "NOT_FOUND"));
  return res.json(ok({ template: data }));
}
