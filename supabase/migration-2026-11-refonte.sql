-- Refonte « carnet du Sahel » (nov. 2026) : mascotte choisie à l'inscription.
-- À exécuter une fois dans Supabase › SQL Editor. Sans elle, l'appli marche quand même (Toumaï par défaut).
alter table public.profiles add column if not exists mascotte text not null default 'toumai';
alter table public.profiles drop constraint if exists profiles_mascotte_check;
alter table public.profiles add constraint profiles_mascotte_check check (mascotte in ('toumai', 'fenna', 'kouri'));
