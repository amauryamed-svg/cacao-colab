-- Renombra el rango top (slug) a heritage / Heritage.
-- Actualiza FKs en benefit_catalog_items antes de borrar el slug anterior.

do $$
declare
  old_sort integer;
  old_icon text;
  old_min integer;
  old_desc text;
begin
  if exists (select 1 from public.community_ranks where slug = 'legado') then
    select sort_order, icon, min_lifetime_md, description
      into old_sort, old_icon, old_min, old_desc
    from public.community_ranks
    where slug = 'legado';

    insert into public.community_ranks (slug, name, description, icon, min_lifetime_md, sort_order)
    values (
      'heritage',
      'Heritage',
      coalesce(old_desc, 'Ayudas a que la siguiente generación herede una labranza viva.'),
      coalesce(old_icon, '◉'),
      coalesce(old_min, 3000),
      999
    )
    on conflict (slug) do update set
      name = excluded.name,
      description = excluded.description,
      icon = excluded.icon,
      min_lifetime_md = excluded.min_lifetime_md;

    update public.benefit_catalog_items
    set min_rank_slug = 'heritage'
    where min_rank_slug = 'legado';

    delete from public.community_ranks where slug = 'legado';

    update public.community_ranks
    set
      name = 'Heritage',
      description = 'Ayudas a que la siguiente generación herede una labranza viva.',
      sort_order = coalesce(old_sort, 6)
    where slug = 'heritage';
  elsif exists (select 1 from public.community_ranks where slug = 'heritage') then
    update public.community_ranks
    set
      name = 'Heritage',
      description = 'Ayudas a que la siguiente generación herede una labranza viva.'
    where slug = 'heritage';
  end if;
end $$;
