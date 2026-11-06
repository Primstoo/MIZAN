import { notFound } from "next/navigation";
import { getModule } from "@/lib/modules";
import BANQUE from "@/lib/banque.json";
import CATALOGUE from "@/lib/notions.json";
import Blanc from "./Blanc";
import { createClient } from "@/lib/supabase/server";
import { estAdmin } from "@/lib/acces";
import { rangEffectif } from "@/lib/offres";

export const dynamic = "force-dynamic";
export function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `Examen blanc · ${getModule(params.slug)?.titre ?? ""}` };
}

type Q = { id: number; n: string; q: string; o: string[]; a: number; e: string };
const melanger = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// Sujet tiré au hasard : une question par notion, les notions importantes d'abord, puis complété au hasard.
function sujet(slug: string, nb: number): Q[] {
  const banque = ((BANQUE as unknown as Record<string, Omit<Q, "id">[]>)[slug] ?? []).map((q, id) => ({ ...q, id }));
  const imp = new Map(((CATALOGUE as Record<string, { items: { id: string; imp: number }[] }>)[slug]?.items ?? []).map((i) => [i.id, i.imp]));
  const parNotion = new Map<string, Q[]>();
  melanger(banque).forEach((q) => parNotion.set(q.n, [...(parNotion.get(q.n) ?? []), q]));
  const notions = melanger(Array.from(parNotion.keys())).sort((a, b) => (imp.get(b) ?? 3) - (imp.get(a) ?? 3));
  const out: Q[] = notions.slice(0, nb).map((n) => parNotion.get(n)![0]);
  const reste = melanger(banque.filter((q) => !out.includes(q)));
  while (out.length < nb && reste.length) out.push(reste.pop()!);
  return melanger(out);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  if (!m) notFound();
  const { data: { user } } = await createClient().auth.getUser();
  if ((await rangEffectif(user!.id, estAdmin(user))) < 3) return (
    <main className="page">
      <p className="eyebrow">Examen blanc</p>
      <h1>Inclus dans l&apos;offre Premium</h1>
      <p className="muted">15 questions chronométrées, note sur 20 et corrigé détaillé, comme le jour de l&apos;examen.</p>
      <p className="row"><a href="/app/offres" className="btn">Voir les offres</a><a href={`/app/m/${m.slug}`} className="btn alt">Retour au module</a></p>
    </main>
  );
  const qs = sujet(m.slug, 15);
  if (qs.length < 5) notFound();
  return <Blanc slug={m.slug} titre={m.titre} questions={qs} minutes={20} />;
}
