import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  try {
    await requireAdmin(); // throws if not logged in
    return NextResponse.json({ loggedIn: true });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
