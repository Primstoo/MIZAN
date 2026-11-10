-- Audit du 10 novembre 2026 : durcissement de la base. Sans perte de données, rejouable sans risque.
-- Chaque point a été reproduit sur la base réelle avant correction (test en transaction annulée).

-- ===== 1. Droits inutiles =====
-- Par défaut, Supabase donne TOUS les droits aux rôles « anon » (visiteur) et « authenticated » (connecté) ;
-- seule la RLS protège les tables. Or TRUNCATE (vider une table) n'est PAS filtré par la RLS :
-- test du 10/11 : « truncate public.codes_offre » réussissait avec le rôle d'un élève connecté.
-- L'API de Supabase n'expose pas TRUNCATE, donc ce n'était pas exploitable aujourd'hui, mais on ferme la porte.
revoke truncate, references, trigger on all tables in schema public from anon, authenticated;
revoke insert, update, delete on all tables in schema public from anon; -- un visiteur n'écrit jamais dans la base
alter default privileges for role postgres in schema public revoke truncate, references, trigger on tables from anon, authenticated;
alter default privileges for role postgres in schema public revoke insert, update, delete on tables from anon;

-- ===== 2. Progression : bornes =====
-- La table « progress » est la seule où l'élève écrit directement depuis son navigateur.
-- Test du 10/11 : un compte connecté (même sans invitation) pouvait créer autant de lignes qu'il voulait,
-- avec des noms de modules inventés, donc remplir les 500 Mo de l'offre gratuite et bloquer l'appli pour tous.
alter table public.progress drop constraint if exists progress_slug_valide;
alter table public.progress add constraint progress_slug_valide
  check (module_slug ~ '^[a-z0-9][a-z0-9-]{0,63}$');
-- Taille mesurée sur le texte réel (l'ancienne limite mesurait la taille compressée, facile à contourner).
alter table public.progress drop constraint if exists progress_data_check;
alter table public.progress drop constraint if exists progress_taille;
alter table public.progress add constraint progress_taille
  check (octet_length(data::text) < 2000000);

-- 30 modules au plus par élève (il y en a 6 aujourd'hui).
create or replace function public.limiter_progress() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- Mise à jour d'un module déjà suivi (upsert) : toujours acceptée, même à la limite.
  if exists (select 1 from public.progress where user_id = new.user_id and module_slug = new.module_slug) then return new; end if;
  if (select count(*) from public.progress where user_id = new.user_id) >= 30 then
    raise exception 'Trop de modules suivis pour ce compte (30 au maximum).' using errcode = 'check_violation';
  end if;
  return new;
end $$;
revoke execute on function public.limiter_progress() from anon, authenticated, public;
drop trigger if exists progress_limite on public.progress;
create trigger progress_limite before insert on public.progress
  for each row execute function public.limiter_progress();

-- ===== 3. Historique du tuteur : table jamais utilisée par l'appli =====
-- L'élève pouvait pourtant y écrire sans aucune limite (test : 3 lignes de 5 Mo acceptées).
-- On retire l'accès direct ; à rétablir avec des bornes le jour où l'historique en ligne sera développé.
drop policy if exists threads_owner on public.tutor_threads;
drop policy if exists "threads: lecture soi" on public.tutor_threads;
create policy "threads: lecture soi" on public.tutor_threads
  for select using ((select auth.uid()) = user_id);

-- ===== 4. Codes d'activation : ne plus écraser une offre payée supérieure =====
-- Test du 10/11 : Premium payé (100 jours restants) + code Essentiel 30 jours
--   → l'élève se retrouvait en Essentiel pour 30 jours et perdait ses 100 jours de Premium.
-- Désormais le code est refusé SANS être consommé, avec un message clair.
create or replace function public.utiliser_code(p_user uuid, p_code text)
returns json language plpgsql security definer set search_path = '' as $$
declare c public.codes_offre; v public.abonnements; rates int; fin timestamptz; parrain uuid;
begin
  select count(*) into rates from public.essais_code where user_id = p_user and not ok and at > now() - interval '1 hour';
  if rates >= 5 then return json_build_object('ok', false, 'message', 'Trop d''essais. Réessaie dans une heure.'); end if;
  select * into c from public.codes_offre where code = upper(trim(p_code)) and used_by is null for update;
  if not found then
    insert into public.essais_code (user_id, ok) values (p_user, false);
    return json_build_object('ok', false, 'message', 'Code invalide ou déjà utilisé.');
  end if;
  select * into v from public.abonnements where user_id = p_user;
  if found and v.plan = 'premium' and c.plan = 'essentiel' and v.plan_source = 'paid' and v.plan_until > now() then
    return json_build_object('ok', false, 'message',
      'Tu as déjà l''offre Premium jusqu''au ' || to_char(v.plan_until at time zone 'Africa/Casablanca', 'DD/MM/YYYY')
      || '. Ce code Essentiel n''a pas été consommé : garde-le et active-le après cette date.');
  end if;
  update public.codes_offre set used_by = p_user, used_at = now() where code = c.code;
  insert into public.essais_code (user_id, ok) values (p_user, true);
  fin := public.accorder_offre(p_user, c.plan, c.jours, 'paid');
  select referred_by into parrain from public.abonnements where user_id = p_user and not referral_rewarded;
  if parrain is not null then
    perform public.recompense_superieure(parrain, 7);
    update public.abonnements set referral_rewarded = true where user_id = p_user;
  end if;
  return json_build_object('ok', true, 'plan', c.plan, 'fin', fin);
end $$;
revoke execute on function public.utiliser_code(uuid, text) from anon, authenticated, public;
grant execute on function public.utiliser_code(uuid, text) to service_role;
