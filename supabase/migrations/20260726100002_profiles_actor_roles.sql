-- Dominio: profiles / actor_roles
-- profiles = cuenta de usuario del marketplace (1:1 con auth.users).
-- actor_roles = rol operativo de una persona (farmer/chocolatier/maquilador/buyer),
-- separado de organizations (cuenta institucional). Ver docs/04-ACTORES.md.

create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  full_name       text not null,
  email           text not null unique,
  phone           text,
  city            text,
  avatar_url      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.profiles is
  'Cuenta de usuario del marketplace. Distinta de team_members (cuenta interna del equipo Cacao Colab, ver 20260726100011_team_auth.sql).';

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create table if not exists public.actor_roles (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role       text not null check (role in ('farmer', 'chocolatier', 'maquilador', 'buyer')),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (profile_id, role)
);

comment on table public.actor_roles is
  'Un profile puede tener más de un rol de marketplace a la vez (ej. chocolatero que también compra insumos).';

-- Trigger estándar de Supabase: crea el profile automáticamente cuando se
-- registra un auth.users nuevo (marketplace, NO team_members — ver esa
-- migración para el flujo separado del portal interno).
create or replace function public.handle_new_marketplace_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

-- NOTA: este trigger se declara junto al de team_members
-- (20260726100011_team_auth.sql) — ambos escuchan auth.users insert. Antes
-- de aplicar en un proyecto real, decidir si todo signup crea profile de
-- marketplace, o si el portal /equipo usa un flujo de invitación aparte
-- que NO dispare este trigger (recomendado: sí, separar por dominio de
-- email o por una tabla de invites — documentado como pendiente de
-- decisión en docs/06-ARQUITECTURA.md).
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_marketplace_user();

alter table public.profiles enable row level security;
alter table public.actor_roles enable row level security;

create policy "usuarios ven y editan su propio profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "usuarios actualizan su propio profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "usuarios ven sus propios actor_roles"
  on public.actor_roles for select
  using (auth.uid() = profile_id);

create policy "usuarios gestionan sus propios actor_roles"
  on public.actor_roles for insert
  with check (auth.uid() = profile_id);
