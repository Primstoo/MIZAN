import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "MIZAN · Révise le cours de ton prof", template: "%s · MIZAN" },
  description: "Plateforme de révision pour les étudiants de la FSABM : le cours de ton prof expliqué, des exercices corrigés, un tuteur IA et ta progression mesurée.",
  applicationName: "MIZAN",
  openGraph: { title: "MIZAN", description: "Révise le cours de ton prof, pas un cours générique.", locale: "fr_MA", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0e6e6a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
