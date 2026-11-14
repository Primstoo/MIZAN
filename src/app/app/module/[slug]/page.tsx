import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getModule } from "@/lib/modules";
import { chargerParcours, chargerMaitrise } from "@/lib/parcours";
import { notePrevue } from "@/lib/maitrise";
import Embleme from "@/components/Embleme";

// Page d'un cours : sa promesse, ses chiffres et le chemin de ses chapitres.
// Le contenu s'ouvre encore dans le module d'origine (/app/m/[slug]) en attendant les leçons natives.
export const dynamic = "force-dynamic";
export function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: getModule(params.slug)?.titre.split(" (")[0] ?? "Cours" };
}

export default async function PageCours({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  if (!m) notFound();
  const { data: { user } } = await createClient().auth.getUser();
  const [p, maitrise] = await Promise.all([chargerParcours(user!), chargerMaitrise(user!)]);
  const mc = maitrise[m.slug];
  const exam = p.examens.find((e) => e.module_slug === m.slug);
  const groupes = mc?.groupes ?? [];
  const acquis = groupes.filter((g) => g.ok === g.total).length;
  const iSuite = groupes.findIndex((g) => g.ok < g.total);
  const note = mc && mc.testes ? notePrevue(mc) : null;
  const nf = (n: number) => String(n).replace(".", ",");

  return (
    <main className="page tl">
      <a href="/app/modules" className="tl-back">← Cours</a>

      <section className="tl-une fixe">
        <span className="tl-une-deco"><Embleme slug={m.slug} taille={170} couleur="var(--acc)" /></span>
        <span className="tl-une-bas">
          <strong>{m.titre.split(" (")[0]}</strong>
          <span>{m.resume}</span>
        </span>
        <span className="tl-stats">
          <span><b>{groupes.length || "…"}</b>chapitres</span>
          <span><b>{acquis}</b>maîtrisé{acquis > 1 ? "s" : ""}</span>
          {note ? <span><b>{nf(note.note)}</b>note prévue / 20</span> : exam ? <span><b>{exam.estimee ? "≈ " : ""}{exam.reste}</b>jour{exam.reste > 1 ? "s" : ""} avant l&apos;examen</span> : null}
        </span>
      </section>

      {m.prof && <p className="small muted" style={{ margin: 0 }}>Suit le cours de {m.prof} · {m.semestre}</p>}

      <section className="tl-chemin">
        {groupes.map((g, i) => {
          const ok = g.ok === g.total, encours = !ok && g.ok + g.fragile > 0;
          if (i === iSuite) return (
            <div key={g.id} className="tl-suite">
              <div className="tl-chap"><span className="n">{String(i + 1).padStart(2, "0")}</span><span className="t"><strong>{g.t}</strong><small>{encours ? `En cours : ${g.ok} notion${g.ok > 1 ? "s" : ""} maîtrisée${g.ok > 1 ? "s" : ""} sur ${g.total}` : "Le prochain chapitre à travailler"}</small></span></div>
              <a href={`/app/m/${m.slug}`} className="tl-btn">{mc?.testes ? "Continuer" : "Commencer"}</a>
            </div>
          );
          return (
            <div key={g.id} className={`tl-chap${ok ? " ok" : ""}`}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t"><strong>{g.t}</strong><small>{ok ? "Maîtrisé" : encours ? `En cours : ${g.ok} sur ${g.total}` : "Pas encore vu"}</small></span>
              {ok && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>}
            </div>
          );
        })}
        {!groupes.length && <a href={`/app/m/${m.slug}`} className="tl-btn">Ouvrir le cours</a>}
        {groupes.length > 0 && iSuite < 0 && <a href={`/app/m/${m.slug}`} className="tl-btn">Revoir le cours</a>}
      </section>

      <div className="row">
        <a href={`/app/blanc/${m.slug}`} className="btn alt small">Examen blanc</a>
        <a href={`/app/niveau/${m.slug}`} className="btn alt small">Test de niveau</a>
        <a href="/app/progres" className="btn alt small">Mes points faibles</a>
      </div>
    </main>
  );
}
