import webpush from "web-push";
import { admin } from "@/lib/acces";

// Notifications push (Web Push). Clés VAPID dans les variables NEXT_PUBLIC_VAPID_PUBLIC_KEY et VAPID_PRIVATE_KEY.
export type Notif = { title: string; body: string; url?: string; tag?: string };

export const pushActif = () => !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && !!process.env.VAPID_PRIVATE_KEY;

function configurer() {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || `mailto:${(process.env.ADMIN_EMAILS || "").split(",")[0].trim() || "contact@toumailearn.app"}`,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!,
  );
}

type Abo = { id: string; endpoint: string; p256dh: string; auth: string };

async function envoyerA(abos: Abo[], n: Notif) {
  if (!abos.length) return 0;
  configurer();
  const db = admin();
  const charge = JSON.stringify(n);
  let ok = 0;
  await Promise.all(abos.map(async (a) => {
    try {
      await webpush.sendNotification({ endpoint: a.endpoint, keys: { p256dh: a.p256dh, auth: a.auth } }, charge, { TTL: 86400 });
      ok++;
    } catch (e) {
      const code = (e as { statusCode?: number }).statusCode;
      // 404 / 410 : l'appareil s'est désabonné ou a été désinstallé, on nettoie.
      if (code === 404 || code === 410) await db.from("push_subscriptions").delete().eq("id", a.id);
      else console.error("[push]", code, String(e).slice(0, 200));
    }
  }));
  return ok;
}

export async function pousser(userId: string, n: Notif) {
  if (!pushActif()) return 0;
  const { data } = await admin().from("push_subscriptions").select("id, endpoint, p256dh, auth").eq("user_id", userId);
  return envoyerA(data ?? [], n);
}

// Alerte pour les administrateurs (ADMIN_EMAILS), par exemple à chaque nouveau document reçu.
export async function pousserAdmins(n: Notif) {
  if (!pushActif()) return 0;
  const emails = (process.env.ADMIN_EMAILS || "").toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
  if (!emails.length) return 0;
  const { data } = await admin().from("push_subscriptions").select("id, endpoint, p256dh, auth").in("email", emails);
  return envoyerA(data ?? [], n);
}
