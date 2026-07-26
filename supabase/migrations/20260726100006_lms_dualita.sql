-- Dominio: courses / modules / lessons / quizzes (Dualita LMS)
-- Reemplaza apps/web/lib/dualita.ts y apps/web/lib/lessons.ts.
-- Ver docs/09-GAMIFICACION.md y docs/10-DUALITA-IA.md.

create table if not exists public.courses (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique,
  title                  text not null,
  track                  text not null check (track in ('mooc', 'micro')),
  owner_organization_id  uuid references public.organizations(id) on delete set null,
  created_at             timestamptz not null default now()
);

create table if not exists public.modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  number      integer not null check (number > 0),
  title       text not null,
  duration_label text not null,
  sort_order  integer not null default 0,
  unique (course_id, number)
);

create table if not exists public.lessons (
  id                 uuid primary key default gen_random_uuid(),
  module_id          uuid not null references public.modules(id) on delete cascade,
  slug               text not null unique,
  title              text not null,
  emoji              text,
  xp                 integer not null default 0 check (xp >= 0),
  companion_intro    text not null,
  companion_mid      text not null,
  companion_quiz     text not null,
  companion_complete text not null,
  companion_tips     text[] not null default '{}',
  body_mdx           text not null
);

create index if not exists lessons_module_id_idx on public.lessons (module_id);

create table if not exists public.quizzes (
  id          uuid primary key default gen_random_uuid(),
  lesson_id   uuid not null references public.lessons(id) on delete cascade,
  question    text not null,
  -- options: [{ id, text, correct, explanation }] — se valida en la capa
  -- de aplicación con el Zod schema quizOptionSchema de @cacao-colab/types,
  -- Postgres solo exige que sea un array JSON no vacío.
  options     jsonb not null check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) >= 2)
);

alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.quizzes enable row level security;

create policy "courses son de lectura pública" on public.courses for select using (true);
create policy "modules son de lectura pública" on public.modules for select using (true);
create policy "lessons son de lectura pública" on public.lessons for select using (true);
create policy "quizzes son de lectura pública" on public.quizzes for select using (true);
