-- Rappels du soir (28/11/2026) : journal des notifications envoyées, pour espacer les rappels.
create table if not exists public.rappels_envoyes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('inscription','inactif','examen','conseil')),
  cle text not null check (char_length(cle) <= 120),
  titre text, corps text,
  envoye boolean not null default true,
  sent_at timestamptz not null default now()
);
create index if not exists rappels_envoyes_user_idx on public.rappels_envoyes (user_id, sent_at desc);
alter table public.rappels_envoyes enable row level security;
revoke all on public.rappels_envoyes from anon, authenticated;
-- accorder_offre : un plan supérieur actif n'est jamais rétrogradé (appliqué le 28/11 sous le nom accorder_offre_sans_retrogradation).
