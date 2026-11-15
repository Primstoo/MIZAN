"use client";
import { useEffect, useRef, useState } from "react";
import { marquerInstallee } from "./actions";

// Guide d'installation, affiché seulement dans le navigateur. Il disparaît dès que l'appli est installée :
// l'appli ouverte depuis son icône le signale au compte (indispensable sur iPhone, où Safari ne sait pas
// si l'appli est installée), et Chrome le signale lui-même (événement « appinstalled »).
type Plateforme = "ios" | "android" | "ordi";
type Invite = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
const CLE = "tl-installer-plus-tard";

export default function Installer({ deja }: { deja: string[] }) {
  const [pf, setPf] = useState<Plateforme | null>(null);
  const [visible, setVisible] = useState(false);
  const [safari, setSafari] = useState(true);
  const [pret, setPret] = useState(false);
  const [integre, setIntegre] = useState(false);
  const invite = useRef<Invite | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    const p: Plateforme = ios ? "ios" : /android/i.test(ua) ? "android" : "ordi";
    const installee = window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (installee) { if (!deja.includes(p)) marquerInstallee(p).catch(() => {}); return; }
    setPf(p); setSafari(!/crios|fxios|edgios/i.test(ua));
    // Lien ouvert depuis WhatsApp, Instagram, Facebook, Telegram… : ce navigateur intégré ne sait pas installer une appli.
    setIntegre(/whatsapp|instagram|fban|fbav|fb_iab|telegram|line\/|tiktok|snapchat|; wv\)/i.test(ua));
    let plusTard = 0;
    try { plusTard = Number(localStorage.getItem(CLE) || 0); } catch { /* stockage indisponible */ }
    const cache = deja.includes(p) || Date.now() < plusTard;
    // Sur ordinateur, le guide ne s'affiche que si le navigateur propose vraiment l'installation.
    if (!cache && p !== "ordi") setVisible(true);
    const avant = (e: Event) => { e.preventDefault(); invite.current = e as Invite; setPret(true); if (!cache) setVisible(true); };
    const apres = () => { setVisible(false); marquerInstallee(p).catch(() => {}); };
    window.addEventListener("beforeinstallprompt", avant);
    window.addEventListener("appinstalled", apres);
    return () => { window.removeEventListener("beforeinstallprompt", avant); window.removeEventListener("appinstalled", apres); };
  }, [deja]);

  if (!visible || !pf) return null;

  async function installer() {
    const e = invite.current; if (!e) return;
    await e.prompt();
    const { outcome } = await e.userChoice;
    if (outcome === "accepted") setVisible(false);
    invite.current = null; setPret(false);
  }
  function plusTard() {
    try { localStorage.setItem(CLE, String(Date.now() + 7 * 86400000)); } catch { /* stockage indisponible */ }
    setVisible(false);
  }

  const etapes = integre
    ? [pf === "ios" ? "Touche les trois points ou l’icône boussole, puis « Ouvrir dans Safari »." : "Touche les trois points ⋮, puis « Ouvrir dans Chrome ».",
       "Connecte-toi à nouveau : les étapes d’installation s’afficheront ici."]
    : pf === "ios"
    ? [safari ? "Touche le bouton Partager, en bas de Safari (le carré avec une flèche vers le haut)." : "Touche le bouton Partager, en haut à droite (le carré avec une flèche vers le haut).",
       "Fais défiler et touche « Sur l’écran d’accueil ».",
       "Touche « Ajouter », puis ouvre ToumaiLearn depuis sa nouvelle icône."]
    : pf === "android"
    ? ["Touche les trois points ⋮, en haut à droite du navigateur.",
       "Touche « Ajouter à l’écran d’accueil » ou « Installer l’application ».",
       "Touche « Installer », puis ouvre ToumaiLearn depuis sa nouvelle icône."]
    : [];

  return (
    <section className="installer" aria-label="Installer l’appli">
      <h2>{integre ? "Pour installer l’appli, ouvre-la dans ton navigateur" : `Installe l’appli sur ton ${pf === "ordi" ? "ordinateur" : "téléphone"}`}</h2>
      {pret
        ? <button className="btn" onClick={installer}>Installer ToumaiLearn</button>
        : <ol>{etapes.map((t, i) => <li key={i}>{t}</li>)}</ol>}
      {!pret && !integre && pf === "ios" && !safari && <p className="small muted">L&apos;option n&apos;apparaît pas ? Ouvre toumailearn.app dans Safari : ça marche à tous les coups.</p>}
      {!pret && !integre && pf === "android" && <p className="small muted">Si on te demande, choisis « Installer » plutôt que « Créer un raccourci ».</p>}
      <button className="linkbtn" onClick={plusTard}>Plus tard</button>
    </section>
  );
}
