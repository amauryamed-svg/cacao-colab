-- Cacao Colab v2 — CRM interno operable por Oscar/Hellen/Amaury, sincronizado con el HubSpot
-- compartido de Caúa. hubspot_sync_log es el mecanismo anti-loop: se compara payload_hash antes
-- de reenviar. Ver docs/14-CRM-INTERNO.md.

create type lifecycle_stage as enum ('lead', 'mql', 'sql', 'customer', 'churned');
create type crm_activity_type as enum ('note', 'call', 'email', 'whatsapp', 'meeting');
create type sync_direction as enum ('to_hubspot', 'from_hubspot');
create type sync_status as enum ('ok', 'error', 'skipped_no_change');
create type sync_entity_type as enum ('crm_contact', 'organization', 'order');

create table crm_contacts (
  id uuid primary key default gen_random_uuid(),
  hubspot_contact_id text unique,
  profile_id uuid references profiles(id),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  owner_profile_id uuid references profiles(id),
  lifecycle_stage lifecycle_stage not null default 'lead',
  created_at timestamptz not null default now()
);

create table crm_activities (
  id uuid primary key default gen_random_uuid(),
  crm_contact_id uuid not null references crm_contacts(id) on delete cascade,
  type crm_activity_type not null,
  body text not null,
  owner_profile_id uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table hubspot_sync_log (
  id uuid primary key default gen_random_uuid(),
  entity_type sync_entity_type not null,
  local_id uuid not null,
  hubspot_id text,
  direction sync_direction not null,
  payload_hash text not null,
  status sync_status not null,
  created_at timestamptz not null default now()
);

create index idx_crm_contacts_email on crm_contacts(email);
create index idx_crm_contacts_owner on crm_contacts(owner_profile_id);
create index idx_crm_activities_contact on crm_activities(crm_contact_id);
create index idx_hubspot_sync_log_entity on hubspot_sync_log(entity_type, local_id);

alter table crm_contacts enable row level security;
alter table crm_activities enable row level security;
alter table hubspot_sync_log enable row level security;

-- CRM interno: solo los 3 colaboradores lo operan (rol 'internal' vía claim JWT custom, ver
-- docs/14-CRM-INTERNO.md — no hay policy pública, todo el acceso es vía service role desde
-- apps/web/admin en Fase 2. No se abre a authenticated genérico.
