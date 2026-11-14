"use client";
import { usePathname } from "next/navigation";

// Barre de navigation : trois onglets, en bas sur téléphone, en haut sur ordinateur. Masquée dans un module.
const LIENS = [
  { href: "/app", label: "Aujourd'hui", ic: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3", sous: [] as string[] },
  { href: "/app/modules", label: "Cours", ic: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5", sous: ["/app/module/", "/app/progres"] },
  { href: "/app/moi", label: "Moi", ic: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0", sous: ["/app/supports", "/app/cours/", "/app/offres", "/app/live", "/app/contribuer"] },
];

export default function Nav() {
  const p = usePathname();
  if (p.startsWith("/app/m/") || p === "/app/bienvenue" || p.startsWith("/app/niveau/") || p.startsWith("/app/blanc/")) return null;
  return (
    <nav className="nav" aria-label="Navigation">
      <a href="/app" className="logo nav-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icon.svg" alt="" width={26} height={26} style={{ verticalAlign: "middle", marginRight: 8, borderRadius: 6 }} />ToumaiLearn</a>
      {LIENS.map((l) => {
        const on = l.href === "/app" ? p === "/app" : p.startsWith(l.href) || l.sous.some((s) => p.startsWith(s));
        return (
          <a key={l.href} href={l.href} className={on ? "on" : ""} aria-current={on ? "page" : undefined}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"><path d={l.ic} /></svg>
            <span>{l.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
