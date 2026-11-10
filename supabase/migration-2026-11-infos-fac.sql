-- Infos de la fac (10/11/2026) : annonces des groupes WhatsApp traduites par Miroir Darija.
-- Le bot les envoie à /api/infos (secret INFOS_SECRET) ; elles restent « en_attente » jusqu'à validation dans Suivi → Infos de la fac.
-- Aucune lecture directe par les élèves : tout passe par le serveur (qui applique l'établissement et l'offre).
create table if not exists public.fac_infos (
  id uuid primary key default gen_random_uuid(),
  etablissement_id uuid not null references public.etablissements(id) on delete cascade,
  semestre text,                                   -- S1 … M4, vide = tout l'établissement
  type text not null default 'annonce' check (type in ('annonce', 'examen', 'emploi_du_temps', 'document', 'autre')),
  texte_fr text not null check (char_length(texte_fr) between 3 and 2000),
  texte_original text check (char_length(texte_original) <= 2000),
  date_evenement date,                             -- date de l'examen, du rattrapage, de la séance déplacée…
  empreinte text not null unique,                  -- anti-doublon (même annonce reçue de deux groupes)
  source text,                                     -- empreinte du groupe d'origine, jamais son nom ni ses membres
  statut text not null default 'en_attente' check (statut in ('en_attente', 'publiee', 'rejetee')),
  created_at timestamptz not null default now(),
  publiee_le timestamptz
);
create index if not exists fac_infos_etab_idx on public.fac_infos (etablissement_id, statut, created_at desc);
alter table public.fac_infos enable row level security;
revoke all on public.fac_infos from anon, authenticated;
