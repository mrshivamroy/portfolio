"use client";

import { useEffect, useState } from "react";

export default function ProfileSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    imageUrl: "",
    publicId: "", // store Cloudinary public_id for delete/update
    description: "",
  });

  /* Load profile data */
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm({
            imageUrl: data.imageUrl || "",
            publicId: data.publicId || "",
            description: data.description || "",
          });
        }
        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* Upload profile image to Cloudinary */
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setSaving(true);
      const res = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        // Set the uploaded image URL and public_id
        setForm({ ...form, imageUrl: data.url, publicId: data.public_id });
        setStatus("Profile image uploaded successfully");
      } else {
        setStatus(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    } finally {
      setSaving(false);
    }
  };

  /* Delete profile image from Cloudinary */

  const handleFileDelete = async () => {
    if (!form.imageUrl) return;
    const res = await fetch("/api/getPublicId", {
      method: "POST",
      body: JSON.stringify({ url: form.imageUrl }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data.publicId);
    const publicId = data.publicId;
    if (!publicId) {
      setStatus("Cannot delete: invalid image URL");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/delete/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ ...form, imageUrl: "" });
        setStatus("Profile image deleted successfully");
      } else {
        setStatus(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("Delete failed");
    } finally {
      setSaving(false);
    }
  };


  /* Save profile description */
  const saveProfile = async () => {
    setSaving(true);
    setStatus("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setStatus(res.ok ? "Saved successfully" : "Failed to save");
    } catch (err) {
      console.error(err);
      setStatus("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm">Loading profile...</p>;

  return (
    <div className="space-y-6">

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block text-sm mb-2">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full text-sm"
          disabled={saving}
        />
      </div>

      {/* IMAGE PREVIEW & DELETE */}
      {form.imageUrl && (
        <div className="flex items-center gap-4">
          <img
            src={form.imageUrl}
            alt="Profile preview"
            className="w-40 h-40 object-cover border border-[var(--twitter-blue)]"
          />
          <button
            onClick={handleFileDelete}
            disabled={saving}
            className="px-4 py-2 text-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      )}

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm mb-2">About Me</label>
        <textarea
          name="description"
          rows={6}
          value={form.description}
          onChange={handleChange}
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm resize-none"
          placeholder="Write about yourself..."
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveProfile}
        disabled={saving}
        className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>

      {status && <p className="text-sm">{status}</p>}
    </div>
  );
}
