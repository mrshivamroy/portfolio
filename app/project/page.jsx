"use client";

import { useEffect, useState } from "react";
import styles from "./project.module.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("ongoing");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  useEffect(() => {
    document.title = "Projects | Shivam Roy";
  }, []);

  const filtered = projects.filter((p) => p.status === active);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Projects</h1>

        {/* Toggle */}
        <div className={styles.toggleContainer}>
          {["ongoing", "completed"].map((t) => (
            <button
              key={t}
              className={`${styles.toggleButton} ${
                active === t ? styles.toggleButtonActive : ""
              }`}
              onClick={() => setActive(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((p) => (
            <div
              key={p._id}
              className={styles.tile}
              onClick={() => setSelected(p)}
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className={styles.tileImage}
                />
              )}
              <div className={styles.tileContent}>{p.name}</div>
            </div>
          ))}
        </div>

        {/* Popup */}
        {selected && (
          <ProjectPopup project={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}

function ProjectPopup({ project, onClose }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupCard}>
        <div className={styles.popupHeader}>
          <span>{project.name}</span>
          <button className={styles.popupCloseButton} onClick={onClose}>
            Close
          </button>
        </div>

        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.name}
            className={styles.popupImage}
          />
        )}

        <div className={styles.popupContent}>
          <p>{project.description}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Duration:</strong> {project.duration}</p>

          {project.tools?.length > 0 && (
            <p><strong>Tools:</strong> {project.tools.join(", ")}</p>
          )}

          {project.collaborators?.length > 0 && (
            <p><strong>Collaborators:</strong> {project.collaborators.join(", ")}</p>
          )}

          {project.links?.length > 0 && (
            <div>
              <strong>Links:</strong>
              <ul>
                {project.links.map((l, i) => (
                  <li key={i}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// export default function ProjectsPage() {
//   const [projects, setProjects] = useState([]);
//   const [active, setActive] = useState("ongoing");
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetch("/api/project")
//       .then((res) => res.json())
//       .then((data) => setProjects(data));
//   }, []);

//   useEffect(() => {
//     document.title = "Projects | Shivam Roy";
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute(
//         "content",
//         "Showcase of projects by Shivam Roy, Full Stack Developer – Web apps, portfolio projects, and more."
//       );
//     }
//   }, []);
  

//   const filtered = projects.filter((p) => p.status === active);

//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-6 py-10">

//         {/* HEADER */}
//         <h1 className="text-lg font-semibold mb-6">Projects</h1>

//         {/* TOGGLE */}
//         <div className="flex gap-4 mb-8">
//           {["ongoing", "completed"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setActive(t)}
//               className={`px-4 py-2 text-sm border border-[var(--twitter-blue)]
//               ${active === t ? "bg-[var(--twitter-blue)]" : ""}`}
//             >
//               {t.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filtered.map((p) => (
//             <div
//               key={p._id}
//               onClick={() => setSelected(p)}
//               className="border border-[var(--twitter-blue)] cursor-pointer hover:bg-[var(--ocean-deep)]"
//             >
//               {p.imageUrl && (
//                 <img
//                   src={p.imageUrl}
//                   alt={p.name}
//                   className="w-full h-40 object-cover"
//                 />
//               )}

//               <div className="p-4">
//                 <p className="text-sm font-semibold">{p.name}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* POPUP */}
//         {selected && (
//           <ProjectPopup project={selected} onClose={() => setSelected(null)} />
//         )}
//       </div>
//     </>
//   );
// }

// function ProjectPopup({ project, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
//       <div className="max-w-2xl w-full bg-[var(--ocean-deep)] border border-[var(--twitter-blue)] p-6 overflow-y-auto max-h-[90vh]">

//         <div className="flex justify-between mb-4">
//           <h2 className="text-sm font-semibold">{project.name}</h2>
//           <button
//             onClick={onClose}
//             className="text-sm border border-[var(--twitter-blue)] px-3 py-1 hover:bg-[var(--twitter-blue)]"
//           >
//             Close
//           </button>
//         </div>

//         {project.imageUrl && (
//           <img
//             src={project.imageUrl}
//             alt={project.name}
//             className="w-full h-56 object-cover mb-4"
//           />
//         )}

//         <div className="space-y-2 text-sm">
//           <p>{project.description}</p>

//           <p><strong>Status:</strong> {project.status}</p>
//           <p><strong>Duration:</strong> {project.duration}</p>

//           {project.toolsUsed?.length > 0 && (
//             <p><strong>Tools:</strong> {project.toolsUsed.join(", ")}</p>
//           )}

//           {project.otherCollaborators?.length > 0 && (
//             <p>
//               <strong>Collaborators:</strong>{" "}
//               {project.otherCollaborators.join(", ")}
//             </p>
//           )}

//           {project.links?.length > 0 && (
//             <div>
//               <strong>Links:</strong>
//               <ul className="list-disc list-inside">
//                 {project.links.map((l, i) => (
//                   <li key={i}>
//                     <a
//                       href={l.url}
//                       target="_blank"
//                       className="underline text-[var(--sky-blue)]"
//                     >
//                       {l.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import styles from "./project.module.css";

// export default function ProjectsPage() {
//   const [projects, setProjects] = useState([]);
//   const [active, setActive] = useState("ongoing");
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetch("/api/project")
//       .then((res) => res.json())
//       .then((data) => setProjects(data));
//   }, []);

//   useEffect(() => {
//     document.title = "Projects | Shivam Roy";
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute(
//         "content",
//         "Showcase of projects by Shivam Roy, Full Stack Developer – Web apps, portfolio projects, and more."
//       );
//     }
//   }, []);

//   const filtered = projects.filter((p) => p.status === active);

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <h1 className={styles.header}>Projects</h1>

//         <div className={styles.toggleGroup}>
//           {["ongoing", "completed"].map((t) => (
//             <button
//             key={t}
//             onClick={() => setActive(t)}
//             className={`${styles.toggleButton} ${active === t ? styles.active : ""}`}
//           >
//             {t.toUpperCase()}
//           </button>
          
//           ))}
//         </div>

//         <div className={styles.grid}>
//           {filtered.map((p) => (
//             <div
//               key={p._id}
//               className={styles.projectTile}
//               onClick={() => setSelected(p)}
//             >
//               {p.imageUrl && (
//                 <img
//                   src={p.imageUrl}
//                   alt={p.name}
//                   className={styles.tileImage}
//                 />
//               )}
//               <div className={styles.tileName}>{p.name}</div>
//             </div>
//           ))}
//         </div>

//         {selected && (
//           <ProjectPopup project={selected} onClose={() => setSelected(null)} />
//         )}
//       </div>
//     </div>
//   );
// }

// function ProjectPopup({ project, onClose }) {
//   return (
//     <div className={styles.popupOverlay}>
//       <div className={styles.popupContent}>
//         <div className={styles.popupHeader}>
//           <h2 className={styles.popupText}>{project.name}</h2>
//           <button className={styles.closeButton} onClick={onClose}>Close</button>
//         </div>

//         {project.imageUrl && (
//           <img
//             src={project.imageUrl}
//             alt={project.name}
//             className={styles.popupImage}
//           />
//         )}

//         <div>
//           <p className={styles.popupText}>{project.description}</p>
//           <p className={styles.popupText}><strong>Status:</strong> {project.status}</p>
//           <p className={styles.popupText}><strong>Duration:</strong> {project.duration}</p>

//           {project.toolsUsed?.length > 0 && (
//             <p className={styles.popupText}>
//               <strong>Tools:</strong> {project.toolsUsed.join(", ")}
//             </p>
//           )}

//           {project.otherCollaborators?.length > 0 && (
//             <p className={styles.popupText}>
//               <strong>Collaborators:</strong>{" "}
//               {project.otherCollaborators.join(", ")}
//             </p>
//           )}

//           {project.links?.length > 0 && (
//             <div className={styles.popupLink}>
//               <strong>Links:</strong>
//               <ul className="list-disc list-inside">
//                 {project.links.map((l, i) => (
//                   <li key={i}>
//                     <a href={l.url} target="_blank" rel="noopener noreferrer">
//                       {l.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
