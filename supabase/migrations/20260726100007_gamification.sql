-- Dominio: gamificación
-- Mapeo desde el prototipo Python amauryamed-svg/dualita (xp_bar,
-- streak_counter, achievement_badge, leaderboard, curriculum_view).
-- Ver docs/09-GAMIFICACION.md para el detalle de qué se porta a React Native.

create table if not exists public.learner_progress (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  lesson_id    uuid not null references public.lessons(id) on delete cascade,
  completed_at timestamptz,
  quiz_score   numeric check (quiz_score between 0 and 1),
  created_at   timestamptz not null default now(),
  unique (profile_id, lesson_id)
);

-- Append-only, igual que commission_ledger. Nunca UPDATE.
create table if not exists public.xp_ledger (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  amount     integer not null,
  reason     text not null,
  lesson_id  uuid references public.lessons(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists xp_ledger_profile_id_idx on public.xp_ledger (profile_id);

create table if not exists public.streaks (
  id                 uuid primary key default gen_random_uuid(),
  profile_id         uuid not null unique references public.profiles(id) on delete cascade,
  current_length     integer not null default 0 check (current_length >= 0),
  longest_length     integer not null default 0 check (longest_length >= 0),
  last_activity_date date not null default current_date
);

create table if not exists public.badges (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text not null,
  icon_emoji  text not null
);

create table if not exists public.profile_badges (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  badge_id   uuid not null references public.badges(id) on delete cascade,
  earned_at  timestamptz not null default now(),
  unique (profile_id, badge_id)
);

-- Vista materializada, refresh semanal vía pg_cron (docs/06-ARQUITECTURA.md).
-- Se declara acá el `create materialized view` inicial; el `refresh` se
-- programa cuando exista el proyecto real:
--   select cron.schedule('leaderboard-weekly-refresh', '0 3 * * 1',
--     $$ refresh materialized view concurrently public.leaderboard_weekly $$);
create materialized view if not exists public.leaderboard_weekly as
select
  p.id as profile_id,
  p.full_name,
  date_trunc('week', now())::date as week_start,
  coalesce(sum(x.amount), 0) as xp_total,
  rank() over (order by coalesce(sum(x.amount), 0) desc) as rank
from public.profiles p
left join public.xp_ledger x
  on x.profile_id = p.id
  and x.created_at >= date_trunc('week', now())
group by p.id, p.full_name;

create unique index if not exists leaderboard_weekly_profile_id_idx
  on public.leaderboard_weekly (profile_id);

alter table public.learner_progress enable row level security;
alter table public.xp_ledger enable row level security;
alter table public.streaks enable row level security;
alter table public.badges enable row level security;
alter table public.profile_badges enable row level security;

create policy "usuarios ven su propio learner_progress"
  on public.learner_progress for select
  using (auth.uid() = profile_id);

create policy "usuarios registran su propio learner_progress"
  on public.learner_progress for insert
  with check (auth.uid() = profile_id);

create policy "usuarios ven su propio xp_ledger"
  on public.xp_ledger for select
  using (auth.uid() = profile_id);

create policy "usuarios ven su propio streak"
  on public.streaks for select
  using (auth.uid() = profile_id);

create policy "badges son de lectura pública"
  on public.badges for select
  using (true);

create policy "usuarios ven sus propios profile_badges"
  on public.profile_badges for select
  using (auth.uid() = profile_id);

-- leaderboard_weekly (vista materializada) no soporta RLS directo en
-- Postgres — se expone de lectura pública vía una vista normal encima si
-- se necesita filtrar, o vía apps/api con service_role. Documentado como
-- decisión pendiente en docs/06-ARQUITECTURA.md.
