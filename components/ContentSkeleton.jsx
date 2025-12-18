"use client";

export default function ContentSkeleton({ title, styles, count = 8 }) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>

        {/* Toggle / filter skeleton */}
        {styles.toggleContainer && (
          <div className={styles.toggleContainer}>
            <div className={styles.toggleSkeleton} />
          </div>
        )}

        {/* Grid skeleton */}
        <div className={styles.grid}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={styles.skeletonTile} />
          ))}
        </div>
      </div>
    </div>
  );
}
