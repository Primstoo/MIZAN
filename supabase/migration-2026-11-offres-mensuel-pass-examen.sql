-- D33 (18/11/2026) : « essentiel » = abonnement mensuel, nouveau plan « examen » (Pass examen, rang 3).
-- Idempotent. À coller dans Supabase → SQL Editor. L'expiration est déjà automatique (plan_until).

alter table public.abonnements drop constraint if exists abonnements_plan_check;
alter table public.abonnements add constraint abonnements_plan_check check (plan in ('free','essentiel','premium','examen'));
alter table public.codes_offre drop constraint if exists codes_offre_plan_check;
alter table public.codes_offre add constraint codes_offre_plan_check check (plan in ('essentiel','premium','examen'));

-- Parrainage : si le plan payé est déjà de rang 3, on prolonge ce plan (examen reste examen).
create or replace function public.recompense_superieure(p_user uuid, p_jours int)
returns void language plpgsql security definer set search_path = '' as $$
declare v public.abonnements; base int; cible text;
begin
  insert into public.abonnements (user_id) values (p_user) on conflict (user_id) do nothing;
  select * into v from public.abonnements where user_id = p_user for update;
  base := case when v.plan_until is null or v.plan_until <= now() or v.plan = 'free' then 1
               when v.plan = 'essentiel' then 2 else 3 end;
  if base = 3 then perform public.accorder_offre(p_user, v.plan, p_jours, 'recompense'); return; end if;
  cible := case when base = 1 then 'essentiel' else 'premium' end;
  if v.bonus_plan = cible and v.bonus_until > now() then
    update public.abonnements set bonus_until = v.bonus_until + make_interval(days => p_jours) where user_id = p_user;
  else
    update public.abonnements set bonus_plan = cible, bonus_until = now() + make_interval(days => p_jours) where user_id = p_user;
  end if;
end $$;
revoke all on function public.recompense_superieure(uuid, int) from public, anon, authenticated;
