-- Privacidad: consentimiento opt-in al crear usuario + auditoría de eventos.
-- Alineado con GDPR / CCPA-CPRA / Ley 1581 (Colombia).

alter table public.profiles
  add column if not exists privacy_accepted_at timestamptz,
  add column if not exists terms_accepted_at timestamptz,
  add column if not exists privacy_policy_version text,
  add column if not exists terms_version text,
  add column if not exists marketing_opt_in boolean not null default false,
  add column if not exists marketing_opt_in_at timestamptz;

comment on column public.profiles.privacy_accepted_at is
  'Timestamp del opt-in a Política de Privacidad (cuenta).';
comment on column public.profiles.terms_accepted_at is
  'Timestamp del opt-in a Términos de Uso (cuenta).';
comment on column public.profiles.marketing_opt_in is
  'Consentimiento separado para nurturing / marketing no transaccional.';

create table if not exists public.privacy_consents (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid references public.profiles(id) on delete set null,
  email           text,
  event           text not null check (event in (
    'accepted_privacy_terms',
    'marketing_opt_in',
    'marketing_opt_out',
    'cookies_essential',
    'cookies_analytics_opt_in',
    'cookies_analytics_opt_out',
    'lead_onboarding_opt_in',
    'rights_request'
  )),
  policy_version  text,
  source          text,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists privacy_consents_profile_idx
  on public.privacy_consents (profile_id, created_at desc);
create index if not exists privacy_consents_email_idx
  on public.privacy_consents (email, created_at desc);

comment on table public.privacy_consents is
  'Auditoría de consentimientos y preferencias de privacidad (apps modernas / DSAR).';

alter table public.privacy_consents enable row level security;

create policy "usuarios ven sus privacy_consents"
  on public.privacy_consents for select
  using (auth.uid() = profile_id);

create policy "usuarios insertan sus privacy_consents"
  on public.privacy_consents for insert
  with check (auth.uid() = profile_id);

-- Trigger: si el signup trae metadata de consentimiento, rellenamos profiles.
create or replace function public.handle_new_marketplace_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
  v_privacy boolean;
  v_terms boolean;
  v_marketing boolean;
  v_policy text;
  v_terms_ver text;
  v_consent_at timestamptz;
begin
  v_name := coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));
  v_privacy := coalesce((new.raw_user_meta_data->>'privacy_accepted')::boolean, false);
  v_terms := coalesce((new.raw_user_meta_data->>'terms_accepted')::boolean, false);
  v_marketing := coalesce((new.raw_user_meta_data->>'marketing_opt_in')::boolean, false);
  v_policy := new.raw_user_meta_data->>'privacy_policy_version';
  v_terms_ver := new.raw_user_meta_data->>'terms_version';
  begin
    v_consent_at := (new.raw_user_meta_data->>'consent_at')::timestamptz;
  exception when others then
    v_consent_at := null;
  end;
  if v_consent_at is null and v_privacy and v_terms then
    v_consent_at := now();
  end if;

  insert into public.profiles (
    id,
    full_name,
    email,
    privacy_accepted_at,
    terms_accepted_at,
    privacy_policy_version,
    terms_version,
    marketing_opt_in,
    marketing_opt_in_at
  )
  values (
    new.id,
    v_name,
    new.email,
    case when v_privacy then v_consent_at else null end,
    case when v_terms then v_consent_at else null end,
    v_policy,
    v_terms_ver,
    v_marketing,
    case when v_marketing then v_consent_at else null end
  )
  on conflict (id) do nothing;

  if v_privacy and v_terms then
    insert into public.privacy_consents (profile_id, email, event, policy_version, source, metadata)
    values (
      new.id,
      new.email,
      'accepted_privacy_terms',
      v_policy,
      coalesce(new.raw_user_meta_data->>'consent_source', 'signup_trigger'),
      jsonb_build_object(
        'terms_version', v_terms_ver,
        'marketing_opt_in', v_marketing,
        'at', v_consent_at
      )
    );
  end if;

  return new;
end;
$$;
