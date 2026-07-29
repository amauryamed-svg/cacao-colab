-- Login unificado + superadmins + funnel propio de Cacao Colab.

alter table public.team_members
  add column if not exists access_level text not null default 'superadmin'
  check (access_level in ('superadmin'));

-- Vincula membresías sembradas después de que auth.users ya existía.
create or replace function public.claim_team_membership()
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  linked_count integer := 0;
begin
  update public.team_members
     set user_id = auth.uid()
   where lower(email) = lower(coalesce(auth.jwt()->>'email', ''))
     and (user_id is null or user_id = auth.uid());
  get diagnostics linked_count = row_count;
  return linked_count > 0 or exists (
    select 1 from public.team_members where user_id = auth.uid()
  );
end;
$$;

revoke all on function public.claim_team_membership() from public;
grant execute on function public.claim_team_membership() to authenticated;

alter table public.crm_activities drop constraint if exists crm_activities_type_check;
alter table public.crm_activities add constraint crm_activities_type_check check (type in (
  'onboarding_started', 'onboarding_submitted', 'account_registered',
  'microlearning_link_clicked', 'mooc_link_clicked', 'lesson_completed',
  'listing_viewed', 'order_placed', 'membership_started',
  'sponsor_interest', 'note'
));

create table if not exists public.analytics_events (
  id          uuid primary key default gen_random_uuid(),
  visitor_id  text not null,
  session_id  text not null,
  profile_id  uuid references public.profiles(id) on delete set null,
  event_type  text not null check (event_type in (
                'page_view', 'onboarding_started', 'onboarding_submitted',
                'account_registered', 'microlearning_link_clicked',
                'mooc_link_clicked', 'lesson_completed', 'sponsor_interest'
              )),
  target      text,
  pathname    text,
  utm_source  text,
  utm_medium  text,
  utm_campaign text,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);
create index if not exists analytics_events_funnel_idx
  on public.analytics_events (event_type, created_at desc);
create index if not exists analytics_events_visitor_idx
  on public.analytics_events (visitor_id, created_at desc);

alter table public.analytics_events enable row level security;

create policy "solo service_role opera analytics_events"
  on public.analytics_events for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

comment on table public.analytics_events is
  'Eventos first-party del funnel. visitor_id es pseudónimo; no almacenar IP ni secretos en metadata.';
