"use client";
import { useRef, useState } from "react";
import Mascotte, { type MascotteId } from "@/components/Mascotte";
import type { Carte } from "@/lib/conseils";

// Carte de la mascotte : elle « parle », on fait glisser pour la carte suivante.
export default function Toumai({ cartes, mascotte = "toumai" }: { cartes: Carte[]; mascotte?: MascotteId }) {
  const [i, setI] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  if (!cartes.length) return null;
  const aller = (n: number) => rail.current?.scrollTo({ left: n * rail.current.clientWidth, behavior: "smooth" });
  return (
    <section className="tm">
      <span className="tm-mascotte" aria-hidden="true"><Mascotte id={mascotte} taille={60} decor /></span>
      <div className="tm-rail" ref={rail} onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        {cartes.map((c, k) => (
          <article key={k} className="tm-carte" aria-roledescription="carte" aria-label={`${k + 1} sur ${cartes.length}`}>
            <p className="tm-etq">{c.etiquette}</p>
            {c.titre && <h2>{c.titre}</h2>}
            <p className={c.titre ? "tm-txt" : "tm-txt fort"}>{c.texte}</p>
            {c.action && <a href={c.action.href} className="tm-act">{c.action.label} ›</a>}
          </article>
        ))}
      </div>
      {cartes.length > 1 && (
        <div className="tm-points">
          {cartes.map((_, k) => <button key={k} type="button" className={k === i ? "on" : ""} aria-label={`Carte ${k + 1}`} onClick={() => aller(k)} />)}
        </div>
      )}
    </section>
  );
}
