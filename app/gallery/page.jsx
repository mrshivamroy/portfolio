"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import styles from "./gallery.module.css";

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("image");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    document.title = "Gallery | Shivam Roy";
  }, []);

  const filtered = items.filter(i => i.type === active);

  // Masonry responsive breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Gallery</h1>

        <div className={styles.toggleContainer}>
          {["image", "video"].map(t => (
            <button
              key={t}
              className={`${styles.toggleButton} ${active === t ? styles.toggleButtonActive : ""}`}
              onClick={() => setActive(t)}
            >
              {t.toUpperCase()}S
            </button>
          ))}
        </div>

        {active === "image" ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryGridColumn}
          >
            {filtered.map(item => (
              <div key={item._id} className={styles.masonryItem} onClick={() => setSelected(item)}>
                <Image
                  src={item.url}
                  alt="Gallery image"
                  width={300}            // approximate width, Next.js needs it
                  height={300}           // approximate height, maintain aspect ratio
                  style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                  unoptimized={true}     // optional: prevents Next.js optimization if external
                />
              </div>
            ))}
          </Masonry>
        ) : (
          <div className={styles.grid}>
            {filtered.map(item => (
              <div key={item._id} onClick={() => setSelected(item)}>
                <video src={item.url} controls className={styles.popupVideo} />
              </div>
            ))}
          </div>
        )}

        {selected && (
          <GalleryPopup item={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}

function GalleryPopup({ item, onClose }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupCard}>
        <div className={styles.popupHeader}>
          <span>{item.type === "image" ? "Image" : "Video"}</span>
          <button className={styles.popupCloseButton} onClick={onClose}>Close</button>
        </div>

        {item.type === "image" ? (
          <Image
            src={item.url}
            alt="Gallery item"
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
            unoptimized={true}
          />
        ) : (
          <video src={item.url} controls className={styles.popupVideo} />
        )}
      </div>
    </div>
  );
}





// "use client";

// import { useEffect, useState } from "react";

// export default function GalleryPage() {
//   const [items, setItems] = useState([]);
//   const [active, setActive] = useState("image"); // image | video
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetch("/api/gallery")
//       .then((res) => res.json())
//       .then((data) => setItems(data));
//   }, []);

//   useEffect(() => {
//     document.title = "Gallery | Shivam Roy";
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute(
//         "content",
//         "Gallery of work, screenshots, and designs by Shivam Roy – Full Stack Developer."
//       );
//     }
//   }, []);


//   const filtered = items.filter((i) => i.type === active);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       {/* HEADER */}
//       <h1 className="text-lg font-semibold mb-6">Gallery</h1>

//       {/* TOGGLE */}
//       <div className="flex gap-4 mb-8">
//         {["image", "video"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setActive(t)}
//             className={`px-4 py-2 text-sm border border-[var(--twitter-blue)]
//               ${active === t ? "bg-[var(--twitter-blue)]" : ""}`}
//           >
//             {t.toUpperCase()}S
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filtered.map((item) => (
//           <div
//             key={item._id}
//             onClick={() => setSelected(item)}
//             className="border border-[var(--twitter-blue)] cursor-pointer hover:bg-[var(--ocean-deep)]"
//           >
//             {item.type === "image" ? (
//               <img
//                 src={item.url}
//                 alt="Gallery"
//                 className="w-full h-40 object-cover"
//               />
//             ) : (
//               <div className="h-40 flex items-center justify-center text-sm">
//                 ▶ Video
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* POPUP */}
//       {selected && (
//         <GalleryPopup item={selected} onClose={() => setSelected(null)} />
//       )}
//     </div>
//   );
// }

// function GalleryPopup({ item, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
//       <div className="max-w-3xl w-full bg-[var(--ocean-deep)] border border-[var(--twitter-blue)] p-6">

//         <div className="flex justify-between mb-4">
//           <p className="text-sm font-semibold">
//             {item.type === "image" ? "Image" : "Video"}
//           </p>
//           <button
//             onClick={onClose}
//             className="text-sm border border-[var(--twitter-blue)] px-3 py-1 hover:bg-[var(--twitter-blue)]"
//           >
//             Close
//           </button>
//         </div>

//         {item.type === "image" ? (
//           <img
//             src={item.url}
//             alt="Gallery item"
//             className="w-full max-h-[70vh] object-contain"
//           />
//         ) : (
//           <video
//             src={item.url}
//             controls
//             className="w-full max-h-[70vh]"
//           />
//         )}

//       </div>
//     </div>
//   );
// }



