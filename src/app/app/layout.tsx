import { createClient } from "@/lib/supabase/server";
import { assurerMembre } from "@/lib/acces";
import Rejoindre from "./Rejoindre";
import Nav from "@/components/Nav";

// Tout /app est réservé aux membres. Sans invitation validée : écran du code
// (sauf en inscription libre, INSCRIPTION_LIBRE=1 : le compte devient membre à la première visite).
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: { user } } = await createClient().auth.getUser();
  if (!(await assurerMembre(user))) return <Rejoindre email={user?.email} />;
  return <div className="shell"><Nav />{children}</div>;
}
