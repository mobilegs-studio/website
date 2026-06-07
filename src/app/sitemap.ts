import type { MetadataRoute } from "next";

const BASE_URL = "https://www.mobilegrowthstudio.com";
const LOCALES = ["en", "nl", "de"] as const;

const pages = [
  { path: "", changeFrequency: "monthly" as const, priority: 1 },
  { path: "/diensten", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.8 },
  { path: "/over", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/portfolio", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/voorwaarden", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
