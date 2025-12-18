import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/utils/jwt";
import { sendAdminLoginNotification } from "@/lib/nodemailer";
import bcrypt from "bcryptjs"

export async function POST(req) {
  await connectDB();

  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Compare password using schema method
  const isMatch = await user.comparePassword(password);
  const hashedPassword = await bcrypt.hash(password, 12);

  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken(user._id);

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  await sendAdminLoginNotification(user.username, req.ip || "unknown");

  return res;
}
