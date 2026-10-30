import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { MODULES } from "@/lib/modules";
import { createClient } from "@/lib/supabase/server";
import { estMembre } from "@/lib/acces";

// Sert un module depuis content/modules (dossier non public).
// Sous /app, donc déjà protégé par le middleware ; on revérifie la session ici
// par sécurité, puis on injecte le pont (mizan-bridge.js) en tête de page.
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const m = MODULES.find((x) => x.fichier === params.file);
  if (!m) return new NextResponse("Module introuvable", { status: 404 });

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Connexion requise", { status: 401 });
  if (!(await estMembre(user))) return new NextResponse("Invitation requise", { status: 403 });

  const html = await readFile(path.join(process.cwd(), "content", "modules", m.fichier), "utf8");
  const bridge = '<script src="/mizan-bridge.js"></script>';
  const out = /<head[^>]*>/i.test(html)
    ? html.replace(/<head[^>]*>/i, (h) => `${h}\n${bridge}`)
    : bridge + html;

  return new NextResponse(out, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
