"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { declarerDocument, preparerEnvoi } from "../actions";

const MAX = 15 * 1024 * 1024;

export default function Envoi({ modules }: { modules: { slug: string; titre: string }[] }) {
  const router = useRouter();
  const [type, setType] = useState("cours");
  const [module, setModule] = useState(modules[0]?.slug ?? "");
  const [libre, setLibre] = useState("");
  const [etab, setEtab] = useState("FSABM · Béni Mellal");
  const [fichiers, setFichiers] = useState<File[]>([]);
  const [etat, setEtat] = useState<{ t: "ok" | "bad"; m: string } | null>(null);
  const [charge, setCharge] = useState(false);

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!fichiers.length) return;
    if (module === "autre" && !libre.trim()) { setEtat({ t: "bad", m: "Indique le nom du module." }); return; }
    setCharge(true); setEtat(null);
    const sb = createClient();
    let ok = 0;
    for (const f of fichiers) {
      if (f.size > MAX) { setEtat({ t: "bad", m: `« ${f.name} » dépasse 15 Mo.` }); continue; }
      const p = await preparerEnvoi(f.name);
      if ("erreur" in p) { setEtat({ t: "bad", m: p.erreur }); break; }
      const chemin = p.chemin;
      const { error } = await sb.storage.from("documents").uploadToSignedUrl(chemin, p.jeton, f, { contentType: f.type || undefined });
      if (error) { setEtat({ t: "bad", m: `Envoi de « ${f.name} » impossible : ${error.message}` }); continue; }
      const msg = await declarerDocument({ chemin, nom: f.name, type, module, moduleLibre: libre, etablissement: etab });
      if (msg) setEtat({ t: "bad", m: msg }); else ok++;
    }
    setCharge(false);
    if (ok) { setEtat({ t: "ok", m: `${ok} document${ok > 1 ? "s" : ""} envoyé${ok > 1 ? "s" : ""}. Merci ! Tu seras crédité après vérification.` }); setFichiers([]); router.refresh(); }
  }

  return (
    <form onSubmit={envoyer} className="stack bloc">
      <label>Type de document
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="cours">Cours (diapos, polycopié)</option>
          <option value="td">TD ou TP (énoncés, corrigés)</option>
          <option value="annale">Sujet d&apos;examen (annale)</option>
          <option value="autre">Autre</option>
        </select>
      </label>
      <label>Module
        <select value={module} onChange={(e) => setModule(e.target.value)}>
          {modules.map((m) => <option key={m.slug} value={m.slug}>{m.titre}</option>)}
          <option value="autre">Un autre module (pas encore sur ToumaiLearn)</option>
        </select>
      </label>
      {module === "autre" && <input value={libre} onChange={(e) => setLibre(e.target.value)} placeholder="Nom du module et du prof (ex. Analyse 2, Pr X)" />}
      <label>Établissement et filière<input value={etab} onChange={(e) => setEtab(e.target.value)} /></label>
      <label>Fichiers (PDF ou photos, 15 Mo max chacun)
        <input type="file" multiple accept="application/pdf,image/*" onChange={(e) => setFichiers(Array.from(e.target.files ?? []))} />
      </label>
      <button className="btn" disabled={charge || !fichiers.length}>{charge ? "Envoi en cours…" : fichiers.length > 1 ? `Envoyer ${fichiers.length} fichiers` : "Envoyer"}</button>
      {etat && <p className={`alert ${etat.t}`} role="status">{etat.m}</p>}
    </form>
  );
}
