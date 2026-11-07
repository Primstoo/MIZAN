import type { MetadataRoute } from "next";

// Indique aux moteurs de recherche ce qu'ils peuvent explorer : la page publique, le mode visiteur et la connexion, jamais l'espace élève.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/", "/login", "/decouvrir"], disallow: ["/app", "/api", "/auth"] }],
    sitemap: "https://toumailearn.app/sitemap.xml",
    host: "https://toumailearn.app",
  };
}
