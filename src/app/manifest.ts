import type { MetadataRoute } from "next";

// Permet d'« installer » ToumaiLearn sur l'écran d'accueil du téléphone, comme une appli.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ToumaiLearn",
    short_name: "ToumaiLearn",
    description: "Révise le cours de ton prof : leçons expliquées, exercices corrigés, tuteur IA.",
    start_url: "/app",
    display: "standalone",
    background_color: "#eef1f4",
    theme_color: "#0e6e6a",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
