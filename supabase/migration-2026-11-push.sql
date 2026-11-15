-- ToumaiLearn : notifications push (Web Push). À appliquer dans Supabase → SQL Editor.
-- Une ligne par appareil abonné. Aucune politique RLS : tout passe par le serveur (clé service).
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists push_subscriptions_user_idx on public.push_subscriptions(user_id);
create index if not exists push_subscriptions_email_idx on public.push_subscriptions(email);
alter table public.push_subscriptions enable row level security;
