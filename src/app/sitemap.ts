import type { MetadataRoute } from "next";

// Liste des pages publiques à indexer.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://toumailearn.app/", changeFrequency: "weekly", priority: 1 },
    { url: "https://toumailearn.app/login", changeFrequency: "monthly", priority: 0.5 },
  ];
}
