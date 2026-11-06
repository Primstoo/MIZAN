"use client";
import { useEffect, useState } from "react";

// Thème clair / sombre / auto, gardé dans ce navigateur (clé tl-theme, lue dans layout.tsx avant l'affichage).
type T = "auto" | "light" | "dark";
export default function Theme() {
  const [t, setT] = useState<T>("auto");
  useEffect(() => {
    try { const v = localStorage.getItem("tl-theme"); if (v === "light" || v === "dark") setT(v); } catch {}
  }, []);
  const choisir = (v: T) => {
    setT(v);
    try { if (v === "auto") localStorage.removeItem("tl-theme"); else localStorage.setItem("tl-theme", v); } catch {}
    if (v === "auto") delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = v;
  };
  return (
    <div className="segm" role="group" aria-label="Thème">
      {([["light", "Clair"], ["dark", "Sombre"], ["auto", "Auto"]] as [T, string][]).map(([v, l]) => (
        <button key={v} type="button" aria-pressed={t === v} onClick={() => choisir(v)}>{l}</button>
      ))}
    </div>
  );
}
