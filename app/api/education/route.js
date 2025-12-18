import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const data = await Education.find().sort({ order: 1 });
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    await requireAdmin();
    await connectDB();

    const body = await req.json();
    const edu = await Education.create(body);

    return NextResponse.json(edu);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await req.json();
    await Education.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
