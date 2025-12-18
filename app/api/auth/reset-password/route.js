import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req) {
  await connectDB();
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Missing token or password" },
      { status: 400 }
    );
  }

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // ✅ plain password
  user.password = password;

  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save(); // pre-save hook hashes once

  return NextResponse.json({ success: true });
}
