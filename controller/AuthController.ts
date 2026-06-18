import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser, User } from "../Models/User";
import { RegisterInput, registerSchema,VerifyCodeInput, verifyCodeSchema } from "../Validation/registerSchema";
import { generateToken } from './../Utils/GenerateToken';
import { JWTPayLoad } from "../middlewares/Auth";
import { sendActivationCode } from './../Utils/SendActivationEmail';
import crypto from "crypto"
import type { AuthRequest } from "../middlewares/Auth";

function generateActivationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}


export const VerifyUser = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const data : RegisterInput = parsed.data;
    const { UserId, Email, RegisteredNumber, role } = data

    const user = await User.findOne({ UserId, Email, RegisteredNumber})
    if (!user) {
        return res.status(404).json({
            error : "Patient not found"
        })
    }
    if (user.isActive) {
        return res.status(400).json({
            error : "Patient Account already activated"
        })
    }
    
    const code = generateActivationCode();
    user.activationCode = code;
    user.activationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    
    await sendActivationCode(Email,user.FirstName,code)
    const payload :JWTPayLoad = {
        id : user._id.toString(),
        role: req.body.role || "user"
    }
    const token = generateToken(payload)
     res.status(200).json({
            success : true,
            message : "User verified successfully, Activation Code sent to email",
            user : {
                id : user._id,
                email : user.Email,
                role : user.role
            },
            token
        })
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const verifyCode = async (req : AuthRequest, res : Response) => {
    try {
        const {code} = req.body;
        if (!code) {
            return res.status(400).json({
                error : "Code is required"
            })
        }
        if (!req.user) {
            return res.status(401).json({
                error : "Unauthorized"
            })
        }

        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({
                error : "Patient not found"
            })
        }

        if (user.activationCode !== code) {
            return res.status(400).json({
                error : "Invalid code"
            })
        }
        if (!user.activationCodeExpires) {
            return res.status(400).json({
                error : "No activation code expiry set"
            })
        }
        if (user.activationCodeExpires < new Date()) {
            return res.status(400).json({
                error  : "Code expired"
            })
        }

        user.isActive = true;
        user.activationCode = null;
        user.activationCodeExpires = null;

        await user.save();
        
        return res.status(200).json({
            success : true,
            message : "Code verified successfully, account activated",
            user : {
                id : user._id,
                email : user.Email,
                role : user.role
            }
        })
    } catch (error : any) {
        return res.status(500).json({
            error : error.message
        })
    }
}

export const SetPassword = async (req : AuthRequest, res : Response) => {
    try {
        const { password, terms } = req.body
        if (!password) {
            return res.status(404).json({
                error : "Password is required"
            })
        }
        if (!terms) {
            return res.status(404).json({
                error : "You need to agrre to terms"
            })
        }
        const user = await User.findById(req.user?.id);
        if (!user) {
            return res.status(404).json({
                error : "Patient not found"
            })
        }
        user.Password = await bcrypt.hash(password, 12)
        await user.save();

        const payload : JWTPayLoad = {
            id : user._id.toString(),
            role : user.role
        }
        const token = generateToken(payload)

        return res.status(200).json({
            success : true,
            message : "Password set successfully",
            user : {
                id : user._id,
                email : user.Email,
                role : user.role,
            },
            token
        })
    } catch (error : any) {
        return res.status(500).json({
            error : error.message
        })
    }
}

// export const login = async (params:type) => {
    
// }