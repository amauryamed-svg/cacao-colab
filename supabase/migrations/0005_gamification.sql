-- Cacao Colab v2 — gamificación. xp_ledger es append-only: el total de XP de un profile es
-- SUM(amount), nunca un contador mutable — evita race conditions en escrituras concurrentes.
-- leaderboard_weekly es una vista materializada refrescada por pg_cron (docs/06-ARQUITECTURA.md),
-- no una tabla base. Mapeo desde el prototipo Python amauryamed-svg/dualita — ver docs/09-GAMIFICACION.md.

create type progress_status as enum ('not_started', 'in_progress', 'completed');
create type xp_reason as enum (
  'lesson_completed', 'quiz_passed', 'streak_bonus',
  'listing_published', 'order_completed', 'manual_adjustment'
);

create table learner_progress (
  profile_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  status progress_status not null default 'not_started',
  completed_at timestamptz,
  primary key (profile_id, lesson_id)
);

create table xp_ledger (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  amount integer not null,
  reason xp_reason not null,
  ref_id uuid,
  created_at timestamptz not null default now()
);

create table streaks (
  profile_id uuid primary key references profiles(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_activity_date date
);

create table badges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  icon_url text
);

create table profile_badges (
  profile_id uuid not null references profiles(id) on delete cascade,
  badge_id uuid not null references badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (profile_id, badge_id)
);

create index idx_xp_ledger_profile on xp_ledger(profile_id);
create index idx_learner_progress_profile on learner_progress(profile_id);

-- Vista materializada — refrescar con: select cron.schedule('refresh-leaderboard', '*/15 * * * *',
-- $$ refresh materialized view concurrently leaderboard_weekly $$); una vez pg_cron esté habilitado.
create materialized view leaderboard_weekly as
select
  p.id as profile_id,
  p.full_name as display_name,
  coalesce(sum(x.amount), 0) as total_xp,
  rank() over (order by coalesce(sum(x.amount), 0) desc) as rank
from profiles p
left join xp_ledger x on x.profile_id = p.id and x.created_at > now() - interval '7 days'
group by p.id, p.full_name;

create unique index idx_leaderboard_weekly_profile on leaderboard_weekly(profile_id);

alter table learner_progress enable row level security;
alter table xp_ledger enable row level security;
alter table streaks enable row level security;
alter table badges enable row level security;
alter table profile_badges enable row level security;

create policy "profile ve su propio progreso" on learner_progress for select using (auth.uid() = profile_id);
create policy "profile actualiza su propio progreso" on learner_progress for all using (auth.uid() = profile_id);
create policy "profile ve su propio xp" on xp_ledger for select using (auth.uid() = profile_id);
create policy "profile ve su propia racha" on streaks for select using (auth.uid() = profile_id);
create policy "badges son públicos" on badges for select using (true);
create policy "profile_badges visibles públicamente (perfil social)" on profile_badges for select using (true);
