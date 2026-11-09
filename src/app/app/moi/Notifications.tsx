"use client";
import { useEffect, useState } from "react";
import { sabonner, seDesabonner } from "../push/actions";

const cle = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
const versBytes = (b64: string) => {
  const p = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + p).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
};

type Etat = "chargement" | "indisponible" | "ios" | "refuse" | "inactif" | "actif";

export default function Notifications() {
  const [etat, setEtat] = useState<Etat>("chargement");
  const [msg, setMsg] = useState("");
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    (async () => {
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      const installee = window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
      if (!cle) return setEtat("indisponible");
      if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) return setEtat(ios && !installee ? "ios" : "indisponible");
      if (Notification.permission === "denied") return setEtat("refuse");
      const reg = await navigator.serviceWorker.register("/sw.js");
      const abo = await reg.pushManager.getSubscription();
      setEtat(abo && Notification.permission === "granted" ? "actif" : "inactif");
    })().catch(() => setEtat("indisponible"));
  }, []);

  async function activer() {
    setCharge(true); setMsg("");
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") { setEtat(perm === "denied" ? "refuse" : "inactif"); return; }
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      const abo = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: versBytes(cle) }));
      const j = abo.toJSON();
      const err = await sabonner({ endpoint: abo.endpoint, p256dh: j.keys?.p256dh ?? "", auth: j.keys?.auth ?? "" }, navigator.userAgent);
      if (err) { setMsg(err); return; }
      setEtat("actif");
    } catch (e) { setMsg("Activation impossible : " + (e as Error).message); }
    finally { setCharge(false); }
  }

  async function desactiver() {
    setCharge(true);
    try {
      const reg = await navigator.serviceWorker.getRegistration("/sw.js");
      const abo = await reg?.pushManager.getSubscription();
      if (abo) { await seDesabonner(abo.endpoint); await abo.unsubscribe(); }
      setEtat("inactif");
    } finally { setCharge(false); }
  }

  if (etat === "chargement" || etat === "indisponible") return etat === "indisponible" ? <p className="small muted">Les notifications ne sont pas disponibles sur cet appareil ou ce navigateur.</p> : null;
  if (etat === "ios") return <p className="small muted">Sur iPhone : dans Safari, touche Partager puis « Sur l&apos;écran d&apos;accueil », ouvre ToumaiLearn depuis cette icône, puis reviens ici pour activer les notifications.</p>;
  if (etat === "refuse") return <p className="small muted">Les notifications sont bloquées pour ce site. Autorise-les dans les réglages du navigateur, puis recharge la page.</p>;
  return (
    <div className="stack">
      {etat === "actif"
        ? <button className="btn alt small" disabled={charge} onClick={desactiver}>Désactiver les notifications sur cet appareil</button>
        : <button className="btn small" disabled={charge} onClick={activer}>{charge ? "Activation…" : "Activer les notifications"}</button>}
      {etat === "actif" && <p className="small muted">Notifications activées sur cet appareil.</p>}
      {msg && <p className="alert bad" role="status">{msg}</p>}
    </div>
  );
}
