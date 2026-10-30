-- Parcours (profil, examens, série) et séances live. Appliquée le 30/10/2026.
create table if not exists public.profiles (user_id uuid primary key references auth.users(id) on delete cascade, prenom text, filiere text, minutes_jour int not null default 60, created_at timestamptz not null default now());
create table if not exists public.exams (user_id uuid not null references auth.users(id) on delete cascade, module_slug text not null, exam_date date not null, primary key (user_id, module_slug));
create table if not exists public.activity (user_id uuid not null references auth.users(id) on delete cascade, day date not null, module_slug text not null, primary key (user_id, day, module_slug));
create or replace function public.log_activity() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.activity(user_id, day, module_slug) values (new.user_id, (now() at time zone 'Africa/Casablanca')::date, new.module_slug) on conflict do nothing;
  return new;
end $$;
revoke execute on function public.log_activity() from anon, authenticated, public;
drop trigger if exists progress_activity on public.progress;
create trigger progress_activity after insert or update on public.progress for each row execute function public.log_activity();
create table if not exists public.live_sessions (id uuid primary key default gen_random_uuid(), titre text not null, module_slug text, starts_at timestamptz not null, duree_min int not null default 90, prix_dh int not null default 25, places int not null default 15, animateurs text, lien text, created_at timestamptz not null default now());
create table if not exists public.live_bookings (session_id uuid not null references public.live_sessions(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade, email text, statut text not null default 'en_attente' check (statut in ('en_attente','payee','annulee')), ref_paiement text, created_at timestamptz not null default now(), primary key (session_id, user_id));
alter table public.profiles enable row level security; alter table public.exams enable row level security; alter table public.activity enable row level security;
alter table public.live_sessions enable row level security; alter table public.live_bookings enable row level security;
-- Lecture de ses propres lignes ; écritures et lien des lives uniquement côté serveur (clé service).
drop policy if exists "profiles: soi" on public.profiles; create policy "profiles: soi" on public.profiles for select using (auth.uid() = user_id);
drop policy if exists "exams: soi" on public.exams; create policy "exams: soi" on public.exams for select using (auth.uid() = user_id);
drop policy if exists "activity: soi" on public.activity; create policy "activity: soi" on public.activity for select using (auth.uid() = user_id);
drop policy if exists "bookings: soi" on public.live_bookings; create policy "bookings: soi" on public.live_bookings for select using (auth.uid() = user_id);
