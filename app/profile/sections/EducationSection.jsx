"use client";

import { useEffect, useState } from "react";

export default function EducationSection() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    type: "",
    duration: "",
    schoolName: "",
    marks: "",
  });

  /* Load education data */
  const fetchEducation = async () => {
    const res = await fetch("/api/education");
    const data = await res.json();
    setEducations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* Add education */
  const addEducation = async () => {
    setSaving(true);
    setStatus("");

    const res = await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });

    setSaving(false);

    if (res.ok) {
      setForm({
        type: "",
        duration: "",
        schoolName: "",
        marks: "",
      });
      fetchEducation();
      setStatus("Education added");
    } else {
      setStatus("Failed to add education");
    }
  };

  /* Delete education */
  const deleteEducation = async (id) => {
    if (!confirm("Delete this education?")) return;

    await fetch("/api/education", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    });

    fetchEducation();
  };

  if (loading) return <p className="text-sm">Loading education...</p>;

  return (
    <div className="space-y-8">

      {/* ADD FORM */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Add Education</h2>

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type (HS, School Final, Graduation)"
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
        />

        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (2019 - 2021)"
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
        />

        <input
          name="schoolName"
          value={form.schoolName}
          onChange={handleChange}
          placeholder="School / College Name"
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
        />

        <input
          name="marks"
          value={form.marks}
          onChange={handleChange}
          placeholder="Marks / CGPA"
          className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
        />

        <button
          onClick={addEducation}
          disabled={saving}
          className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Education"}
        </button>

        {status && <p className="text-sm">{status}</p>}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Existing Education</h2>

        {educations.length === 0 && (
          <p className="text-sm">No education entries yet.</p>
        )}

        {educations.map((edu) => (
          <div
            key={edu._id}
            className="border border-[var(--twitter-blue)] p-4 flex justify-between items-start"
          >
            <div className="text-sm space-y-1">
              <p><strong>Type:</strong> {edu.type}</p>
              <p><strong>Duration:</strong> {edu.duration}</p>
              <p><strong>Institution:</strong> {edu.schoolName}</p>
              <p><strong>Marks:</strong> {edu.marks}</p>
            </div>

            <button
              onClick={() => deleteEducation(edu._id)}
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
