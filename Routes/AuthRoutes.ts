import express from "express"
import { VerifyUser, verifyCode, SetPassword, login, ForgotPassword, verifyRecoveryCode } from "../controller/AuthController"
import { authMiddleware } from "../middlewares/Auth"

const router = express.Router()

router.post("/verifyUser", VerifyUser)
router.post("/verifyCode", verifyCode)
router.post("/setPassword" ,authMiddleware, SetPassword)
router.post("/login", login)
router.post("/codeReq", ForgotPassword)
router.post("/verifyRecoveryCode", verifyRecoveryCode)

export default router;