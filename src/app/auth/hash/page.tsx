"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Retour du lien de l'e-mail (flux « implicite ») : la session arrive dans l'ancre (#access_token=…).
// Ça marche dans n'importe quel navigateur, y compris celui de l'application mail.
export default function Hash() {
  const [erreur, setErreur] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.hash.slice(1));
    const access_token = p.get("access_token"), refresh_token = p.get("refresh_token");
    if (!access_token || !refresh_token) { setErreur(true); return; }
    createClient().auth.setSession({ access_token, refresh_token }).then(({ error }) => {
      if (error) setErreur(true); else window.location.replace("/app");
    });
  }, []);
  return (
    <main className="page narrow" style={{ paddingTop: 48 }}>
      <a href="/" className="logo">ToumaiLearn</a>
      {erreur ? (
        <>
          <h1>Lien expiré</h1>
          <p className="muted">Ce lien de connexion n’est plus valable (il ne sert qu’une fois et expire au bout d’une heure).</p>
          <a className="btn" href="/login">Demander un nouveau lien</a>
        </>
      ) : (
        <p className="muted">Connexion en cours…</p>
      )}
    </main>
  );
}
