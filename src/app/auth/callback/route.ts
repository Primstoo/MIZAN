import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Retour du lien magique ou de Google : on échange le code contre une session.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}/app`);
  }
  return NextResponse.redirect(`${origin}/login?erreur=lien`);
}
