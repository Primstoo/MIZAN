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
alter table public.profiles add column if not exists mascotte text not null default 'toumai'; -- refonte nov. 2026
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

-- ===== Ajouts du 31/10/2026 (soir) =====
-- Test de niveau et examens blancs : dernier résultat par notion
create table if not exists public.niveau (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null, notion text not null, ok boolean not null,
  created_at timestamptz not null default now(),
  primary key (user_id, module_slug, notion)
);
create table if not exists public.blancs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null, note numeric(4,1) not null, nb_questions int not null, duree_s int,
  created_at timestamptz not null default now()
);
create index if not exists blancs_user_idx on public.blancs(user_id, module_slug);
create table if not exists public.notes_reelles (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  note numeric(4,2) not null check (note >= 0 and note <= 20),
  note_prevue numeric(4,1),
  created_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);
-- Documents envoyés par les élèves (fichiers dans le stockage privé « documents »)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', false, 15728640, array['application/pdf','image/jpeg','image/png','image/webp','image/heic'])
on conflict (id) do nothing;
drop policy if exists "documents: dépôt dans son dossier" on storage.objects;
-- (pas de politique d'insertion : le dépôt passe par une URL signée délivrée par le serveur aux membres)
drop policy if exists "documents: lecture de ses fichiers" on storage.objects;
create policy "documents: lecture de ses fichiers" on storage.objects for select to authenticated
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text, module_slug text, module_libre text,
  type text not null check (type in ('cours','td','annale','autre')),
  etablissement text, chemin text not null, nom_fichier text,
  statut text not null default 'recu' check (statut in ('recu','accepte','refuse')),
  note text, created_at timestamptz not null default now()
);
create index if not exists documents_user_idx on public.documents(user_id);
-- Bot Telegram
create table if not exists public.telegram_links (
  user_id uuid primary key references auth.users(id) on delete cascade,
  jeton text unique, chat_id bigint unique,
  actif boolean not null default true, relie_le timestamptz
);
alter table public.niveau enable row level security;
alter table public.blancs enable row level security;
alter table public.notes_reelles enable row level security;
alter table public.documents enable row level security;
alter table public.telegram_links enable row level security;
drop policy if exists "niveau: soi" on public.niveau;
create policy "niveau: soi" on public.niveau for select using ((select auth.uid()) = user_id);
drop policy if exists "blancs: soi" on public.blancs;
create policy "blancs: soi" on public.blancs for select using ((select auth.uid()) = user_id);
drop policy if exists "notes: soi" on public.notes_reelles;
create policy "notes: soi" on public.notes_reelles for select using ((select auth.uid()) = user_id);
drop policy if exists "documents: soi" on public.documents;
create policy "documents: soi" on public.documents for select using ((select auth.uid()) = user_id);
drop policy if exists "telegram: soi" on public.telegram_links;
create policy "telegram: soi" on public.telegram_links for select using ((select auth.uid()) = user_id);

-- ---------- Audit du 31/10 (soir) ----------
alter table public.telegram_links add column if not exists jeton_le timestamptz;
create or replace function public.reserver_question(p_user uuid, p_day date, p_quota int)
returns int language plpgsql security definer set search_path = '' as $$
declare n int;
begin
  insert into public.tutor_usage as t (user_id, day, count) values (p_user, p_day, 1)
  on conflict (user_id, day) do update set count = t.count + 1 where t.count < p_quota
  returning count into n;
  return n;
end $$;
create or replace function public.rendre_question(p_user uuid, p_day date)
returns void language sql security definer set search_path = '' as $$
  update public.tutor_usage set count = greatest(count - 1, 0) where user_id = p_user and day = p_day;
$$;
revoke all on function public.reserver_question(uuid, date, int) from public, anon, authenticated;
revoke all on function public.rendre_question(uuid, date) from public, anon, authenticated;
drop policy if exists "documents: dépôt dans son dossier" on storage.objects; -- dépôt via URL signée (serveur) uniquement
create unique index if not exists documents_chemin_unique on public.documents (chemin);
alter table public.progress drop constraint if exists progress_taille;
alter table public.progress add constraint progress_taille check (pg_column_size(data) < 2000000) not valid;

-- ---------- Offres (06/11/2026) : Gratuit / Essentiel / Premium, codes d'activation, essais par invitation ----------
-- Toutes les écritures passent par le serveur (clé service) : aucune fonction n'est appelable par un élève.
create table if not exists public.abonnements (    -- une ligne par élève ayant eu une offre, un essai ou un parrainage
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free','essentiel','premium')),
  plan_until timestamptz,
  plan_source text not null default 'paid' check (plan_source in ('paid','invite','recompense')),
  bonus_plan text check (bonus_plan in ('essentiel','premium')),
  bonus_until timestamptz,
  trial_used boolean not null default false,
  referred_by uuid references auth.users(id) on delete set null,
  referral_rewarded boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.abonnements enable row level security;
drop policy if exists "abonnements: soi" on public.abonnements;
create policy "abonnements: soi" on public.abonnements for select using ((select auth.uid()) = user_id);

create table if not exists public.codes_offre (
  code text primary key,
  plan text not null check (plan in ('essentiel','premium')),
  jours int not null check (jours between 1 and 400),
  lot text,
  created_at timestamptz not null default now(),
  used_by uuid references auth.users(id) on delete set null,
  used_at timestamptz
);
create table if not exists public.essais_code (       -- anti force brute : 5 essais ratés par heure
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  ok boolean not null,
  at timestamptz not null default now()
);
create index if not exists essais_code_user_idx on public.essais_code(user_id, at);
alter table public.codes_offre enable row level security;   -- aucune politique : serveur uniquement
alter table public.essais_code enable row level security;

-- Ajoute des jours à une offre : prolonge si la même offre est en cours, sinon la remplace.
create or replace function public.accorder_offre(p_user uuid, p_plan text, p_jours int, p_source text default 'paid')
returns timestamptz language plpgsql security definer set search_path = '' as $$
declare v public.abonnements; fin timestamptz;
begin
  insert into public.abonnements (user_id) values (p_user) on conflict (user_id) do nothing;
  select * into v from public.abonnements where user_id = p_user for update;
  if v.plan = p_plan and v.plan_until > now() then
    fin := v.plan_until + make_interval(days => p_jours);
    if v.plan_source = 'paid' then p_source := 'paid'; end if;
  else
    fin := now() + make_interval(days => p_jours);
  end if;
  update public.abonnements set plan = p_plan, plan_until = fin, plan_source = p_source where user_id = p_user;
  return fin;
end $$;

-- Parrainage : 7 jours au niveau supérieur (gratuit → essentiel → premium), le plan payé reste intact.
create or replace function public.recompense_superieure(p_user uuid, p_jours int)
returns void language plpgsql security definer set search_path = '' as $$
declare v public.abonnements; base int; cible text;
begin
  insert into public.abonnements (user_id) values (p_user) on conflict (user_id) do nothing;
  select * into v from public.abonnements where user_id = p_user for update;
  base := case when v.plan_until is null or v.plan_until <= now() or v.plan = 'free' then 1
               when v.plan = 'essentiel' then 2 else 3 end;
  if base = 3 then perform public.accorder_offre(p_user, 'premium', p_jours, 'recompense'); return; end if;
  cible := case when base = 1 then 'essentiel' else 'premium' end;
  if v.bonus_plan = cible and v.bonus_until > now() then
    update public.abonnements set bonus_until = v.bonus_until + make_interval(days => p_jours) where user_id = p_user;
  else
    update public.abonnements set bonus_plan = cible, bonus_until = now() + make_interval(days => p_jours) where user_id = p_user;
  end if;
end $$;

-- Utilisation d'un code d'activation par un élève.
create or replace function public.utiliser_code(p_user uuid, p_code text)
returns json language plpgsql security definer set search_path = '' as $$
declare c public.codes_offre; rates int; fin timestamptz; parrain uuid;
begin
  select count(*) into rates from public.essais_code where user_id = p_user and not ok and at > now() - interval '1 hour';
  if rates >= 5 then return json_build_object('ok', false, 'message', 'Trop d''essais. Réessaie dans une heure.'); end if;
  select * into c from public.codes_offre where code = upper(trim(p_code)) and used_by is null for update;
  if not found then
    insert into public.essais_code (user_id, ok) values (p_user, false);
    return json_build_object('ok', false, 'message', 'Code invalide ou déjà utilisé.');
  end if;
  update public.codes_offre set used_by = p_user, used_at = now() where code = c.code;
  insert into public.essais_code (user_id, ok) values (p_user, true);
  fin := public.accorder_offre(p_user, c.plan, c.jours, 'paid');
  -- premier paiement d'un invité : récompense pour celui qui l'a invité
  select referred_by into parrain from public.abonnements where user_id = p_user and not referral_rewarded;
  if parrain is not null then
    perform public.recompense_superieure(parrain, 7);
    update public.abonnements set referral_rewarded = true where user_id = p_user;
  end if;
  return json_build_object('ok', true, 'plan', c.plan, 'fin', fin);
end $$;

-- Essai de 7 jours au niveau de l'invitant (seulement si son offre est payée et en cours).
create or replace function public.essai_invitation(p_user uuid, p_parrain uuid)
returns text language plpgsql security definer set search_path = '' as $$
declare moi public.abonnements; lui public.abonnements; niveau text := 'free';
begin
  if p_parrain is null or p_parrain = p_user then return 'free'; end if;
  insert into public.abonnements (user_id) values (p_user) on conflict (user_id) do nothing;
  select * into moi from public.abonnements where user_id = p_user for update;
  if moi.trial_used or moi.referred_by is not null then return 'free'; end if;
  select * into lui from public.abonnements where user_id = p_parrain;
  if found and lui.plan <> 'free' and lui.plan_until > now() and lui.plan_source = 'paid' then niveau := lui.plan; end if;
  update public.abonnements set trial_used = true, referred_by = p_parrain where user_id = p_user;
  if niveau <> 'free' and not (moi.plan <> 'free' and moi.plan_until > now()) then
    perform public.accorder_offre(p_user, niveau, 7, 'invite');
    return niveau;
  end if;
  return 'free';
end $$;

revoke all on function public.accorder_offre(uuid, text, int, text) from public, anon, authenticated;
revoke all on function public.recompense_superieure(uuid, int) from public, anon, authenticated;
revoke all on function public.utiliser_code(uuid, text) from public, anon, authenticated;
revoke all on function public.essai_invitation(uuid, uuid) from public, anon, authenticated;

-- ---------- Établissement et ville (07/11/2026) : modules proposés selon l'établissement ----------
alter table public.profiles
  add column if not exists etablissement text,
  add column if not exists ville text;
