-- Cacao Colab v2 — LMS Dualita: MOOC Zurych + microlearning CAÚA Academy.
-- Reemplaza apps/web/lib/dualita.ts y lib/lessons.ts (arrays hardcodeados) por datos reales.
-- Ver docs/09-GAMIFICACION.md.

create type course_track as enum ('mooc_zurych', 'micro_caua');
create type lesson_content_type as enum ('video', 'text', 'quiz');

create table courses (
  id uuid primary key default gen_random_uuid(),
  track course_track not null,
  slug text not null unique,
  title text not null,
  description text,
  published boolean not null default false
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  position integer not null default 0
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  slug text not null,
  title text not null,
  content_type lesson_content_type not null default 'text',
  content_url text,
  body_mdx text,
  xp_reward integer not null default 10 check (xp_reward >= 0),
  position integer not null default 0,
  unique (module_id, slug)
);

create table quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  questions jsonb not null default '[]',
  passing_score_pct integer not null default 70 check (passing_score_pct between 0 and 100)
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id),
  profile_id uuid not null references profiles(id),
  score_pct integer not null check (score_pct between 0 and 100),
  passed boolean not null,
  attempted_at timestamptz not null default now()
);

create index idx_modules_course on modules(course_id);
create index idx_lessons_module on lessons(module_id);
create index idx_quizzes_lesson on quizzes(lesson_id);
create index idx_quiz_attempts_profile on quiz_attempts(profile_id);

alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table quizzes enable row level security;
alter table quiz_attempts enable row level security;

create policy "cursos publicados son públicos" on courses for select using (published = true);
create policy "módulos de curso publicado son públicos" on modules for select
  using (course_id in (select id from courses where published = true));
create policy "lecciones de curso publicado son públicas" on lessons for select
  using (module_id in (select id from modules where course_id in (select id from courses where published = true)));
create policy "quizzes de lección visible son públicos" on quizzes for select
  using (lesson_id in (select id from lessons));
create policy "profile ve sus propios intentos" on quiz_attempts for select using (auth.uid() = profile_id);
create policy "profile registra sus propios intentos" on quiz_attempts for insert with check (auth.uid() = profile_id);
