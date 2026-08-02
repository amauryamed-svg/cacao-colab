-- Foro interno Colab: anuncios, sincronías de progreso y likes 🍫

create table if not exists public.colab_forum_posts (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  kind         text not null default 'progress'
                 check (kind in ('announcement', 'progress', 'sync')),
  title        text not null,
  body         text not null,
  course_slug  text,
  grade        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.colab_forum_posts is
  'Foro interno del Colab: anuncios del equipo, avances de maestría y sincronicidades.';

create index if not exists colab_forum_posts_created_idx
  on public.colab_forum_posts (created_at desc);

create index if not exists colab_forum_posts_kind_idx
  on public.colab_forum_posts (kind, created_at desc);

create trigger colab_forum_posts_set_updated_at
  before update on public.colab_forum_posts
  for each row execute function public.set_updated_at();

create table if not exists public.colab_forum_reactions (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.colab_forum_posts(id) on delete cascade,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  emoji       text not null default '🍫'
                check (emoji in ('🍫', '☕', '🌱', '🔥', '💛')),
  created_at  timestamptz not null default now(),
  unique (post_id, profile_id, emoji)
);

comment on table public.colab_forum_reactions is
  'Reacciones tipo like con emojis cacao (🍫 por defecto).';

create index if not exists colab_forum_reactions_post_idx
  on public.colab_forum_reactions (post_id);

alter table public.colab_forum_posts enable row level security;
alter table public.colab_forum_reactions enable row level security;

-- Lectura: miembros autenticados del marketplace
create policy "foro posts lectura auth"
  on public.colab_forum_posts for select
  to authenticated
  using (true);

create policy "foro posts insert propios"
  on public.colab_forum_posts for insert
  to authenticated
  with check (auth.uid() = profile_id);

create policy "foro posts update propios"
  on public.colab_forum_posts for update
  to authenticated
  using (auth.uid() = profile_id);

create policy "foro posts delete propios"
  on public.colab_forum_posts for delete
  to authenticated
  using (auth.uid() = profile_id);

create policy "foro reactions lectura auth"
  on public.colab_forum_reactions for select
  to authenticated
  using (true);

create policy "foro reactions insert propias"
  on public.colab_forum_reactions for insert
  to authenticated
  with check (auth.uid() = profile_id);

create policy "foro reactions delete propias"
  on public.colab_forum_reactions for delete
  to authenticated
  using (auth.uid() = profile_id);

-- Anuncios: solo team_members (o service_role) pueden crear kind=announcement
-- Se refuerza en server action; policy permisiva de insert arriba exige profile_id propio.

-- Seed opcional vía service_role en app si no hay posts.
