'use client';

import Link from 'next/link';

export default function about() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* About Me Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-3">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I’m Shivam Roy, a web developer with a passion for crafting scalable, accessible, and modern web applications. I specialize in React, Next.js, and Tailwind CSS, and love turning ideas into clean and functional user interfaces. I also enjoy learning new technologies and contributing to open-source projects.
          </p>
        </div>

        {/* Education Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3">Education</h2>
          <ul className="space-y-2">
            <li>
              <h4 className="font-medium">Bachelor of Technology in Computer Science & Engineering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                National Institute of Technology – 2023 - Present
              </p>
            </li>
            <li>
              <h4 className="font-medium">Higher Secondary Education</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lowada High School – 2021 - 2023
              </p>
            </li>
          </ul>
        </div>

        {/* Resume Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3">Resume</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You can view or download my resume to know more about my professional experience and skills.
          </p>
          <Link
            href="/" // Replace with actual resume path or external link
            //target="_blank"
            //rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            View Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
