import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { MODULES } from "@/lib/modules";

// Module en mode visiteur : même fichier que pour les membres, sans le pont (ni tuteur, ni synchronisation).
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const m = MODULES.find((x) => x.fichier === params.file);
  if (!m) return new NextResponse("Module introuvable", { status: 404 });
  const html = await readFile(path.join(process.cwd(), "content", "modules", m.fichier), "utf8");
  const tete = `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<style>@media (max-width:700px){input,textarea,select{font-size:16px!important}}</style>`;
  const out = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (h) => `${h}\n${tete}`) : tete + html;
  return new NextResponse(out, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", "X-Frame-Options": "SAMEORIGIN" } });
}
