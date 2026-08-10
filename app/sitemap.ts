import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dev-portfolio-sigma-sepia.vercel.app";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: .9 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: .7 },
  ];
}
