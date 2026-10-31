import { notFound } from "next/navigation";
import { getModule } from "@/lib/modules";
import NIVEAU from "@/lib/niveau.json";
import Test from "./Test";

export function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `Test de niveau · ${getModule(params.slug)?.titre ?? ""}` };
}

type Q = { n: string; q: string; o: string[]; a: number; e: string };

export default function Niveau({ params, searchParams }: { params: { slug: string }; searchParams: { premier?: string } }) {
  const m = getModule(params.slug);
  const qs = (NIVEAU as Record<string, Q[]>)[params.slug];
  if (!m || !qs?.length) notFound();
  return <Test slug={m.slug} titre={m.titre} questions={qs} premier={searchParams.premier === "1"} />;
}
