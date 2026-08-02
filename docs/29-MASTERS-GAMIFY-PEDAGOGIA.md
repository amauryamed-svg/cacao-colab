# Masters · gamify Duolingo + pedagogía con fuentes

> 2026-08-02 · Arquitecto + Chocolatier

## Problemas atendidos
- Cierre de diploma que se “queda” en el quiz (Continuar + MasteryClose también en Arquitecto).
- Confusión racha 🔥 vs nota (primer intento).
- Opciones de quiz predecibles (correcta casi siempre en B) → shuffle determinista por misión.
- Falta de celebración / SFX / Dualita reactiva.
- Fuentes (papers, CoEx, Awards, Agrosavia/Fedecacao) poco visibles en el player.

## Piezas
| Archivo | Rol |
|---------|-----|
| `lib/campus-gamify.ts` | shuffle + Web Audio SFX |
| `lib/campus-sources.ts` | panel de fuentes |
| `components/campus/CampusCelebrate.tsx` | confeti / exclamación |
| `components/campus/CampusSourcesPanel.tsx` | UI fuentes |
| `ArchitectCoursePlayer` / `ChocolatierCoursePlayer` | integración |

## Nota de producto
La racha diaria premia constancia. La calificación del diploma cuenta retos correctos al **primer intento**. Son contadores distintos; el copy del HUD lo deja explícito.
