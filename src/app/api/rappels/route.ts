import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { admin } from "@/lib/acces";
import { memeSecret } from "@/lib/telegram";
import { chargerParcours, jourMaroc, joursEntre } from "@/lib/parcours";
import { pousser, pushActif } from "@/lib/push";
import { choisirRappel, type Envoi, type TypeRappel } from "@/lib/rappels";

// Rappels du soir en notification, déclenchés chaque jour par Vercel Cron (vercel.json). Protégé par CRON_SECRET.
// ?essai=1 : calcule sans rien envoyer (pour vérifier depuis l'admin).
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  if (!process.env.CRON_SECRET || !memeSecret(req.headers.get("authorization"), `Bearer ${process.env.CRON_SECRET}`)) return new NextResponse("refusé", { status: 401 });
  const essai = new URL(req.url).searchParams.get("essai") === "1";
  if (!pushActif()) return NextResponse.json({ envoyes: 0, raison: "notifications non configurées" });
  const db = admin();

  // Seuls les appareils abonnés peuvent recevoir quelque chose.
  const { data: abos } = await db.from("push_subscriptions").select("user_id");
  const ids = Array.from(new Set((abos ?? []).map((a) => a.user_id as string)));
  const auj = jourMaroc();
  const numeroJour = Math.floor(Date.parse(auj + "T12:00:00Z") / 864e5);
  const jourSemaine = new Date(auj + "T12:00:00Z").getUTCDay();
  const depuis = new Date(Date.now() - 30 * 864e5).toISOString();
  const resultats: { user: string; rappel: string | null; ok?: boolean }[] = [];

  for (const id of ids) {
    try {
      const { data: { user } } = await db.auth.admin.getUserById(id);
      if (!user) continue;
      const [p, { data: hist }, { data: derniere }] = await Promise.all([
        chargerParcours({ id } as User),
        db.from("rappels_envoyes").select("type, cle, sent_at").eq("user_id", id).eq("envoye", true).gte("sent_at", depuis),
        db.from("activity").select("day").eq("user_id", id).order("day", { ascending: false }).limit(1),
      ]);
      const historique: Envoi[] = (hist ?? []).map((e) => ({ type: e.type as TypeRappel, cle: e.cle as string, ilYa: joursEntre(jourMaroc(new Date(e.sent_at as string)), auj) }));
      const ex = p.examens[0];
      const rappel = choisirRappel({
        aProfil: !!p.profil,
        inscritDepuis: joursEntre(jourMaroc(new Date(user.created_at)), auj),
        sansReviser: derniere?.[0] ? joursEntre(derniere[0].day as string, auj) : null,
        examen: ex?.module ? { slug: ex.module_slug, titre: ex.module.titre, reste: ex.reste } : undefined,
        historique, jourSemaine, numeroJour,
      });
      if (!rappel) { resultats.push({ user: id, rappel: null }); continue; }
      if (essai) { resultats.push({ user: id, rappel: rappel.body }); continue; }
      const n = await pousser(id, { title: rappel.title, body: rappel.body, url: rappel.url, tag: rappel.type });
      await db.from("rappels_envoyes").insert({ user_id: id, type: rappel.type, cle: rappel.cle, titre: rappel.title, corps: rappel.body, envoye: n > 0 });
      resultats.push({ user: id, rappel: rappel.body, ok: n > 0 });
    } catch (e) { console.error("[rappels]", id, String(e)); }
  }
  console.log(`[rappels] ${resultats.filter((r) => r.ok).length}/${ids.length} envoyés`);
  return NextResponse.json({ essai, abonnes: ids.length, resultats: essai ? resultats : resultats.map((r) => ({ rappel: r.rappel, ok: r.ok })) });
}
