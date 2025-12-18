import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SocialMedia from "@/models/SocialMedia";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const socials = await SocialMedia.find().sort({ order: 1 });
  return NextResponse.json(socials);
}

export async function POST(req) {
  try {
    await requireAdmin();
    await connectDB();

    const data = await req.json();
    const social = await SocialMedia.create(data);

    return NextResponse.json(social);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await req.json();
    await SocialMedia.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
