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
  const requestType =
    data.eventType ||
    data.questionType ||
    data.collaborationType ||
    data.mediaType ||
    data.contactReason;
  const rows = [
    ["Naam", data.name],
    ["E-mail", data.email],
    ["Telefoon", formatOptional(data.phone)],
    ["Contactreden", data.contactReason],
    ["Details", formatOptional(requestType)],
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

function buildConfirmationEmail(data: ContactFormData, mailTo: string, mailFrom: string) {
  const copy = {
    nl: {
      subject: "We hebben je bericht goed ontvangen - Cannix",
      title: "Bedankt voor je bericht",
      greeting: "Hallo",
      body: "We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op.",
      signoff: "Met vriendelijke groet",
    },
    en: {
      subject: "We received your message - Cannix",
      title: "Thank you for your message",
      greeting: "Hello",
      body: "We received your message and will get back to you as soon as possible.",
      signoff: "Kind regards",
    },
    fr: {
      subject: "Nous avons bien reçu votre message - Cannix",
      title: "Merci pour votre message",
      greeting: "Bonjour",
      body: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
      signoff: "Cordialement",
    },
    de: {
      subject: "Wir haben Ihre Nachricht erhalten - Cannix",
      title: "Vielen Dank für Ihre Nachricht",
      greeting: "Hallo",
      body: "Wir haben Ihre Nachricht erhalten und melden uns so schnell wie möglich bei Ihnen.",
      signoff: "Freundliche Grüße",
    },
  }[data.language || "nl"];

  return {
    from: mailFrom,
    to: [data.email],
    reply_to: [mailTo],
    subject: copy.subject,
    html: `<div style="font-family:Arial,sans-serif;color:#111827;"><h1>${copy.title}</h1><p>${copy.greeting} ${escapeHtml(data.name)},</p><p>${copy.body}</p><p>${copy.signoff},<br>Cannix</p></div>`,
    text: `${copy.greeting} ${data.name},\n\n${copy.body}\n\n${copy.signoff},\nCannix`,
  };
}

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown";
}

function isRateLimitedInMemory(ip: string) {
  const now = Date.now();
  for (const [key, value] of requestLog) {
    if (value.resetAt <= now) requestLog.delete(key);
  }
  if (requestLog.size >= 10_000) {
    const oldestKey = requestLog.keys().next().value;
    if (oldestKey) requestLog.delete(oldestKey);
  }
  const current = requestLog.get(ip);

  if (!current || current.resetAt <= now) {
    requestLog.set(ip, { count: 1, resetAt: now + requestWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequestsPerWindow;
}

function isRateLimited(request: NextRequest) {
  return isRateLimitedInMemory(getClientIp(request));
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
    let response: Response;
    try {
      response = await fetch(resendEndpoint, {
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
          subject: `Nieuw contactbericht: ${data.name}`,
          html: email.html,
          text: email.text,
        }),
      });
    } catch (error) {
      console.error("Resend unavailable:", error);
      return NextResponse.json({ error: "Mailservice is tijdelijk niet beschikbaar. Probeer later opnieuw." }, { status: 503 });
    }

    if (!response.ok) {
      console.error("Resend mail error:", await response.text());
      return NextResponse.json({ error: "Mail verzenden lukte niet." }, { status: 502 });
    }

    let confirmation: Response;
    try {
      confirmation = await fetch(resendEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify(buildConfirmationEmail(data, mailTo, mailFrom)),
      });
    } catch (error) {
      console.error("Resend confirmation unavailable:", error);
      return NextResponse.json({ success: true, confirmationSent: false, message: "Aanvraag ontvangen" });
    }

    if (!confirmation.ok) {
      console.error("Resend confirmation error:", await confirmation.text());
      return NextResponse.json({
        success: true,
        confirmationSent: false,
        message: "Aanvraag ontvangen",
      });
    }

    return NextResponse.json({ success: true, confirmationSent: true, message: "Aanvraag ontvangen" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
  }
}
