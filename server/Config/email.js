import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) =>{
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMS_USER,
            pass: process.env.EMS_PASS
        },
        
    });

    await transporter.sendMail({
        from: process.env.EMS_USER,
        to,
        subject,
        text,
    });
};