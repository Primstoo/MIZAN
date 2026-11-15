"use server";
import { createClient } from "@/lib/supabase/server";
import { admin } from "@/lib/acces";

type Abo = { endpoint: string; p256dh: string; auth: string };

export async function sabonner(abo: Abo, userAgent: string): Promise<string> {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return "Connexion requise.";
  // Le navigateur ne délivre que des adresses https vers son service de notification.
  if (!/^https:\/\/[^\s]{10,1000}$/.test(abo.endpoint) || !abo.p256dh || !abo.auth || abo.p256dh.length > 200 || abo.auth.length > 100) return "Abonnement invalide.";
  const { error } = await admin().from("push_subscriptions").upsert(
    { user_id: user.id, email: user.email?.toLowerCase() ?? null, endpoint: abo.endpoint, p256dh: abo.p256dh, auth: abo.auth, user_agent: userAgent.slice(0, 200) },
    { onConflict: "endpoint" },
  );
  return error ? "Enregistrement impossible (" + error.code + ")." : "";
}

export async function seDesabonner(endpoint: string): Promise<void> {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return;
  await admin().from("push_subscriptions").delete().eq("user_id", user.id).eq("endpoint", endpoint);
}
