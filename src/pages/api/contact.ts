import type { NextApiRequest, NextApiResponse } from "next";

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

type ContactResponse = {
  ok: boolean;
  error?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalize = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildMessage = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const lines = [
    "New project inquiry from thedimas.com",
    "",
    `Name: ${name || "Not provided"}`,
    `Email: ${email}`,
    "",
    "Message:",
    message || "Not provided",
  ];

  return lines.join("\n");
};

const sendResendEmail = async ({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo: string;
}) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "galionix2@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL || "Dimas Website <onboarding@resend.dev>";

  if (!apiKey) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "thedimas-website/1.0",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html: `<pre style="font-family: system-ui, sans-serif; white-space: pre-wrap;">${escapeHtml(
        text
      )}</pre>`,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend failed: ${response.status} ${details}`);
  }

  return true;
};

const sendTelegramMessage = async (text: string) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram failed: ${response.status} ${details}`);
  }

  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = req.body as ContactRequest;
  const name = normalize(body.name).slice(0, 120);
  const email = normalize(body.email).slice(0, 160);
  const message = normalize(body.message).slice(0, 4000);
  const company = normalize(body.company);

  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ ok: false, error: "Enter a valid email." });
  }

  const subject = `Project inquiry from ${name || email}`;
  const text = buildMessage({ name, email, message });

  try {
    const [emailSent, telegramSent] = await Promise.all([
      sendResendEmail({ subject, text, replyTo: email }),
      sendTelegramMessage(text),
    ]);

    if (!emailSent && !telegramSent) {
      return res.status(503).json({
        ok: false,
        error: "Contact notifications are not configured yet.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(502).json({
      ok: false,
      error: "Could not send the message. Please email me directly.",
    });
  }
}
