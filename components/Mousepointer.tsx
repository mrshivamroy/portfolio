"use client";

import React, { useEffect, useState, ReactNode, useRef } from "react";

interface MousepointerProps {
  children: ReactNode;
}

const Mousepointer: React.FC<MousepointerProps> = ({ children }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [colorProgress, setColorProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const currentPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const animate = () => {
    const speed = 0.35;
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * speed;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * speed;

    setPosition({ x: currentPos.current.x, y: currentPos.current.y });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    let frameId: number;
    let startTime = performance.now();

    const animateColor = (time: number) => {
      const elapsed = time - startTime;
      const cycleDuration = 3000;
      const t = (Math.sin((elapsed / cycleDuration) * 2 * Math.PI) + 1) / 2;
      setColorProgress(t);
      frameId = requestAnimationFrame(animateColor);
    };

    frameId = requestAnimationFrame(animateColor);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const interpolateColor = (progress: number) => {
    // blue: rgb(102,204,255), white: rgb(255,255,255)
    const r = Math.round(102 + (255 - 102) * progress);
    const g = Math.round(204 + (255 - 204) * progress);
    const b = 255;
    return `rgb(${r},${g},${b})`;
  };

  const mainColor = interpolateColor(colorProgress);

  return (
    <>
      <style>{`body, * { cursor: none !important; }`}</style>

      {/* Glow pulse behind */}
      <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: mainColor,
          filter: "blur(8px)",
          opacity: 0.4,
          zIndex: 9997,
          transition: "background-color 0.3s ease",
        }}
      />

      {/* Main dot */}
      <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: mainColor,
          boxShadow: `0 0 8px ${mainColor}`,
          zIndex: 9999,
          transition: "background-color 0.3s ease",
        }}
      />

      {children}
    </>
  );
};

export default Mousepointer;
