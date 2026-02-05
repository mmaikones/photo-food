import type { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase";
import { fail } from "../utils/response";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json(fail("Token ausente", "UNAUTHORIZED"));
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json(fail("Token invalido", "UNAUTHORIZED"));
  }

  req.userId = data.user.id;
  req.userEmail = data.user.email || undefined;
  next();
}
