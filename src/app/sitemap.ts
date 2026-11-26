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
  { path: "/gesprek", changeFrequency: "yearly" as const, priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/voorwaarden", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly" as const, priority: 0.3 },
];

// The Setgrid product site lives under /setgrid and has its own languages.
const SETGRID_LANGS = ["en", "nl", "de", "fr", "es", "pt"] as const;
const setgridPages = [
  { path: "", priority: 0.9 },
  { path: "/support", priority: 0.6 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of SETGRID_LANGS) {
    for (const page of setgridPages) {
      entries.push({
        url: `${BASE_URL}/setgrid/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page.priority,
      });
    }
  }

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
