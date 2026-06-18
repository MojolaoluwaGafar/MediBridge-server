import { z } from "zod";

export const registerSchema = z.object({
  UserId: z.string().min(1, "UserId is required"),
  Email: z.string().email("Invalid email address"),
  RegisteredNumber: z.string().min(1, "Registered number is required"),
  role: z.enum(["user", "doctor", "admin"]).default("user"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;
