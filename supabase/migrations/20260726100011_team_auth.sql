-- Dominio: portal interno /equipo (auth real, Supabase Auth + magic link)
-- Requerimiento agregado 2026-07-26 durante la ejecución del pivote v2.
-- Ver docs/06-ARQUITECTURA.md §Auth y docs/14-CRM-INTERNO.md.
--
-- team_members es la cuenta interna de Oscar/Hellen/Amaury para el portal
-- /equipo — DISTINTA de profiles (cuenta de marketplace, ver
-- 20260726100002_profiles_actor_roles.sql). No hereda nada de organizations
-- ni actor_roles: el equipo no es un "actor" del marketplace, es staff.

create table if not exists public.team_members (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid unique references auth.users(id) on delete set null,
  email                  text not null unique,
  full_name              text not null,
  team_role              text not null check (team_role in (
                           'founder', 'engineering_backend', 'engineering_frontend', 'design'
                         )),
  -- Nullable a propósito: no todo team member tiene contacto real en
  -- HubSpot. Si es null, el panel de /equipo muestra un estado vacío
  -- explícito — nunca se debe "adivinar" o crear un contacto para rellenar
  -- este campo (ver docs/14-CRM-INTERNO.md).
  hubspot_contact_email  text,
  created_at             timestamptz not null default now()
);

comment on table public.team_members is
  'Cuenta interna del equipo Cacao Colab (portal /equipo). Pre-registrada por email antes del primer login — el trigger link_team_member() conecta user_id automáticamente cuando la persona hace login por primera vez vía magic link.';

-- Cuando alguien se autentica por primera vez y su email ya está
-- pre-registrado en team_members, se conecta user_id automáticamente.
-- Si el email no está pre-registrado, no pasa nada (esa persona
-- simplemente no es del equipo — apps/web/app/equipo/page.tsx maneja ese
-- caso mostrando un mensaje, no un error).
create or replace function public.link_team_member()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.team_members
     set user_id = new.id
   where email = new.email
     and user_id is null;
  return new;
end;
$$;

create trigger on_auth_user_created_link_team_member
  after insert on auth.users
  for each row execute function public.link_team_member();

alter table public.team_members enable row level security;

-- Cada quien ve únicamente su propia fila — nunca la lista completa del
-- equipo (evita exponer emails/roles de otros compañeros vía RLS laxa).
create policy "team member ve su propia fila"
  on public.team_members for select
  using (auth.uid() = user_id);

-- Sin policy de insert/update para usuarios autenticados: altas y
-- cambios de rol se hacen por migración/seed o por service_role, nunca
-- desde la app misma.
