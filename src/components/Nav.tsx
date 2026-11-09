"use client";
import { usePathname } from "next/navigation";

// Barre de navigation : en bas sur téléphone, en haut sur ordinateur. Masquée dans un module.
const LIENS = [
  { href: "/app", label: "Aujourd'hui", ic: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" },
  { href: "/app/modules", label: "Modules", ic: "M4 5h7v14H4zM13 5h7v14h-7z" },
  { href: "/app/live", label: "Live", ic: "M4 6h12v12H4zM16 10l4-2v8l-4-2" },
  { href: "/app/moi", label: "Moi", ic: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" },
];

export default function Nav() {
  const p = usePathname();
  if (p.startsWith("/app/m/") || p === "/app/bienvenue" || p.startsWith("/app/niveau/") || p.startsWith("/app/blanc/")) return null;
  return (
    <nav className="nav" aria-label="Navigation">
      <a href="/app" className="logo nav-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icon.svg" alt="" width={26} height={26} style={{ verticalAlign: "middle", marginRight: 8, borderRadius: 6 }} />ToumaiLearn</a>
      {LIENS.map((l) => {
        const on = l.href === "/app" ? p === "/app" : p.startsWith(l.href);
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
