import { notFound } from "next/navigation";
import { getModule } from "@/lib/modules";

// Le module d'origine (HTML autonome) est affiché en plein écran.
// Le pont (public/mizan-bridge.js, jour 2) lui fournit tuteur et sauvegarde.
export default function ModulePage({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  if (!m) notFound();
  return (
    <main className="module">
      <header className="top slim">
        <a href="/app" className="back">← Mes modules</a>
        <strong>{m.titre}</strong>
      </header>
      <iframe src={`/modules/${m.fichier}?slug=${m.slug}`} title={m.titre} className="frame" />
    </main>
  );
}
