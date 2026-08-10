import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const title = "Kassym Yermakhanbet — Full-Stack & AI Product Engineer";
const description = "Product engineer in Astana building SaaS, internal platforms, AI/RAG systems and production-ready web products end to end.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-portfolio-sigma-sepia.vercel.app"),
  title,
  description,
  applicationName: "Kassym Yermakhanbet Portfolio",
  keywords: ["Full-stack engineer", "AI product engineer", "SaaS developer", "Next.js developer", "FastAPI developer", "RAG engineer", "Astana"],
  authors: [{ name: "Kassym Yermakhanbet", url: "https://github.com/KassieIII" }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Kassym Yermakhanbet — Product Systems",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kassym Yermakhanbet — Full-Stack and AI Product Engineer" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#0a0f0e", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="noise" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
