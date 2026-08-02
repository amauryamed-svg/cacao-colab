# Foro Colab · cierre de maestría

> 2026-08-02 · cierre Master Chocolatier + foro interno

## Problema

Al terminar el capstone de `/campus/maestro-chocolatier`, el flujo podía quedarse en el quiz correcto sin mostrar calificación, diploma, resumen de avances ni invitación a practicar.

## Cierre de maestría

- Componente `MasteryClose`: nota, stats, checklist de misiones, diploma, Sembrar, foro.
- `ChocolatierCoursePlayer`: restaura `course-complete` si ya hay diploma / 6/6; botón Continuar tras acierto; CTA lateral «Ver calificación y diploma».
- `campus/actions`: `completed_at` solo se escribe al completar (no se borra en saves parciales).

## Foro interno `/colab`

| Pieza | Ruta / archivo |
|-------|----------------|
| Feed + composer | `/colab` |
| Migración | `supabase/migrations/20260802024000_colab_foro_interno.sql` |
| Actions | `apps/web/app/colab/actions.ts` |
| Likes | 🍫 ☕ 🌱 🔥 💛 (`colab_forum_reactions`) |

Tipos de post: `announcement` (equipo), `progress` (maestría), `sync` (sincronicidad).

Desde el cierre de curso: `/colab?share=maestro-chocolatier&grade=…` prellena el composer.

## Ops

Aplicar migración `20260802024000_colab_foro_interno.sql` en Supabase. Sin ella, el foro muestra error claro al publicar.