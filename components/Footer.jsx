"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    async function fetchSocials() {
      try {
        const res = await fetch(`/api/social`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSocials(data);
      } catch (err) {
        setSocials([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSocials();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      console.log("PWA installed");
    }
    setDeferredPrompt(null);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left */}
        <div className={styles.left}>
          <p className={styles.textWhite}>
            © {new Date().getFullYear()} Shivam Roy. All rights reserved.
          </p>
        </div>

        {/* Center */}
        <div className={styles.center}>
          <Link href="/login" className={styles.btn}>
            Admin
          </Link>
          {deferredPrompt && (
            <button onClick={handleInstallPWA} className={`${styles.btn} ${styles.installBtn}`}>
              Install App
            </button>
          )}
        </div>

        {/* Right */}
        <div className={styles.right}>
          {loading ? (
            <span className={styles.fallback}>Loading...</span>
          ) : socials.length > 0 ? (
            socials.map((social) => (
              <a
                key={social._id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {social.name}
              </a>
            ))
          ) : (
            <span className={styles.fallback}>No socials</span>
          )}
        </div>
      </div>
    </footer>
  );
}



// // ============================================
// // FILE: components/Footer.jsx
// // ============================================
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Footer() {
//   const [socials, setSocials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deferredPrompt, setDeferredPrompt] = useState(null);

//   useEffect(() => {
//     async function fetchSocials() {
//       try {
//         const res = await fetch(`/api/social`);
//         if (!res.ok) throw new Error("Failed to fetch");
//         const data = await res.json();
//         setSocials(data);
//       } catch (err) {
//         setSocials([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchSocials();
//   }, []);

//   useEffect(() => {
//     const handler = (e) => {
//       e.preventDefault();
//       setDeferredPrompt(e);
//     };
//     window.addEventListener("beforeinstallprompt", handler);
//     return () => window.removeEventListener("beforeinstallprompt", handler);
//   }, []);

//   const handleInstallPWA = async () => {
//     if (!deferredPrompt) return;
//     deferredPrompt.prompt();
//     const choice = await deferredPrompt.userChoice;
//     if (choice.outcome === "accepted") {
//       console.log("PWA installed");
//     }
//     setDeferredPrompt(null);
//   };

//   return (
//     <footer className="w-full bg-[var(--ocean-deep)] border-t-2 border-[var(--twitter-blue)] mt-auto">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          
//           {/* Left - Copyright */}
//           <div className="flex items-center justify-center md:justify-start">
//             <p className="text-sm text-white">
//               © {new Date().getFullYear()} Shivam Roy. All rights reserved.
//             </p>
//           </div>

//           {/* Center - Admin & Install */}
//           <div className="flex items-center justify-center gap-6">
//             <Link 
//               href="/login" 
//               className="text-sm text-white px-4 py-2 border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] hover:-translate-y-0.5 transition-all duration-200"
//             >
//               Admin
//             </Link>
//             {deferredPrompt && (
//               <button
//                 onClick={handleInstallPWA}
//                 className="text-sm text-white px-4 py-2 border border-[var(--cool-sky)] hover:bg-[var(--cool-sky)] hover:-translate-y-0.5 transition-all duration-200"
//               >
//                 Install App
//               </button>
//             )}
//           </div>

//           {/* Right - Social Links */}
//           <div className="flex items-center justify-center md:justify-end gap-4 flex-wrap">
//             {loading ? (
//               <span className="text-sm text-[var(--icy-blue)]">Loading...</span>
//             ) : socials.length > 0 ? (
//               socials.map((social) => (
//                 <a
//                   key={social._id}
//                   href={social.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-white px-3 py-1 border border-[var(--brilliant-azure)] hover:bg-[var(--brilliant-azure)] hover:-translate-y-0.5 transition-all duration-200"
//                 >
//                   {social.name}
//                 </a>
//               ))
//             ) : (
//               <span className="text-sm text-[var(--icy-blue)]">No socials</span>
//             )}
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }
