-- Edutainment y fidelidad: Mazorcas Doradas.
-- No hay puntos por referidos, reclutamiento ni tamaño de red.

create table if not exists public.mazorca_wallets (
  profile_id       uuid primary key references public.profiles(id) on delete cascade,
  balance          integer not null default 0 check (balance >= 0),
  lifetime_earned  integer not null default 0 check (lifetime_earned >= 0),
  updated_at       timestamptz not null default now()
);

create table if not exists public.mazorca_ledger (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid not null references public.profiles(id) on delete cascade,
  amount           integer not null check (amount <> 0),
  category         text not null check (category in (
                     'learning', 'care', 'community', 'verified_purchase',
                     'redemption', 'adjustment'
                   )),
  reason_code      text not null,
  idempotency_key  text not null,
  source_type      text,
  source_id        text,
  metadata         jsonb not null default '{}'::jsonb,
  reversal_of_id   uuid references public.mazorca_ledger(id),
  created_at       timestamptz not null default now(),
  unique (profile_id, idempotency_key)
);

create index if not exists mazorca_ledger_profile_created_idx
  on public.mazorca_ledger (profile_id, created_at desc);

create or replace function public.apply_mazorca_ledger_entry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.mazorca_wallets (profile_id, balance, lifetime_earned)
  values (new.profile_id, 0, 0)
  on conflict (profile_id) do nothing;

  update public.mazorca_wallets
     set balance = balance + new.amount,
         lifetime_earned = lifetime_earned + greatest(new.amount, 0),
         updated_at = now()
   where profile_id = new.profile_id
     and balance + new.amount >= 0;

  if not found then
    raise exception 'saldo insuficiente de Mazorcas Doradas';
  end if;
  return new;
end;
$$;

create trigger mazorca_ledger_apply_wallet
  before insert on public.mazorca_ledger
  for each row execute function public.apply_mazorca_ledger_entry();

create table if not exists public.community_ranks (
  slug            text primary key,
  name            text not null,
  description     text not null,
  icon            text not null,
  min_lifetime_md integer not null check (min_lifetime_md >= 0),
  sort_order      integer not null unique
);

insert into public.community_ranks (slug, name, description, icon, min_lifetime_md, sort_order)
values
  ('semilla', 'Semilla', 'Empezaste a cultivar conocimiento.', '●', 0, 1),
  ('brote', 'Brote', 'Construyes un hábito de aprendizaje.', '♧', 100, 2),
  ('labrador', 'Labrador del cacao', 'Cuidas una labranza y entiendes su territorio.', '♣', 300, 3),
  ('guardian', 'Guardián de origen', 'Conectas evidencia, comunidad y trazabilidad.', '◆', 700, 4),
  ('maestro', 'Maestro Fine-Flavor', 'Transformas conocimiento en capacidad compartida.', '✦', 1500, 5),
  ('heritage', 'Heritage', 'Ayudas a que la siguiente generación herede una labranza viva.', '◉', 3000, 6)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  min_lifetime_md = excluded.min_lifetime_md,
  sort_order = excluded.sort_order;

create table if not exists public.benefit_catalog_items (
  id                uuid primary key default gen_random_uuid(),
  brand_key         text not null,
  slug              text not null,
  title             text not null,
  description       text not null,
  cost_md           integer not null check (cost_md > 0),
  fulfillment_type  text not null check (fulfillment_type in (
                      'colab_digital', 'manual_coupon', 'external_handoff',
                      'shopify', 'woocommerce', 'custom'
                    )),
  min_rank_slug     text references public.community_ranks(slug),
  stock_qty         integer,
  per_user_limit    integer not null default 1,
  status            text not null default 'planned' check (status in (
                      'planned', 'active', 'paused', 'retired'
                    )),
  terms             text not null,
  metadata          jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  unique (brand_key, slug)
);

create table if not exists public.benefit_redemptions (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          uuid not null references public.profiles(id) on delete cascade,
  catalog_item_id     uuid not null references public.benefit_catalog_items(id),
  cost_md             integer not null check (cost_md > 0),
  status              text not null default 'pending' check (status in (
                        'pending', 'issued', 'fulfilled', 'cancelled', 'expired'
                      )),
  ledger_debit_id     uuid references public.mazorca_ledger(id),
  fulfillment_payload jsonb not null default '{}'::jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger benefit_redemptions_set_updated_at
  before update on public.benefit_redemptions
  for each row execute function public.set_updated_at();

create table if not exists public.brand_commerce_adapters (
  brand_key       text primary key,
  adapter_type    text not null default 'none' check (adapter_type in (
                    'none', 'manual_coupon', 'colab_native',
                    'shopify', 'woocommerce', 'custom_webhook'
                  )),
  status          text not null default 'inactive' check (status in (
                    'inactive', 'active', 'error'
                  )),
  public_config   jsonb not null default '{}'::jsonb,
  last_sync_at    timestamptz,
  updated_at      timestamptz not null default now()
);

alter table public.mazorca_wallets enable row level security;
alter table public.mazorca_ledger enable row level security;
alter table public.community_ranks enable row level security;
alter table public.benefit_catalog_items enable row level security;
alter table public.benefit_redemptions enable row level security;
alter table public.brand_commerce_adapters enable row level security;

create policy "learner ve su wallet" on public.mazorca_wallets
  for select using (auth.uid() = profile_id);
create policy "learner ve su ledger" on public.mazorca_ledger
  for select using (auth.uid() = profile_id);
create policy "rangos son públicos" on public.community_ranks
  for select using (true);
create policy "catálogo activo es público" on public.benefit_catalog_items
  for select using (status = 'active');
create policy "learner ve sus redenciones" on public.benefit_redemptions
  for select using (auth.uid() = profile_id);
create policy "solo service_role opera adapters" on public.brand_commerce_adapters
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

-- Escrituras wallet/ledger/catálogo/redenciones: exclusivamente service_role.
comment on table public.mazorca_ledger is
  'Ledger append-only. Mazorcas Doradas no son dinero, no se convierten a efectivo y no premian reclutamiento.';
