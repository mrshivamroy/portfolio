import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const items = await Gallery.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req) {
  try {
    await requireAdmin();
    await connectDB();

    const data = await req.json();
    const item = await Gallery.create(data);

    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await req.json();
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
