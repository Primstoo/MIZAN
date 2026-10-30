"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Synchronise la progression d'un module (stockée dans le localStorage du navigateur)
// avec la table Supabase « progress ». L'iframe est sur le même domaine : elle partage
// donc ce localStorage. Ordre : 1) on récupère la sauvegarde serveur, 2) on la pose
// dans le localStorage si elle est plus récente, 3) seulement ensuite on affiche le module.
type Props = { slug: string; fichier: string; titre: string; cles: string[] };

const match = (k: string, cles: string[]) =>
  cles.some((c) => (c.endsWith("*") ? k.startsWith(c.slice(0, -1)) : k === c));

function lireLocal(cles: string[]) {
  const out: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && match(k, cles)) out[k] = localStorage.getItem(k) ?? "";
  }
  return out;
}

export default function ModuleFrame({ slug, fichier, titre, cles }: Props) {
  const [pret, setPret] = useState(false);
  const [etat, setEtat] = useState("Chargement de ta progression…");
  const dernier = useRef("");
  const stampKey = `mizan-sync-${slug}`;

  useEffect(() => {
    const sb = createClient();
    let actif = true;

    async function charger() {
      try {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) return;
        const { data } = await sb.from("progress").select("data, updated_at")
          .eq("module_slug", slug).maybeSingle();
        const local = Number(localStorage.getItem(stampKey) || 0);
        const serveur = data ? Date.parse(data.updated_at) : 0;
        if (data && serveur > local) {
          for (const [k, v] of Object.entries((data.data ?? {}) as Record<string, string>)) {
            if (match(k, cles)) localStorage.setItem(k, v);
          }
          localStorage.setItem(stampKey, String(serveur));
        }
        dernier.current = JSON.stringify(lireLocal(cles));
        setEtat("");
      } catch {
        setEtat("Hors ligne : progression locale uniquement");
      } finally {
        if (actif) setPret(true);
      }
    }

    async function envoyer() {
      const snap = lireLocal(cles);
      const json = JSON.stringify(snap);
      if (json === dernier.current) return;
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;
      const now = new Date().toISOString();
      const { error } = await sb.from("progress").upsert(
        { user_id: user.id, module_slug: slug, data: snap, updated_at: now },
        { onConflict: "user_id,module_slug" }
      );
      if (!error) {
        dernier.current = json;
        localStorage.setItem(stampKey, String(Date.parse(now)));
        setEtat("");
      } else setEtat("Sauvegarde en ligne impossible (" + error.code + ")");
    }

    charger();
    const t = setInterval(envoyer, 20000);
    const cache = () => { if (document.visibilityState === "hidden") envoyer(); };
    document.addEventListener("visibilitychange", cache);
    window.addEventListener("pagehide", envoyer);
    return () => {
      actif = false;
      clearInterval(t);
      document.removeEventListener("visibilitychange", cache);
      window.removeEventListener("pagehide", envoyer);
      envoyer();
    };
  }, [slug, cles, stampKey]);

  return (
    <>
      {etat && <p className="sync">{etat}</p>}
      {pret && <iframe src={`/app/modules/${fichier}`} title={titre} className="frame" />}
    </>
  );
}
