import { NextRequest, NextResponse } from "next/server";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";
const requestWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const requestLog = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatOptional(value?: string) {
  return value?.trim() ? value.trim() : "Niet ingevuld";
}

function buildEmail(data: ContactFormData) {
  const rows = [
    ["Naam", data.name],
    ["E-mail", data.email],
    ["Telefoon", formatOptional(data.phone)],
    ["Type evenement", data.eventType],
    ["Datum", formatOptional(data.eventDate)],
    ["Locatie", data.location],
    ["Bericht", data.message],
  ];
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return {
    text,
    html: `<div style="font-family:Arial,sans-serif;color:#111827;"><h1>Nieuwe booking aanvraag</h1><table style="border-collapse:collapse;width:100%;max-width:720px;">${htmlRows}</table></div>`,
  };
}

function isRateLimited(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = requestLog.get(key);

  if (!current || current.resetAt <= now) {
    requestLog.set(key, { count: 1, resetAt: now + requestWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequestsPerWindow;
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: "Te veel aanvragen. Probeer binnen een minuut opnieuw." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
    }

    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validatie mislukt", details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data = result.data;
    if (data.website) {
      return NextResponse.json({ success: true, message: "Aanvraag ontvangen" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const mailTo = process.env.MAIL_TO;
    const mailFrom = process.env.MAIL_FROM;
    if (!apiKey || !mailTo || !mailFrom) {
      console.error("Mailconfiguratie ontbreekt: RESEND_API_KEY, MAIL_TO en MAIL_FROM zijn vereist.");
      return NextResponse.json({ error: "Mailservice is nog niet geconfigureerd." }, { status: 503 });
    }

    const email = buildEmail(data);
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from: mailFrom,
        to: [mailTo],
        reply_to: [data.email],
        subject: `Nieuwe booking aanvraag: ${data.eventType} - ${data.name}`,
        html: email.html,
        text: email.text,
      }),
    });

    if (!response.ok) {
      console.error("Resend mail error:", await response.text());
      return NextResponse.json({ error: "Mail verzenden lukte niet." }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: "Aanvraag ontvangen" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
  }
}
