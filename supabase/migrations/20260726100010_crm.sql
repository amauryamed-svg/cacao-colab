-- Dominio: CRM propio sincronizado con HubSpot (docs/14-CRM-INTERNO.md)

create table if not exists public.crm_contacts (
  id                 uuid primary key default gen_random_uuid(),
  hubspot_contact_id text,
  profile_id         uuid references public.profiles(id) on delete set null,
  full_name          text not null,
  email              text not null unique,
  phone              text,
  company            text,
  city               text,
  lifecycle_stage    text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists crm_contacts_hubspot_contact_id_idx on public.crm_contacts (hubspot_contact_id);

create trigger crm_contacts_set_updated_at
  before update on public.crm_contacts
  for each row execute function public.set_updated_at();

create table if not exists public.crm_activities (
  id             uuid primary key default gen_random_uuid(),
  crm_contact_id uuid not null references public.crm_contacts(id) on delete cascade,
  type           text not null check (type in (
                   'onboarding_submitted', 'listing_viewed', 'order_placed',
                   'lesson_completed', 'membership_started', 'note'
                 )),
  metadata       jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now()
);

create index if not exists crm_activities_crm_contact_id_idx on public.crm_activities (crm_contact_id);

-- Anti-loop de sync bidireccional: antes de escribir hacia HubSpot (o de
-- aceptar un webhook entrante), se compara payload_hash contra el último
-- hash registrado para ese crm_contact_id + direction. Si coincide, se
-- descarta — evita el ciclo infinito HubSpot→Supabase→HubSpot.
create table if not exists public.hubspot_sync_log (
  id             uuid primary key default gen_random_uuid(),
  crm_contact_id uuid not null references public.crm_contacts(id) on delete cascade,
  direction      text not null check (direction in ('to_hubspot', 'from_hubspot')),
  payload_hash   text not null,
  success        boolean not null,
  error_message  text,
  created_at     timestamptz not null default now()
);

create index if not exists hubspot_sync_log_crm_contact_id_idx on public.hubspot_sync_log (crm_contact_id);
create index if not exists hubspot_sync_log_lookup_idx
  on public.hubspot_sync_log (crm_contact_id, direction, created_at desc);

-- Todo este dominio es interno (equipo/backoffice), no del marketplace
-- público — solo service_role, consumido por apps/api.
alter table public.crm_contacts enable row level security;
alter table public.crm_activities enable row level security;
alter table public.hubspot_sync_log enable row level security;

create policy "solo service_role opera crm_contacts"
  on public.crm_contacts for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "solo service_role opera crm_activities"
  on public.crm_activities for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "solo service_role opera hubspot_sync_log"
  on public.hubspot_sync_log for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
