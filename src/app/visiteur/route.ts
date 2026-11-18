import { NextResponse } from "next/server";

// « Découvrir sans compte » : ouvre l'appli en mode visiteur (Aujourd'hui + cours ouverts).
export function GET(request: Request) {
  const r = NextResponse.redirect(new URL("/app", request.url));
  r.cookies.set("tl_visiteur", "1", { path: "/", maxAge: 60 * 60 * 24 * 90, sameSite: "lax", httpOnly: true, secure: true });
  return r;
}
