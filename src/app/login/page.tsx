"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createClient as createRawClient } from "@supabase/supabase-js";

// Connexion sans mot de passe : lien par e-mail (flux implicite, marche dans tout navigateur),
// et saisie d'un code à 6 chiffres quand l'e-mail en contient un (après configuration d'un SMTP).
export default function Login() {
  const supabase = createClient();
  const [etape, setEtape] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [charge, setCharge] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "bad"; texte: string } | null>(null);
  const [attente, setAttente] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("erreur")) setMsg({ type: "bad", texte: "Ce lien de connexion n’a pas fonctionné (il a peut-être expiré). Demande un nouveau code ci-dessous." });
  }, []);
  useEffect(() => {
    if (attente <= 0) return;
    const t = setTimeout(() => setAttente(attente - 1), 1000);
    return () => clearTimeout(t);
  }, [attente]);

  useEffect(() => {
    if (etape !== "code") return;
    const t = setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) window.location.href = "/app";
    }, 3000);
    return () => clearInterval(t);
  }, [etape, supabase]);

  async function envoyer(e?: React.FormEvent) {
    e?.preventDefault();
    setCharge(true); setMsg(null);
    // Flux « implicite » : le lien de l'e-mail fonctionne dans n'importe quel navigateur (pas de code verifier à retrouver).
    const raw = createRawClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { flowType: "implicit", persistSession: false } });
    const { error } = await raw.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/auth/hash` } });
    setCharge(false);
    if (error) {
      setMsg({ type: "bad", texte: error.status === 429 ? "Trop de demandes. Attends une minute avant de redemander un code." : "L’envoi a échoué. Vérifie ton adresse e-mail." });
      return;
    }
    setEtape("code"); setAttente(60); setCode("");
    setTimeout(() => codeRef.current?.focus(), 50);
  }

  async function verifier(e?: React.FormEvent) {
    e?.preventDefault();
    if (code.length < 6) return;
    setCharge(true); setMsg(null);
    const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token: code, type: "email" });
    setCharge(false);
    if (error) { setMsg({ type: "bad", texte: "Code incorrect ou expiré. Vérifie le dernier e-mail reçu, ou demande un nouveau code." }); return; }
    window.location.href = "/app";
  }

  return (
    <main className="auth">
      <section className="auth-brand">
        <a href="/" className="logo light">MIZAN</a>
        <div>
          <p className="auth-tag">Réviser le cours de <em>ton</em> prof.</p>
          <ul className="auth-points">
            <li>Leçons qui partent de zéro</li>
            <li>Exercices corrigés et évaluations</li>
            <li>Un tuteur qui connaît ton module</li>
          </ul>
        </div>
        <p className="small auth-foot">FSABM · Béni Mellal</p>
      </section>

      <section className="auth-form">
        <div className="auth-card">
          <p className="auth-step">{etape === "email" ? "Étape 1 sur 2" : "Étape 2 sur 2"}</p>
          {etape === "email" ? (
            <>
              <h1>Connexion</h1>
              <p className="muted">Entre ton adresse e-mail : tu vas recevoir un lien de connexion. Pas de mot de passe à retenir. Si tu n’as pas encore de compte, il est créé automatiquement.</p>
              <form onSubmit={envoyer} className="stack">
                <label htmlFor="email">Adresse e-mail</label>
                <input id="email" type="email" required autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="toi@exemple.com" />
                <button className="btn big" disabled={charge || !email}>{charge ? "Envoi…" : "Recevoir mon lien"}</button>
              </form>
            </>
          ) : (
            <>
              <h1>Ouvre ton e-mail</h1>
              <p className="muted">Un e-mail de connexion a été envoyé à <strong>{email}</strong> (regarde aussi dans les spams). Clique sur le lien : tu seras connecté sur l’appareil où tu l’ouvres. Si tu l’ouvres sur ce même navigateur, cette page s’actualise toute seule.</p>
              <p className="small muted">Si ton e-mail contient un code à 6 chiffres, tu peux aussi l’entrer ici :</p>
              <form onSubmit={verifier} className="stack">
                <label htmlFor="code">Code à 6 chiffres</label>
                <input
                  id="code" ref={codeRef} className="code-input" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                  value={code} onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 6); setCode(v); }} placeholder="••••••"
                />
                <button className="btn big" disabled={charge || code.length < 6}>{charge ? "Vérification…" : "Me connecter"}</button>
              </form>
              <div className="auth-links">
                <button className="linkbtn" disabled={attente > 0 || charge} onClick={() => envoyer()}>
                  {attente > 0 ? `Renvoyer l’e-mail (${attente} s)` : "Renvoyer l’e-mail"}
                </button>
                <button className="linkbtn" onClick={() => { setEtape("email"); setMsg(null); }}>Changer d’adresse</button>
              </div>
            </>
          )}
          {msg && <p className={`alert ${msg.type}`} role="alert">{msg.texte}</p>}
        </div>
      </section>
    </main>
  );
}
