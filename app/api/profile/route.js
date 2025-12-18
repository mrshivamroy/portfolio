import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const profile = await Profile.findOne();
  return NextResponse.json(profile);
}

export async function POST(req) {
  try {
    await requireAdmin();
    await connectDB();

    const data = await req.json();
    const profile = await Profile.findOneAndUpdate({}, data, {
      upsert: true,
      new: true,
    });

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
