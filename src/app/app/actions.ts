"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin, estMembre, nouveauCode } from "@/lib/acces";

export async function rejoindre(_prev: string, form: FormData): Promise<string> {
  const code = String(form.get("code") || "").trim().toUpperCase();
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return "Connecte-toi d'abord.";
  if (!code) return "Entre ton code.";
  const db = admin();
  const { data: inv } = await db.from("invites").select("code, uses, max_uses").eq("code", code).maybeSingle();
  if (!inv) return "Code inconnu. Vérifie l'orthographe (ex. MZ-AB12CD).";
  if (inv.uses >= inv.max_uses) return "Ce code a déjà été utilisé le nombre de fois prévu.";
  // Mise à jour conditionnelle : évite qu'un code soit consommé deux fois en même temps.
  const { data: ok } = await db.from("invites").update({ uses: inv.uses + 1 })
    .eq("code", code).eq("uses", inv.uses).select("code");
  if (!ok?.length) return "Réessaie dans un instant.";
  const { error } = await db.from("members").insert({ user_id: user.id, email: user.email, invite_code: code });
  if (error && error.code !== "23505") return "Erreur (" + error.code + ").";
  redirect("/app");
}

export async function creerInvitation(): Promise<void> {
  const { data: { user } } = await createClient().auth.getUser();
  if (!(await estMembre(user))) return;
  const db = admin();
  const { count } = await db.from("invites").select("code", { count: "exact", head: true }).eq("owner", user!.id);
  const chef = estAdmin(user); // l'admin crée autant de codes qu'il veut, de 10 places
  if (!chef && (count ?? 0) >= Number(process.env.INVITES_PER_MEMBER || 1)) return;
  await db.from("invites").insert({ code: nouveauCode(), owner: user!.id, max_uses: chef ? 10 : Number(process.env.INVITE_USES || 3) });
  revalidatePath("/app");
}
