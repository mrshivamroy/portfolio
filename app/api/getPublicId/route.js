import { NextResponse } from "next/server";
import { getPublicIdFromUrl } from "@/lib/cloudinary";

// API route: /api/getPublicId
export async function POST(req) {
  const { url } = await req.json();
  const publicId = getPublicIdFromUrl(url); // server-side
  return NextResponse.json({ publicId });
}
