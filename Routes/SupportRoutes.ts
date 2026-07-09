import { Router } from "express";
import { authMiddleware } from "../middlewares/Auth";
import { sendMessage } from "../controller/SupportController";

const router = Router();

router.post("/aiChat", authMiddleware, sendMessage);

export default router;