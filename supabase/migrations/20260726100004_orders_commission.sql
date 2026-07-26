-- Dominio: orders / order_items / commission_ledger / commission_rules
-- Ver docs/08-PAGOS.md — modelo híbrido: membresía + comisión reducida por
-- transacción, Stripe Connect Express (destination charges).

create table if not exists public.orders (
  id                       uuid primary key default gen_random_uuid(),
  buyer_profile_id         uuid not null references public.profiles(id),
  seller_organization_id   uuid not null references public.organizations(id),
  status                   text not null default 'pending_payment'
                             check (status in ('pending_payment', 'paid', 'fulfilled', 'cancelled', 'refunded')),
  subtotal_cents           integer not null check (subtotal_cents >= 0),
  commission_cents         integer not null check (commission_cents >= 0),
  total_cents              integer not null check (total_cents >= 0),
  currency                 text not null default 'COP' check (currency = 'COP'),
  stripe_payment_intent_id text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists orders_buyer_profile_id_idx on public.orders (buyer_profile_id);
create index if not exists orders_seller_organization_id_idx on public.orders (seller_organization_id);

create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create table if not exists public.order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references public.orders(id) on delete cascade,
  listing_id        uuid not null references public.listings(id),
  qty               integer not null check (qty > 0),
  unit_price_cents  integer not null check (unit_price_cents >= 0),
  total_price_cents integer not null check (total_price_cents >= 0)
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

create table if not exists public.commission_rules (
  id                    uuid primary key default gen_random_uuid(),
  organization_id       uuid references public.organizations(id) on delete cascade,
  membership_plan_id    uuid,
  ratio_basis_points    integer not null check (ratio_basis_points between 0 and 10000),
  effective_from        timestamptz not null default now(),
  effective_to          timestamptz,
  created_at            timestamptz not null default now()
);

comment on column public.commission_rules.ratio_basis_points is
  '1 basis point = 0.01%. Ej. 500 = 5% de comisión.';

-- Append-only por diseño: nunca se hace UPDATE de una fila existente,
-- solo INSERT (incluyendo reversos vía reversal_of_ledger_id). La política
-- de UPDATE se omite a propósito.
create table if not exists public.commission_ledger (
  id                    uuid primary key default gen_random_uuid(),
  order_id              uuid not null references public.orders(id),
  commission_rule_id    uuid references public.commission_rules(id),
  amount_cents          integer not null,
  reversal_of_ledger_id uuid references public.commission_ledger(id),
  created_at            timestamptz not null default now()
);

create index if not exists commission_ledger_order_id_idx on public.commission_ledger (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.commission_rules enable row level security;
alter table public.commission_ledger enable row level security;

create policy "compradores ven sus propias orders"
  on public.orders for select
  using (auth.uid() = buyer_profile_id);

create policy "vendedores ven las orders de su organización"
  on public.orders for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.organization_id = orders.seller_organization_id
    )
  );

create policy "compradores crean sus propias orders"
  on public.orders for insert
  with check (auth.uid() = buyer_profile_id);

create policy "order_items visibles si la order es visible"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and (
          orders.buyer_profile_id = auth.uid()
          or exists (
            select 1 from public.profiles
            where profiles.id = auth.uid()
              and profiles.organization_id = orders.seller_organization_id
          )
        )
    )
  );

-- commission_rules y commission_ledger: solo service_role (backend/admin).
-- No hay caso de uso hoy donde un profile deba leerlos directo — los ve
-- agregados vía apps/api.
create policy "solo service_role lee commission_rules"
  on public.commission_rules for select
  using (auth.role() = 'service_role');

create policy "solo service_role lee commission_ledger"
  on public.commission_ledger for select
  using (auth.role() = 'service_role');

create policy "solo service_role inserta commission_ledger"
  on public.commission_ledger for insert
  with check (auth.role() = 'service_role');
