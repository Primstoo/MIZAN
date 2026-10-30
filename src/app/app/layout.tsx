import { createClient } from "@/lib/supabase/server";
import { estMembre } from "@/lib/acces";
import Rejoindre from "./Rejoindre";

// Tout /app est réservé aux membres. Sans invitation validée : écran du code.
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: { user } } = await createClient().auth.getUser();
  if (!(await estMembre(user))) return <Rejoindre email={user?.email} />;
  return <>{children}</>;
}
