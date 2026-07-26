-- Cacao Colab v2 — Fase 0
-- Dominio: organizations / territories
-- Reemplaza apps/web/lib/brands.ts y apps/web/lib/territories.ts hardcodeados.
-- Ver docs/07-MODELO-DATOS.md.
--
-- NO APLICADA TODAVÍA: escrita y revisada, pendiente de que exista un
-- proyecto Supabase real (`supabase login`, pendiente del usuario).

create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  tagline      text not null,
  description  text not null,
  accent_color text not null,
  bg_color     text not null,
  text_color   text not null,
  products     text[] not null default '{}',
  cta_label    text not null,
  cta_url      text not null,
  role         text not null default 'colaborador' check (role in ('owner', 'colaborador')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.organizations is
  'Marca/actor institucional del Colab (CAÚA, Zurych, Lust, futuros). Ver docs/04-ACTORES.md para la distinción organizations (cuenta institucional) vs actor_roles (rol de persona).';

create table if not exists public.territories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  flavor_profile text not null,
  accent_color  text not null,
  created_at    timestamptz not null default now()
);

comment on table public.territories is
  'Región de origen de cacao (Huila, Santander, Meta, Arauca, Cundinamarca). Sin nombres de Guardianes individuales — ver nota de cumplimiento D15/A7.';

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_set_updated_at
  before update on public.organizations
  for each row execute function public.set_updated_at();

alter table public.organizations enable row level security;
alter table public.territories enable row level security;

-- Lectura pública (vitrina de marcas y territorios) — igual que hoy en
-- producción, donde brands.ts/territories.ts son públicos vía SSG.
create policy "organizations son de lectura pública"
  on public.organizations for select
  using (true);

create policy "territories son de lectura pública"
  on public.territories for select
  using (true);

-- Escritura: solo service_role (backend admin), hasta que exista un rol
-- de owner/admin real con panel de gestión (Fase 3).
create policy "solo service_role escribe organizations"
  on public.organizations for insert
  with check (auth.role() = 'service_role');

create policy "solo service_role actualiza organizations"
  on public.organizations for update
  using (auth.role() = 'service_role');
