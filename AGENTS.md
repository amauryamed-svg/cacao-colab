<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Cacao Colab — monorepo

Método Spec-Driven: lee `docs/00-SPEC.md` antes de cambiar rumbo, y `docs/11-PRD.md` +
`docs/12-SRS.md` antes de implementar una feature nueva. Actualiza el Spec, no lo contradigas en
silencio con código.

- `apps/web` y `apps/api` son Next.js 16 (aplica la nota de arriba a ambas).
- `apps/mobile` es Expo/React Native — no tiene `node_modules/next`, no aplica esa nota.
- La paleta y tipografía de marca viven **solo** en `packages/ui-tokens` — no hardcodear colores hex
  en componentes nuevos.
- `packages/stripe-client` y `HUBSPOT_ACCESS_TOKEN`/Supabase reales no están conectados todavía
  (ver `docs/00-SPEC.md` § pendientes) — el código compila contra su forma esperada pero no se ha
  probado contra cuentas reales.
