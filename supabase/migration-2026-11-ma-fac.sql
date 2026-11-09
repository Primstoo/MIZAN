-- Ma fac (09/11/2026) : établissements saisis par les élèves, semestres, cours importés et analysés par l'IA.
create table if not exists public.etablissements (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  ville text,
  alias text[] not null default '{}',
  valide boolean not null default false,          -- validé (ou fusionné) par l'admin
  cree_par uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create unique index if not exists etablissements_nom_unique on public.etablissements (lower(nom));
alter table public.etablissements enable row level security;
drop policy if exists "etablissements: lecture" on public.etablissements;
create policy "etablissements: lecture" on public.etablissements for select to authenticated using (true);

insert into public.etablissements (nom, ville, alias, valide)
values ('Faculté des Sciences Appliquées de Béni Mellal (FSABM)', 'Béni Mellal',
        array['fsabm','fpbm','faculte polydisciplinaire de beni mellal','faculte des sciences appliquees de beni mellal','fsa beni mellal'], true)
on conflict do nothing;

alter table public.profiles
  add column if not exists etablissement_id uuid references public.etablissements(id) on delete set null,
  add column if not exists semestre text;

alter table public.documents
  add column if not exists etablissement_id uuid references public.etablissements(id) on delete set null,
  add column if not exists semestre text,
  add column if not exists filiere text,
  add column if not exists analyse text not null default 'aucune'
    check (analyse in ('aucune','en_cours','pret','incoherent','erreur')),
  add column if not exists analyse_note text,
  add column if not exists contenu jsonb,
  add column if not exists partage boolean not null default false;   -- visible par toute la fac (accord de l'admin)
create index if not exists documents_fac_idx on public.documents (etablissement_id, semestre) where partage;
create index if not exists profiles_etab_idx on public.profiles (etablissement_id);
create index if not exists documents_etab_idx on public.documents (etablissement_id);
create index if not exists etablissements_cree_par_idx on public.etablissements (cree_par);
