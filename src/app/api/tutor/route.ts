import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { admin as serviceClient, estAdmin, estMembre } from "@/lib/acces";
import { jourMaroc } from "@/lib/parcours";
import { bonusTuteur } from "@/lib/bonus";
import { offresActives, offreDe, QUOTA_TUTEUR, RANG } from "@/lib/offres";
import { ordreDesModeles } from "@/lib/tuteur-ordre";

// Tuteur côté serveur (décision D8) : clés IA jamais dans le navigateur.
// Gemini d'abord, Groq en secours. Quota quotidien par élève dans tutor_usage.
export const dynamic = "force-dynamic";
export const maxDuration = 60; // secondes : plusieurs modèles peuvent être essayés à la suite

const QUOTA_BASE = Number(process.env.TUTOR_DAILY_QUOTA || 40);
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

// ---------- Réponse en continu (le texte s'affiche pendant qu'il s'écrit) ----------
type Flux = AsyncGenerator<string, { truncated: boolean }>;

// Un flux qui s'arrête au milieu (aucun octet pendant DELAI) est coupé : sinon la fonction attend jusqu'à maxDuration.
async function* lignesSSE(r: Response): AsyncGenerator<string> {
  const dec = new TextDecoder(); const rd = r.body!.getReader(); let buf = "";
  for (;;) {
    let t: ReturnType<typeof setTimeout> | undefined;
    const { value, done } = await Promise.race([
      rd.read(),
      new Promise<never>((_, ko) => { t = setTimeout(() => { ko(new Error(`flux interrompu (${DELAI / 1000} s sans données)`)); rd.cancel().catch(() => {}); }, DELAI); }),
    ]).finally(() => clearTimeout(t));
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i; while ((i = buf.indexOf("\n")) >= 0) { const l = buf.slice(0, i).trim(); buf = buf.slice(i + 1); if (l.startsWith("data:")) yield l.slice(5).trim(); }
  }
}

async function* geminiFlux(model: string, system: string, msgs: { role: string; text: string }[], images: Img[]): Flux {
  const key = process.env.GEMINI_API_KEY; if (!key) throw new Error("GEMINI_API_KEY absente");
  const contents = msgs.map((m, i) => {
    const parts: Part[] = [{ text: m.text }];
    if (i === msgs.length - 1) images.forEach((im) => parts.push({ inline_data: { mime_type: im.mime, data: im.data } }));
    return { role: m.role === "assistant" ? "model" : "user", parts };
  });
  const corps = (rapide: boolean) => JSON.stringify({ contents, ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
    generationConfig: { maxOutputTokens: 1500, ...(rapide ? { thinkingConfig: { thinkingBudget: 0 } } : {}) } });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`;
  const init = (rapide: boolean): RequestInit => ({ method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, body: corps(rapide) });
  let r = await appel(url, init(true));
  if (r.status === 400) r = await appel(url, init(false));
  if (!r.ok) throw new Error(`Gemini ${model} ${r.status} ${(await r.text()).slice(0, 200)}`);
  let truncated = false;
  for await (const d of lignesSSE(r)) {
    try { const j = JSON.parse(d); const c = j.candidates?.[0]; if (c?.finishReason === "MAX_TOKENS") truncated = true;
      const t = (c?.content?.parts ?? []).map((p: Part) => p.text ?? "").join(""); if (t) yield t; } catch {}
  }
  return { truncated };
}

async function* groqFlux(model: string, system: string, msgs: { role: string; text: string }[]): Flux {
  const key = process.env.GROQ_API_KEY; if (!key) throw new Error("GROQ_API_KEY absente");
  const r = await appel("https://api.groq.com/openai/v1/chat/completions", { method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, stream: true, max_tokens: 1500, messages: [...(system ? [{ role: "system", content: system }] : []),
      ...msgs.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }))] }) });
  if (!r.ok) throw new Error(`Groq ${model} ${r.status} ${(await r.text()).slice(0, 200)}`);
  let truncated = false;
  for await (const d of lignesSSE(r)) {
    if (d === "[DONE]") break;
    try { const j = JSON.parse(d); const c = j.choices?.[0]; if (c?.finish_reason === "length") truncated = true; const t = c?.delta?.content; if (t) yield t; } catch {}
  }
  return { truncated };
}

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return err("unauthorized", "Connecte-toi pour utiliser le tuteur", 401);
  if (!(await estMembre(user))) return err("forbidden", "Invitation requise", 403);

  let body: { messages?: Msg[]; images?: Img[]; tier?: string };
  try { body = await req.json(); } catch { return err("invalid_request", "Requête illisible", 400); }

  const all = (Array.isArray(body.messages) ? body.messages : []).slice(-60).map((m) => ({ role: m.role, text: texte(m.content) }));
  const system = all.filter((m) => m.role === "system").map((m) => m.text).join("\n\n");
  let msgs = all.filter((m) => m.role !== "system" && m.text.trim());
  while (msgs.length && msgs[0].role !== "user") msgs = msgs.slice(1);
  if (!msgs.length) return err("invalid_request", "Question vide", 400);
  if (JSON.stringify(msgs).length + system.length > MAX_CHARS)
    return err("prompt_too_large", "Conversation trop longue : ouvre une nouvelle discussion", 413);
  // Photo : un seul fichier, format image courant, 5 Mo maximum (≈ 7 Mo en base64).
  const images = (Array.isArray(body.images) ? body.images : []).slice(0, 1)
    .filter((im) => typeof im?.data === "string" && im.data.length < 7_000_000 && /^image\/(jpeg|png|webp)$/.test(String(im.mime)));

  // Quota : la table n'est modifiable que par la clé service (RLS en lecture seule pour l'élève).
  const admin = serviceClient();
  const day = jourMaroc();
  // Offres (OFFRES_ACTIVES=1) : quota et options selon Gratuit / Essentiel / Premium. Sinon : règle de la bêta.
  let QUOTA = QUOTA_BASE + (await bonusTuteur(user.id));
  if (offresActives() && !estAdmin(user)) {
    const { plan } = await offreDe(user.id);
    if (body.tier === "complex" && RANG[plan] < 2)
      return err("forbidden", "Le mode Approfondi est inclus dans les offres Essentiel et Premium (voir Moi > Mon offre).", 403);
    if (images.length && RANG[plan] < 3)
      return err("forbidden", "L'envoi de photos au tuteur est inclus dans l'offre Premium (voir Moi > Mon offre).", 403);
    QUOTA = QUOTA_TUTEUR[plan];
  }
  // Réservation atomique d'une question : même avec 50 requêtes simultanées, le quota tient.
  const { data: compte, error: eq } = await admin.rpc("reserver_question", { p_user: user.id, p_day: day, p_quota: QUOTA });
  if (eq) { console.error("[tutor] quota", eq.message); return err("upstream_error", "Tuteur momentanément indisponible", 503); }
  if (compte === null) return err("rate_limited", `Quota du jour atteint (${QUOTA} questions). Reviens demain${offresActives() ? ", ou passe à une offre supérieure (Moi > Mon offre)" : ""}.`, 429);
  const used = Number(compte) - 1;

  // Essai des modèles dans l'ordre ; on passe au suivant tant qu'aucun mot n'a été envoyé.
  // Sans image, on alterne Gemini et Groq : quand Gemini est saturé (503), ses deux modèles le sont en même temps,
  // et l'élève attendait deux délais avant d'arriver à Groq. Avec une image, Gemini d'abord (Groq ne lit pas la photo).
  const essais = ordreDesModeles(GEMINI_MODELS, GROQ_MODELS, images.length > 0);
  const candidats: (() => Flux)[] = essais.map((e) => e.f === "gemini" ? () => geminiFlux(e.m, system, msgs, images) : () => groqFlux(e.m, system, msgs));
  const noms = essais.map((e) => e.m);
  const enc = new TextEncoder();
  const t0 = Date.now();
  const flux = new ReadableStream({
    async start(ctl) {
      const envoi = (o: object) => ctl.enqueue(enc.encode(JSON.stringify(o) + "\n"));
      const errors: string[] = [];
      for (let k = 0; k < candidats.length; k++) {
        // Budget global : au-delà, Vercel couperait la fonction (maxDuration) sans message clair pour l'élève.
        if (Date.now() - t0 > (maxDuration - 20) * 1000) { errors.push("budget de temps épuisé"); break; }
        let recu = 0;
        try {
          const g = candidats[k]();
          let r = await g.next();
          while (!r.done) {
            recu += r.value.length; envoi({ d: r.value }); r = await g.next();
          }
          if (recu) {
            console.log(`[tutor] ok · ${noms[k]} · ${Date.now() - t0} ms · ${msgs.length} messages`);
            if (errors.length) console.warn("[tutor] secours utilisé ·", errors.join(" | ")); // la réponse est bien partie : simple avertissement
            envoi({ fin: true, truncated: r.value.truncated, restant: QUOTA - used - 1 }); ctl.close(); return;
          }
          errors.push(`${noms[k]} : réponse vide`);
        } catch (e) {
          errors.push(String((e as Error).message));
          if (recu) { envoi({ fin: true, truncated: true }); ctl.close(); return; }
        }
      }
      console.error("[tutor] échec ·", errors.join(" | "));
      await admin.rpc("rendre_question", { p_user: user.id, p_day: day }); // aucune réponse : la question n'est pas décomptée
      envoi({ erreur: "upstream_error", message: "Le tuteur est momentanément indisponible. Réessaie dans une minute (cette question n'a pas été décomptée)." });
      ctl.close();
    },
  });
  return new Response(flux, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" } });
}
