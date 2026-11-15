import { createClient as createAdmin } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";

// Client « service » : contourne la RLS. Uniquement côté serveur.
export const admin = () =>
  createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

export const estAdmin = (u: User | null) =>
  !!u?.email && (process.env.ADMIN_EMAILS || "").toLowerCase().split(",").map((s) => s.trim()).includes(u.email.toLowerCase());

export async function estMembre(u: User | null) {
  if (!u) return false;
  if (estAdmin(u)) return true;
  const { data } = await admin().from("members").select("user_id").eq("user_id", u.id).maybeSingle();
  return !!data;
}

// Inscription libre (INSCRIPTION_LIBRE=1) : toute personne connectée devient membre, sans code d'invitation.
// Sans cette variable, la bêta reste fermée (code d'invitation obligatoire), comme avant.
export const inscriptionLibre = () => process.env.INSCRIPTION_LIBRE === "1";

// Vérifie l'accès à /app ; en inscription libre, crée la ligne « members » à la première visite.
export async function assurerMembre(u: User | null) {
  if (await estMembre(u)) return true;
  if (!u || !inscriptionLibre()) return false;
  const { error } = await admin().from("members").insert({ user_id: u.id, email: u.email });
  return !error || error.code === "23505"; // 23505 : déjà inscrit par une requête simultanée
}

// Code lisible, sans caractères ambigus (0/O, 1/I).
export function nouveauCode() {
  const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const b = new Uint8Array(6);
  crypto.getRandomValues(b);
  return "MZ-" + Array.from(b, (x) => a[x % a.length]).join("");
}

// Même vérification à partir d'un simple identifiant (bot Telegram, rappel du matin).
export async function estMembreId(id: string) {
  const db = admin();
  const { data } = await db.from("members").select("user_id").eq("user_id", id).maybeSingle();
  if (data) return true;
  const { data: u } = await db.auth.admin.getUserById(id);
  return estAdmin(u?.user ?? null);
}
