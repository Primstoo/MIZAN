import { NextResponse } from "next/server";
import { admin } from "@/lib/acces";
import { score, type Etab } from "@/lib/fac-commun";
import { lireInfo } from "@/lib/infos";
import { memeSecret } from "@/lib/telegram";

// Point d'entrée de Miroir Darija : le bot envoie ici chaque annonce utile, déjà traduite.
// Protégé par INFOS_SECRET (en-tête Authorization: Bearer …). Le bot n'a donc pas besoin de la clé service de la base.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!process.env.INFOS_SECRET || !memeSecret(req.headers.get("authorization"), `Bearer ${process.env.INFOS_SECRET}`)) return new NextResponse("refusé", { status: 401 });
  const corps = await req.json().catch(() => null);
  const lot: unknown[] = Array.isArray(corps) ? corps.slice(0, 50) : [corps];
  const db = admin();
  const { data: etabs } = await db.from("etablissements").select("id, nom, ville, alias, valide");
  const resultats: { ok: boolean; etat: string }[] = [];
  for (const brut of lot) {
    const info = lireInfo(brut);
    if ("erreur" in info) { resultats.push({ ok: false, etat: info.erreur }); continue; }
    const etab = ((etabs ?? []) as Etab[]).find((e) => e.id === info.etablissement || score(info.etablissement, e) >= 95);
    if (!etab) { resultats.push({ ok: false, etat: "établissement inconnu : " + info.etablissement }); continue; }
    const { error } = await db.from("fac_infos").insert({
      etablissement_id: etab.id, semestre: info.semestre, type: info.type, texte_fr: info.texte_fr, texte_original: info.texte_original,
      date_evenement: info.date_evenement, source: info.source, empreinte: info.empreinte,
    });
    resultats.push(error ? { ok: error.code === "23505", etat: error.code === "23505" ? "déjà reçue" : "erreur " + error.code } : { ok: true, etat: "reçue, en attente de validation" });
  }
  return NextResponse.json({ resultats }, { status: resultats.every((r) => r.ok) ? 200 : 207 });
}
