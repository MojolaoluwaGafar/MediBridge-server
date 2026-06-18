import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        auth : {
            user : process.env.APP_EMAIL,
            pass : process.env.APP_PASSWORD,
        },
    });

export const SendEmail = async ({ to, subject, html } : EmailOptions)=>{
    try {
        const info = await transporter.sendMail({
            from :`"MediBridge" <${process.env.APP_EMAIL}>`,
            to : to, 
            subject : subject, 
            html : html, 
        })
        console.log(`Email sent : ${info.response}`);
        return info
    } catch (error : any) {
        console.error("Email failed to send :", error.message)    
        throw new Error ("Failed to send email.")
    }
}
