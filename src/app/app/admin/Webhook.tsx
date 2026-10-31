"use client";
import { useState } from "react";
import { activerWebhook } from "../actions";

export default function Webhook() {
  const [msg, setMsg] = useState("");
  return (
    <span className="row">
      <button className="btn alt small" onClick={async () => setMsg(await activerWebhook())}>Activer / réparer le bot</button>
      {msg && <span className="small">{msg}</span>}
    </span>
  );
}
