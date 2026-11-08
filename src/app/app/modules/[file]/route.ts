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
  // Un module peut avoir des fichiers annexes (ex. anciens outils interactifs conservés) : même contrôle d'accès.
  const m = MODULES.find((x) => x.fichier === params.file || x.annexes?.includes(params.file));
  if (!m) return new NextResponse("Module introuvable", { status: 404 });

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Connexion requise", { status: 401 });
  if (!(await estMembre(user))) return new NextResponse("Invitation requise", { status: 403 });

  const html = await readFile(path.join(process.cwd(), "content", "modules", params.file), "utf8");
  // Pont + correctifs mobile communs à tous les modules :
  // - police 16 px dans les champs : sinon iOS zoome dès qu'on touche la zone de texte ;
  // - tuteur en plein écran sur téléphone, bouton Envoyer ramené à l'écran quand le clavier s'ouvre.
  const bridge = `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script src="/mizan-bridge.js"></script>
<style>@media (max-width:700px){input,textarea,select{font-size:16px!important}
.mzt-pan{inset:0!important;width:100%!important;height:100%!important;max-height:none!important;border-radius:0!important}
.mzt-f textarea{min-height:44px!important}}</style>
<script>document.addEventListener("focusin",function(e){var t=e.target;if(!t||!/^(TEXTAREA|INPUT)$/.test(t.tagName)||innerWidth>700)return;
setTimeout(function(){var f=t.closest("form");(f||t).scrollIntoView({block:"end",behavior:"smooth"});},350);});</script>`;
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
