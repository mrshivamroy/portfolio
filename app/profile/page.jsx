// app/profile/page.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardClient from "./profileClient";
import Head from "next/head";

export default async function ProfilePage() {
  const cookieStore = await cookies(); 
  const tokenCookie = cookieStore.get?.("token");
  const token = tokenCookie?.value;

  if (!token) redirect("/login");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/login");
  }

  return (
    <>
      <Head>
        <title>Profile | Admin</title>
        <meta
          name="description"
          content="Profile of admin"
        />
      </Head>
      <DashboardClient token={token} />
    </>
  );
}
