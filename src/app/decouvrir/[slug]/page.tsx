import { notFound } from "next/navigation";
import { getModule, MODULES } from "@/lib/modules";

export function generateStaticParams() { return MODULES.map((m) => ({ slug: m.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  return { title: m ? `${m.titre} (essai)` : "Module", description: m?.resume, alternates: { canonical: `/decouvrir/${params.slug}` } };
}

export default function ModuleVisiteur({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  if (!m) notFound();
  return (
    <main className="module">
      <header className="top slim">
        <a href="/decouvrir" className="back">← Modules</a>
        <strong>{m.titre}</strong>
        <a href="/login?invitation" className="btn small">Sauvegarder ma progression</a>
      </header>
      <iframe src={`/decouvrir/fichier/${m.fichier}`} title={m.titre} className="frame" />
    </main>
  );
}
