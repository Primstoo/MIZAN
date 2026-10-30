/** @type {import('next').NextConfig} */
const nextConfig = {
  // Les modules (content/modules) sont lus avec fs par /app/modules/[file] :
  // on demande à Vercel de les embarquer dans la fonction serveur.
  experimental: {
    outputFileTracingIncludes: { "/app/modules/[file]": ["./content/modules/**/*"] },
  },
};

export default nextConfig;
