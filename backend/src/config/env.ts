import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 5009),
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  GEMINI_IMAGE_MODEL: process.env.GEMINI_IMAGE_MODEL || "gemini-3-pro-image-preview",
  SUPABASE_STORAGE_ORIGINALS: process.env.SUPABASE_STORAGE_ORIGINALS || "originals",
  SUPABASE_STORAGE_GENERATED: process.env.SUPABASE_STORAGE_GENERATED || "generated"
};

if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("Missing Supabase environment variables.");
}

if (!env.GEMINI_API_KEY) {
  console.warn("Missing GEMINI_API_KEY.");
}
