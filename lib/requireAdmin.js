import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function requireAdmin() {
  // Await the cookie store
  const cookieStore = await cookies();
  const token = cookieStore.get?.("token")?.value;

  if (!token) throw new Error("Unauthorized");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error("Unauthorized");
  }

  return token; // optional, if you need it in your route
}
