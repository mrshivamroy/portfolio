import { NextResponse } from "next/server" ;

export function middleware(req) {
  const path = req.nextUrl.pathname ;
  const token = req.cookies.get("token")?.value ;

  // 1. Instant Drop for Bot Scanners
  const blockedPaths = [".env", ".git", "wp-admin", "wp-login", "phpmyadmin"] ;
  for (const bp of blockedPaths) {
    if (path.includes(bp)) return new NextResponse("Not Found", { status: 404 }) ;
  }

  // 2. Globally Protect Admin UI Routes
  if (path.startsWith("/profile") && !token) return NextResponse.redirect(new URL("/login", req.url)) ;

  // 3. Globally Protect Sensitive APIs
  // Add any API routes here that ONLY the admin should be able to trigger (like POST/DELETE)
  const protectedApis = ["/api/education", "/api/project", "/api/gallery", "/api/social", "/api/education", "/api/delete", "/api/profile", "/api/popup"] ;
  
  if (protectedApis.some(p => path.startsWith(p))) {
    // Note: If you have public GET routes for these, you'll need to check req.method too!
    if (req.method !== "GET" && !token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }) ;
  }

  return NextResponse.next() ;
}

export const config = {
  // Run on all routes except static assets and images
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] ,
} ;