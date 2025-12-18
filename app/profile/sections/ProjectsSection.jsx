"use client";

import { useEffect, useState } from "react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    imageFile: null,
    imageUrl: "",
    name: "",
    description: "",
    status: "ongoing",
    duration: "",
    toolsUsed: "",
    collaborators: "",
    links: "",
  });

  const fetchProjects = async () => {
    const res = await fetch("/api/project");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile" && files && files[0]) {
      const file = files[0];
      const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      const ext = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(ext)) {
        setStatus("Only image files are allowed");
        e.target.value = null;
        return;
      }

      setForm({ ...form, imageFile: file });
      setStatus("");
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const saveProject = async () => {
    if (!form.name || !form.description || !form.status || !form.duration) {
      setStatus("Please fill all mandatory fields");
      return;
    }

    setSaving(true);
    setStatus(editingId ? "Updating..." : "Adding...");

    try {
      let imageUrl = form.imageUrl;

      if (form.imageFile) {
        if (editingId && form.imageUrl) {
          const publicRes = await fetch("/api/getPublicId", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: form.imageUrl }),
            credentials: "include",
          });
          const { publicId } = await publicRes.json();
          if (publicId) {
            await fetch("/api/delete/projects", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ public_id: publicId }),
              credentials: "include",
            });
          }
        }

        const cloudForm = new FormData();
        cloudForm.append("file", form.imageFile);

        const uploadRes = await fetch("/api/upload/projects", {
          method: "POST",
          body: cloudForm,
          credentials: "include", 
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          setStatus(uploadData.error || "Image upload failed");
          setSaving(false);
          return;
        }
        imageUrl = uploadData.url || "";
      }

      // transform links input into objects { label, url }
      const linksArray = form.links
        .split(",")
        .map((l) => {
          const [label, url] = l.split("|").map((x) => x.trim());
          return label && url ? { label, url } : null;
        })
        .filter(Boolean);

      const payload = {
        imageUrl,
        name: form.name,
        description: form.description,
        status: form.status,
        duration: form.duration,
        tools: form.toolsUsed
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        collaborators: form.collaborators
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        links: linksArray,
      };

      let res;
      if (editingId) {
        res = await fetch("/api/project", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
          credentials: "include",
        });
      } else {
        res = await fetch("/api/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      }

      if (res.ok) {
        setForm({
          imageFile: null,
          imageUrl: "",
          name: "",
          description: "",
          status: "ongoing",
          duration: "",
          toolsUsed: "",
          collaborators: "",
          links: "",
        });
        setEditingId(null);
        setStatus(editingId ? "Project updated" : "Project added");
        fetchProjects();
      } else {
        const data = await res.json();
        setStatus(data.error || "Save failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id, imageUrl) => {
    if (!confirm("Delete this project?")) return;

    try {
      setSaving(true);
      setStatus("Deleting...");

      const dbRes = await fetch("/api/project", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });

      if (!dbRes.ok) {
        const data = await dbRes.json();
        setStatus(data.error || "Failed to delete from DB");
        setSaving(false);
        return;
      }

      if (imageUrl) {
        const publicRes = await fetch("/api/getPublicId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: imageUrl }),
          credentials: "include",
        });
        const { publicId } = await publicRes.json();
        if (publicId) {
          await fetch("/api/delete/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: publicId }),
            credentials: "include",
          });
        }
      }

      setStatus("Project deleted successfully");
      fetchProjects();
    } catch (err) {
      console.error(err);
      setStatus("Delete failed");
    } finally {
      setSaving(false);
    }
  };

  const editProject = (project) => {
    setForm({
      imageFile: null,
      imageUrl: project.imageUrl || "",
      name: project.name,
      description: project.description,
      status: project.status,
      duration: project.duration,
      toolsUsed: project.tools?.join(", ") || "",
      collaborators: project.collaborators?.join(", ") || "",
      links: project.links
        ?.map((l) => `${l.label}|${l.url}`)
        .join(", ") || "",
    });
    setEditingId(project._id);
    setStatus("");
  };

  if (loading) return <p className="text-sm">Loading projects...</p>;

  return (
    <div className="space-y-10">
      {/* ADD / UPDATE FORM */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">{editingId ? "Update Project" : "Add Project"}</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="imageFile"
          className="w-full text-sm"
          disabled={saving}
        />

        {form.imageUrl && !form.imageFile && (
          <img src={form.imageUrl} alt="" className="w-32 h-32 object-cover" />
        )}

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full border border-[var(--twitter-blue)] bg-transparent px-4 py-2 text-sm"
        />

        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full border border-[var(--twitter-blue)] bg-transparent px-4 py-2 text-sm resize-none"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-[var(--twitter-blue)] bg-transparent px-4 py-2 text-sm"
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="w-full border border-[var(--twitter-blue)] bg-transparent px-4 py-2 text-sm"
        />

        <input
          name="toolsUsed"
          value={form.toolsUsed}
          onChange={handleChange}
          placeholder="Tools Used (comma separated)"
          className="w-full border border-[var(--twitter-blue)] bg-transparent px-4 py-2 text-sm"
        />

        <input
          name="collaborators"
          value={form.collaborators}
          onChange={handleChange}
          placeholder="Collaborators (comma separated)"
          className="w-full border border-[var(--twitter-blue)] bg-transparent px-4 py-2 text-sm"
        />

        <input
          name="links"
          value={form.links}
          onChange={handleChange}
          placeholder="Links: label|url, label|url"
          className="w-full border border-[var(--twitter-blue)] bg-transparent px-4 py-2 text-sm"
        />

        <button
          onClick={saveProject}
          disabled={saving}
          className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] disabled:opacity-50"
        >
          {saving ? (editingId ? "Updating..." : "Saving...") : (editingId ? "Update Project" : "Add Project")}
        </button>

        {status && <p className="text-sm text-red-500">{status}</p>}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">Existing Projects</h2>

        {projects.length === 0 && <p className="text-sm">No projects added yet.</p>}

        {projects.map((p) => (
          <div key={p._id} className="border border-[var(--twitter-blue)] p-4 space-y-2">
            <div className="flex justify-between">
              <p className="text-sm font-semibold">{p.name}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => editProject(p)}
                  className="text-sm border border-green-500 px-3 py-1 hover:bg-green-500 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(p._id, p.imageUrl)}
                  className="text-sm border border-red-500 px-3 py-1 hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
            {p.imageUrl && <img src={p.imageUrl} alt="" className="w-32 h-32 object-cover" />}
            <p className="text-sm">{p.description}</p>
            <p className="text-sm"><strong>Status:</strong> {p.status}</p>
            <p className="text-sm"><strong>Duration:</strong> {p.duration}</p>
            <p className="text-sm"><strong>Tools:</strong> {p.tools?.join(", ")}</p>
            <p className="text-sm"><strong>Collaborators:</strong> {p.collaborators?.join(", ")}</p>
            <p className="text-sm">
              <strong>Links:</strong>{" "}
              {p.links?.map((l, idx) => (
                <span key={`${l.label}-${l.url}-${idx}`}>
                  {l.label}: <a href={l.url} target="_blank" rel="noreferrer" className="underline">{l.url}</a>;{" "}
                </span>
              ))}

            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
