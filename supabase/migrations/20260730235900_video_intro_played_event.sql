-- Evento first-party para intros edutainment HyperFrames.

alter table public.analytics_events
  drop constraint if exists analytics_events_event_type_check;

alter table public.analytics_events
  add constraint analytics_events_event_type_check
  check (event_type in (
    'page_view', 'onboarding_started', 'onboarding_submitted',
    'account_registered', 'microlearning_link_clicked',
    'mooc_link_clicked', 'lesson_completed', 'sponsor_interest',
    'knowledge_link_clicked', 'ecoyuma_link_clicked', 'benevolo_interest',
    'video_intro_played'
  ));
