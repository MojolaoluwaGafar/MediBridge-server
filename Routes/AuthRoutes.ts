import express from "express"
import { VerifyUser, verifyCode, SetPassword } from "../controller/AuthController"
import { authMiddleware } from "../middlewares/Auth"

const router = express.Router()

router.post("/verifyUser", VerifyUser)
router.post("/verifyCode", authMiddleware, verifyCode)
router.post("/setPassword" ,authMiddleware, SetPassword)
export default router;