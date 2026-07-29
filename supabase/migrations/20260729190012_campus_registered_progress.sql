-- Campus registrado: progreso flexible para campañas y estado Cacao Gotchi.
-- Complementa learner_progress (por lesson UUID) durante la transición desde
-- contenido TS hacia courses/modules/lessons sembrados en Postgres.

create table if not exists public.campus_progress (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  course_slug  text not null,
  state        jsonb not null default '{}'::jsonb,
  xp_total     integer not null default 0 check (xp_total >= 0),
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (profile_id, course_slug)
);

create trigger campus_progress_set_updated_at
  before update on public.campus_progress
  for each row execute function public.set_updated_at();

create table if not exists public.gotchi_runs (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  slot          integer not null default 1 check (slot between 1 and 3),
  selected_node text,
  genotype      text not null default 'FEAR 5 · Trinitario comercial',
  treatment     text,
  state         jsonb not null default '{}'::jsonb,
  xp_total      integer not null default 0 check (xp_total >= 0),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (profile_id, slot)
);

create trigger gotchi_runs_set_updated_at
  before update on public.gotchi_runs
  for each row execute function public.set_updated_at();

alter table public.campus_progress enable row level security;
alter table public.gotchi_runs enable row level security;

create policy "learner gestiona su progreso de campus"
  on public.campus_progress for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

create policy "learner gestiona sus gotchi"
  on public.gotchi_runs for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

comment on table public.campus_progress is
  'Estado registrado de campañas gamificadas; la certificación requiere evidencia adicional al XP.';

comment on table public.gotchi_runs is
  'Simulación pedagógica por learner. FEAR 5 en un nodo es un escenario didáctico, no disponibilidad comercial confirmada.';

-- Completa el acceso magic-link de los tres builders. Oscar y Hellen ya
-- existen en seed; este upsert hace idempotente el alta del founder.
insert into public.team_members (email, full_name, team_role, hubspot_contact_email)
values ('amauryamed@gmail.com', 'Amaury Amed', 'founder', 'amauryamed@gmail.com')
on conflict (email) do update set
  full_name = excluded.full_name,
  team_role = excluded.team_role,
  hubspot_contact_email = excluded.hubspot_contact_email;
