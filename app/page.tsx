'use client';

import Link from 'next/link';
import SkillCard from "@/components/SkillCard";

export default function Page() {
  const skills = [
    { name: "JavaScript", level: "Intermediate", color: "#f7df1e" }, // yellow
    { name: "React & Node.js", level: "Intermediate", color: "#61dafb" }, // cyan
    { name: "Git & GitHub", level: "Proficient", color: "#f05032" }, // orange-red
    { name: "Tailwind CSS", level: "Basic", color: "#38bdf8" }, // sky blue
    { name: "TypeScript", level: "Basic", color: "#3178c6" }, // blue
    { name: "Next.js", level: "Basic", color: "#000000" }, // black or you can pick a color you like
  ];  

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* About Me Card */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-3">Hi, I am Shivam Roy 👋</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I am a passionate web developer with a strong interest in building elegant, performant, and accessible web applications. I enjoy working with modern technologies like React, Next.js, and Tailwind CSS to craft intuitive user experiences.
          </p>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Skills Section */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Skill Set</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skill.color}
              />
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <blockquote className="text-center italic text-gray-600 dark:text-gray-400 text-lg mt-12 border-l-4 border-blue-600 pl-4">
          “Programs must be written for people to read, and only incidentally for machines to execute.”<br />
          — Harold Abelson
        </blockquote>
      </div>
    </div>
  );
}
