import type { MetadataRoute } from "next";

// Permet d'« installer » ToumaiLearn sur l'écran d'accueil du téléphone, comme une appli.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ToumaiLearn",
    short_name: "ToumaiLearn",
    description: "Révise le cours de ton prof : leçons expliquées, exercices corrigés, tuteur IA.",
    start_url: "/app",
    display: "standalone",
    background_color: "#F4EDE1",
    theme_color: "#B4532A",
    lang: "fr",
    id: "/app",
    scope: "/",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
