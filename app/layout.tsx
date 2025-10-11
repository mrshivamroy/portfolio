import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import Mousepointer from "@/components/Mousepointer";
import StarsBackground from "@/components/Starsbackground"

export const metadata: Metadata = {
  title: "Shivam Roy",
  description: "Portfolio of Shivam Roy",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
        <StarsBackground />

        <Mousepointer>
          <Navbar />

          {/* Main content area grows to push footer down */}
          <main className="flex-grow">{children}</main>

          <Footer />
        </Mousepointer>
      </body>
    </html>
  );
}
