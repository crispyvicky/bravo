import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

import path from "path";
import process from "process";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields: name and email are required." });
    }

    console.log("Attempting to send email...");
    console.log("Environment Check:", {
        EMAIL_HOST: !!process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_SECURE: process.env.EMAIL_SECURE,
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS ? "Set" : "Not Set"
    });

    // Create a transporter using SMTP credentials from environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const companyName = "BRAVOO";
    const logoPath = path.join(process.cwd(), "public", "logo", "brlogo.webp");

    const mailOptions = {
        from: `"${companyName}" <${process.env.EMAIL_USER}>`,
        to: email, // Send to the user who filled the form
        subject: "We’ve Received Your Message — Thank You",
        html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:logo" alt="${companyName} Logo" style="max-width: 150px; height: auto;" />
        </div>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to us — we’ve received your message successfully.</p>
        <p>Our team is reviewing it now, and we’ll get back to you shortly with the support or information you’re looking for.</p>
        <p>You can expect a reply soon; we try to respond as quickly as possible.</p>
        <p>If anything is urgent, you can reply directly to this email or contact us on WhatsApp.</p>
        <p>We appreciate your trust in us and look forward to speaking with you.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>${companyName}</strong></p>
      </div>
    `,
        attachments: [
            {
                filename: "brlogo.webp",
                path: logoPath,
                cid: "logo", // same cid value as in the html img src
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email", details: error.message });
    }
}
