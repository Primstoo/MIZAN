import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { MODULES } from "@/lib/modules";

// Module en mode visiteur : même fichier que pour les membres, sans le pont (ni tuteur, ni synchronisation).
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  // Page du module ou l'une de ses annexes (outils intégrés dans les chapitres).
  const m = MODULES.find((x) => x.fichier === params.file || (x.annexes ?? []).includes(params.file));
  if (!m) return new NextResponse("Module introuvable", { status: 404 });
  const html = await readFile(path.join(process.cwd(), "content", "modules", params.file), "utf8");
  if (params.file !== m.fichier) return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", "X-Frame-Options": "SAMEORIGIN" } });
  const tete = `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<style>@media (max-width:700px){input,textarea,select{font-size:16px!important}}
#mz-tuteur-visiteur{position:fixed;right:16px;bottom:16px;z-index:9999;border:0;border-radius:999px;padding:12px 18px;font:600 15px system-ui,sans-serif;background:#B4532A;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer}</style>
<script>document.addEventListener("DOMContentLoaded",function(){var b=document.createElement("button");b.id="mz-tuteur-visiteur";b.type="button";b.textContent="Poser une question au tuteur";
b.onclick=function(){parent.postMessage({type:"mz-inscription",raison:"tuteur"},location.origin);};document.body.appendChild(b);});</script>`;
  const out = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (h) => `${h}\n${tete}`) : tete + html;
  return new NextResponse(out, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", "X-Frame-Options": "SAMEORIGIN" } });
}
