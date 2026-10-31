import { notFound } from "next/navigation";
import { getModule } from "@/lib/modules";
import ModuleFrame from "@/components/ModuleFrame";

// Le module d'origine (HTML autonome) est affiché en plein écran.
// ModuleFrame synchronise sa progression ; le pont (public/mizan-bridge.js) lui fournit le tuteur.
export function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: getModule(params.slug)?.titre ?? "Module" };
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  if (!m) notFound();
  return (
    <main className="module">
      <header className="top slim">
        <a href="/app" className="back">← Aujourd&apos;hui</a>
        <strong>{m.titre}</strong>
      </header>
      <ModuleFrame slug={m.slug} fichier={m.fichier} titre={m.titre} cles={m.cles} />
    </main>
  );
}
