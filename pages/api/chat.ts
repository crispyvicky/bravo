import type { NextApiRequest, NextApiResponse } from "next";
import { chatQuestions, ChatQA } from "@/data/chatQuestions";

// Simple in-memory rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // Increased limit for simpler local chat
const requestCounts = new Map<string, { count: number; expires: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.expires) {
        requestCounts.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    record.count++;
    return false;
}

function findBestMatch(userMessage: string): string {
    const normalizedMessage = userMessage.toLowerCase().trim();

    // Check for exact keyword matches first (or checking if message contains keyword)
    for (const qa of chatQuestions) {
        for (const keyword of qa.keywords) {
            if (normalizedMessage.includes(keyword)) {
                return qa.answer;
            }
        }
    }

    // Default fallback
    return "That’s something our team can explain better.\nWould you like me to connect you with a human expert or share our contact details?\n\n📞 **Contact**: 9398012612";
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // 1. Identify User IP
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "unknown";

    // 2. Check Rate Limit
    if (isRateLimited(ip)) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return res.status(429).json({ error: "Too many messages. Please wait a minute before sending more." });
    }

    try {
        const { message } = req.body;

        // 3. Input Validation
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Invalid message format" });
        }
        if (message.length > 500) {
            return res.status(400).json({ error: "Message too long (max 500 chars)" });
        }

        // 4. Find Match (Simulated Delay for "Thinking" effect)
        await new Promise(resolve => setTimeout(resolve, 600)); // 600ms delay
        const responseText = findBestMatch(message);

        res.status(200).json({ text: responseText });
    } catch (error) {
        console.error("Error in chat handler:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
}
