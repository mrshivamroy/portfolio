import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req, { params }) {
  try {
    // 🔐 Allow only logged-in admin
    await requireAdmin();

    // ✅ params must be awaited in App Router
    const { type } = await params; // profile | projects | gallery

    // 📦 Read multipart form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 📁 Folder mapping
    const folderMap = {
      profile: "Portfolio/profile",
      projects: "Portfolio/projects",
      gallery: "Portfolio/gallery",
    };

    const folder = folderMap[type] || "Portfolio";

    // ☁️ Upload to Cloudinary
    const result = await uploadToCloudinary(file, folder);

    // ✅ Return everything client needs
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      type,
    });
  } catch (err) {
    console.error("Upload failed:", err);

    return NextResponse.json(
      { error: "Unauthorized or upload failed" },
      { status: 401 }
    );
  }
}
