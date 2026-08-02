-- Economía MD más sostenible: rangos más altos + sinks más caros.
-- Las tasas de emisión (mazorcaRewards / scorecard) viven en código (loyalty.ts).

update public.community_ranks set min_lifetime_md = 120 where slug = 'brote';
update public.community_ranks set min_lifetime_md = 400 where slug = 'labrador';
update public.community_ranks set min_lifetime_md = 1000 where slug = 'guardian';
update public.community_ranks set min_lifetime_md = 2200 where slug = 'maestro';
update public.community_ranks set min_lifetime_md = 5000 where slug = 'heritage';

update public.benefit_catalog_items
set cost_md = 500
where brand_key = 'cacaotier' and slug = 'aceleracion-arquitecto';

update public.benefit_catalog_items
set cost_md = 700
where brand_key = 'cacaotier' and slug = 'preview-master-chocolatier';

update public.benefit_catalog_items
set cost_md = 600
where brand_key = 'cacaotier' and slug = 'ruta-benevolo';

update public.benefit_catalog_items
set cost_md = 400
where brand_key = 'cacaotier' and slug = 'mentoria-dualita-semana';
