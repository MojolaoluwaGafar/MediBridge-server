"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../middlewares/Auth");
const SupportController_1 = require("../controller/SupportController");
const router = (0, express_1.Router)();
router.post("/aiChat", Auth_1.authMiddleware, SupportController_1.sendMessage);
exports.default = router;
