import { NextResponse } from "next/server" ;
import connectDB from "@/lib/mongodb" ;
import User from "@/models/User" ;
import { generateToken } from "@/utils/jwt" ;
import { sendAdminLoginNotification } from "@/lib/nodemailer" ;
import bcrypt from "bcryptjs" ;

export async function POST(req) {
  await connectDB() ;

  const { username, password } = await req.json() ;

  const user = await User.findOne({ username }) ;
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 }) ;

  const isMatch = await user.comparePassword(password) ;
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 }) ;

  const token = generateToken(user._id) ;
  const res = NextResponse.json({ success: true }) ;

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  }) ;

  const forwarded = req.headers.get("x-forwarded-for") ;
  const real = req.headers.get("x-real-ip") ;
  const ip = forwarded ? forwarded.split(",")[0].trim() : (real || req.ip || "unknown") ;

  const metadata = {
    ip: ip,
    userAgent: req.headers.get("user-agent") || "Unknown Device",
    referer: req.headers.get("referer") || "Direct Visit",
    city: req.headers.get("x-vercel-ip-city") || "Unknown City",
    country: req.headers.get("x-vercel-ip-country") || "Unknown Country"
  } ;

  await sendAdminLoginNotification(user.username, metadata) ;

  return res ;
}