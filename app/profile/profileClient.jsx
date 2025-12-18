"use client";

import { useState } from "react";
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm border border-(--twitter-blue) px-4 py-2 hover:bg-(--twitter-blue)"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm">
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
            className={`px-4 py-2 border border-(--twitter-blue)
              ${active === tab ? "bg-(--twitter-blue)" : ""}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-(--ocean-deep)] border border-(--twitter-blue) p-6">
        {active === "profile" && <ProfileSection />}
        {active === "education" && <EducationSection />}
        {active === "projects" && <ProjectsSection />}
        {active === "gallery" && <GallerySection />}
        {active === "popup" && <PopupSection />}
        {active === "social" && <SocialSection />}
      </div>
    </div>
  );
}