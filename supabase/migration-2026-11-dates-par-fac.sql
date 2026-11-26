-- Dates communes d'examen par module ET par établissement (26/11/2026).
-- Avant : une seule date par module, appliquée à tous les élèves quelle que soit leur fac.
alter table public.module_dates add column if not exists etablissement_id uuid references public.etablissements(id) on delete cascade;
-- Les dates existantes ont été saisies pour la FSABM.
update public.module_dates set etablissement_id = '6c881dd6-2383-4e4d-9d57-f9f57f5bd020' where etablissement_id is null;
alter table public.module_dates alter column etablissement_id set not null;
alter table public.module_dates drop constraint if exists module_dates_pkey;
alter table public.module_dates add primary key (module_slug, etablissement_id);
create index if not exists module_dates_etab_idx on public.module_dates (etablissement_id);
