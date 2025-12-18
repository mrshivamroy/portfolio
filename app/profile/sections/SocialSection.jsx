"use client";

import { useEffect, useState } from "react";

export default function SocialSection() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    link: "",
  });

  /* Load social links */
  const fetchSocials = async () => {
    const res = await fetch("/api/social");
    const data = await res.json();
    setSocials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* Add social link */
  const addSocial = async () => {
    setSaving(true);
    setStatus("");

    const res = await fetch("/api/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });

    setSaving(false);

    if (res.ok) {
      setForm({ name: "", link: "" });
      fetchSocials();
      setStatus("Social link added");
    } else {
      setStatus("Failed to add link");
    }
  };

  /* Delete social link */
  const deleteSocial = async (id) => {
    if (!confirm("Delete this social link?")) return;

    await fetch("/api/social", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    });

    fetchSocials();
  };

  if (loading) return <p className="text-sm">Loading social links...</p>;

  return (
    <div className="space-y-8">

      {/* ADD FORM */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Add Social Media</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Platform Name (LinkedIn, GitHub, X)"
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
        />

        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Profile URL"
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
        />

        <button
          onClick={addSocial}
          disabled={saving}
          className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Social"}
        </button>

        {status && <p className="text-sm">{status}</p>}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Existing Social Links</h2>

        {socials.length === 0 && (
          <p className="text-sm">No social links added yet.</p>
        )}

        {socials.map((s) => (
          <div
            key={s._id}
            className="border border-[var(--twitter-blue)] p-4 flex justify-between items-center"
          >
            <div className="text-sm">
              <p><strong>{s.name}</strong></p>
              <p className="break-all">{s.link}</p>
            </div>

            <button
              onClick={() => deleteSocial(s._id)}
              className="text-sm border border-red-500 px-3 py-1 hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
