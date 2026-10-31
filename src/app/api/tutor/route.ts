import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { admin as serviceClient, estMembre } from "@/lib/acces";

// Tuteur côté serveur (décision D8) : clés IA jamais dans le navigateur.
// Gemini d'abord, Groq en secours. Quota quotidien par élève dans tutor_usage.
export const dynamic = "force-dynamic";
export const maxDuration = 60; // secondes : plusieurs modèles peuvent être essayés à la suite

const QUOTA = Number(process.env.TUTOR_DAILY_QUOTA || 40);
// Les modèles gratuits sont souvent retirés (gemini-2.5-flash fermé le 16/10/2026,
// llama-3.3-70b chez Groq le 16/08/2026). On essaie donc une liste, alias « latest » d'abord.
const liste = (v: string | undefined, def: string[]) => (v ? v.split(",").map((x) => x.trim()).filter(Boolean) : def);
const GEMINI_MODELS = liste(process.env.GEMINI_MODEL, ["gemini-3.1-flash-lite", "gemini-flash-latest"]);
const GROQ_MODELS = liste(process.env.GROQ_MODEL, ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]);
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

const DELAI = Number(process.env.TUTOR_TIMEOUT_MS || 15000);
async function appel(url: string, init: RequestInit) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), DELAI);
  try { return await fetch(url, { ...init, signal: ctl.signal }); }
  catch (e) { throw new Error((e as Error).name === "AbortError" ? `délai dépassé (${DELAI / 1000} s)` : String(e)); }
  finally { clearTimeout(t); }
}

async function gemini(model: string, system: string, msgs: { role: string; text: string }[], images: Img[]) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY absente");
  const contents = msgs.map((m, i) => {
    const parts: Part[] = [{ text: m.text }];
    if (i === msgs.length - 1) images.forEach((im) => parts.push({ inline_data: { mime_type: im.mime, data: im.data } }));
    return { role: m.role === "assistant" ? "model" : "user", parts };
  });
  const corps = (rapide: boolean) => JSON.stringify({
    contents,
    ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
    // Sans « réflexion » interne : réponse en quelques secondes au lieu de 20 à 40.
    generationConfig: { maxOutputTokens: 1500, ...(rapide ? { thinkingConfig: { thinkingBudget: 0 } } : {}) },
  });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const init = (rapide: boolean): RequestInit => ({ method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, body: corps(rapide) });
  let r = await appel(url, init(true));
  if (r.status === 400) r = await appel(url, init(false)); // modèle qui refuse le réglage de réflexion
  if (!r.ok) throw new Error(`Gemini ${model} ${r.status} ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  const cand = j.candidates?.[0];
  return {
    text: (cand?.content?.parts ?? []).map((p: Part) => p.text ?? "").join(""),
    truncated: cand?.finishReason === "MAX_TOKENS",
  };
}

async function groq(model: string, system: string, msgs: { role: string; text: string }[]) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY absente");
  const r = await appel("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      messages: [...(system ? [{ role: "system", content: system }] : []),
        ...msgs.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }))],
    }),
  });
  if (!r.ok) throw new Error(`Groq ${model} ${r.status} ${(await r.text()).slice(0, 200)}`);
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
  const t0 = Date.now();
  let source = "";
  for (const m of GEMINI_MODELS) {
    if (out?.text) break;
    try { out = await gemini(m, system, msgs, images); if (out?.text) source = m; } catch (e) { errors.push(String((e as Error).message)); }
  }
  for (const m of GROQ_MODELS) {
    if (out?.text) break;
    try { out = await groq(m, system, msgs); if (out?.text) source = m; } catch (e) { errors.push(String((e as Error).message)); }
  }
  console.log(`[tutor] ${out?.text ? "ok" : "échec"} · ${source || "aucun modèle"} · ${Date.now() - t0} ms · ${msgs.length} messages`);
  if (errors.length) console.error("[tutor]", errors.join(" | "));
  if (!out?.text) return err("upstream_error", "Tuteur indisponible : " + errors.map((x) => x.slice(0, 60)).join(" / "), 502);

  await admin.from("tutor_usage").upsert({ user_id: user.id, day, count: used + 1 }, { onConflict: "user_id,day" });
  return NextResponse.json({ text: out.text, truncated: out.truncated, restant: QUOTA - used - 1 });
}
