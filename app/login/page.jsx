"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState("confirm"); // confirm | login | forgot
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Redirect if already logged in as admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
        if (data.loggedIn) router.push("/profile");
      } catch (err) {
        // not logged in, do nothing
      }
    };
    checkAdmin();
  }, [router]);

  useEffect(() => {
    document.title = "Admin Login | Shivam Roy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Admin login page for Shivam Roy’s portfolio dashboard – manage content and settings."
      );
    }
  }, []);
  

  /* LOGIN */
  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push("/profile");
    } catch (err) {
      setStatus(err.message || "Login failed");
    }
  };

  /* FORGOT PASSWORD */
  const handleForgot = async (e) => {
    e.preventDefault();
    setStatus("Sending reset email...");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus("Reset link sent to email");
    } catch (err) {
      setStatus(err.message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[var(--ocean-deep)] border border-[var(--twitter-blue)] p-6">

        {/* STEP 1: CONFIRM */}
        {step === "confirm" && (
          <>
            <p className="text-sm mb-6">Are you the admin?</p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-sm border border-[var(--twitter-blue)]"
              >
                No
              </button>
              <button
                onClick={() => setStep("login")}
                className="px-4 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)]"
              >
                Yes
              </button>
            </div>
          </>
        )}

        {/* STEP 2: LOGIN */}
        {step === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
              required
            />

            <button
              type="submit"
              className="w-full px-4 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setStep("forgot")}
              className="text-sm underline text-[var(--sky-blue)]"
            >
              Forgot password?
            </button>

            {status && <p className="text-sm">{status}</p>}
          </form>
        )}

        {/* STEP 3: FORGOT PASSWORD */}
        {step === "forgot" && (
          <form onSubmit={handleForgot} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              onChange={handleChange}
              className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
              required
            />

            <button
              type="submit"
              className="w-full px-4 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)]"
            >
              Send Reset Link
            </button>

            {status && <p className="text-sm">{status}</p>}
          </form>
        )}

      </div>
    </div>
  );
}
