import { NextResponse } from "next/server";
import { admin } from "@/lib/acces";
import { envoyer, memeSecret, messageDuMatin, secretWebhook } from "@/lib/telegram";
import { estMembreId } from "@/lib/acces";

// Messages reçus par le bot. Telegram signe chaque appel avec TELEGRAM_WEBHOOK_SECRET.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!process.env.TELEGRAM_WEBHOOK_SECRET || !memeSecret(req.headers.get("x-telegram-bot-api-secret-token"), secretWebhook())) return new NextResponse("refusé", { status: 401 });
  const up = await req.json().catch(() => null);
  const msg = up?.message;
  if (!msg?.chat?.id || typeof msg.text !== "string") return NextResponse.json({ ok: true });
  const chat = msg.chat.id as number, texte = msg.text.trim();
  const db = admin();

  if (texte.startsWith("/start")) {
    const jeton = texte.split(" ")[1]?.slice(0, 64);
    if (!jeton) { await envoyer(chat, "Bienvenue ! Pour relier ton compte, ouvre ToumaiLearn → onglet « Moi » → « Recevoir mes rappels sur Telegram »."); return NextResponse.json({ ok: true }); }
    const { data: l } = await db.from("telegram_links").select("user_id, jeton_le").eq("jeton", jeton).maybeSingle();
    // Lien valable 24 h
    if (!l || (l.jeton_le && Date.now() - Date.parse(l.jeton_le) > 864e5)) { await envoyer(chat, "Ce lien a expiré. Recommence depuis l'onglet « Moi » de ToumaiLearn."); return NextResponse.json({ ok: true }); }
    await db.from("telegram_links").update({ chat_id: null }).eq("chat_id", chat);
    await db.from("telegram_links").update({ chat_id: chat, jeton: null, actif: true, relie_le: new Date().toISOString() }).eq("user_id", l.user_id);
    await envoyer(chat, "✅ Ton compte ToumaiLearn est relié. Tu recevras ta mission chaque matin.\n\nCommandes : /mission pour la recevoir maintenant, /stop pour arrêter les rappels.");
    return NextResponse.json({ ok: true });
  }
  const { data: lien } = await db.from("telegram_links").select("user_id").eq("chat_id", chat).maybeSingle();
  if (!lien) { await envoyer(chat, "Ce compte Telegram n'est relié à aucun compte ToumaiLearn. Ouvre l'onglet « Moi » de l'appli pour le relier."); return NextResponse.json({ ok: true }); }
  if (texte === "/stop") { await db.from("telegram_links").update({ actif: false }).eq("chat_id", chat); await envoyer(chat, "Rappels arrêtés. Tape /reprendre pour les réactiver."); }
  else if (texte === "/reprendre") { await db.from("telegram_links").update({ actif: true }).eq("chat_id", chat); await envoyer(chat, "Rappels réactivés ✅"); }
  else {
    // Compte retiré de la bêta : plus de mission
    const membre = await estMembreId(lien.user_id);
    const m = membre ? await messageDuMatin(lien.user_id) : null;
    if (m) await envoyer(chat, m.texte, { t: "Ouvrir ma mission", url: m.url });
    else await envoyer(chat, "Termine ton inscription dans l'appli pour recevoir ta mission.");
  }
  return NextResponse.json({ ok: true });
}
