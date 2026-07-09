"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});
const SendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"MediBridge" <${process.env.APP_EMAIL}>`,
            to: to,
            subject: subject,
            html: html,
        });
        console.log(`Email sent : ${info.response}`);
        return info;
    }
    catch (error) {
        console.error("Email failed to send :", error.message);
        throw new Error("Failed to send email.");
    }
};
exports.SendEmail = SendEmail;
