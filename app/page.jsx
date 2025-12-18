"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [popup, setPopup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("/api/profile").then(res => res.json()).then(setProfile);
    fetch("/api/education").then(res => res.json()).then(setEducation);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("homePopupShown")) return;
    fetch("/api/popup")
      .then(res => res.json())
      .then(data => {
        if (data?.content && data?.isActive) {
          setPopup(data.content);
          setShowPopup(true);
          sessionStorage.setItem("homePopupShown", "true");
        }
      });
  }, []);

  return (
    <div className={styles.page}>

      {/* GRID CONTAINER */}
      <div className={styles.grid}>

        {/* ABOUT ME */}
        <div className={styles.card}>
          {profile?.imageUrl && (
            <div className={styles.imageWrapper}>
              <img src={profile.imageUrl} alt="Profile" />
            </div>
          )}
          <div className={styles.textContent}>
            <h2 className={styles.title}>About Me</h2>
            <p className={styles.subtitle}>
              {profile?.description || "Profile information not added yet."}
            </p>
          </div>
        </div>

        {/* EDUCATION */}
        <div className={styles.card}>
          <h2 className={styles.title}>Education</h2>
          <div className={styles.educationContainer}>
            {education.length ? education.map((edu) => (
              <details key={edu._id} className={styles.eduItem}>
                <summary className={styles.eduSummary}>
                  {edu.type} - {edu.schoolName}
                </summary>
                <div className={styles.eduDetails}>
                  <p><strong>Duration:</strong> {edu.duration}</p>
                  <p><strong>Marks:</strong> {edu.marks}</p>
                </div>
              </details>
            )) : (
              <p className={styles.noEdu}>No education data available.</p>
            )}
          </div>
        </div>

      </div>

      {/* BUTTONS */}
      <div className={styles.buttonGroup}>
        <Link href="/project" className={`${styles.button} ${styles.primary}`}>
          Visit My Projects
        </Link>
        <Link href="/contact" className={`${styles.button} ${styles.secondary}`}>
          Collaborate
        </Link>
      </div>

      {/* POPUP */}
      {showPopup && popup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupCard}>
            <div dangerouslySetInnerHTML={{ __html: popup }} />
            <button className={styles.popupButton} onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function HomePage() {
//   const [profile, setProfile] = useState(null);
//   const [education, setEducation] = useState([]);
//   const [popup, setPopup] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   /* Load profile + education */
//   useEffect(() => {
//     fetch("/api/profile").then(res => res.json()).then(setProfile);
//     fetch("/api/education").then(res => res.json()).then(setEducation);
//   }, []);

//   /* Load popup (once per session) */
//   useEffect(() => {
//     if (sessionStorage.getItem("homePopupShown")) return;

//     fetch("/api/popup")
//       .then(res => res.json())
//       .then(data => {
//         // Only show popup if content exists AND isActive is true
//         if (data?.content && data?.isActive === true) {
//           setPopup(data.content);
//           setShowPopup(true);
//           sessionStorage.setItem("homePopupShown", "true");
//         }
//       });
//   }, []);


//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* PROFILE TILE */}
//         <div className="border border-[var(--twitter-blue)] p-6 space-y-4">
//           {profile?.imageUrl && (
//             <img
//               src={profile.imageUrl}
//               alt="Profile"
//               className="w-40 h-40 object-cover"
//             />
//           )}

//           <p className="text-sm">
//             {profile?.description || "Profile information not added yet."}
//           </p>
//         </div>

//         {/* EDUCATION TILE */}
//         <div className="border border-[var(--twitter-blue)] p-6">
//           <details>
//             <summary className="cursor-pointer text-sm font-semibold mb-4">
//               Education
//             </summary>

//             <div className="space-y-4 mt-4">
//               {education.map((edu) => (
//                 <div key={edu._id} className="text-sm">
//                   <p><strong>{edu.type}</strong></p>
//                   <p>{edu.schoolName}</p>
//                   <p>{edu.duration}</p>
//                   <p>{edu.marks}</p>
//                 </div>
//               ))}

//               {education.length === 0 && (
//                 <p className="text-sm">No education data available.</p>
//               )}
//             </div>
//           </details>
//         </div>

//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="flex gap-4 mt-10">
//         <Link
//           href="/project"
//           className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)]"
//         >
//           Visit My Projects
//         </Link>

//         <Link
//           href="/contact"
//           className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)]"
//         >
//           Collaborate
//         </Link>
//       </div>

//       {/* POPUP */}
//       {showPopup && popup && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
//           <div className="max-w-lg w-full bg-[var(--ocean-deep)] border border-[var(--twitter-blue)] p-6">
//             <div
//               className="text-sm"
//               dangerouslySetInnerHTML={{ __html: popup }}
//             />

//             <button
//               onClick={() => setShowPopup(false)}
//               className="mt-6 px-4 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)]"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


// ============================================
// FILE: app/page.jsx
// ============================================
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function HomePage() {
//   const [profile, setProfile] = useState(null);
//   const [education, setEducation] = useState([]);
//   const [popup, setPopup] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     fetch("/api/profile").then(res => res.json()).then(setProfile);
//     fetch("/api/education").then(res => res.json()).then(setEducation);
//   }, []);

//   useEffect(() => {
//     if (sessionStorage.getItem("homePopupShown")) return;

//     fetch("/api/popup")
//       .then(res => res.json())
//       .then(data => {
//         if (data?.content && data?.isActive === true) {
//           setPopup(data.content);
//           setShowPopup(true);
//           sessionStorage.setItem("homePopupShown", "true");
//         }
//       });
//   }, []);

//   return (
//     <div className="min-h-[calc(100vh-140px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">

//         {/* PROFILE CARD */}
//         <div className="bg-[var(--ocean-deep)] border-2 border-[var(--twitter-blue)] p-6 sm:p-8 space-y-6 hover:border-[var(--dodger-blue)] hover:-translate-y-1 transition-all duration-200">
//           <div className="flex flex-col items-center sm:items-start">
//             {profile?.imageUrl && (
//               <div className="w-40 h-40 sm:w-48 sm:h-48 border-4 border-[var(--twitter-blue)] overflow-hidden mb-6">
//                 <img
//                   src={profile.imageUrl}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}

//             <div className="w-full">
//               <h2 className="text-lg sm:text-xl font-bold text-white mb-4 border-b-2 border-[var(--twitter-blue)] pb-2">
//                 About Me
//               </h2>
//               <p className="text-sm sm:text-base text-white leading-relaxed">
//                 {profile?.description || "Profile information not added yet."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* EDUCATION CARD */}
//         <div className="bg-[var(--ocean-deep)] border-2 border-[var(--twitter-blue)] p-6 sm:p-8 hover:border-[var(--dodger-blue)] hover:-translate-y-1 transition-all duration-200">
//           <details className="group">
//             <summary className="cursor-pointer text-base sm:text-lg font-bold text-white mb-4 pb-2 border-b-2 border-[var(--twitter-blue)] list-none flex items-center justify-between hover:text-[var(--sky-blue)] transition-colors duration-200">
//               <span>Education</span>
//               <svg className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </summary>

//             <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
//               {education.map((edu) => (
//                 <div 
//                   key={edu._id} 
//                   className="text-sm sm:text-base bg-[var(--twitter-blue)] border-l-4 border-[var(--dodger-blue)] p-4 hover:bg-[var(--brilliant-azure)] transition-colors duration-200"
//                 >
//                   <p className="font-bold text-white uppercase mb-2">{edu.type}</p>
//                   <p className="text-white mb-1">{edu.schoolName}</p>
//                   <p className="text-[var(--icy-blue)] text-sm mb-1">{edu.duration}</p>
//                   <p className="text-[var(--alice-blue)] font-semibold">{edu.marks}</p>
//                 </div>
//               ))}

//               {education.length === 0 && (
//                 <p className="text-sm sm:text-base text-[var(--icy-blue)]">
//                   No education data available.
//                 </p>
//               )}
//             </div>
//           </details>
//         </div>

//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center">
//         <Link
//           href="/project"
//           className="text-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold border-2 border-[var(--twitter-blue)] bg-[var(--twitter-blue)] text-white hover:bg-[var(--dodger-blue)] hover:border-[var(--dodger-blue)] hover:-translate-y-1 transition-all duration-200"
//         >
//           Visit My Projects
//         </Link>

//         <Link
//           href="/contact"
//           className="text-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold border-2 border-[var(--cool-sky)] text-white hover:bg-[var(--cool-sky)] hover:-translate-y-1 transition-all duration-200"
//         >
//           Collaborate
//         </Link>
//       </div>

//       {/* POPUP */}
//       {showPopup && popup && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4 z-50">
//           <div className="max-w-2xl w-full bg-[var(--ocean-deep)] border-4 border-[var(--twitter-blue)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
//             <div
//               className="text-sm sm:text-base prose prose-invert max-w-none"
//               dangerouslySetInnerHTML={{ __html: popup }}
//             />

//             <button
//               onClick={() => setShowPopup(false)}
//               className="mt-6 w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold border-2 border-[var(--twitter-blue)] text-white hover:bg-[var(--twitter-blue)] hover:-translate-y-0.5 transition-all duration-200"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import styles from "./page.module.css";

// export default function HomePage() {
//   const [profile, setProfile] = useState(null);
//   const [education, setEducation] = useState([]);
//   const [popup, setPopup] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     fetch("/api/profile").then(res => res.json()).then(setProfile);
//     fetch("/api/education").then(res => res.json()).then(setEducation);
//   }, []);

//   useEffect(() => {
//     if (sessionStorage.getItem("homePopupShown")) return;
//     fetch("/api/popup").then(res => res.json()).then(data => {
//       if (data?.content && data?.isActive) {
//         setPopup(data.content);
//         setShowPopup(true);
//         sessionStorage.setItem("homePopupShown", "true");
//       }
//     });
//   }, []);

//   return (
//     <div className={styles.page}>

//       {/* MAIN GRID */}
//       <div className={styles.grid}>

//         {/* PROFILE CARD */}
//         <div className={styles.card}>
//           {profile?.imageUrl && (
//             <div className={styles.profileImage}>
//               <img src={profile.imageUrl} alt="Profile" />
//             </div>
//           )}
//           <div className={styles.textContent}>
//             <h2 className={styles.title}>About Me</h2>
//             <p className={styles.subtitle}>
//               {profile?.description || "Profile information not added yet."}
//             </p>
//           </div>
//         </div>

//         {/* EDUCATION CARD */}
//         <div className={styles.card}>
//           <details>
//             <summary className={styles.educationSummary}>
//               Education
//               <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </summary>

//             <div className={styles.educationDetails}>
//               {education.length ? education.map((edu) => (
//                 <div key={edu._id} className={styles.eduCard}>
//                   <p className={styles.eduType}>{edu.type}</p>
//                   <p className={styles.eduName}>{edu.schoolName}</p>
//                   <p className={styles.eduDuration}>{edu.duration}</p>
//                   <p className={styles.eduMarks}>{edu.marks}</p>
//                 </div>
//               )) : (
//                 <p className={styles.noEdu}>No education data available.</p>
//               )}
//             </div>
//           </details>
//         </div>

//       </div>

//       {/* BUTTONS */}
//       <div className={styles.buttonGroup}>
//         <Link href="/project" className={`${styles.button} ${styles.primary}`}>
//           Visit My Projects
//         </Link>
//         <Link href="/contact" className={`${styles.button} ${styles.secondary}`}>
//           Collaborate
//         </Link>
//       </div>

//       {/* POPUP */}
//       {showPopup && popup && (
//         <div className={styles.popupOverlay}>
//           <div className={styles.popupCard}>
//             <div className={styles.popupContent} dangerouslySetInnerHTML={{ __html: popup }} />
//             <button className={`${styles.button} ${styles.primary}`} onClick={() => setShowPopup(false)}>Close</button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
