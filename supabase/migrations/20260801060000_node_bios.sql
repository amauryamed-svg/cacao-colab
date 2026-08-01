-- Bios de nodos / marcas / fincas — red social interna del Colab (.org)
-- Solicitud vía /unete/bio → perfil público /nodo/[slug]

create table if not exists public.node_bios (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  status            text not null default 'pending'
                      check (status in ('pending', 'published', 'rejected')),
  kind              text not null
                      check (kind in ('finca', 'marca', 'transformacion', 'horeca', 'otra')),
  display_name      text not null,
  org_name          text not null,
  city              text,
  territory         text,
  intro             text not null,
  avatar_url        text,
  product_image_url text,
  product_caption   text,
  email             text not null,
  whatsapp          text,
  instagram         text,
  website           text,
  share_token       text not null default encode(extensions.gen_random_bytes(8), 'hex'),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  published_at      timestamptz
);

comment on table public.node_bios is
  'Bio pública de nodo Colab (finca/marca/transformación). Activa la red social interna de conectividad.';

create index if not exists node_bios_status_idx on public.node_bios (status, created_at desc);
create index if not exists node_bios_email_idx on public.node_bios (email);

create trigger node_bios_set_updated_at
  before update on public.node_bios
  for each row execute function public.set_updated_at();

alter table public.node_bios enable row level security;

-- Lectura pública solo de bios publicadas (vitrina / compartir)
create policy "node_bios published son lectura pública"
  on public.node_bios for select
  using (status = 'published');

-- Escritura solo service_role (API /unete/bio)
create policy "solo service_role escribe node_bios"
  on public.node_bios for insert
  with check (auth.role() = 'service_role');

create policy "solo service_role actualiza node_bios"
  on public.node_bios for update
  using (auth.role() = 'service_role');

-- Bucket público para fotos de perfil y producto (opcional; API puede guardar data URLs)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'node-media',
  'node-media',
  true,
  524288,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy "node-media lectura pública"
  on storage.objects for select
  using (bucket_id = 'node-media');

create policy "node-media service_role escribe"
  on storage.objects for insert
  with check (bucket_id = 'node-media' and auth.role() = 'service_role');
