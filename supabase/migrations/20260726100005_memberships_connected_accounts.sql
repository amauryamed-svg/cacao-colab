-- Dominio: membership_plans / memberships / connected_accounts
-- Ver docs/08-PAGOS.md.

create table if not exists public.membership_plans (
  id                            uuid primary key default gen_random_uuid(),
  slug                          text not null unique,
  name                          text not null,
  tier                          text not null check (tier in ('free', 'pro', 'enterprise')),
  price_cents_monthly           integer not null check (price_cents_monthly >= 0),
  commission_ratio_basis_points integer not null check (commission_ratio_basis_points between 0 and 10000),
  created_at                    timestamptz not null default now()
);

create table if not exists public.memberships (
  id                      uuid primary key default gen_random_uuid(),
  organization_id         uuid not null references public.organizations(id) on delete cascade,
  plan_id                 uuid not null references public.membership_plans(id),
  status                  text not null default 'trialing'
                            check (status in ('active', 'past_due', 'cancelled', 'trialing')),
  stripe_subscription_id  text,
  current_period_end      timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create trigger memberships_set_updated_at
  before update on public.memberships
  for each row execute function public.set_updated_at();

alter table public.commission_rules
  add constraint commission_rules_membership_plan_id_fkey
  foreign key (membership_plan_id) references public.membership_plans(id)
  on delete set null;

create table if not exists public.connected_accounts (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null unique references public.organizations(id) on delete cascade,
  stripe_account_id text,
  status            text not null default 'not_started'
                      check (status in ('not_started', 'onboarding', 'restricted', 'active', 'disabled')),
  payouts_enabled   boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.connected_accounts is
  'Stripe Connect Express por organización vendedora. Sin cuenta Stripe real todavía — el registro se crea igual para trackear estado de onboarding (ver packages/stripe-client, docs/08-PAGOS.md).';

create trigger connected_accounts_set_updated_at
  before update on public.connected_accounts
  for each row execute function public.set_updated_at();

alter table public.membership_plans enable row level security;
alter table public.memberships enable row level security;
alter table public.connected_accounts enable row level security;

create policy "membership_plans son de lectura pública"
  on public.membership_plans for select
  using (true);

create policy "organizaciones ven su propia membership"
  on public.memberships for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.organization_id = memberships.organization_id
    )
  );

create policy "organizaciones ven su propio connected_account"
  on public.connected_accounts for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.organization_id = connected_accounts.organization_id
    )
  );
