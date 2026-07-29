# Cacao Colab — Gamificación de Dualita (v2)

> Nuevo en v2. Última actualización: 2026-07-26.
> Mapea el prototipo Python `amauryamed-svg/dualita` a la implementación real en Supabase + React/React Native. Este documento no fue verificado contra el código del prototipo Python directamente (no estaba en el alcance de exploración de esta pasada) — el mapeo de abajo es la interpretación funcional de cada componente nombrado en el pedido original, a validar con Oscar/Hellen antes de implementar.

---

## 1. Componentes del prototipo → tabla/UI real

| Componente Python (prototipo) | Qué hace (interpretado) | Tabla Supabase | Componente UI (web) | Componente UI (mobile) |
|-------------------------------|--------------------------|------------------|----------------------|--------------------------|
| `xp_bar` | Barra de progreso de XP dentro de una lección/nivel | `xp_ledger` (suma por profile) | `components/aprende/ProgressStrip.tsx` (existente, adaptar a XP real) | Nuevo — `apps/mobile` no lo porta en Fase 0 |
| `streak_counter` | Racha de días consecutivos de actividad | `streaks` | Nuevo (Fase 2) | Nuevo (Fase 2) |
| `achievement_badge` | Insignias por hito (ej. completar track completo) | `badges` + `profile_badges` | Nuevo (Fase 2) | Nuevo (Fase 2) |
| `leaderboard` | Ranking de usuarios por XP | `leaderboard_weekly` (vista materializada, refresh semanal vía `pg_cron`) | Nuevo (Fase 2) | Nuevo (Fase 2) |
| `curriculum_view` | Vista de currícula/track completo con progreso | `courses` → `modules` → `lessons` + `learner_progress` | `components/dualita/{MOOCTrack,MicroTrack,ModuleCard}.tsx` (existente, adaptar) | `app/(tabs)/aprende.tsx` (placeholder hoy) |

---

## 2. Qué se porta a React Native (`apps/mobile`) y qué no, en esta fundación

**Implementado:** campus web con XP, corazones, desbloqueo secuencial, persistencia local/remota y Cacao Gotchi. Mobile incorpora una interacción Gotchi básica; la paridad completa sigue pendiente.

**Pendiente en mobile:** OAuth nativo, sincronización offline, badges y leaderboard. La web usa `campus_progress`/`gotchi_runs`; aplicar la migración 0012 es obligatorio para persistencia multidispositivo.

---

## 3. Reglas de negocio de XP (a confirmar con el founder antes de implementar)

Los valores de XP por lección **ya existen** en el seed local (`apps/web/lib/lessons.ts` — cada lección tiene un campo `xp`, valores entre 45 y 70). Estos se portan tal cual a la columna `lessons.xp` cuando se migre el contenido a Supabase (Fase 2) — no se inventan valores nuevos.

Reglas pendientes de decisión (no inventadas en esta pasada):

- ¿Se otorga XP por completar el quiz correctamente al primer intento, o también con reintentos (con menos XP)?
- ¿La racha (`streaks`) se rompe a medianoche UTC o en la zona horaria del usuario?
- ¿El leaderboard es global o por territorio/organización?

---

## 4. Companion IA dentro de la experiencia gamificada

`components/aprende/DualitaCompanion.tsx` (existente) ya simula el companion con mensajes estáticos por lección (`companionIntro`/`companionMid`/`companionQuiz`/`companionComplete`/`companionTips` en `lib/lessons.ts`). En v2, `packages/ai-companion` reemplaza esos strings estáticos por respuestas generadas — ver `10-DUALITA-IA.md` para el detalle. La UI (posición fija, burbuja, tips rotativos) no cambia; cambia de dónde viene el texto.

---

## 5. Estado actual

- Arquitecto de Fermentación: seis misiones, 18 tarjetas, seis retos, corazones y 700 XP.
- Cacao Gotchi: crecimiento horario, parámetros de árbol, nodo, FEAR 5 y fase de fermentación.
- Campus Auth: Google, Apple y magic link implementados en código.
- Persistencia: tablas y RLS en migración 0012; fallback local resiliente.
- Pendiente operativo: habilitar proveedores OAuth y aplicar migraciones en el Supabase vivo.
