"use client";
import { useState } from "react";

export default function Copier({ texte }: { texte: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button className="btn alt small" onClick={async () => {
      const lien = `${location.origin}/login?code=${texte}`;
      try { await navigator.clipboard.writeText(`Rejoins-moi sur ToumaiLearn : ${lien} (code ${texte})`); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
    }}>{ok ? "Copié" : "Copier l'invitation"}</button>
  );
}
