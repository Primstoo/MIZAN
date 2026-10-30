import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { admin as serviceClient, estMembre } from "@/lib/acces";

// Tuteur côté serveur (décision D8) : clés IA jamais dans le navigateur.
// Gemini d'abord, Groq en secours. Quota quotidien par élève dans tutor_usage.
export const dynamic = "force-dynamic";

const QUOTA = Number(process.env.TUTOR_DAILY_QUOTA || 40);
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const MAX_CHARS = 60000;

type Msg = { role: string; content: unknown };
type Img = { mime: string; data: string };
type Part = { text?: string; inline_data?: { mime_type: string; data: string } };

const texte = (c: unknown): string =>
  typeof c === "string" ? c
  : Array.isArray(c) ? c.map((b: { text?: string } | string) => (typeof b === "string" ? b : b?.text ?? "")).join("\n")
  : "";

const err = (code: string, message: string, status: number) =>
  NextResponse.json({ code, message }, { status });

async function gemini(system: string, msgs: { role: string; text: string }[], images: Img[]) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY absente");
  const contents = msgs.map((m, i) => {
    const parts: Part[] = [{ text: m.text }];
    if (i === msgs.length - 1) images.forEach((im) => parts.push({ inline_data: { mime_type: im.mime, data: im.data } }));
    return { role: m.role === "assistant" ? "model" : "user", parts };
  });
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ contents, ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}) }),
    }
  );
  if (!r.ok) throw new Error("Gemini " + r.status);
  const j = await r.json();
  const cand = j.candidates?.[0];
  return {
    text: (cand?.content?.parts ?? []).map((p: Part) => p.text ?? "").join(""),
    truncated: cand?.finishReason === "MAX_TOKENS",
  };
}

async function groq(system: string, msgs: { role: string; text: string }[]) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY absente");
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [...(system ? [{ role: "system", content: system }] : []),
        ...msgs.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }))],
    }),
  });
  if (!r.ok) throw new Error("Groq " + r.status);
  const j = await r.json();
  return { text: j.choices?.[0]?.message?.content ?? "", truncated: j.choices?.[0]?.finish_reason === "length" };
}

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return err("unauthorized", "Connecte-toi pour utiliser le tuteur", 401);
  if (!(await estMembre(user))) return err("forbidden", "Invitation requise", 403);

  let body: { messages?: Msg[]; images?: Img[] };
  try { body = await req.json(); } catch { return err("invalid_request", "Requête illisible", 400); }

  const all = (body.messages ?? []).map((m) => ({ role: m.role, text: texte(m.content) }));
  const system = all.filter((m) => m.role === "system").map((m) => m.text).join("\n\n");
  let msgs = all.filter((m) => m.role !== "system" && m.text.trim());
  while (msgs.length && msgs[0].role !== "user") msgs = msgs.slice(1);
  if (!msgs.length) return err("invalid_request", "Question vide", 400);
  if (JSON.stringify(msgs).length + system.length > MAX_CHARS)
    return err("prompt_too_large", "Conversation trop longue : ouvre une nouvelle discussion", 413);
  const images = (body.images ?? []).slice(0, 1);

  // Quota : la table n'est modifiable que par la clé service (RLS en lecture seule pour l'élève).
  const admin = serviceClient();
  const day = new Date().toISOString().slice(0, 10);
  const { data: u } = await admin.from("tutor_usage").select("count").eq("user_id", user.id).eq("day", day).maybeSingle();
  const used = u?.count ?? 0;
  if (used >= QUOTA) return err("rate_limited", `Quota du jour atteint (${QUOTA} questions). Reviens demain.`, 429);

  let out: { text: string; truncated: boolean } | null = null;
  const errors: string[] = [];
  try { out = await gemini(system, msgs, images); } catch (e) { errors.push(String((e as Error).message)); }
  if (!out?.text) {
    try { out = await groq(system, msgs); } catch (e) { errors.push(String((e as Error).message)); }
  }
  if (!out?.text) return err("upstream_error", "Tuteur indisponible : " + errors.join(" / "), 502);

  await admin.from("tutor_usage").upsert({ user_id: user.id, day, count: used + 1 }, { onConflict: "user_id,day" });
  return NextResponse.json({ text: out.text, truncated: out.truncated, restant: QUOTA - used - 1 });
}
