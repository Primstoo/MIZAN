"use client";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { rejoindre } from "./actions";

function Bouton() {
  const { pending } = useFormStatus();
  return <button className="btn" disabled={pending}>{pending ? "Vérification…" : "Entrer"}</button>;
}

export default function Rejoindre({ email }: { email?: string }) {
  const [msg, action] = useFormState(rejoindre, "");
  const [code, setCode] = useState("");
  useEffect(() => { try { setCode(localStorage.getItem("mizan-invite") || ""); } catch {} }, []);
  return (
    <main className="page narrow">
      <h1>MIZAN est en bêta fermée</h1>
      <p>Pour entrer, il te faut le code d&apos;invitation d&apos;un camarade déjà inscrit.</p>
      <form action={action} className="stack">
        <input name="code" placeholder="MZ-XXXXXX" autoComplete="off" required value={code} onChange={(e) => setCode(e.target.value)} />
        <Bouton />
      </form>
      {msg && <p className="erreur">{msg}</p>}
      <p className="small muted">Connecté en tant que {email}</p>
    </main>
  );
}
