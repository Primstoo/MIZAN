"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Mascotte, { type MascotteId } from "@/components/Mascotte";

// Visite guidée, une seule fois après l'inscription : le guide choisi présente chaque bouton, avec son ton à lui.
// Relançable depuis Moi › Réglages (« Revoir le tutoriel », /app?visite=1).
const CLE = "tl-visite";
// Élément mis en évidence à chaque étape ("" = aucun).
const CIBLES = ["", ".tl-seance .tl-btn", '.nav a[href="/app/modules"]', "", '.nav a[href="/app/moi"]', ""];

const TEXTES: Record<MascotteId, string[]> = {
  // Toumaï : 7 millions d'années, calme, humour sec.
  toumai: [
    "Salut {p}. Moi c'est Toumaï, 7 millions d'années. Des examens, j'en ai vu passer. Je te montre l'appli en 30 secondes.",
    "Ce gros bouton, c'est ta séance du jour. Tu appuies, tu révises. Rien d'autre à chercher.",
    "Ici, tous les cours. Tu en ouvres un et tu avances chapitre par chapitre. À ton rythme : moi, j'ai le temps.",
    "Dans un cours, le bouton « Poser une question » appelle le tuteur. Bloqué sur une ligne ? Demande-lui, il connaît le cours.",
    "Ici, ton compte : tes examens, ta progression, le thème. Et si le cours de ton prof manque, tu le déposes là.",
    "C'est tout. Le reste, c'est toi et le bouton du jour. Si tu m'oublies : Moi, puis « Revoir le tutoriel ».",
  ],
  // Fenna : la fennec, vive, curieuse, toujours pressée.
  fenna: [
    "Hé {p} ! Moi c'est Fenna. J'ai de grandes oreilles et peu de patience : visite express, 30 secondes.",
    "Ce bouton lance ta séance du jour. Un appui et c'est parti, pas besoin de réfléchir à quoi réviser.",
    "Là, tous les cours. Tu fouilles, tu en ouvres un, tu avances chapitre par chapitre.",
    "Dans un cours, « Poser une question » appelle le tuteur. Un truc pas clair ? Tu demandes tout de suite, tu ne restes pas coincé.",
    "Et là, ton coin à toi : examens, progression, thème. Le cours de ton prof manque ? Tu le déposes ici.",
    "Voilà, tu sais tout ! File réviser. Pour me revoir : Moi, puis « Revoir le tutoriel ».",
  ],
  // Kouri : le bœuf du lac Tchad, posé, solide, direct.
  kouri: [
    "Bonjour {p}. Moi c'est Kouri. Je ne cours pas, mais j'arrive toujours. Je te montre le chemin, pas à pas.",
    "Ce bouton, c'est ta séance du jour. Un pas par jour, c'est comme ça qu'on traverse le lac.",
    "Ici, tous les cours. Tu en choisis un et tu le fais chapitre par chapitre, sans sauter.",
    "Dans un cours, « Poser une question » appelle le tuteur. Tu bloques ? Tu demandes. On ne reste pas planté.",
    "Ici, ton compte : examens, progression, thème. Si le cours de ton prof manque, tu le déposes là.",
    "C'est bon, tu connais le terrain. Au travail. Pour revoir la visite : Moi, puis « Revoir le tutoriel ».",
  ],
};

export default function Visite({ mascotte, prenom }: { mascotte: MascotteId; prenom: string }) {
  const chemin = usePathname();
  const [etape, setEtape] = useState(-1); // -1 = fermée
  const [zone, setZone] = useState<{ h: number; g: number; l: number; t: number } | null>(null);

  useEffect(() => {
    if (chemin !== "/app") return;
    const force = new URLSearchParams(window.location.search).get("visite") === "1";
    let vue = false;
    try { vue = localStorage.getItem(CLE) === "1"; } catch {}
    if (force || !vue) setEtape(0);
  }, [chemin]);

  // Étape avec un bouton montré : tout le reste est flouté, et la visite n'avance que si l'élève appuie sur ce bouton.
  useEffect(() => {
    setZone(null);
    if (etape < 0) return;
    const el = CIBLES[etape] ? document.querySelector<HTMLElement>(CIBLES[etape]) : null;
    if (!el) return;
    el.classList.add("tl-cible");
    el.scrollIntoView({ block: "center" });
    const mesurer = () => { const r = el.getBoundingClientRect(); setZone({ h: r.top - 8, g: r.left - 8, l: r.width + 16, t: r.height + 16 }); };
    const appui = (e: Event) => { e.preventDefault(); e.stopPropagation(); setEtape((x) => x + 1); };
    mesurer();
    const t = setTimeout(mesurer, 300);
    el.addEventListener("click", appui, true);
    window.addEventListener("scroll", mesurer, true);
    window.addEventListener("resize", mesurer);
    return () => {
      clearTimeout(t);
      el.classList.remove("tl-cible");
      el.removeEventListener("click", appui, true);
      window.removeEventListener("scroll", mesurer, true);
      window.removeEventListener("resize", mesurer);
    };
  }, [etape]);

  function fermer() {
    try { localStorage.setItem(CLE, "1"); } catch {}
    setEtape(-1);
    if (window.location.search.includes("visite=1")) window.history.replaceState(null, "", "/app");
  }

  if (etape < 0 || chemin !== "/app") return null;
  const textes = TEXTES[mascotte];
  const dernier = etape === textes.length - 1;
  return (
    <>
      {zone ? (
        <>
          <div className="tl-voile" style={{ top: 0, left: 0, right: 0, height: Math.max(0, zone.h) }} />
          <div className="tl-voile" style={{ top: zone.h + zone.t, left: 0, right: 0, bottom: 0 }} />
          <div className="tl-voile" style={{ top: zone.h, height: zone.t, left: 0, width: Math.max(0, zone.g) }} />
          <div className="tl-voile" style={{ top: zone.h, height: zone.t, left: zone.g + zone.l, right: 0 }} />
        </>
      ) : <div className="tl-voile" style={{ inset: 0 }} />}
      <div className="tl-visite" role="dialog" aria-label="Visite guidée">
        <Mascotte id={mascotte} taille={56} decor />
        <div className="tl-visite-bulle">
          <p aria-live="polite">{textes[etape].replace("{p}", prenom || "toi")}</p>
          <div className="row between">
            <span className="small muted">{etape + 1} / {textes.length}</span>
            {zone
              ? <strong className="small tl-visite-appui">Appuie dessus pour continuer</strong>
              : <button type="button" className="btn small" onClick={() => (dernier ? fermer() : setEtape(etape + 1))}>{dernier ? "Compris" : "Suivant"}</button>}
          </div>
        </div>
      </div>
    </>
  );
}
