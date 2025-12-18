"use client";

import { useEffect, useState } from "react";

export default function GallerySection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    file: null,
    type: "image",
  });

  /* Load gallery items */
  const fetchGallery = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const allowedExtensions = [
        "jpg", "jpeg", "png", "gif", "webp",
        "mp4", "mov", "webm", "avi", "mkv"
      ];
      const ext = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(ext)) {
        setStatus("Only image and video files are allowed");
        e.target.value = null; // clear file input
        return;
      }

      const videoExtensions = ["mp4", "mov", "webm", "avi", "mkv"];
      const type = videoExtensions.includes(ext) ? "video" : "image";

      setForm({ file, type });
      setStatus("");
    }
  };

  /* Upload to Cloudinary then save to DB */
  const addItem = async () => {
    if (!form.file) {
      setStatus("Please select a file");
      return;
    }

    const cloudForm = new FormData();
    cloudForm.append("file", form.file);

    try {
      setSaving(true);
      setStatus("Uploading...");

      // 1️⃣ Upload to Cloudinary
      const uploadRes = await fetch("/api/upload/gallery", {
        method: "POST",
        body: cloudForm,
      });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setStatus(uploadData.error || "Upload to Cloudinary failed");
        setSaving(false);
        return;
      }

      // 2️⃣ Save URL and type to DB only (no public_id)
      const dbRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: uploadData.url,
          type: form.type,
        }),
      });

      if (dbRes.ok) {
        setForm({ file: null, type: "image" });
        setStatus("Item added successfully");
        fetchGallery();
      } else {
        const data = await dbRes.json();
        setStatus(data.error || "Failed to add to database");
      }
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    } finally {
      setSaving(false);
    }
  };

  /* Delete: DB first, then get public_id and delete from Cloudinary */
  const deleteItem = async (id, url) => {
    if (!confirm("Delete this item?")) return;

    try {
      setSaving(true);
      setStatus("Deleting...");

      // 1️⃣ Delete from DB
      const dbRes = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!dbRes.ok) {
        const data = await dbRes.json();
        setStatus(data.error || "Failed to delete from database");
        setSaving(false);
        return;
      }

      // 2️⃣ Get public_id from URL
      const publicRes = await fetch("/api/getPublicId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const { publicId } = await publicRes.json();

      if (!publicId) {
        setStatus("Failed to get public_id");
        setSaving(false);
        return;
      }

      // 3️⃣ Delete from Cloudinary
      const cloudRes = await fetch("/api/delete/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (cloudRes.ok) {
        setStatus("Item deleted successfully");
        fetchGallery();
      } else {
        const data = await cloudRes.json();
        setStatus(data.error || "Failed to delete from Cloudinary");
      }
    } catch (err) {
      console.error(err);
      setStatus("Delete failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm">Loading gallery...</p>;

  return (
    <div className="space-y-8">

      {/* ADD FORM */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Add Gallery Item</h2>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleChange}
          className="w-full text-sm"
          disabled={saving}
        />

        <button
          onClick={addItem}
          disabled={saving}
          className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Item"}
        </button>

        {status && <p className="text-sm text-red-500">{status}</p>}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Existing Gallery Items</h2>

        {items.length === 0 && <p className="text-sm">No gallery items yet.</p>}

        {items.map((item) => (
          <div
            key={item._id}
            className="border border-[var(--twitter-blue)] p-4 flex justify-between items-center"
          >
            <div className="text-sm">
              <p><strong>Type:</strong> {item.type}</p>
              {item.type === "image" ? (
                <img src={item.url} alt="" className="w-32 h-32 object-cover" />
              ) : (
                <video src={item.url} controls className="w-32 h-32 object-cover" />
              )}
            </div>

            <button
              onClick={() => deleteItem(item._id, item.url)}
              className="text-sm border border-red-500 px-3 py-1 hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
