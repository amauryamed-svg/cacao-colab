-- Cacao Colab v2 — marketplace: listings de agricultores/chocolateros/maquiladores.
-- Ver docs/12-SRS.md RF-6.

create type listing_status as enum ('draft', 'published', 'archived');

create table listings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  profile_id uuid references profiles(id),
  territory_id uuid references territories(id),
  category text not null,
  title text not null,
  description text,
  unit text not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD',
  min_order_qty integer not null check (min_order_qty > 0),
  stock_qty integer not null default 0 check (stock_qty >= 0),
  traceability_lot_code text,
  certifications text[] not null default '{}',
  status listing_status not null default 'draft',
  created_at timestamptz not null default now(),
  constraint listing_owner_check check (organization_id is not null or profile_id is not null)
);

create table listing_media (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  url text not null,
  alt_text text,
  position integer not null default 0
);

create index idx_listings_status on listings(status);
create index idx_listings_territory on listings(territory_id);
create index idx_listings_category on listings(category);
create index idx_listing_media_listing on listing_media(listing_id);

alter table listings enable row level security;
alter table listing_media enable row level security;

create policy "listings publicados son públicos" on listings for select using (status = 'published');
create policy "dueño ve sus propios listings sin publicar" on listings for select
  using (auth.uid() = profile_id or organization_id in (select organization_id from profiles where id = auth.uid()));
create policy "dueño crea sus listings" on listings for insert
  with check (auth.uid() = profile_id or organization_id in (select organization_id from profiles where id = auth.uid()));
create policy "dueño edita sus listings" on listings for update
  using (auth.uid() = profile_id or organization_id in (select organization_id from profiles where id = auth.uid()));
create policy "media de listing publicado es pública" on listing_media for select
  using (listing_id in (select id from listings where status = 'published'));
