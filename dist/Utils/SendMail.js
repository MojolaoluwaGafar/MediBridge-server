"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const createTransporter = () => {
    const service = (process.env.EMAIL_SERVICE || "gmail").trim();
    const user = process.env.APP_EMAIL?.trim();
    const pass = process.env.APP_PASSWORD?.replace(/\s+/g, "").trim();
    if (!user || !pass) {
        throw new Error("Email credentials are not configured.");
    }
    return nodemailer_1.default.createTransport({
        service,
        auth: {
            user,
            pass,
        },
    });
};
const SendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: `"MediBridge" <${process.env.APP_EMAIL?.trim()}>`,
            to,
            subject,
            html,
        });
        console.log(`Email sent : ${info.response}`);
        return info;
    }
    catch (error) {
        console.error("Email failed to send:", error.message);
        throw new Error("Failed to send email.");
    }
};
exports.SendEmail = SendEmail;
