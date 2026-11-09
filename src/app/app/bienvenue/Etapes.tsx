"use client";
import { useState } from "react";
import { enregistrerProfil } from "../actions";
import Mascotte, { MASCOTTES, type MascotteId } from "@/components/Mascotte";
import { memeEtablissement } from "@/lib/modules";
import { SEMESTRES, suggestions, type Etab } from "@/lib/fac-commun";

type M = { slug: string; titre: string; semestre: string; etablissement: string };

export default function Etapes({ etabs, etablissementId, semestre, modules, prenom, minutes, dates, inconnues, communes, mascotte, etablissement, ville, filiere }: { etabs: Etab[]; etablissementId: string; semestre: string; etablissement: string; ville: string; filiere: string; mascotte: MascotteId; modules: M[]; prenom: string; minutes: number; dates: Record<string, string>; inconnues: string[]; communes: Record<string, { date: string; officielle: boolean }> }) {
  const [etape, setEtape] = useState(0);
  const [nom, setNom] = useState(prenom);
  const [choix, setChoix] = useState<string[]>([...Object.keys(dates), ...inconnues]);
  const [d, setD] = useState<Record<string, string>>(dates);
  const [min, setMin] = useState(minutes);
  const [inc, setInc] = useState<string[]>(inconnues);
  const frDate = (x: string) => new Date(x + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const [etab, setEtab] = useState(etablissement);
  const [vil, setVil] = useState(ville);
  const [tous, setTous] = useState(false);
  const [etabId, setEtabId] = useState(etablissementId);
  const [sem, setSem] = useState(semestre);
  const props = etabId ? [] : suggestions(etab, etabs);
  const total = 4;
  const auj = new Date().toISOString().slice(0, 10);
  // Modules de son établissement d'abord ; « voir tous les modules » pour les autres facs qui veulent essayer.
  const siens = modules.filter((m) => memeEtablissement(etab, m.etablissement));
  const visibles = tous ? modules : siens;
  const choixV = choix.filter((s) => visibles.some((m) => m.slug === s));
  const peutSuivre = etape === 0 ? nom.trim().length > 0
    : etape === 1 ? (etabId ? true : etab.trim().length > 3 && vil.trim().length > 1) && !!sem
    : etape === 2 ? choixV.length === 0 ? visibles.length === 0 || siens.length === 0 : choixV.every((s) => d[s] || inc.includes(s))
    : true;

  return (
    <form action={enregistrerProfil} className="onb">
      <input type="hidden" name="complet" value="1" />
      <div className="bar"><i style={{ width: `${((etape + 1) / total) * 100}%` }} /></div>
      <p className="eyebrow">Étape {etape + 1} sur {total}</p>

      {/* Les champs restent dans le formulaire même quand l'étape est masquée */}
      <section hidden={etape !== 0}>
        <h1>Comment tu t&apos;appelles ?</h1>
        <p className="muted">Pour que l&apos;appli s&apos;adresse à toi.</p>
        <input name="prenom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ton prénom" autoComplete="given-name" />
        <p className="eyebrow">Ton guide (tu pourras changer plus tard)</p>
        <div className="mascottes" role="radiogroup" aria-label="Choix du guide">
          {MASCOTTES.map((m) => (
            <label key={m.id}>
              <input type="radio" name="mascotte" value={m.id} defaultChecked={m.id === mascotte} />
              <Mascotte id={m.id} taille={64} decor />
              {m.nom}
            </label>
          ))}
        </div>
      </section>

      <section hidden={etape !== 1}>
        <h1>Où est-ce que tu étudies ?</h1>
        <p className="muted">Fac, école, institut ou centre de formation : écris son nom en toutes lettres. On te montre ensuite les modules de ton établissement, et tu pourras ajouter les tiens.</p>
        <label htmlFor="etab">Nom de ton établissement</label>
        <input id="etab" name="etablissement" value={etab} onChange={(e) => { setEtab(e.target.value); setEtabId(""); }} placeholder="Ex. Faculté des Sciences Appliquées de Béni Mellal" autoComplete="organization" />
        <input type="hidden" name="etablissement_id" value={etabId} />
        {props.length > 0 && (
          <div className="sugg" aria-label="Établissements trouvés">
            <span className="small muted">C&apos;est l&apos;un de ceux-là ?</span>
            {props.map((x) => (
              <button type="button" key={x.id} onClick={() => { setEtabId(x.id); setEtab(x.nom); if (x.ville) setVil(x.ville); }}>
                <strong>{x.nom}</strong>{x.ville ? <span className="small muted"> · {x.ville}</span> : null}
              </button>
            ))}
          </div>
        )}
        {etabId ? <p className="small muted">✓ Établissement reconnu. <button type="button" className="lien" onClick={() => setEtabId("")}>Ce n&apos;est pas le mien</button></p>
          : etab.trim().length > 3 && !props.length && <p className="small muted">Pas encore sur ToumaiLearn : tu l&apos;ajoutes pour toute ta promo.</p>}
        <label htmlFor="ville">Ville</label>
        <input id="ville" name="ville" value={vil} onChange={(e) => setVil(e.target.value)} placeholder="Ex. Béni Mellal" autoComplete="address-level2" />
        <label htmlFor="filiere">Filière (facultatif)</label>
        <input id="filiere" name="filiere" defaultValue={filiere} placeholder="Ex. MIACSD, Génie informatique, BTS DSI" />
        <label htmlFor="semestre">Ton semestre actuel</label>
        <select id="semestre" name="semestre" value={sem} onChange={(e) => setSem(e.target.value)}>
          <option value="" disabled>Choisis</option>
          {SEMESTRES.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
      </section>

      <section hidden={etape !== 2}>
        <h1>Quels modules, et c&apos;est quand l&apos;examen ?</h1>
        {siens.length === 0 && !tous ? (
          <div className="card soft stack">
            <p><strong>{etab || "Ton établissement"} n&apos;est pas encore couvert.</strong> On l&apos;a noté : les établissements les plus demandés passent en premier.</p>
            <p className="small muted">Après l&apos;inscription, ajoute tes cours depuis l&apos;onglet Modules : tu reçois tes fiches et ton quiz. En attendant, tu peux essayer les modules déjà disponibles.</p>
            <button type="button" className="btn alt" onClick={() => setTous(true)}>Voir les modules disponibles</button>
          </div>
        ) : (
          <p className="muted">Coche tes modules. Si la date n&apos;est pas encore annoncée, pas de souci : on part d&apos;une estimation, mise à jour pour tout le monde dès que la date officielle tombe.</p>
        )}
        <div className="stack">
          {visibles.map((m) => {
            const on = choix.includes(m.slug);
            return (
              <div key={m.slug} className={`opt ${on ? "sel" : ""}`}>
                <label className="row">
                  <input type="checkbox" name="module" value={m.slug} checked={on}
                    onChange={() => {
                      setChoix(on ? choix.filter((x) => x !== m.slug) : [...choix, m.slug]);
                      // Date officielle connue : on la propose d'office
                      if (!on && communes[m.slug]?.officielle && !inc.includes(m.slug)) setInc([...inc, m.slug]);
                    }} />
                  <span><strong>{m.titre}</strong> <span className="muted small">· {m.semestre}</span></span>
                </label>
                {on && (() => {
                  const c = communes[m.slug];
                  const x = inc.includes(m.slug);
                  return (
                    <>
                      {c?.officielle && <p className="small ok">Date officielle : {frDate(c.date)}</p>}
                      <label className="row small inc">
                        <input type="checkbox" name={`inconnue_${m.slug}`} value="1" checked={x}
                          onChange={() => setInc(x ? inc.filter((y) => y !== m.slug) : [...inc, m.slug])} />
                        {c?.officielle ? "Utiliser la date officielle" : "Date pas encore annoncée"}
                      </label>
                      {x ? (
                        <p className="small muted">{c ? `On part sur le ${frDate(c.date)}${c.officielle ? "" : " (estimation)"}.` : `On part sur une estimation : fin de semestre (${m.semestre.replace(/\D/g, "") && Number(m.semestre.replace(/\D/g, "")) % 2 ? "mi-janvier" : "mi-juin"}). Elle sera remplacée dès que la date est connue.`}</p>
                      ) : (
                        <label className="date">Date de l&apos;examen
                          <input type="date" name={`date_${m.slug}`} min={auj} value={d[m.slug] ?? ""} onChange={(e) => setD({ ...d, [m.slug]: e.target.value })} required />
                        </label>
                      )}
                    </>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </section>

      <section hidden={etape !== 3}>
        <h1>Combien de temps par jour ?</h1>
        <p className="muted">Sois réaliste : mieux vaut 30 minutes tous les jours que 3 heures une fois par semaine.</p>
        <input type="hidden" name="minutes" value={min} />
        {[30, 60, 120].map((v) => (
          <button type="button" key={v} className={`opt big-opt ${min === v ? "sel" : ""}`} onClick={() => setMin(v)}>
            {v === 30 ? "30 minutes" : v === 60 ? "1 heure" : "2 heures et plus"}
          </button>
        ))}
        <div className="card soft"><p className="small">Ensuite, ouvre ton premier module : chaque jour, la page Aujourd&apos;hui te dira quoi faire.</p></div>
      </section>

      <div className="row between onb-nav">
        {etape > 0 ? <button type="button" className="btn alt" onClick={() => setEtape(etape - 1)}>Retour</button> : <span />}
        {etape < total - 1
          ? <button type="button" className="btn" disabled={!peutSuivre} onClick={() => setEtape(etape + 1)}>Continuer</button>
          : <button type="submit" className="btn">C&apos;est parti</button>}
      </div>
    </form>
  );
}
