import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Shivam Roy",
  description: "Portfolio of Shivam Roy",
  other: {
    'google-site-verification': '43OO9ZJqfb7aarEyy6AzP_rSo7OUqQDyF93IMhuWfQA',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <Navbar />

        {/* Main content area grows to push footer down */}
        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
