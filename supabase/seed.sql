-- Seed de Fase 0. Se corre automáticamente con `supabase db reset` una vez
-- exista el proyecto real. No crea filas de auth.users — eso ocurre en el
-- primer login real de cada persona (magic link). El trigger
-- link_team_member() (20260726100011_team_auth.sql) conecta user_id
-- automáticamente ese día.

-- Equipo Cacao Colab — pre-registro para el portal /equipo.
-- Emails confirmados por Amaury el 2026-07-26.
insert into public.team_members (email, full_name, team_role, hubspot_contact_email)
values
  -- Founder de cacaotier y builder de Cacao Colab.
  ('amauryamed@gmail.com', 'Amaury Amed', 'founder', 'amauryamed@gmail.com'),
  -- Hellen SÍ tiene contacto real en HubSpot — el panel de /equipo le
  -- muestra datos reales (contacto + deals asociados).
  ('hellenandba@gmail.com', 'Hellen Bareño', 'engineering_frontend', 'hellenandba@gmail.com'),
  -- Oscar NO tiene contacto en HubSpot (se buscó por nombre, apellido
  -- "Gamboa" y compañía — cero resultados el 2026-07-26). hubspot_contact_email
  -- queda NULL a propósito: el panel le muestra un estado vacío explícito,
  -- nunca un dato inventado. Si el usuario decide darlo de alta en HubSpot
  -- más adelante, solo hay que hacer un UPDATE de esta fila.
  ('amadooscarito@gmail.com', 'Oscar Gamboa', 'engineering_backend', null)
on conflict (email) do update set
  full_name = excluded.full_name,
  team_role = excluded.team_role,
  hubspot_contact_email = excluded.hubspot_contact_email;
