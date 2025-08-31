'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col items-center text-center md:flex-row md:justify-between md:items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://shivamroy.vercel.app"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shivam Roy
          </a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap justify-center items-center text-sm font-medium text-gray-500 dark:text-gray-400 gap-4">
          <li>
            <a
              href="https://github.com/mrshivamroy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/-shivamroy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
