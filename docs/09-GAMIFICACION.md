# Cacao Colab — Gamificación (Dualita)

> Mapeo verificado desde el código real del prototipo `amauryamed-svg/dualita` (abril 2026) —
> Python + **Flet** (no Kivy/BeeWare como se asumió inicialmente; Flet compila a Flutter). No es
> código reusable directamente en RN, pero el diseño de producto sí — se porta el concepto, no el código.

---

## 1. Qué existe en el prototipo y qué se porta

| Prototipo Python (`dualita/`) | Concepto | Se porta a v2 como |
|-------------------------------|----------|----------------------|
| `components/xp_bar.py` | Barra de XP + nivel, umbral `nivel × 300` acumulado | Componente RN `XpBar`, misma fórmula de nivel — ver sección 2 |
| `components/streak_counter.py` | Racha con emoji de fuego, color activo si `streak > 0` | Componente RN `StreakBadge`, mapea a tabla `streaks` |
| `components/achievement_badge.py` | Grid de badges, opacidad reducida si no desbloqueado | Componente RN `BadgeGrid`, mapea a `badges`/`profile_badges` |
| `screens/leaderboard.py` | Ranking semanal, divisiones Bronce/Plata/Oro/Diamante | Ver sección 3 — **con una corrección importante** |
| `data/curriculum.py` | 18 sesiones de "Formación Dual Chocolatería de Autor" (cata sensorial, perfilación, etc.) con lecciones de quiz reales | Contenido semilla real para `courses`/`modules`/`lessons`/`quizzes` — ver sección 4 |

---

## 2. Sistema de XP y niveles

Fórmula del prototipo: umbral del nivel N = `N × 300` XP acumulado. Se mantiene igual en v2 —
es un sistema ya diseñado y probado, no hay razón para rediseñarlo.

```
xp_ledger.amount por evento (reason):
  lesson_completed    → xp_reward de la lección (default 10, definido por lección en `lessons.xp_reward`)
  quiz_passed         → bonus fijo, TBD por Amaury (prototipo no lo separaba de lesson_completed)
  streak_bonus        → otorgado por job diario (pg_cron) si current_streak > 0
  listing_published    → nuevo en v2, no existía en el prototipo (incentiva actividad de vendedores)
  order_completed      → nuevo en v2 (incentiva actividad de compradores)
```

El nivel de un profile se calcula en el cliente/API a partir de `SUM(xp_ledger.amount)`, **nunca**
se guarda como columna mutable — ver `07-MODELO-DATOS.md` § 5 sobre por qué `xp_ledger` es append-only.

---

## 3. Leaderboard — corrección importante respecto al prototipo

El prototipo mezcla al usuario real con **bots simulados** (`BOTS` — nombres y XP aleatorios con
`random.seed(42)`) para que el ranking se sienta competitivo desde el usuario #1. **Esto no se
porta a v2.** Mezclar competidores falsos con datos reales de usuarios es exactamente el patrón que
el proyecto evita en otras superficies (reseñas/testimonios — ver reglas de contenido del
ecosistema Caúa: cero prueba social inventada). `leaderboard_weekly` en v2 muestra **solo usuarios
reales**; con pocos usuarios al inicio, el ranking simplemente tiene pocas filas — no se rellena
artificialmente.

Las **divisiones sí se portan** (Bronce/Plata/Oro/Diamante por umbral de XP) — son una mecánica de
producto legítima, no prueba social falsa. Implementar como función pura sobre `total_xp`, no una
tabla nueva.

---

## 4. Contenido semilla real: currículo del prototipo

`data/curriculum.py` en el prototipo tiene contenido real y bien elaborado: **"Formación Dual
Chocolatería de Autor"**, 18 sesiones, organizadas en secciones (ej. "Cata Sensorial y
Perfilación") con:
- Intro + `recipe_url` (PDF de guía) + cronograma (mañana/tarde por mes)
- Pasos de procedimiento (ej. protocolo de cata: preparación → análisis visual → auditivo →
  olfativo → degustación)
- Lecciones con preguntas de quiz reales (`choice`/`tf`) con explicación pedagógica por respuesta

Esto es contenido aprovechable como semilla real para `courses`/`modules`/`lessons`/`quizzes` en
Fase 5 — no hay que inventar contenido de cacao desde cero para el primer curso de CAÚA Academy.
Migrar `SECTIONS` → `modules`, cada lección de sección → `lessons` + `quizzes.questions` (mismo
shape `{prompt, options, correctIndex}` que `packages/types::quizQuestion`, solo traducir
`q`→`prompt`, `options`→`options`, `answer` (índice o bool)→`correctIndex`).

**Nota de contenido:** revisar el currículo migrado contra la regla de "no inventar claims sobre
el producto" del ecosistema Caúa antes de publicar — el contenido pedagógico general de cata está
bien, pero cualquier afirmación específica de producto (fermentación de X días, "biodisponible",
etc.) debe venir de fuente verificada, no del prototipo.

---

## 5. Badges — set inicial sugerido

El prototipo tiene un array `ACHIEVEMENTS` (emoji + nombre + descripción) no capturado en el
extracto revisado — Oscar/Hellen deben revisar `dualita/state.py::ACHIEVEMENTS` directamente al
migrar contenido, no inventar un set nuevo sin mirar el original.

## 6. No implementado todavía (Fase 7)

- Componentes RN reales (`XpBar`, `StreakBadge`, `BadgeGrid`) — solo el modelo de datos existe hoy (`0005_gamification.sql`).
- Job `pg_cron` de refresh de `leaderboard_weekly` y de `streak_bonus` diario.
- Migración real del contenido de `data/curriculum.py` a filas de `courses`/`lessons`/`quizzes`.
