import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req) {
  try {
    await requireAdmin();
    await connectDB();

    const data = await req.json();
    const project = await Project.create(data);

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req) {
  try {
    await requireAdmin();
    await connectDB();

    const { id, ...update } = await req.json();
    const project = await Project.findByIdAndUpdate(id, update, { new: true });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await req.json();
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
