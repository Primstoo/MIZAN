"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { anonymiser, LIBELLE_INFO, TYPES_INFO, type TypeInfo } from "@/lib/infos";
import { estSemestre } from "@/lib/fac-commun";
import { offresActives, offreDe, RANG } from "@/lib/offres";
import { botActif, envoyer } from "@/lib/telegram";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Valider (après relecture, texte modifiable), rejeter, ou saisir une annonce à la main.
export async function traiterInfo(form: FormData): Promise<void> {
  const { data: { user } } = await createClient().auth.getUser();
  if (!estAdmin(user)) throw new Error("Réservé à l'admin");
  const db = admin();
  const id = String(form.get("id") || "");
  const action = String(form.get("action"));
  const fr = anonymiser(String(form.get("texte_fr") || "").trim().slice(0, 2000));
  const type = (TYPES_INFO as readonly string[]).includes(String(form.get("type"))) ? (String(form.get("type")) as TypeInfo) : "annonce";
  const sem = String(form.get("semestre") || "");
  const date = String(form.get("date_evenement") || "");
  const champs = { type, semestre: estSemestre(sem) ? sem : null, date_evenement: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null };

  if (action === "rejeter") await db.from("fac_infos").update({ statut: "rejetee" }).eq("id", id);
  else if (action === "publier" && fr.length >= 3) {
    const { data: info } = await db.from("fac_infos").update({ ...champs, texte_fr: fr, statut: "publiee", publiee_le: new Date().toISOString() })
      .eq("id", id).neq("statut", "publiee").select("etablissement_id, semestre").maybeSingle();
    if (info && botActif()) await prevenir(info.etablissement_id, info.semestre, type, fr, champs.date_evenement);
  }
  revalidatePath("/app/admin/infos"); revalidatePath("/app/infos");
}

// Envoi sur Telegram aux élèves de l'établissement qui ont relié leur compte (et dont l'offre inclut les infos).
async function prevenir(etabId: string, semestre: string | null, type: TypeInfo, fr: string, date: string | null) {
  const db = admin();
  const { data: profils } = await db.from("profiles").select("user_id, semestre").eq("etablissement_id", etabId);
  const cibles = (profils ?? []).filter((p) => !semestre || !p.semestre || p.semestre === semestre).map((p) => p.user_id as string);
  if (!cibles.length) return;
  const { data: liens } = await db.from("telegram_links").select("user_id, chat_id").eq("actif", true).not("chat_id", "is", null).in("user_id", cibles);
  const site = process.env.SITE_URL || "https://toumailearn.app";
  for (const l of liens ?? []) {
    try {
      const complet = !offresActives() || RANG[(await offreDe(l.user_id)).plan] >= 2;
      const corps = complet ? esc(fr) : "Une nouvelle info vient de tomber dans un groupe de ta fac. Le texte complet est inclus dans les offres Essentiel et Premium.";
      await envoyer(l.chat_id, `📢 <b>${LIBELLE_INFO[type]}${date ? " · " + date.split("-").reverse().join("/") : ""}</b>\n${corps}`, { t: complet ? "Toutes les infos" : "Voir les offres", url: `${site}/app/${complet ? "infos" : "offres"}` });
    } catch (e) { console.error("[infos] telegram", l.user_id, String(e)); }
  }
}
