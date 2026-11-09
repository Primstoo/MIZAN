/** @type {import('next').NextConfig} */
const nextConfig = {
  // Les modules (content/modules) sont lus avec fs par /app/modules/[file] :
  // on demande à Vercel de les embarquer dans la fonction serveur.
  // En-têtes de sécurité sur toutes les pages : pas d'intégration par un site tiers (clickjacking),
  // pas d'interprétation hasardeuse des fichiers, adresse d'origine limitée quand on clique un lien externe.
  async headers() {
    return [{
      source: "/sw.js",
      headers: [
        { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        { key: "Content-Type", value: "application/javascript; charset=utf-8" },
      ],
    }, {
      source: "/:path*",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      ],
    }];
  },
  experimental: {
    outputFileTracingIncludes: { "/app/modules/[file]": ["./content/modules/**/*"] },
  },
};

export default nextConfig;
