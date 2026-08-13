import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Kassym Yermakhanbet — Full-Stack & AI Software Engineer";
const description = "An interactive desktop portfolio for a full-stack and AI software engineer building SaaS, self-hosted CMS/CRM platforms, cloud infrastructure and measurable AI systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-portfolio-sigma-sepia.vercel.app"),
  title,
  description,
  applicationName: "KY/OS Portfolio",
  keywords: ["Full-stack software engineer", "AI engineer", "SaaS developer", "Next.js developer", "FastAPI developer", "RAG engineer", "CMS CRM developer", "Astana"],
  authors: [{ name: "Kassym Yermakhanbet", url: "https://github.com/KassieIII" }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "KY/OS — Kassym Yermakhanbet",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "KY/OS interactive portfolio desktop" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#8fb7df", colorScheme: "dark light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
