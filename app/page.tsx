'use client';

import Link from 'next/link';

export default function Page() {
  const skills = [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'TypeScript', level: 'Intermediate' },
    { name: 'React & Next.js', level: 'Intermediate' },
    { name: 'Tailwind CSS', level: 'Intermediate' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Git & GitHub', level: 'Proficient' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* About Me Card */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-3">Hi, I'm Shivam Roy 👋</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm a passionate web developer with a strong interest in building elegant, performant, and accessible web applications. I enjoy working with modern technologies like React, Next.js, and Tailwind CSS to craft intuitive user experiences.
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
              <div
                key={skill.name}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transform transition duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <h4 className="text-lg font-semibold">{skill.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{skill.level}</p>
              </div>
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
