-- Dominio: companion IA de Dualita (docs/10-DUALITA-IA.md)
-- Persistencia real en Postgres — reemplaza el hack de Emily (caua-io) de
-- usar un HubSpot deal como KV store de memoria de conversación.

create table if not exists public.companion_conversations (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  lesson_id  uuid references public.lessons(id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at   timestamptz
);

create table if not exists public.companion_messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.companion_conversations(id) on delete cascade,
  role            text not null check (role in ('user', 'assistant', 'tool')),
  content         text not null,
  created_at      timestamptz not null default now()
);

create index if not exists companion_messages_conversation_id_idx
  on public.companion_messages (conversation_id);

create table if not exists public.companion_memory (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  key        text not null,
  value      text not null,
  updated_at timestamptz not null default now(),
  unique (profile_id, key)
);

create trigger companion_memory_set_updated_at
  before update on public.companion_memory
  for each row execute function public.set_updated_at();

alter table public.companion_conversations enable row level security;
alter table public.companion_messages enable row level security;
alter table public.companion_memory enable row level security;

create policy "usuarios ven sus propias conversations"
  on public.companion_conversations for select
  using (auth.uid() = profile_id);

create policy "usuarios crean sus propias conversations"
  on public.companion_conversations for insert
  with check (auth.uid() = profile_id);

create policy "usuarios ven mensajes de sus conversations"
  on public.companion_messages for select
  using (
    exists (
      select 1 from public.companion_conversations
      where companion_conversations.id = companion_messages.conversation_id
        and companion_conversations.profile_id = auth.uid()
    )
  );

create policy "usuarios ven su propia companion_memory"
  on public.companion_memory for select
  using (auth.uid() = profile_id);
