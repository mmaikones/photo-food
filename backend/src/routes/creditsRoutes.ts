import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getBalance, getTransactions, purchase } from "../controllers/creditsController";

const router = Router();

router.get("/balance", authMiddleware, getBalance);
router.get("/transactions", authMiddleware, getTransactions);
router.post("/purchase", authMiddleware, purchase);

export default router;
