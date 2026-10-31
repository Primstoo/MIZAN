import { createHash, timingSafeEqual } from "node:crypto";
import type { User } from "@supabase/supabase-js";
import { admin } from "@/lib/acces";
import { MODULES } from "@/lib/modules";
import { chargerMaitrise, chargerParcours, missionPerso } from "@/lib/parcours";

// Bot Telegram : rappel du matin (mission du jour), liens des lives. Clé dans TELEGRAM_BOT_TOKEN.
export const botActif = () => !!process.env.TELEGRAM_BOT_TOKEN;
// Telegram n'accepte que lettres, chiffres, « _ » et « - » dans le secret : on en dérive une version sûre
// (empreinte SHA-256), quel que soit le texte saisi dans TELEGRAM_WEBHOOK_SECRET.
export const secretWebhook = () => createHash("sha256").update(process.env.TELEGRAM_WEBHOOK_SECRET || "").digest("hex");
// Comparaison à temps constant (évite de deviner un secret caractère par caractère).
export const memeSecret = (recu: string | null, attendu: string) => {
  if (!recu || !attendu) return false;
  const a = Buffer.from(recu), b = Buffer.from(attendu);
  return a.length === b.length && timingSafeEqual(a, b);
};
export const nomBot = () => process.env.TELEGRAM_BOT_USERNAME || "";
const site = () => process.env.SITE_URL || "https://mizan-five-iota.vercel.app";

export async function envoyer(chatId: number | string, texte: string, bouton?: { t: string; url: string }) {
  const r = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId, text: texte, parse_mode: "HTML", disable_web_page_preview: true,
      ...(bouton ? { reply_markup: { inline_keyboard: [[{ text: bouton.t, url: bouton.url }]] } } : {}),
    }),
  });
  // 403 : l'élève a bloqué le bot. On arrête alors de lui écrire.
  if (r.status === 403) await admin().from("telegram_links").update({ actif: false }).eq("chat_id", chatId);
  return r.ok;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Message du matin pour un élève : mission du jour, compte à rebours, série, prochain live.
export async function messageDuMatin(userId: string) {
  const u = { id: userId } as User;
  const [p, maitrise] = await Promise.all([chargerParcours(u), chargerMaitrise(u)]);
  if (!p.profil) return null;
  const cible = p.examens[0];
  const l: string[] = [`☀️ Bonjour ${esc(p.profil.prenom || "")} !`];
  if (cible?.module) {
    const m = missionPerso(p.profil.minutes_jour, cible.reste, maitrise[cible.module_slug], cible.module_slug);
    l.push(`\n<b>Mission du jour · ${esc(cible.module.titre)}</b>`);
    m.etapes.forEach((e) => l.push(`• ${esc(e)}`));
    l.push(`\n⏳ Examen dans <b>${cible.reste} jour${cible.reste > 1 ? "s" : ""}</b>${cible.estimee ? " (date estimée)" : ""}.`);
  } else l.push("Ajoute une date d'examen dans l'appli pour recevoir ta mission du jour.");
  if (p.serie > 0) l.push(`🔥 Série : ${p.serie} jour${p.serie > 1 ? "s" : ""} d'affilée. Ne la casse pas !`);
  const { data: lives } = await admin().from("live_sessions").select("titre, starts_at").gte("starts_at", new Date().toISOString()).order("starts_at").limit(1);
  if (lives?.[0]) l.push(`🎥 Prochain live : ${esc(lives[0].titre)}, ${new Date(lives[0].starts_at).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", weekday: "long", hour: "2-digit", minute: "2-digit" })}.`);
  return { texte: l.join("\n"), url: cible ? `${site()}/app/m/${cible.module_slug}` : `${site()}/app` };
}

export const libelleModule = (slug: string) => MODULES.find((m) => m.slug === slug)?.titre ?? slug;
