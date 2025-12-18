"use client";

import { useEffect, useState } from "react";

export default function PopupSection() {
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false); // new field
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  /* Load existing popup */
  useEffect(() => {
    fetch("/api/popup")
      .then((res) => res.json())
      .then((data) => {
        if (data?.content) setContent(data.content);
        if (data?.isActive !== undefined) setIsActive(data.isActive); // load isActive
        setLoading(false);
      });
  }, []);

  const savePopup = async () => {
    setSaving(true);
    setStatus("");

    const res = await fetch("/api/popup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, isActive }), // send isActive
      credentials: "include",
    });

    setSaving(false);
    setStatus(res.ok ? "Popup content saved" : "Failed to save popup");
  };

  if (loading) return <p className="text-sm">Loading popup...</p>;

  return (
    <div className="space-y-6">

      <div>
        <label className="block text-sm mb-2">
          Popup HTML Content
        </label>

        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm resize-none"
          placeholder="<h2>Welcome</h2><p>Important notice...</p>"
        />
      </div>

      {/* New Active Toggle */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="popupActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="popupActive" className="text-sm">
          Popup Active
        </label>
      </div>

      <button
        onClick={savePopup}
        disabled={saving}
        className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Popup"}
      </button>

      {status && <p className="text-sm">{status}</p>}

      {/* PREVIEW */}
      {content && (
        <div className="border border-[var(--twitter-blue)] p-4">
          <p className="text-sm font-semibold mb-2">Preview</p>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <p className="mt-2 text-sm">
            Status: {isActive ? "Active" : "Inactive"}
          </p>
        </div>
      )}

    </div>
  );
}
