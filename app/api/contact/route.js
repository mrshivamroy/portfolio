import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, captchaId, captchaInput } = body;

    /* ---------- Basic validation ---------- */
    if (!name || !email || !message || !captchaId || !captchaInput) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error("❌ ADMIN_EMAIL is missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    /* ---------- CAPTCHA validation ---------- */
    let captchaData;
    try {
      const captchaRes = await fetch(
        "https://freeimagecaptcha.vercel.app/api/validate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            captchaId,
            userInput: captchaInput,
          }),
        }
      );

      captchaData = await captchaRes.json();
    } catch (err) {
      console.error("❌ CAPTCHA SERVICE ERROR:", err);
      return NextResponse.json(
        { error: "CAPTCHA service unavailable" },
        { status: 503 }
      );
    }

    if (!captchaData?.success) {
      return NextResponse.json(
        { error: "Invalid CAPTCHA" },
        { status: 400 }
      );
    }

    /* ---------- Send email to ADMIN ---------- */
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Contact Message",
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        text: `Name: ${name}
Email: ${email}

Message:
${message}`,
      });
    } catch (emailError) {
      console.error("❌ EMAIL SEND FAILED:", emailError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ CONTACT_API_FATAL_ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
