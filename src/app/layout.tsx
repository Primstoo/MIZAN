import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://toumailearn.app"),
  alternates: { canonical: "/" },
  keywords: ["ToumaiLearn", "Toumai Learn", "révision", "université", "fac", "cours", "examens", "étudiants Maroc", "tuteur IA"],
  title: { default: "ToumaiLearn · Révise le cours de ton prof", template: "%s · ToumaiLearn" },
  description: "Plateforme de révision pour les étudiants des universités du Maroc : le cours de ton prof expliqué, des exercices corrigés, un tuteur IA et ta progression mesurée.",
  applicationName: "ToumaiLearn",
  openGraph: { title: "ToumaiLearn", siteName: "ToumaiLearn", url: "https://toumailearn.app", description: "Révise le cours de ton prof, pas un cours générique.", locale: "fr_MA", type: "website" },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F4EDE1" }, { media: "(prefers-color-scheme: dark)", color: "#141922" }], width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Thème choisi dans Paramètres (clair / sombre / auto), appliqué avant l'affichage */}
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('tl-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
