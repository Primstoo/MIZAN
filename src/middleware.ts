import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rafraîchit la session à chaque requête et protège /app.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(toSet) {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  // Une redirection doit garder les cookies posés par Supabase (session rafraîchie, ou session expirée effacée) :
  // sans ça, un vieux jeton reste dans le navigateur et chaque requête refait l'erreur « refresh token not found ».
  const vers = (chemin: string) => {
    const url = request.nextUrl.clone();
    url.pathname = chemin;
    if (chemin === "/app") url.search = "";
    const r = NextResponse.redirect(url);
    response.cookies.getAll().forEach((c) => r.cookies.set(c));
    return r;
  };
  if (!user && request.nextUrl.pathname.startsWith("/app")) return vers("/login");
  if (user && request.nextUrl.pathname === "/login") return vers("/app");
  return response;
}

export const config = { matcher: ["/app/:path*", "/login"] };
