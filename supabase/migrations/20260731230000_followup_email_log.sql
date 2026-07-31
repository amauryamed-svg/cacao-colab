-- Log de envíos reales de seguimiento vía Resend (día1/día7/día14).
-- HubSpot solo trackea las props colab_* (followup-sync.ts); el envío del
-- correo en sí vive acá porque Workflows/Automated emails de HubSpot están
-- bloqueados por el plan del portal (Marketing Hub Pro / Suite Starter).

create table if not exists public.followup_email_log (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  email_key   text not null check (email_key in ('day1', 'day7', 'day14')),
  sent_at     timestamptz not null default now(),
  resend_id   text,
  unique (profile_id, email_key)
);

comment on table public.followup_email_log is
  'Idempotencia del cron de seguimiento: una fila por (profile, día) evita reenvíos duplicados si el cron corre más de una vez.';

alter table public.followup_email_log enable row level security;

-- Solo el cron (service_role) lee/escribe esta tabla — no hay caso de uso
-- para que el propio learner la consulte desde el cliente.
create policy "solo service_role opera followup_email_log"
  on public.followup_email_log for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
