-- Cacao Colab v2 — pagos: modelo híbrido membresía + comisión reducida por transacción.
-- Ver docs/08-PAGOS.md. commission_ledger es append-only (auditable, narrativa "enterprise-grade"
-- para licenciamiento a Luker/Nacional). RLS de escritura NO se expone a authenticated — todo
-- write pasa por apps/api con la service role key (webhooks de Stripe, checkout).

create type order_status as enum ('pending', 'paid', 'fulfilled', 'cancelled', 'refunded');
create type commission_ledger_status as enum ('pending', 'settled', 'reversed');
create type billing_interval as enum ('month', 'year');
create type membership_status as enum ('trialing', 'active', 'past_due', 'canceled');

create table orders (
  id uuid primary key default gen_random_uuid(),
  buyer_profile_id uuid not null references profiles(id),
  seller_organization_id uuid references organizations(id),
  seller_profile_id uuid references profiles(id),
  status order_status not null default 'pending',
  stripe_payment_intent_id text,
  subtotal_cents integer not null check (subtotal_cents >= 0),
  commission_cents integer not null check (commission_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'USD',
  created_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  listing_id uuid not null references listings(id),
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0)
);

-- Append-only por diseño: nunca UPDATE de commission_amount_cents, solo status. Ver packages/types.
create table commission_ledger (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id),
  commission_rate_bps integer not null check (commission_rate_bps between 0 and 10000),
  commission_amount_cents integer not null check (commission_amount_cents >= 0),
  seller_payout_cents integer not null check (seller_payout_cents >= 0),
  stripe_transfer_id text,
  status commission_ledger_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table commission_rules (
  id uuid primary key default gen_random_uuid(),
  actor_type actor_type not null,
  membership_tier text not null,
  rate_bps integer not null check (rate_bps between 0 and 10000),
  effective_from timestamptz not null default now()
);

create table membership_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  actor_type actor_type not null,
  stripe_price_id text,
  billing_interval billing_interval not null,
  price_cents integer not null check (price_cents >= 0),
  commission_tier text not null
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  organization_id uuid references organizations(id),
  plan_id uuid not null references membership_plans(id),
  stripe_subscription_id text unique,
  status membership_status not null default 'trialing',
  current_period_end timestamptz,
  constraint membership_owner_check check (profile_id is not null or organization_id is not null)
);

create table connected_accounts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  organization_id uuid references organizations(id),
  stripe_account_id text not null unique,
  account_type text not null default 'express',
  charges_enabled boolean not null default false,
  payouts_enabled boolean not null default false,
  constraint connected_account_owner_check check (profile_id is not null or organization_id is not null)
);

create index idx_orders_buyer on orders(buyer_profile_id);
create index idx_orders_seller_org on orders(seller_organization_id);
create index idx_orders_status on orders(status);
create index idx_order_items_order on order_items(order_id);
create index idx_commission_ledger_order on commission_ledger(order_id);
create index idx_memberships_profile on memberships(profile_id);
create index idx_memberships_org on memberships(organization_id);

alter table orders enable row level security;
alter table order_items enable row level security;
alter table commission_ledger enable row level security;
alter table commission_rules enable row level security;
alter table membership_plans enable row level security;
alter table memberships enable row level security;
alter table connected_accounts enable row level security;

create policy "comprador ve sus órdenes" on orders for select using (auth.uid() = buyer_profile_id);
create policy "vendedor ve sus órdenes" on orders for select
  using (auth.uid() = seller_profile_id or seller_organization_id in (select organization_id from profiles where id = auth.uid()));
create policy "items visibles si la orden es visible" on order_items for select
  using (order_id in (select id from orders where auth.uid() = buyer_profile_id or auth.uid() = seller_profile_id));
create policy "planes de membresía son públicos" on membership_plans for select using (true);
create policy "profile ve su propia membresía" on memberships for select using (auth.uid() = profile_id);
create policy "profile ve su cuenta conectada" on connected_accounts for select using (auth.uid() = profile_id);
-- commission_ledger y commission_rules: sin policy de select para authenticated — solo service role
-- (dashboards internos vía apps/web/admin, que usa createServiceClient, no el browser client).
