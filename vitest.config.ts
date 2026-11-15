import { defineConfig } from "vitest/config";
import path from "node:path";

// Tests automatiques : npm test. Uniquement de la logique pure et des contrôles de contenu (aucun accès réseau).
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
