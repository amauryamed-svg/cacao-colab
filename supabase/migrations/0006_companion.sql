-- Cacao Colab v2 — memoria del companion Dualita en Postgres real (NO el hack de
-- HubSpot-deal-como-KV que usa Emily hoy — ver docs/10-DUALITA-IA.md).

create type companion_channel as enum ('mobile', 'web');
create type companion_message_role as enum ('user', 'assistant', 'tool');

create table companion_conversations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  channel companion_channel not null,
  started_at timestamptz not null default now()
);

create table companion_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references companion_conversations(id) on delete cascade,
  role companion_message_role not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table companion_memory (
  profile_id uuid not null references profiles(id) on delete cascade,
  key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (profile_id, key)
);

create index idx_companion_conversations_profile on companion_conversations(profile_id);
create index idx_companion_messages_conversation on companion_messages(conversation_id);

alter table companion_conversations enable row level security;
alter table companion_messages enable row level security;
alter table companion_memory enable row level security;

create policy "profile ve sus propias conversaciones" on companion_conversations for select using (auth.uid() = profile_id);
create policy "profile crea sus propias conversaciones" on companion_conversations for insert with check (auth.uid() = profile_id);
create policy "profile ve sus propios mensajes" on companion_messages for select
  using (conversation_id in (select id from companion_conversations where profile_id = auth.uid()));
create policy "profile ve su propia memoria" on companion_memory for select using (auth.uid() = profile_id);
