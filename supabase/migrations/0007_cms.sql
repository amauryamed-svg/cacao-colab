-- Cacao Colab v2 — blog interno de tendencias cacao/chocolate, nivel Callebaut/Valrhona.
-- Ver docs/06-ARQUITECTURA.md § blog.

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_mdx text not null,
  cover_image_url text,
  author_profile_id uuid references profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

create table post_tags (
  post_id uuid not null references posts(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create index idx_posts_published_at on posts(published_at);

alter table posts enable row level security;
alter table tags enable row level security;
alter table post_tags enable row level security;

create policy "posts publicados son públicos" on posts for select using (published_at is not null and published_at <= now());
create policy "tags son públicos" on tags for select using (true);
create policy "post_tags de post publicado son públicos" on post_tags for select
  using (post_id in (select id from posts where published_at is not null and published_at <= now()));
