import type { MetadataRoute } from "next";
import { MODULES } from "@/lib/modules";

// Liste des pages publiques à indexer.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://toumailearn.app/", changeFrequency: "weekly", priority: 1 },
    { url: "https://toumailearn.app/decouvrir", changeFrequency: "weekly", priority: 0.8 },
    ...MODULES.map((m) => ({ url: `https://toumailearn.app/decouvrir/${m.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    { url: "https://toumailearn.app/confidentialite", changeFrequency: "monthly", priority: 0.3 },
    { url: "https://toumailearn.app/login", changeFrequency: "monthly", priority: 0.5 },
  ];
}
