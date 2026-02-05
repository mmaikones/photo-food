import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createGeneration,
  getGenerationById,
  listGenerations,
  retryGeneration
} from "../controllers/generationsController";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Arquivo invalido"));
      return;
    }
    cb(null, true);
  }
});

const router = Router();

router.post("/", authMiddleware, upload.single("image"), createGeneration);
router.get("/", authMiddleware, listGenerations);
router.get("/:id", authMiddleware, getGenerationById);
router.post("/:id/retry", authMiddleware, retryGeneration);

export default router;
