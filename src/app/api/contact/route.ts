import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validatie mislukt", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Here you would typically:
    // 1. Send email via Resend, Nodemailer, or similar
    // 2. Store in database
    // 3. Send to Formspree / Netlify Forms / etc.

    // For now, log to console (replace with actual email sending)
    console.log("Nieuwe booking aanvraag:", {
      timestamp: new Date().toISOString(),
      ...data,
    });

    // Simulate email sending
    // await sendEmail({
    //   to: "bookings@cannix.be",
    //   subject: `Nieuwe booking aanvraag: ${data.eventType}`,
    //   html: generateEmailHtml(data),
    // });

    return NextResponse.json({ success: true, message: "Aanvraag ontvangen" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
  }
}