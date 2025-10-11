"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  size: number;
  startTop: number;
  startLeft: number;
  direction: "left" | "up";
  duration: number;
  delay: number;
  opacity: number;
  blink: boolean;
  colored: boolean;
}

const STAR_COUNT = 40;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const StarsBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => {
      // For driftLeft stars, spawn on right side (left: 100% to 110%)
      // For driftUp stars, spawn below viewport (top: 100% to 110%)
      const direction = Math.random() > 0.5 ? "left" : "up";
      return {
        id: i,
        size: randomBetween(12, 22),
        startTop: direction === "left" ? randomBetween(0, 100) : 110, // driftLeft: anywhere vertically; driftUp: start below viewport
        startLeft: direction === "left" ? 110 : randomBetween(0, 100), // driftLeft: start right of viewport; driftUp: anywhere horizontally
        direction,
        duration: randomBetween(15, 35),
        delay: randomBetween(0, 30),
        opacity: randomBetween(0.2, 0.5),
        blink: Math.random() > 0.6,
        colored: Math.random() > 0.7,
      };
    });

    setStars(newStars);
  }, []);

  return (
    <>
      <style>{`
        @keyframes driftLeft {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-130vw);
            opacity: 0;
          }
        }

        @keyframes driftUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-130vh);
            opacity: 0;
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .star {
          position: fixed;
          font-weight: 900;
          user-select: none;
          pointer-events: none;
          will-change: transform, opacity;
          z-index: 0;
          text-shadow:
            0 0 6px rgba(255, 255, 255, 0.7),
            0 0 12px rgba(255, 255, 255, 0.4),
            0 0 18px rgba(255, 255, 255, 0.2);
        }

        .blink {
          animation-name: blink;
          animation-duration: 2.5s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .colored {
          color: #87ceeb; /* SkyBlue */
          text-shadow:
            0 0 6px rgba(135, 206, 235, 0.8),
            0 0 12px rgba(0, 191, 255, 0.6),
            0 0 18px rgba(30, 144, 255, 0.4);
        }
      `}</style>

      {stars.map((star) => {
        // Apply initial top/left for fixed positioning
        // Use inline style to set starting point
        // Animate driftLeft or driftUp
        return (
          <div
            key={star.id + Math.random()} // force restart animation
            className={`star ${star.blink ? "blink" : ""} ${star.colored ? "colored" : ""}`}
            style={{
              fontSize: star.size,
              top: `${star.startTop}%`,
              left: `${star.startLeft}%`,
              opacity: star.opacity,
              animationName: star.direction === "left" ? "driftLeft" : "driftUp",
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          >
            *
          </div>
        );
      })}
    </>
  );
};

export default StarsBackground;
