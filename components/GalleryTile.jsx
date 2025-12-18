import styles from "./galleryTile.module.css";

export default function GalleryTile({ item, onClick }) {
  return (
    <div className={styles.tile} onClick={() => onClick(item)}>
      <div className={styles.mediaWrapper}>
        {item.type === "image" ? (
          <img src={item.url} alt="Gallery" className={styles.media} />
        ) : (
          <div className={styles.mediaWrapper}>
            <video src={item.url} muted className={styles.media} />
            <div className={styles.videoOverlay}>
              <svg
                className={styles.playIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className={styles.caption}>{item.caption || item.type.toUpperCase()}</div>
    </div>
  );
}



// ============================================
// FILE: components/GalleryTile.jsx
// ============================================
// export default function GalleryTile({ item, onClick }) {
//   return (
//     <div
//       onClick={() => onClick(item)}
//       className="cursor-pointer bg-[var(--ocean-deep)] border-2 border-[var(--twitter-blue)] p-0 hover:bg-[var(--twitter-blue)] hover:border-[var(--dodger-blue)] hover:-translate-y-1 transition-all duration-200"
//     >
//       {item.type === "image" ? (
//         <img
//           src={item.url}
//           alt="Gallery"
//           className="w-full h-48 sm:h-56 md:h-64 object-cover"
//         />
//       ) : (
//         <div className="relative w-full h-48 sm:h-56 md:h-64 bg-black flex items-center justify-center">
//           <video
//             src={item.url}
//             className="w-full h-full object-cover"
//             muted
//           />
//           <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//             <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
//             </svg>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


