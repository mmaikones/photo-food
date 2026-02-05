import type { Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin, supabasePublic } from "../config/supabase";
import { ok, fail } from "../utils/response";

async function ensureInitialCredits(userId: string, targetCredits = 5) {
  const { data: existingGrant } = await supabaseAdmin
    .from("credit_transactions")
    .select("id")
    .eq("user_id", userId)
    .eq("type", "GRANT_FREE")
    .limit(1)
    .maybeSingle();

  if (existingGrant?.id) return;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("credits_balance")
    .eq("id", userId)
    .single();

  const currentBalance = profile?.credits_balance ?? 0;
  const grantAmount = Math.max(0, targetCredits - currentBalance);

  if (grantAmount <= 0) return;

  await supabaseAdmin.from("profiles").update({ credits_balance: currentBalance + grantAmount }).eq("id", userId);
  await supabaseAdmin.from("credit_transactions").insert({
    user_id: userId,
    type: "GRANT_FREE",
    amount: grantAmount,
    description: "Creditos iniciais gratis"
  });
}

const registerSchema = z.object({
  name: z.string().min(2, "Nome obrigatorio"),
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "Senha precisa ter no minimo 6 caracteres")
});

const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "Senha precisa ter no minimo 6 caracteres")
});

export async function register(req: Request, res: Response) {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json(fail("Dados invalidos", "VALIDATION_ERROR"));
  }

  const { name, email, password } = parse.data;

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name }
  });

  if (error || !data.user) {
    return res.status(400).json(fail(error?.message || "Erro ao criar conta"));
  }

  const session = await supabasePublic.auth.signInWithPassword({ email, password });
  if (session.error || !session.data.session) {
    return res.status(500).json(fail("Conta criada, mas falha ao autenticar"));
  }

  const profile = await supabaseAdmin
    .from("profiles")
    .select("id, name, email, avatar_url, credits_balance, plan")
    .eq("id", data.user.id)
    .single();

  await ensureInitialCredits(data.user.id, 5);

  return res.json(
    ok({
      user: {
        id: data.user.id,
        name: profile.data?.name || name,
        email: profile.data?.email || email,
        avatarUrl: profile.data?.avatar_url || null,
        creditsBalance: profile.data?.credits_balance ?? 0,
        plan: profile.data?.plan || "FREE"
      },
      token: session.data.session.access_token
    })
  );
}

export async function login(req: Request, res: Response) {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json(fail("Dados invalidos", "VALIDATION_ERROR"));
  }

  const { email, password } = parse.data;
  const { data, error } = await supabasePublic.auth.signInWithPassword({ email, password });

  if (error || !data.session || !data.user) {
    return res.status(401).json(fail("Credenciais invalidas", "INVALID_CREDENTIALS"));
  }

  const profile = await supabaseAdmin
    .from("profiles")
    .select("id, name, email, avatar_url, credits_balance, plan")
    .eq("id", data.user.id)
    .single();

  await ensureInitialCredits(data.user.id, 5);

  return res.json(
    ok({
      user: {
        id: data.user.id,
        name: profile.data?.name || data.user.user_metadata?.name || "",
        email: profile.data?.email || data.user.email || email,
        avatarUrl: profile.data?.avatar_url || null,
        creditsBalance: profile.data?.credits_balance ?? 0,
        plan: profile.data?.plan || "FREE"
      },
      token: data.session.access_token
    })
  );
}

export async function logout(_req: Request, res: Response) {
  return res.json(ok({ message: "Logout efetuado" }));
}

export async function me(req: Request, res: Response) {
  if (!req.userId) {
    return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));
  }

  const profile = await supabaseAdmin
    .from("profiles")
    .select("id, name, email, avatar_url, credits_balance, plan")
    .eq("id", req.userId)
    .single();

  if (profile.error || !profile.data) {
    return res.status(404).json(fail("Usuario nao encontrado", "NOT_FOUND"));
  }

  return res.json(
    ok({
      user: {
        id: profile.data.id,
        name: profile.data.name,
        email: profile.data.email,
        avatarUrl: profile.data.avatar_url,
        creditsBalance: profile.data.credits_balance,
        plan: profile.data.plan
      }
    })
  );
}
