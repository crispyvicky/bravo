import type { NextApiRequest, NextApiResponse } from "next";

type ContactPayload = {
  kind: "contact";
  name: string;
  email: string;
  mobile?: string;
  projectType: string;
  details: string;
};

type StartQuestPayload = {
  kind: "startQuest";
  name: string;
  email: string;
  mobile?: string;
  questType: string;
  customQuestType?: string;
  missionDetails: string;
  budgetRange?: string;
  timeline?: string;
};

type Payload = ContactPayload | StartQuestPayload;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const recipient = process.env.WHATSAPP_RECIPIENT || "919398012612"; // E.164 without '+' for Meta, with 'whatsapp:' for Twilio

  // Twilio config (preferred if present)
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_FROM_WHATSAPP; // e.g., "whatsapp:+14155238886" sandbox or your approved sender

  // Meta WhatsApp Cloud API config (fallback)
  const metaToken = process.env.WHATSAPP_TOKEN;
  const metaPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // Debug logging for environment variables (remove in production)
  console.log('Environment check:', {
    hasTwilioSid: !!twilioSid,
    hasTwilioToken: !!twilioToken,
    hasTwilioFrom: !!twilioFrom,
    hasMetaToken: !!metaToken,
    hasMetaPhoneNumberId: !!metaPhoneNumberId,
    recipient,
    sandboxInfo: 'To receive messages, join Twilio sandbox by messaging +14155238886 with "join <sandbox-code>"'
  });

  const payload = req.body as Payload;

  if (!payload || typeof payload !== "object" || !("kind" in payload)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  let textMessage = "";
  if (payload.kind === "contact") {
    const { name, email, mobile, projectType, details } = payload;
    if (!name || !email || !projectType || !details) {
      return res.status(400).json({ error: "Missing required fields for contact form." });
    }
    textMessage = `New Contact Inquiry\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile || "N/A"}\nProject Type: ${projectType}\nDetails: ${details}`;
  } else if (payload.kind === "startQuest") {
    const { name, email, mobile, questType, customQuestType, missionDetails, budgetRange, timeline } = payload;
    if (!name || !email || !questType || !missionDetails) {
      return res.status(400).json({ error: "Missing required fields for start-quest form." });
    }
    const finalQuestType = questType === "Other" && customQuestType ? customQuestType : questType;
    textMessage = `New Start-Quest Submission\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile || "N/A"}\nQuest Type: ${finalQuestType}\nBudget: ${budgetRange || "N/A"}\nTimeline: ${timeline || "N/A"}\n\nMission Details:\n${missionDetails}`;
  }

  try {
    // Prefer Twilio if configured
    if (twilioSid && twilioToken && twilioFrom) {
      const to = `whatsapp:+${recipient.startsWith("+") ? recipient.slice(1) : recipient}`; // ensure whatsapp:+E164
      const form = new URLSearchParams();
      form.set("To", to);
      form.set("From", twilioFrom);
      form.set("Body", textMessage);

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const authHeader = Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64");
      const twilioResp = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: form.toString(),
      });

      const respText = await twilioResp.text().catch(() => "");
      if (!twilioResp.ok) {
        console.error("Twilio error", twilioResp.status, respText);
        return res.status(502).json({ error: "Failed to send via Twilio WhatsApp API.", status: twilioResp.status, details: respText });
      }

      try { console.log("Twilio success", respText); } catch {}
      return res.status(200).json({ success: true, provider: "twilio", raw: respText });
    }

    // Fallback to Meta Cloud API if configured
    if (metaToken && metaPhoneNumberId) {
      const graphUrl = `https://graph.facebook.com/v17.0/${metaPhoneNumberId}/messages`;
      const response = await fetch(graphUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${metaToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: recipient,
          type: "text",
          text: { body: textMessage }
        })
      });

      const metaText = await response.text().catch(() => "");
      if (!response.ok) {
        console.error("Meta Cloud error", response.status, metaText);
        return res.status(502).json({ error: "Failed to send via WhatsApp Cloud API.", status: response.status, details: metaText });
      }

      try { console.log("Meta Cloud success", metaText); } catch {}
      return res.status(200).json({ success: true, provider: "meta", raw: metaText });
    }

    return res.status(500).json({ 
      error: "No WhatsApp provider configured. Set Twilio or Meta credentials.",
      debug: {
        hasTwilioConfig: !!(twilioSid && twilioToken && twilioFrom),
        hasMetaConfig: !!(metaToken && metaPhoneNumberId),
        environment: process.env.NODE_ENV
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Unexpected server error.", details: err?.message || String(err) });
  }
}


