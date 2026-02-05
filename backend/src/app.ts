import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { env } from "./config/env";
import authRoutes from "./routes/authRoutes";
import creditsRoutes from "./routes/creditsRoutes";
import templatesRoutes from "./routes/templatesRoutes";
import generationsRoutes from "./routes/generationsRoutes";

const app = express();

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/credits", creditsRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/generations", generationsRoutes);

const frontendDist = path.resolve(process.cwd(), "../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ success: false, error: { message: "Rota nao encontrada", code: "NOT_FOUND" } });
});

export default app;
