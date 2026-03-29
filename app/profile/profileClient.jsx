"use client";

import { useState } from "react";
import styles from './../page.module.css';

import ProfileSection from "./sections/ProfileSection";
import EducationSection from "./sections/EducationSection";
import ProjectsSection from "./sections/ProjectsSection";
import GallerySection from "./sections/GallerySection";
import PopupSection from "./sections/PopupSection";
import SocialSection from "./sections/SocialSection";

export default function DashboardClient() {
  const [active, setActive] = useState("profile");

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <div className={styles.page}>
      
      {/* MAIN WRAPPER: Forced to flex-column so the layout 
        stacks top-to-bottom instead of side-by-side. 
      */}
      <div 
        style={{ 
          width: "100%", 
          maxWidth: "1200px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "2rem" 
        }}
      >
        
        {/* TOP HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className={styles.title} style={{ margin: 0, borderBottom: "none" }}>
            Admin Dashboard
          </h1>
          <button
            onClick={logout}
            className={`${styles.button} ${styles.secondary}`}
            style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}
          >
            Logout
          </button>
        </div>

        {/* HORIZONTAL TABS (Pinned to the top) */}
        <div 
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "1rem",
            borderBottom: "2px solid #1c5fa8",
            paddingBottom: "1.5rem"
          }}
        >
          {[
            "profile",
            "education",
            "projects",
            "gallery",
            "popup",
            "social",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`${styles.button} ${active === tab ? styles.primary : styles.secondary}`}
              style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem", letterSpacing: "1px" }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT AREA (Displays the selected section below the tabs) */}
        <div className={styles.card} style={{ minHeight: "60vh" }}>
          {active === "profile" && <ProfileSection />}
          {active === "education" && <EducationSection />}
          {active === "projects" && <ProjectsSection />}
          {active === "gallery" && <GallerySection />}
          {active === "popup" && <PopupSection />}
          {active === "social" && <SocialSection />}
        </div>
        
      </div>
    </div>
  );
}