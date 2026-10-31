import { NextResponse } from "next/server";
import { admin } from "@/lib/acces";
import { botActif, envoyer, messageDuMatin } from "@/lib/telegram";

// Rappel du matin, déclenché chaque jour par Vercel Cron (vercel.json). Protégé par CRON_SECRET.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) return new NextResponse("refusé", { status: 401 });
  if (!botActif()) return NextResponse.json({ envoyes: 0, raison: "bot non configuré" });
  const { data: liens } = await admin().from("telegram_links").select("user_id, chat_id").eq("actif", true).not("chat_id", "is", null);
  let envoyes = 0;
  for (const l of liens ?? []) {
    try {
      const m = await messageDuMatin(l.user_id);
      if (m && (await envoyer(l.chat_id, m.texte, { t: "Ouvrir ma mission", url: m.url }))) envoyes++;
    } catch (e) { console.error("[rappel]", l.user_id, String(e)); }
  }
  console.log(`[rappel] ${envoyes}/${liens?.length ?? 0} envoyés`);
  return NextResponse.json({ envoyes });
}
