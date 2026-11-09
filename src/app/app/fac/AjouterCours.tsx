"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { preparerEnvoi } from "../actions";
import { declarerCours } from "./actions";

const MAX = 15 * 1024 * 1024;

// « Mon module n'y est pas » : l'élève dépose son support, l'IA en tire fiche, QCM et flashcards pour lui.
export default function AjouterCours({ semestre, reste, modules }: { semestre: string; reste: number; modules: string[] }) {
  const router = useRouter();
  const [ouvert, setOuvert] = useState(false);
  const [module, setModule] = useState("");
  const [type, setType] = useState("cours");
  const [fichier, setFichier] = useState<File | null>(null);
  const [etat, setEtat] = useState("");
  const [charge, setCharge] = useState(false);

  if (!ouvert) return (
    <button type="button" className="btn big" onClick={() => setOuvert(true)}>
      + Mon cours n&apos;y est pas : je l&apos;ajoute
    </button>
  );

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!fichier) return;
    if (fichier.size > MAX) { setEtat("Le fichier dépasse 15 Mo."); return; }
    setCharge(true); setEtat("");
    const p = await preparerEnvoi(fichier.name);
    if ("erreur" in p) { setEtat(p.erreur); setCharge(false); return; }
    const { error } = await createClient().storage.from("documents").uploadToSignedUrl(p.chemin, p.jeton, fichier, { contentType: fichier.type || undefined });
    if (error) { setEtat("Envoi impossible : " + error.message); setCharge(false); return; }
    const r = await declarerCours({ chemin: p.chemin, nom: fichier.name, type, module, semestre });
    if ("erreur" in r) { setEtat(r.erreur); setCharge(false); return; }
    // La page du cours lance l'analyse et attend le résultat.
    router.push(`/app/cours/${r.id}`);
  }

  return (
    <form onSubmit={envoyer} className="card stack">
      <h3>Ajouter mon cours ({semestre})</h3>
      <p className="small muted">Ton fichier reste privé. Tu reçois en 1 à 2 minutes une fiche, un quiz et des flashcards, rien que pour toi. {reste} import{reste > 1 ? "s" : ""} restant{reste > 1 ? "s" : ""}.</p>
      <label htmlFor="mod">Module</label>
      <input id="mod" list="mods" value={module} onChange={(e) => setModule(e.target.value)} placeholder="Ex. Analyse 1, Pr X" required minLength={2} />
      <datalist id="mods">{modules.map((m) => <option key={m} value={m} />)}</datalist>
      <label htmlFor="type">Type</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="cours">Cours (diapos, polycopié)</option>
        <option value="td">TD ou TP</option>
        <option value="annale">Sujet d&apos;examen</option>
        <option value="autre">Autre</option>
      </select>
      <label htmlFor="f">Fichier (PDF ou photo, 15 Mo max)</label>
      <input id="f" type="file" accept="application/pdf,image/*" onChange={(e) => setFichier(e.target.files?.[0] ?? null)} required />
      {etat && <p className="alert bad" role="alert">{etat}</p>}
      <button className="btn big" disabled={charge || !fichier || reste <= 0}>{charge ? "Envoi en cours…" : "Envoyer et analyser"}</button>
      <button type="button" className="btn alt" onClick={() => setOuvert(false)}>Annuler</button>
    </form>
  );
}
