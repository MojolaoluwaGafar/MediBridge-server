import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const createTransporter = () => {
  const service = (process.env.EMAIL_SERVICE || "gmail").trim();
  const user = process.env.APP_EMAIL?.trim();
  const pass = process.env.APP_PASSWORD?.replace(/\s+/g, "").trim();

  if (!user || !pass) {
    throw new Error("Email credentials are not configured.");
  }

  return nodemailer.createTransport({
    service,
    auth: {
      user,
      pass,
    },
  });
};

export const SendEmail = async ({ to, subject, html }: EmailOptions) => {
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
  } catch (error: any) {
    console.error("Email failed to send:", error.message);
    throw new Error("Failed to send email.");
  }
};
