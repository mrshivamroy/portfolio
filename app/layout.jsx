// ============================================
// FILE: app/layout.jsx
// ============================================
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Shivam Roy - Full Stack Developer",
  description: "Professional portfolio of Shivam Roy - Full Stack Developer specializing in MERN Stack, React, Node.js, and modern web technologies.",
  keywords: "Shivam Roy, Full Stack Developer, MERN Stack, React, Node.js, Portfolio, Web Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2196f3" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/icon-192.svg" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
