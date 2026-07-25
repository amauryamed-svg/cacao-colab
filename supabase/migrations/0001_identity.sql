-- Cacao Colab v2 — identidad: organizations (nivel gobierno) vs profiles/actor_roles (nivel cuenta).
-- Ver docs/04-ACTORES.md y docs/07-MODELO-DATOS.md.

create extension if not exists "pgcrypto";

create type org_role as enum ('owner', 'colaborador');
create type org_status as enum ('active', 'pending', 'archived');
create type actor_type as enum ('farmer', 'chocolatier', 'maquilador', 'buyer');

create table territories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  flavor_profile text,
  accent_color text,
  created_at timestamptz not null default now()
);

create table organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  role org_role not null,
  accent_color text,
  bg_color text,
  text_color text,
  cta_url text,
  territory_id uuid references territories(id),
  status org_status not null default 'pending',
  admitted_at timestamptz,
  created_at timestamptz not null default now()
);

-- 1:1 con auth.users. id COMPARTE el mismo uuid que auth.users.id (no una FK separada).
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  locale text not null default 'es-CO',
  organization_id uuid references organizations(id),
  created_at timestamptz not null default now()
);

create table actor_roles (
  profile_id uuid not null references profiles(id) on delete cascade,
  role actor_type not null,
  assigned_at timestamptz not null default now(),
  primary key (profile_id, role)
);

create index idx_organizations_territory on organizations(territory_id);
create index idx_organizations_status on organizations(status);
create index idx_profiles_organization on profiles(organization_id);

alter table territories enable row level security;
alter table organizations enable row level security;
alter table profiles enable row level security;
alter table actor_roles enable row level security;

create policy "territories son públicas" on territories for select using (true);
create policy "organizations activas son públicas" on organizations for select using (status = 'active');
create policy "profile ve y edita su propia fila" on profiles for select using (auth.uid() = id);
create policy "profile edita su propia fila" on profiles for update using (auth.uid() = id);
create policy "profile ve sus propios roles" on actor_roles for select using (auth.uid() = profile_id);
