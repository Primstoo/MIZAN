"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { rejoindre } from "./actions";
import Deconnexion from "./Deconnexion";

function Bouton() {
  const { pending } = useFormStatus();
  return <button className="btn big" disabled={pending}>{pending ? "Vérification…" : "Entrer"}</button>;
}

// Écran d'entrée de la bêta privée : un code d'invitation est nécessaire.
export default function Rejoindre({ email }: { email?: string }) {
  const [msg, action] = useFormState(rejoindre, "");
  const [code, setCode] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const auto = useRef(false);
  useEffect(() => { try { setCode(localStorage.getItem("mizan-invite") || ""); } catch {} }, []);
  // Code déjà vérifié avant la connexion : on entre directement, une seule fois (en cas d'erreur, l'élève corrige).
  useEffect(() => { if (code && !auto.current && !msg) { auto.current = true; form.current?.requestSubmit(); } }, [code, msg]);
  useEffect(() => { if (msg) try { localStorage.removeItem("mizan-invite"); } catch {} }, [msg]);
  return (
    <main className="gate">
      <a href="/" className="logo">ToumaiLearn</a>
      <p className="eyebrow">Bêta privée</p>
      <h1>Entre ton code d&apos;invitation</h1>
      <p className="muted">ToumaiLearn est ouvert sur invitation. Demande un code à un camarade déjà inscrit : il le trouve dans l&apos;onglet « Moi ».</p>
      <form ref={form} action={action} className="stack">
        <label htmlFor="code">Code d&apos;invitation</label>
        <input id="code" name="code" placeholder="MZ-XXXXXX" autoComplete="off" autoCapitalize="characters" required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
        <Bouton />
      </form>
      {msg && <p className="alert bad" role="alert">{msg}</p>}
      <div className="row between">
        <span className="small muted">Connecté : {email}</span>
        <Deconnexion />
      </div>
    </main>
  );
}
