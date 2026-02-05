import { Router } from "express";
import { listTemplates, getTemplateById } from "../controllers/templatesController";

const router = Router();

router.get("/", listTemplates);
router.get("/:id", getTemplateById);

export default router;
