import { redirect } from "next/navigation";
// « Ma fac » est intégré à la page Modules.
export default function MaFac({ searchParams }: { searchParams: { s?: string } }) {
  redirect(searchParams.s ? `/app/supports?s=${encodeURIComponent(searchParams.s)}` : "/app/supports");
}
