"use client";
import { useFormState, useFormStatus } from "react-dom";
import { accorderOffreAdmin, genererCodes } from "../actions";

function Envoyer({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn small" disabled={pending}>{pending ? "…" : label}</button>;
}

const Plan = () => (
  <select name="plan" defaultValue="premium"><option value="premium">Premium</option><option value="essentiel">Essentiel</option></select>
);

// Après un paiement : générer des codes à envoyer (voie normale) ou activer directement un élève (secours).
export default function OffresAdmin() {
  const [codes, generer] = useFormState(genererCodes, "");
  const [msg, accorder] = useFormState(accorderOffreAdmin, "");
  const liste = codes && codes.startsWith("TOUMAI-") ? codes.split("\n") : [];
  return (
    <div className="stack">
      <form action={generer} className="row">
        <Plan />
        <label className="row small">Jours <input name="jours" type="number" min={1} max={400} defaultValue={30} style={{ width: 70 }} /></label>
        <label className="row small">Nombre <input name="nombre" type="number" min={1} max={50} defaultValue={1} style={{ width: 60 }} /></label>
        <input name="lot" placeholder="Lot (ex. centre X, promo TikTok)" />
        <Envoyer label="Générer" />
      </form>
      {liste.length > 0 && <textarea readOnly rows={Math.min(8, liste.length)} value={liste.join("\n")} className="code" onFocus={(e) => e.currentTarget.select()} />}
      {codes && !liste.length && <p className="alert bad small">{codes}</p>}
      <form action={accorder} className="row">
        <input name="email" type="email" placeholder="E-mail de l'élève" required />
        <Plan />
        <label className="row small">Jours <input name="jours" type="number" min={1} max={400} defaultValue={30} style={{ width: 70 }} /></label>
        <Envoyer label="Activer" />
      </form>
      {msg && <p className={`alert small ${msg.startsWith("✓") ? "ok" : "bad"}`}>{msg}</p>}
    </div>
  );
}
