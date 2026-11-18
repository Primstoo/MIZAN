"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createClient as createRawClient } from "@supabase/supabase-js";
import Mascotte from "@/components/Mascotte";
import { verifierInvitation } from "./actions";

// Connexion sans mot de passe : lien par e-mail (flux implicite, marche dans tout navigateur),
// et saisie du code en chiffres contenu dans l'e-mail (après configuration d'un SMTP).
const LONGUEUR_CODE_MAX = 10;
const LONGUEUR_CODE_AFFICHE = 8;

export default function Login() {
  const supabase = createClient();
  const [etape, setEtape] = useState<"invitation" | "email" | "code">("email");
  // Deux portes, comme dans les applis : créer un compte ou se connecter.
  const [mode, setMode] = useState<"inscription" | "connexion">("connexion");
  const [invitation, setInvitation] = useState("");
  const [, setEtapesInvitation] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [charge, setCharge] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "bad"; texte: string } | null>(null);
  const [attente, setAttente] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    // Lien d'invitation : on garde le code pour pré-remplir l'écran d'entrée après connexion.
    if (p.get("mode") === "inscription") setMode("inscription");
    const inv = p.get("code");
    if (inv) try { localStorage.setItem("mizan-invite", inv); } catch {}
    // « J'ai un code d'invitation » : on saisit et vérifie le code AVANT l'e-mail.
    else if (p.get("invitation") !== null) { setEtape("invitation"); setEtapesInvitation(true); }
    if (p.get("erreur")) setMsg({ type: "bad", texte: "Ce lien de connexion n’a pas fonctionné (il a peut-être expiré). Demande un nouveau code." });
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
    const { error } = await raw.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: mode === "inscription", emailRedirectTo: `${window.location.origin}/auth/hash` } });
    setCharge(false);
    if (error) {
      if (mode === "connexion" && (error.code === "otp_disabled" || /signups not allowed/i.test(error.message))) {
        setMsg({ type: "bad", texte: "Aucun compte avec cette adresse. Vérifie-la, ou crée un compte." });
        return;
      }
      setMsg({ type: "bad", texte: error.code === "over_email_send_rate_limit" ? "Beaucoup d’inscriptions en ce moment : l’envoi des e-mails est saturé. Réessaie dans 15 minutes." : error.status === 429 ? "Trop de demandes. Attends une minute avant de redemander un code." : "L’envoi a échoué. Vérifie ton adresse e-mail." });
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

  async function validerInvitation(e: React.FormEvent) {
    e.preventDefault();
    setCharge(true); setMsg(null);
    const r = await verifierInvitation(invitation);
    setCharge(false);
    if (!r.ok) { setMsg({ type: "bad", texte: r.message || "Code refusé." }); return; }
    try { localStorage.setItem("mizan-invite", invitation.trim().toUpperCase()); } catch {}
    setMsg({ type: "ok", texte: "Code valide. Connecte-toi maintenant avec ton e-mail : ta place est gardée." });
    setEtape("email");
  }

  // Connexion Google : visible dès que NEXT_PUBLIC_AUTH_GOOGLE=1 (fournisseur activé dans Supabase).
  async function google() {
    setCharge(true); setMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    if (error) { setCharge(false); setMsg({ type: "bad", texte: "Connexion Google indisponible pour l'instant. Utilise ton e-mail." }); }
  }
  const avecGoogle = process.env.NEXT_PUBLIC_AUTH_GOOGLE === "1";

  // Le code fait 8 chiffres aujourd'hui : validation automatique dès le dernier chiffre.
  useEffect(() => {
    if (etape === "code" && code.length === 8 && !charge) verifier();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <main className="cx">
      <aside className="cx-marque">
        <a href="/" className="logo cx-logo">ToumaiLearn</a>
        <p className="cx-devise">Le cours de ton professeur, expliqué et corrigé.</p>
        <span className="cx-mascotte" aria-hidden="true"><Mascotte id="toumai" taille={64} decor /></span>
      </aside>

      <section className="cx-zone">
        <div className="cx-carte">
          {etape === "invitation" ? (
            <>
              <h1>Code d&apos;invitation</h1>
              <form onSubmit={validerInvitation} className="cx-form">
                <label htmlFor="invitation">Code</label>
                <input id="invitation" required autoComplete="off" autoCapitalize="characters" value={invitation} onChange={(e) => setInvitation(e.target.value.toUpperCase())} placeholder="MZ-XXXXXX" />
                <button className="btn big" disabled={charge || invitation.trim().length < 4}>{charge ? "Vérification…" : "Continuer"}</button>
              </form>
              <button type="button" className="linkbtn" onClick={() => { setMsg(null); setEtape("email"); setEtapesInvitation(false); }}>J&apos;ai déjà un compte</button>
            </>
          ) : etape === "email" ? (
            <>
              <a href="/" className="linkbtn cx-retour">‹ Retour</a>
              <h1>{mode === "inscription" ? "Créer un compte" : "Se connecter"}</h1>
              <p className="cx-sous">{mode === "inscription" ? "Gratuit, sans mot de passe." : "Content de te revoir."}</p>
                            {avecGoogle && (<>
                <button type="button" className="cx-google" onClick={google} disabled={charge}><LogoGoogle />{mode === "inscription" ? "S’inscrire avec Google" : "Se connecter avec Google"}</button>
                <p className="cx-ou">ou</p>
              </>)}
              <form onSubmit={envoyer} className="cx-form">
                <label htmlFor="email">Adresse e-mail</label>
                <input id="email" type="email" required autoComplete="email" inputMode="email" autoCapitalize="off" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="prenom.nom@exemple.com" />
                <button className="btn big" disabled={charge || !/^\S+@\S+\.\S+$/.test(email.trim())}>{charge ? "Envoi en cours…" : mode === "inscription" ? "Créer mon compte" : "Recevoir un code"}</button>
              </form>
              <p className="cx-aide cx-bascule">{mode === "inscription" ? "Déjà inscrit ?" : "Pas encore de compte ?"}{" "}
                <button type="button" className="link" onClick={() => { setMsg(null); setMode(mode === "inscription" ? "connexion" : "inscription"); }}>{mode === "inscription" ? "Se connecter" : "Créer un compte"}</button>
              </p>
            </>
          ) : (
            <>
              <h1>Vérifie ton e-mail</h1>
              <p className="cx-sous">Code à {LONGUEUR_CODE_AFFICHE} chiffres envoyé à <strong>{email}</strong></p>
              <form onSubmit={verifier} className="cx-form">
                <label htmlFor="code">Code de vérification</label>
<div className="cx-cases" onClick={() => codeRef.current?.focus()}>
                  {Array.from({ length: LONGUEUR_CODE_AFFICHE }, (_, i) => (
                    <span key={i} className={i === Math.min(code.length, LONGUEUR_CODE_AFFICHE - 1) ? "actif" : ""}>{code[i] ?? ""}</span>
                  ))}
                  <input
                    id="code" ref={codeRef} inputMode="numeric" autoComplete="one-time-code" maxLength={LONGUEUR_CODE_MAX}
                    value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, LONGUEUR_CODE_MAX))} aria-describedby="cx-aide"
                  />
                </div>
                <button className="btn big" disabled={charge || code.length < 6}>{charge ? "Vérification…" : "Vérifier"}</button>
              </form>
              <p id="cx-aide" className="cx-aide">
                Code non reçu ? Regarde dans les spams, ou{" "}
                <button type="button" className="link" disabled={attente > 0 || charge} onClick={() => envoyer()}>{attente > 0 ? `renvoie-le (${attente} s)` : "renvoie-le"}</button>
                {" · "}<button type="button" className="link" onClick={() => { setEtape("email"); setMsg(null); }}>Modifier l&apos;adresse</button>
              </p>
            </>
          )}
          {msg && <p className={`alert ${msg.type}`} role="alert">{msg.texte}</p>}

          <p className="cx-legal">En continuant, tu acceptes la <a href="/confidentialite">politique de confidentialité</a>.</p>
        </div>
      </section>
    </main>
  );
}

// Logo officiel de Google (le « G » en quatre couleurs), exigé par les règles de marque de Google pour ce bouton.
function LogoGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
