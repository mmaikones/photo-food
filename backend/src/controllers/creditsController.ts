import type { Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../config/supabase";
import { ok, fail } from "../utils/response";

const purchaseSchema = z.object({
  packageId: z.string().min(1)
});

const packages: Record<string, { credits: number; description: string }> = {
  "50": { credits: 50, description: "Compra de 50 creditos" },
  "120": { credits: 120, description: "Compra de 120 creditos" },
  "300": { credits: 300, description: "Compra de 300 creditos" }
};

export async function getBalance(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("credits_balance")
    .eq("id", userId)
    .single();

  if (error || !data) return res.status(400).json(fail("Erro ao buscar saldo"));

  return res.json(ok({ balance: data.credits_balance }));
}

export async function getTransactions(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));

  const { data, error } = await supabaseAdmin
    .from("credit_transactions")
    .select("id, type, amount, description, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return res.status(400).json(fail("Erro ao buscar transacoes"));

  return res.json(ok({ transactions: data || [] }));
}

export async function purchase(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json(fail("Nao autenticado", "UNAUTHORIZED"));

  const parse = purchaseSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json(fail("Dados invalidos", "VALIDATION_ERROR"));
  }

  const selected = packages[parse.data.packageId];
  if (!selected) return res.status(400).json(fail("Pacote invalido", "INVALID_PACKAGE"));

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("credits_balance")
    .eq("id", userId)
    .single();

  if (profileError || !profile) return res.status(400).json(fail("Erro ao buscar usuario"));

  const newBalance = (profile.credits_balance || 0) + selected.credits;

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ credits_balance: newBalance })
    .eq("id", userId);

  if (updateError) return res.status(400).json(fail("Erro ao atualizar saldo"));

  await supabaseAdmin.from("credit_transactions").insert({
    user_id: userId,
    type: "PURCHASE",
    amount: selected.credits,
    description: selected.description
  });

  return res.json(ok({ balance: newBalance }));
}
