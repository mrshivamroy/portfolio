"use client";

import { useEffect, useState } from "react";
import styles from './styles.module.css'; // Make sure this points to your CSS module

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
      setStatus("Education added successfully!");
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

  if (loading) return <p className="text-[#9ecbff] font-bold text-lg animate-pulse">Loading education...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

      {/* ADD FORM */}
      <div>
        <h2 className={styles.title} style={{ fontSize: "1.5rem", borderBottomWidth: "1px" }}>
          Add New Education
        </h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type (e.g., HS, School Final, Graduation)"
            className="w-full bg-[#071426] border-2 border-[#1da1f2] rounded px-4 py-3 text-white outline-none focus:border-[#0d5fbf] transition-all"
          />

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (e.g., 2019 - 2021)"
            className="w-full bg-[#071426] border-2 border-[#1da1f2] rounded px-4 py-3 text-white outline-none focus:border-[#0d5fbf] transition-all"
          />

          <input
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            placeholder="School / College Name"
            className="w-full bg-[#071426] border-2 border-[#1da1f2] rounded px-4 py-3 text-white outline-none focus:border-[#0d5fbf] transition-all"
          />

          <input
            name="marks"
            value={form.marks}
            onChange={handleChange}
            placeholder="Marks / CGPA"
            className="w-full bg-[#071426] border-2 border-[#1da1f2] rounded px-4 py-3 text-white outline-none focus:border-[#0d5fbf] transition-all"
          />

          <div className={styles.buttonGroup} style={{ justifyContent: "flex-start", marginTop: "0.5rem" }}>
            <button
              onClick={addEducation}
              disabled={saving}
              className={`${styles.button} ${styles.primary}`}
              style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}
            >
              {saving ? "Saving..." : "Add Education"}
            </button>
          </div>

          {status && (
            <p className={status.includes("Failed") ? "text-red-400 font-bold" : "text-[#1da1f2] font-bold"}>
              {status}
            </p>
          )}
        </div>
      </div>

      {/* LIST OF EXISTING EDUCATION */}
      <div>
        <h2 className={styles.title} style={{ fontSize: "1.5rem", borderBottomWidth: "1px" }}>
          Existing Education
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          {educations.length === 0 && (
            <p className={styles.subtitle}>No education entries yet. Add one above!</p>
          )}

          {educations.map((edu) => (
            <div
              key={edu._id}
              className={styles.eduDetails}
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "1rem 1.5rem",
                borderRadius: "0 8px 8px 0" // Slight rounding on the right side
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>
                  {edu.type}
                </h3>
                <p style={{ color: "#9ecbff", margin: 0, fontSize: "0.9rem" }}>
                  {edu.schoolName}
                </p>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", fontSize: "0.85rem", color: "#1da1f2" }}>
                  <span>📅 {edu.duration}</span>
                  <span>🎓 {edu.marks}</span>
                </div>
              </div>

              {/* Custom styled delete button keeping the shape of your standard buttons */}
              <button
                onClick={() => deleteEducation(edu._id)}
                className={`${styles.button}`}
                style={{
                  padding: "0.5rem 1rem",
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  backgroundColor: "transparent",
                  fontSize: "0.85rem",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#ef4444";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#ef4444";
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}