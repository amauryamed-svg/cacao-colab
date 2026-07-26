-- Dominio: blog de tendencias (estilo Callebaut/Valrhona)

create table if not exists public.tags (
  id   uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

create table if not exists public.posts (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  title              text not null,
  excerpt            text not null,
  body_mdx           text not null,
  cover_image_url    text,
  author_profile_id  uuid references public.profiles(id) on delete set null,
  status             text not null default 'draft' check (status in ('draft', 'published')),
  published_at       timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

create table if not exists public.post_tags (
  post_id uuid not null references public.posts(id) on delete cascade,
  tag_id  uuid not null references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

alter table public.tags enable row level security;
alter table public.posts enable row level security;
alter table public.post_tags enable row level security;

create policy "tags son de lectura pública" on public.tags for select using (true);

create policy "posts publicados son de lectura pública"
  on public.posts for select
  using (status = 'published');

create policy "post_tags visibles si el post es visible"
  on public.post_tags for select
  using (
    exists (
      select 1 from public.posts
      where posts.id = post_tags.post_id
        and posts.status = 'published'
    )
  );
