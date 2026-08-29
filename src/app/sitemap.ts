import type { MetadataRoute } from "next";
import { localeCodes, localePath } from "@/lib/locales";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "about", "gallery", "videos", "contact", "privacy", "terms", "cookies"];
  const localizedPages = localeCodes.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}${localePath(locale, page ? [page] : undefined)}`,
      lastModified: now,
      changeFrequency: page === "contact" ? ("monthly" as const) : ("yearly" as const),
      priority: page === "" ? 0.95 : page === "contact" ? 0.85 : 0.6,
    })),
  );

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/home`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.75 },
    { url: `${siteUrl}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/videos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...localizedPages,
  ];
}
