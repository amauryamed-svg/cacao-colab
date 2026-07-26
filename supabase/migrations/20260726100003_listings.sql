-- Dominio: listings / listing_media

create table if not exists public.listings (
  id             uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  territory_id   uuid references public.territories(id) on delete set null,
  title          text not null,
  description    text not null,
  status         text not null default 'draft' check (status in ('draft', 'active', 'paused', 'archived')),
  price_cents    integer not null check (price_cents >= 0),
  currency       text not null default 'COP' check (currency = 'COP'),
  unit           text not null check (unit in ('kg', 'g', 'unidad', 'caja')),
  min_order_qty  integer not null default 1 check (min_order_qty > 0),
  stock_qty      integer check (stock_qty >= 0),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists listings_organization_id_idx on public.listings (organization_id);
create index if not exists listings_status_idx on public.listings (status) where status = 'active';

create trigger listings_set_updated_at
  before update on public.listings
  for each row execute function public.set_updated_at();

create table if not exists public.listing_media (
  id         uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  url        text not null,
  alt_text   text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists listing_media_listing_id_idx on public.listing_media (listing_id);

alter table public.listings enable row level security;
alter table public.listing_media enable row level security;

create policy "listings activos son de lectura pública"
  on public.listings for select
  using (status = 'active');

create policy "dueños ven todos sus propios listings"
  on public.listings for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.organization_id = listings.organization_id
    )
  );

create policy "dueños gestionan sus propios listings"
  on public.listings for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.organization_id = listings.organization_id
    )
  );

create policy "dueños actualizan sus propios listings"
  on public.listings for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.organization_id = listings.organization_id
    )
  );

create policy "listing_media sigue la visibilidad del listing"
  on public.listing_media for select
  using (
    exists (
      select 1 from public.listings
      where listings.id = listing_media.listing_id
        and listings.status = 'active'
    )
  );
