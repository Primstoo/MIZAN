-- Audit du 9 novembre 2026 : index manquants sur des clés étrangères (signalés par Supabase).
-- Sans risque : n'ajoute que des index. À coller dans SQL Editor → Run.
create index if not exists abonnements_referred_by_idx on public.abonnements (referred_by);
create index if not exists codes_offre_used_by_idx on public.codes_offre (used_by);

-- Établissement et ville du profil (mode visiteur / inscription guidée)
alter table public.profiles
  add column if not exists etablissement text,
  add column if not exists ville text;
