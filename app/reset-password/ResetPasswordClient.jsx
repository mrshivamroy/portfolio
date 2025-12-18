"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "Reset Password | Shivam Roy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Reset your admin password for Shivam Roy's portfolio."
      );
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!password || !confirmPassword) {
      setStatus("Please fill both fields");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus("Password updated successfully. Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setStatus(err.message || "Failed to reset password");
    }
  };

  if (!token) {
    return <p className="text-center mt-10">Invalid reset link.</p>;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-(--ocean-deep) border border-(--twitter-blue) p-6">
        <h2 className="text-lg mb-4">Reset Password</h2>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-(--twitter-blue) px-4 py-2 text-sm"
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border border-(--twitter-blue) px-4 py-2 text-sm"
            required
          />

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm border border-(--twitter-blue) hover:bg-(--twitter-blue)"
          >
            Reset Password
          </button>

          {status && <p className="text-sm mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}
