# Contribuir a Cacao Colab

Gracias por construir con nosotros. Los **builders fundadores** son Amaury (PM), Hellen (Frontend) y Oscar (Backend).

## Antes de codear

1. Lee [`docs/00-SPEC.md`](docs/00-SPEC.md) — Spec-Driven: el rumbo se escribe en docs antes que en código.  
2. Corre el plug-and-play: [`docs/20-PLUG-AND-PLAY.md`](docs/20-PLUG-AND-PLAY.md)  
3. Revisa roles: [`docs/19-BUILDERS-FOUNDERS.md`](docs/19-BUILDERS-FOUNDERS.md)

## Flujo

```bash
git checkout -b cursor/<descripcion-corta>
# … cambios …
pnpm typecheck
git push -u origin HEAD
# abrir PR hacia main
```

- **Hellen:** PRs de UI en `apps/web`, `apps/mobile`, `packages/ui-tokens`.  
- **Oscar:** PRs de API, Supabase, packages de clientes, CRM.  
- **Amaury:** Spec, roadmap, copy de producto, aprobación de release.

CODEOWNERS sugiere revisores automáticamente (`.github/CODEOWNERS`).

## Invitación al repo

Si aún no tienes acceso Write, pide a Amaury que te invite como collaborator (`HellenBareno-eng` / `oscargamboa68`).
