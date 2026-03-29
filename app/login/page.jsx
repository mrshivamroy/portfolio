"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./../page.module.css"; 

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
    <div 
      className={styles.page} 
      style={{ 
        // height: "fit-content",           // Locks the height exactly to the viewport
        // //minHeight: "85vh", 
        // justifyContent: "center", 
        // boxSizing: "border-box",   // Ensures padding doesn't push height over 100vh
        // overflow: "hidden"         // Prevents the unwanted scrollbar
      }}
    >
      <div 
        className={styles.card} 
        style={{ 
          maxWidth: "450px", 
          width: "100%", 
          margin: "0 auto",
          height: "fit-content"           // Ensures the card only takes up as much space as it needs
        }}
      >
        
        {/* STEP 1: CONFIRM */}
        {step === "confirm" && (
          <div className="text-center">
            <h2 className={styles.title}>Admin Access</h2>
            <p className={styles.subtitle} style={{ marginBottom: "1.5rem" }}>
              Are you the administrator of this portfolio?
            </p>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => router.push("/")}
                className={`${styles.button} ${styles.secondary}`}
              >
                No, go back
              </button>
              <button
                onClick={() => setStep("login")}
                className={`${styles.button} ${styles.primary}`}
              >
                Yes, I am
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOGIN */}
        {step === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <h2 className={styles.title}>Welcome Back, Shivam</h2>
              <p className={styles.subtitle}>Enter your credentials to continue.</p>
            </div>

            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full bg-[#071426] border-2 border-[#1da1f2] rounded px-4 py-3 text-white outline-none focus:border-[#0d5fbf] transition-all"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-[#071426] border-2 border-[#1da1f2] rounded px-4 py-3 text-white outline-none focus:border-[#0d5fbf] transition-all"
              required
            />

            <div className={styles.buttonGroup} style={{ marginTop: "0.5rem" }}>
              <button
                type="submit"
                className={`${styles.button} ${styles.primary}`}
                style={{ width: "100%" }}
              >
                Login
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep("forgot")}
              className="text-[#9ecbff] text-sm underline hover:text-white transition-colors mt-2 text-center"
            >
              Forgot password?
            </button>

            {status && <p className="text-[#1da1f2] text-sm text-center font-bold">{status}</p>}
          </form>
        )}

        {/* STEP 3: FORGOT PASSWORD */}
        {step === "forgot" && (
          <form onSubmit={handleForgot} className="flex flex-col gap-4">
            <div>
              <h2 className={styles.title}>Reset Password</h2>
              <p className={styles.subtitle}>We'll send a reset link to your admin email.</p>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              onChange={handleChange}
              className="w-full bg-[#071426] border-2 border-[#1da1f2] rounded px-4 py-3 text-white outline-none focus:border-[#0d5fbf] transition-all"
              required
            />

            <div className={styles.buttonGroup} style={{ marginTop: "0.5rem" }}>
              <button
                type="submit"
                className={`${styles.button} ${styles.primary}`}
                style={{ width: "100%" }}
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setStep("login")}
                className={`${styles.button} ${styles.secondary}`}
                style={{ width: "100%" }}
              >
                Back to Login
              </button>
            </div>

            {status && <p className="text-[#1da1f2] text-sm text-center font-bold">{status}</p>}
          </form>
        )}

      </div>
    </div>
  );
}