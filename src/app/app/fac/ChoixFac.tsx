"use client";
import { useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { suggestions, type Etab } from "@/lib/fac-commun";
import { choisirFac } from "./actions";

function Bouton({ texte }: { texte: string }) {
  const { pending } = useFormStatus();
  return <button className="btn big" disabled={pending}>{pending ? "Un instant…" : texte}</button>;
}

// Saisie libre du nom de l'établissement, avec les établissements déjà connus proposés au fil de la frappe.
export default function ChoixFac({ etabs }: { etabs: Etab[] }) {
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [choisi, setChoisi] = useState<Etab | null>(null);
  const [msg, action] = useFormState(choisirFac, "");
  const props = useMemo(() => suggestions(nom, etabs), [nom, etabs]);

  return (
    <form action={action} className="stack">
      <label htmlFor="nom">Ton établissement, en toutes lettres</label>
      <input id="nom" name="nom" value={nom} autoComplete="off" autoFocus list="liste-etabs-fac"
        onChange={(e) => { const v = e.target.value; setNom(v); setChoisi(etabs.find((x) => x.nom === v) ?? null); }}
        placeholder="Choisis dans la liste ou écris le nom" />
      <datalist id="liste-etabs-fac">{[...etabs].sort((a, b) => a.nom.localeCompare(b.nom, "fr")).map((x) => <option key={x.id} value={x.nom}>{x.ville ?? ""}</option>)}</datalist>
      <input type="hidden" name="id" value={choisi?.id ?? ""} />

      {nom.trim().length >= 2 && (
        props.length ? (
          <div className="sugg" aria-label="Établissements trouvés">
            <span className="small muted">C&apos;est l&apos;un de ceux-là ?</span>
            {props.map((e) => (
              <button type="button" key={e.id} className={choisi?.id === e.id ? "on" : ""} aria-pressed={choisi?.id === e.id}
                onClick={() => { setChoisi(e); setNom(e.nom); }}>
                <strong>{e.nom}</strong>{e.ville ? <span className="small muted"> · {e.ville}</span> : null}
                {!e.valide && <span className="small muted"> · ajouté par un élève</span>}
              </button>
            ))}
          </div>
        ) : null
      )}

      {!choisi && nom.trim().length >= 4 && (
        <>
          <label htmlFor="ville">Ville</label>
          <input id="ville" name="ville" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ex. Béni Mellal" autoComplete="address-level2" />
        </>
      )}
      {msg && <p className="alert bad" role="alert">{msg}</p>}
      <Bouton texte={choisi ? "C'est mon établissement" : "Ajouter mon établissement"} />
    </form>
  );
}
