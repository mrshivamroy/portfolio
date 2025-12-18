import { NextResponse } from "next/server";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req, { params }) {
  try {
    // ✅ Auth check (MUST await)
    await requireAdmin();

    // ✅ params is async in App Router
    const { type } = await params; // profile | projects | gallery

    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "public_id is required" },
        { status: 400 }
      );
    }

    // ✅ Delete from Cloudinary
    await deleteFromCloudinary(public_id);

    return NextResponse.json({
      success: true,
      type,
    });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Unauthorized or delete failed" },
      { status: 401 }
    );
  }
}
