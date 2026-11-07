"use server";
import { admin } from "@/lib/acces";

// Vérifie un code d'invitation avant la connexion (le code n'est consommé qu'à l'entrée dans l'appli).
export async function verifierInvitation(code: string): Promise<{ ok: boolean; message?: string }> {
  const c = String(code || "").trim().toUpperCase();
  if (!/^[A-Z0-9-]{4,20}$/.test(c)) return { ok: false, message: "Le code ressemble à MZ-XXXXXX. Vérifie-le." };
  const { data } = await admin().from("invites").select("uses, max_uses").eq("code", c).maybeSingle();
  if (!data) return { ok: false, message: "Ce code n'existe pas. Vérifie-le auprès de la personne qui te l'a donné." };
  if (data.uses >= data.max_uses) return { ok: false, message: "Ce code a déjà servi à toutes ses places. Demande un autre code." };
  return { ok: true };
}
