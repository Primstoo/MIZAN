-- MIZAN : schéma de base (à exécuter dans Supabase > SQL Editor).
-- Ré-exécutable sans risque : rien n'est effacé, les règles sont recréées à l'identique.

-- Progression d'un élève par module (scores, failles, état des onglets…)
create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);

-- Discussions avec le tuteur, rangées par module et par notion
create table if not exists public.tutor_threads (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  section text not null,
  title text not null,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists tutor_threads_user on public.tutor_threads(user_id, module_slug);

-- Compteur de questions au tuteur (quota quotidien)
create table if not exists public.tutor_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null default current_date,
  count int not null default 0,
  primary key (user_id, day)
);

-- Sécurité : chaque élève ne voit et ne modifie que ses propres lignes
alter table public.progress enable row level security;
alter table public.tutor_threads enable row level security;
alter table public.tutor_usage enable row level security;

drop policy if exists "progress: propriétaire" on public.progress;
create policy "progress: propriétaire" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "threads: propriétaire" on public.tutor_threads;
create policy "threads: propriétaire" on public.tutor_threads
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "usage: lecture propriétaire" on public.tutor_usage;
create policy "usage: lecture propriétaire" on public.tutor_usage
  for select using (auth.uid() = user_id);

-- ===== Accès sur invitation (bêta fermée) =====
-- Un compte n'accède à /app qu'une fois membre. Les admins (ADMIN_EMAILS) le sont d'office.
create table if not exists public.invites (
  code text primary key,
  owner uuid references auth.users(id) on delete cascade,
  max_uses int not null default 3,
  uses int not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  invite_code text references public.invites(code),
  joined_at timestamptz not null default now()
);
alter table public.invites enable row level security;
alter table public.members enable row level security;
-- Lecture de ses propres lignes ; toutes les écritures passent par le serveur (clé service).
drop policy if exists "invites: lecture propriétaire" on public.invites;
create policy "invites: lecture propriétaire" on public.invites for select using (auth.uid() = owner);
drop policy if exists "members: lecture soi" on public.members;
create policy "members: lecture soi" on public.members for select using (auth.uid() = user_id);
