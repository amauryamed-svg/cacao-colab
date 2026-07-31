# Builders fundadores de Cacao Colab

> Última actualización: 2026-07-31  
> Los tres somos los **Builders fundadores** del repositorio y de la plataforma.

---

## El trío fundador

| Builder | GitHub | Rol de producto | Foco técnico | Email interno (`team_members`) |
|---------|--------|-----------------|--------------|--------------------------------|
| **Amaury Amed** | [`amauryamed-svg`](https://github.com/amauryamed-svg) | **Product Manager** · Founder cacaotier · visión Colab | Spec-Driven, priorización, nodos, go-to-market | `amauryamed@gmail.com` |
| **Hellen Bareño** | [`HellenBareno-eng`](https://github.com/HellenBareno-eng) | **Frontend Lead** · Builder fundadora | `apps/web`, `apps/mobile`, Dualita UI, design system | `hellenandba@gmail.com` |
| **Oscar Gamboa** | [`oscargamboa68`](https://github.com/oscargamboa68) | **Backend Lead** · Builder fundador | `apps/api`, Supabase, HubSpot, Stripe, CRM `/equipo` | `amadooscarito@gmail.com` |

> **Nota de username:** el handle de Hellen en GitHub es `HellenBareno-eng` (con doble *l*).

---

## Cómo se guían

### Amaury — Product Manager
- Dueño del Spec (`docs/00-SPEC.md`) y del roadmap (`docs/05-ROADMAP.md`).
- Decide qué entra en cada sprint; valida copy, nodos y criterios de excelencia.
- Aprueba releases web (Vercel) y el paso a App Store / Google Play (`docs/21-APP-STORES.md`).
- Invita collaborators en GitHub (Settings → Collaborators) si el token del CI no puede hacerlo.

### Hellen — Frontend
- Superficies: marketing, marketplace, Dualita, Sembrar, R&D, Benevolo, campus UI.
- Stack: **TypeScript + Next.js 16 (App Router) + React 19 + Tailwind v4** en `apps/web`; **Expo / React Native** en `apps/mobile`.
- Guía rápida: `docs/02-PLATFORM.md`, `docs/13-MOBILE.md`, tokens en `packages/ui-tokens`.
- Plug-and-play: `docs/20-PLUG-AND-PLAY.md` § Hellen.

### Oscar — Backend
- Superficies: `apps/api` (`/api/v1/*`), migraciones Supabase, auth (`profiles` vs `team_members`), HubSpot sync, Stripe stub → Connect.
- Stack: **TypeScript + Next.js headless + Supabase (Postgres/RLS/Auth) + Zod (`packages/types`)**.
- Guía rápida: `docs/06-ARQUITECTURA.md`, `docs/07-MODELO-DATOS.md`, `docs/14-CRM-INTERNO.md`.
- Plug-and-play: `docs/20-PLUG-AND-PLAY.md` § Oscar.

---

## Acceso al repositorio

Repo: [amauryamed-svg/cacao-colab](https://github.com/amauryamed-svg/cacao-colab)

CODEOWNERS (`.github/CODEOWNERS`) nombra a Hellen en frontend y a Oscar en backend.  
Si aún no aparecen como collaborators, Amaury debe invitar:

1. GitHub → **Settings → Collaborators → Add people**
2. Invitar `HellenBareno-eng` (Write) y `oscargamboa68` (Write)
3. Ellos aceptan el mail de invitación

Comando (solo con token con permiso `admin:repo` / ownership):

```bash
gh api --method PUT repos/amauryamed-svg/cacao-colab/collaborators/HellenBareno-eng -f permission=push
gh api --method PUT repos/amauryamed-svg/cacao-colab/collaborators/oscargamboa68 -f permission=push
```

---

## Portal interno `/equipo`

Los tres emails están en `supabase/seed.sql` como `team_members` con `access_level = superadmin`.  
Login unificado: `/cuenta/entrar` → magic link → `claim_team_membership()`.

---

## Invitación abierta al Colab

Cacao Colab no es un club cerrado de marcas: el círculo de **nodos** permanece abierto.  
Quien quiera aportar (finca, marca, cocina, código o aprendizaje) puede:

1. Entrar en [cacao-colab.vercel.app](https://cacao-colab.vercel.app) → **Unirme**
2. Escribir por WhatsApp al CTA del site
3. Clonar el repo y correr el bootstrap plug-and-play (`docs/20-PLUG-AND-PLAY.md`)

Los builders fundadores orientan; no concentran ownership de las marcas regionales.
