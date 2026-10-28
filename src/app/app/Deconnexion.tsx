"use client";
import { createClient } from "@/lib/supabase/client";

export default function Deconnexion() {
  return (
    <button className="btn alt small" onClick={async () => { await createClient().auth.signOut(); window.location.href = "/"; }}>
      Déconnexion
    </button>
  );
}
