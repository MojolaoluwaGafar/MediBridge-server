"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const Auth_1 = require("../middlewares/Auth");
const router = express_1.default.Router();
router.post("/verifyUser", AuthController_1.VerifyUser);
router.post("/verifyCode", Auth_1.authMiddleware, AuthController_1.verifyCode);
router.post("/setPassword", Auth_1.authMiddleware, AuthController_1.SetPassword);
router.post("/login", AuthController_1.login);
router.post("/codeReq", AuthController_1.ForgotPassword);
router.post("/verifyRecoveryCode", Auth_1.authMiddleware, AuthController_1.verifyRecoveryCode);
exports.default = router;
