"use client";
import { useState } from "react";
import { lienTelegram } from "../actions";

export default function Telegram({ relie }: { relie: boolean }) {
  const [charge, setCharge] = useState(false);
  return (
    <button className="btn small" disabled={charge} onClick={async () => { setCharge(true); const u = await lienTelegram(); window.location.href = u; }}>
      {charge ? "Ouverture de Telegram…" : relie ? "Relier un autre compte Telegram" : "Recevoir mes rappels sur Telegram"}
    </button>
  );
}
