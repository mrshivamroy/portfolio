import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Password Reset",
    html: `<p>Reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  return NextResponse.json({ success: true });
}

