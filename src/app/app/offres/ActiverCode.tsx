"use client";
import { useFormState, useFormStatus } from "react-dom";
import { activerCode } from "../actions";

function Bouton() {
  const { pending } = useFormStatus();
  return <button className="btn" disabled={pending}>{pending ? "Vérification…" : "Activer"}</button>;
}

export default function ActiverCode() {
  const [msg, action] = useFormState(activerCode, "");
  return (
    <form action={action} className="stack">
      <label htmlFor="code">Code reçu après ton paiement</label>
      <div className="row">
        <input id="code" name="code" placeholder="TOUMAI-XXXX-XXXX" autoComplete="off" autoCapitalize="characters" required />
        <Bouton />
      </div>
      {msg && <p className={`alert ${msg.startsWith("✓") ? "ok" : "bad"}`} role="status">{msg}</p>}
    </form>
  );
}
