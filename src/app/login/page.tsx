"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<"" | "envoi" | "envoye" | "erreur">("");
  const supabase = createClient();
  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined;

  async function lienMagique(e: React.FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    setEtat(error ? "erreur" : "envoye");
  }

  return (
    <main className="page narrow">
      <a href="/" className="logo">MIZAN</a>
      <h1>Connexion</h1>
      <p className="muted">Ta progression et ton historique du tuteur suivent ton compte, sur tous tes appareils.</p>
      <button className="btn alt" onClick={() => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo } })}>
        Continuer avec Google
      </button>
      <p className="sep">ou</p>
      <form onSubmit={lienMagique} className="stack">
        <label htmlFor="email">Adresse e-mail</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="toi@exemple.com" />
        <button className="btn" disabled={etat === "envoi"}>Recevoir un lien de connexion</button>
      </form>
      {etat === "envoye" && <p className="ok">Lien envoyé. Ouvre ta boîte mail et clique dessus.</p>}
      {etat === "erreur" && <p className="bad">L’envoi a échoué. Vérifie l’adresse et réessaie dans une minute.</p>}
    </main>
  );
}
