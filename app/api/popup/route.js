import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Popup from "@/models/Popup";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const popup = await Popup.findOne({ isActive: true });
  return NextResponse.json(popup);
}

export async function POST(req) {
  try {
    await requireAdmin();
    await connectDB();

    const { content = "", isActive } = await req.json(); // default values

    // Remove existing popups
    await Popup.deleteMany({});

    // Create new popup
    const popup = await Popup.create({ content, isActive });

    return NextResponse.json(popup);
  } catch (err) {
    console.error("Popup POST error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
