-- MIZAN : schéma complet de la base (à exécuter dans Supabase > SQL Editor).
-- Ré-exécutable sans risque : rien n'est effacé, les règles sont recréées à l'identique.
-- Reflète l'état de la base de production au 31/10/2026.
-- Principe de sécurité : RLS activée partout ; un élève ne peut lire que ses propres lignes.
-- Les écritures sensibles (invitations, quotas, profils, lives) passent par le serveur (clé service).

-- ===== Progression et tuteur =====
create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);
create table if not exists public.tutor_threads (   -- prévu pour l'historique du tuteur en ligne (pas encore utilisé)
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
create table if not exists public.tutor_usage (     -- quota quotidien de questions
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null default current_date,
  count int not null default 0,
  primary key (user_id, day)
);

-- ===== Accès sur invitation (bêta privée) =====
create table if not exists public.invites (
  code text primary key,
  owner uuid references auth.users(id) on delete cascade,
  max_uses int not null default 3,
  uses int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists invites_owner_idx on public.invites(owner);
create table if not exists public.members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  invite_code text references public.invites(code),
  joined_at timestamptz not null default now()
);
create index if not exists members_invite_code_idx on public.members(invite_code);

-- ===== Parcours : profil, examens, jours de révision =====
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  prenom text, filiere text,
  minutes_jour int not null default 60,
  created_at timestamptz not null default now()
);
create table if not exists public.exams (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  exam_date date not null,
  estimee boolean not null default false,          -- date non annoncée : estimation
  primary key (user_id, module_slug)
);
alter table public.exams add column if not exists estimee boolean not null default false;
create table if not exists public.module_dates (    -- date commune par module, fixée par l'admin
  module_slug text primary key,
  exam_date date not null,
  officielle boolean not null default false,
  source text,
  updated_at timestamptz not null default now()
);
create table if not exists public.activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  module_slug text not null,
  primary key (user_id, day, module_slug)
);
-- Chaque synchronisation de progression inscrit le jour de révision (série de jours)
create or replace function public.log_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.activity(user_id, day, module_slug)
  values (new.user_id, (now() at time zone 'Africa/Casablanca')::date, new.module_slug)
  on conflict do nothing;
  return new;
end $$;
revoke execute on function public.log_activity() from anon, authenticated, public;
drop trigger if exists progress_activity on public.progress;
create trigger progress_activity after insert or update on public.progress
  for each row execute function public.log_activity();

-- ===== Séances live =====
create table if not exists public.live_sessions (   -- aucune lecture côté élève : le lien visio reste côté serveur
  id uuid primary key default gen_random_uuid(),
  titre text not null, module_slug text,
  starts_at timestamptz not null,
  duree_min int not null default 90,
  prix_dh int not null default 25,
  places int not null default 15,
  animateurs text, lien text,
  created_at timestamptz not null default now()
);
create table if not exists public.live_bookings (
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  email text,
  statut text not null default 'en_attente' check (statut in ('en_attente','payee','annulee')),
  ref_paiement text,
  created_at timestamptz not null default now(),
  primary key (session_id, user_id)
);
create index if not exists live_bookings_user_idx on public.live_bookings(user_id);

-- ===== Sécurité (RLS) =====
alter table public.progress enable row level security;
alter table public.tutor_threads enable row level security;
alter table public.tutor_usage enable row level security;
alter table public.invites enable row level security;
alter table public.members enable row level security;
alter table public.profiles enable row level security;
alter table public.exams enable row level security;
alter table public.module_dates enable row level security;
alter table public.activity enable row level security;
alter table public.live_sessions enable row level security;
alter table public.live_bookings enable row level security;

drop policy if exists progress_owner on public.progress;
create policy progress_owner on public.progress for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists threads_owner on public.tutor_threads;
create policy threads_owner on public.tutor_threads for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists usage_owner_read on public.tutor_usage;
create policy usage_owner_read on public.tutor_usage for select using ((select auth.uid()) = user_id);
drop policy if exists "invites: lecture propriétaire" on public.invites;
create policy "invites: lecture propriétaire" on public.invites for select using ((select auth.uid()) = owner);
drop policy if exists "members: lecture soi" on public.members;
create policy "members: lecture soi" on public.members for select using ((select auth.uid()) = user_id);
drop policy if exists "profiles: soi" on public.profiles;
create policy "profiles: soi" on public.profiles for select using ((select auth.uid()) = user_id);
drop policy if exists "exams: soi" on public.exams;
create policy "exams: soi" on public.exams for select using ((select auth.uid()) = user_id);
drop policy if exists "module_dates: lecture" on public.module_dates;
create policy "module_dates: lecture" on public.module_dates for select to authenticated using (true);
drop policy if exists "activity: soi" on public.activity;
create policy "activity: soi" on public.activity for select using ((select auth.uid()) = user_id);
drop policy if exists "bookings: soi" on public.live_bookings;
create policy "bookings: soi" on public.live_bookings for select using ((select auth.uid()) = user_id);
