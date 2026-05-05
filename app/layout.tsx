import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kassym Yermakhanbet — Full-Stack / AI Product Engineer",
  description:
    "Full-stack engineer building typed products across Next.js, FastAPI, Go, PostgreSQL and AI/RAG systems.",
  openGraph: {
    title: "Kassym Yermakhanbet — Full-Stack / AI Product Engineer",
    description:
      "Full-stack engineer building typed products across Next.js, FastAPI, Go, PostgreSQL and AI/RAG systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
