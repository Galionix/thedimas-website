import type { NextApiRequest, NextApiResponse } from "next";

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  source?: LeadSource;
};

type ContactResponse = {
  ok: boolean;
  error?: string;
};

type LeadSource = {
  cta?: string;
  page?: string;
  locale?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalize = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeSource = (source: unknown): LeadSource => {
  if (!source || typeof source !== "object") {
    return {};
  }

  const raw = source as Record<string, unknown>;

  return {
    cta: normalize(raw.cta).slice(0, 120),
    page: normalize(raw.page).slice(0, 500),
    locale: normalize(raw.locale).slice(0, 20),
    referrer: normalize(raw.referrer).slice(0, 500),
    utmSource: normalize(raw.utmSource).slice(0, 160),
    utmMedium: normalize(raw.utmMedium).slice(0, 160),
    utmCampaign: normalize(raw.utmCampaign).slice(0, 160),
    utmTerm: normalize(raw.utmTerm).slice(0, 160),
    utmContent: normalize(raw.utmContent).slice(0, 160),
  };
};

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
  source,
}: {
  name: string;
  email: string;
  message: string;
  source: LeadSource;
}) => {
  const sourceLines = [
    `CTA: ${source.cta || "Not provided"}`,
    `Page: ${source.page || "Not provided"}`,
    `Locale: ${source.locale || "Not provided"}`,
    `Referrer: ${source.referrer || "Direct / not provided"}`,
    `UTM source: ${source.utmSource || "Not provided"}`,
    `UTM medium: ${source.utmMedium || "Not provided"}`,
    `UTM campaign: ${source.utmCampaign || "Not provided"}`,
    `UTM term: ${source.utmTerm || "Not provided"}`,
    `UTM content: ${source.utmContent || "Not provided"}`,
  ];
  const lines = [
    "New project inquiry from thedimas.com",
    "",
    `Name: ${name || "Not provided"}`,
    `Email: ${email}`,
    "",
    "Lead source:",
    ...sourceLines,
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
  const source = normalizeSource(body.source);

  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ ok: false, error: "Enter a valid email." });
  }

  const subject = `Project inquiry from ${name || email}`;
  const text = buildMessage({ name, email, message, source });

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
