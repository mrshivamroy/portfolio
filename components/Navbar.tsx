'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="https://shivamroy.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <div className="bg-blue-600 text-white rounded font-bold h-8 w-8 flex items-center justify-center">
            SR
          </div>
          <span className="text-xl font-semibold">Shivam Roy</span>
        </Link>

        {/* Toggle button for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex md:space-x-6 items-center">
          {navLinks.map(({ name, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block py-1 px-3 rounded-md transition-all duration-200 ${
                  isActive(href)
                    ? 'text-blue-400 border border-blue-400 bg-blue-900 bg-opacity-10'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu below navbar */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2">
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-4 rounded-md transition-all duration-200 ${
                    isActive(href)
                      ? 'text-blue-400 border border-blue-400 bg-blue-900 bg-opacity-10'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
