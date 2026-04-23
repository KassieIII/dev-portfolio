import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kassym Yermakhanbet — Full-Stack Developer",
  description:
    "Full-stack developer building OSINT tools, geolocation systems and AI-integrated platforms.",
  openGraph: {
    title: "Kassym Yermakhanbet — Full-Stack Developer",
    description:
      "Full-stack developer building OSINT tools, geolocation systems and AI-integrated platforms.",
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
