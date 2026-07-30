-- Amplía analytics_events y crm_activities para la base de conocimiento,
-- Ecoyuma y la preventa Benevolo.

alter table public.analytics_events
  drop constraint if exists analytics_events_event_type_check;

alter table public.analytics_events
  add constraint analytics_events_event_type_check
  check (event_type in (
    'page_view', 'onboarding_started', 'onboarding_submitted',
    'account_registered', 'microlearning_link_clicked',
    'mooc_link_clicked', 'lesson_completed', 'sponsor_interest',
    'knowledge_link_clicked', 'ecoyuma_link_clicked', 'benevolo_interest'
  ));

-- crm_activities.type no tenía CHECK rígido en 0010; se documenta el contrato
-- en packages/types. Si existiera un check legacy, se reemplaza de forma segura.
do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'crm_activities_type_check'
  ) then
    alter table public.crm_activities drop constraint crm_activities_type_check;
    alter table public.crm_activities
      add constraint crm_activities_type_check
      check (type in (
        'onboarding_started', 'onboarding_submitted', 'account_registered',
        'microlearning_link_clicked', 'mooc_link_clicked', 'listing_viewed',
        'order_placed', 'lesson_completed', 'membership_started',
        'sponsor_interest', 'knowledge_link_clicked', 'ecoyuma_link_clicked',
        'benevolo_interest', 'note'
      ));
  end if;
end $$;
