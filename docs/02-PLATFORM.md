# Cacao Colab — Plataforma técnica de `apps/web` (heredado de v1)

> Estado: v1, describe específicamente `apps/web` dentro del monorepo v2.
> Última actualización: 2026-06-16 · **Rutas actualizadas a la ubicación v2: 2026-07-24**
> Para la arquitectura completa del monorepo (apps/api, apps/mobile, packages/*, infra 10K
> usuarios) ver **`06-ARQUITECTURA.md`** — este documento queda como referencia específica de
> `apps/web`, no se borra porque sigue siendo preciso para esa app.

---

## 1. Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js App Router | 16.2.9 |
| Estilos | Tailwind CSS | v4 (`@theme` tokens, ahora poblado desde `packages/ui-tokens`) |
| Lenguaje | TypeScript | — |
| Deploy | Vercel | Auto en push a main (proyecto separado de `apps/api`, ver `06-ARQUITECTURA.md`) |
| CRM | HubSpot API v3 | Private App token, vía `packages/hubspot-client` (antes inline en la route) |
| Repo | github.com/amauryamed-svg/cacao-colab | branch: `main` (trabajo en curso en `v2-pivot`), path: `apps/web/` |

---

## 2. Tokens de marca (`app/globals.css`)

```css
@theme {
  --color-colab-yellow:  #F2C830;   /* primario */
  --color-colab-amber:   #C8A010;   /* hover */
  --color-colab-green:   #3D7A2C;   /* secundario */
  --color-colab-forest:  #1A2E10;   /* dark bg */
  --color-colab-cream:   #F7F1EE;   /* Heirloom White */
  --color-colab-pod:     #87AA27;   /* Pod Green */
  --color-colab-ink:     #1C3B26;   /* forest claro */
  --color-colab-mist:    #E8E0DA;

  --font-display: Georgia, "Times New Roman", serif;
  --font-ui:      Arial, Helvetica, sans-serif;
}
```

Keyframes globales: `squirrelBob` (ardilla flotante) · `fadeUp` (reveal de pasos).

---

## 3. Árbol de rutas

> Todas las rutas de abajo viven ahora bajo `apps/web/` (antes en la raíz del repo). Las rutas HTTP
> no cambian, solo la ubicación de los archivos en disco.

```
/                    → Landing (hero + marketplace + dualita + CTAs)
/marketplace         → Galería de marcas expandida
/aprende             → Hub Dualita completo
/unete               → Onboarding standalone (también accesible directo)

/api/onboarding      POST → HubSpot create/upsert + Set-Cookie
/api/onboarding/skip POST → solo Set-Cookie (sin HubSpot)
```

---

## 4. Árbol de componentes

```
app/
  layout.tsx            ← Navbar + OnboardingGate (server) + Footer
  page.tsx              ← Landing: Hero + Marketplace + Dualita + CTA Únete + CTA Marcas
  marketplace/page.tsx
  aprende/page.tsx
  unete/page.tsx        ← wrapper de OnboardingFlow
  globals.css
  api/
    onboarding/
      route.ts          ← HubSpot + cookie
      skip/route.ts     ← solo cookie

components/
  nav/Navbar.tsx
  brand/
    SquirrelSVG.tsx     ← ardilla SVG inline (animada)
    CacaoColabWordmark.tsx
  marketplace/
    BrandCard.tsx
    ComingSoonSlot.tsx
  dualita/
    DualitaHero.tsx
    MOOCTrack.tsx       ← MOOC Zurych (próximamente)
    MicroTrack.tsx      ← CAÚA Academy 6 módulos (gratis)
    ModuleCard.tsx
  onboarding/
    OnboardingGate.tsx  ← server component: lee cookie colab_onboarded
    OnboardingGateClient.tsx ← client: muestra/oculta overlay
    OnboardingFlow.tsx  ← 5 pasos + confirmación
  ui/
    Button.tsx
    SectionKicker.tsx

lib/
  brands.ts             ← data: CAÚA + Zurych + slots
  dualita.ts            ← data: módulos MOOC + micro
```

---

## 5. Onboarding gate — flujo técnico

```
Usuario llega a cualquier ruta
    ↓
layout.tsx → OnboardingGate (server)
    ↓
cookies().get('colab_onboarded') ?
    ├── SÍ → renderiza children directo (sin gate)
    └── NO → OnboardingGateClient muestra overlay fullscreen

OnboardingFlow completa paso 5
    ↓
fetch POST /api/onboarding { tipo, nombre, operacion, interes, ciudad, email, whatsapp }
    ↓
API → HubSpot CRM (create o upsert por email)
    ↓
Response headers: Set-Cookie: colab_onboarded=done; Max-Age=31536000
    ↓
dismiss() → fade out overlay → unmount
```

---

## 6. Variables de entorno

| Variable | Dónde | Descripción |
|----------|-------|-------------|
| `HUBSPOT_ACCESS_TOKEN` | Vercel env vars | Private App token HubSpot. Permisos: `crm.objects.contacts.write` + `read`. **Renombrado de `HUBSPOT_TOKEN` en v2 (D18)** — nunca se llegó a configurar en Vercel, sin riesgo de migración en vivo. |

Archivo local: `.env.local` (en .gitignore, no commitear).

Para agregarlo en Vercel: Settings → Environment Variables → Production + Preview + Development.

---

## 7. Deploy

Push a `main` → Vercel detecta automáticamente → build + deploy en ~60s.

URL producción: `https://cacao-colab.vercel.app` (dominio propio pendiente — ver P6 en `00-SPEC.md`).
**El redirect ciego a `caua.cloud/colab` que existía en producción fue eliminado en v2** — ver
`00-SPEC.md` § 0.

Para revisar builds: Vercel dashboard → proyecto `cacao-colab-web` (nuevo, separado del proyecto
`api`) → Deployments. Ver `06-ARQUITECTURA.md` § infraestructura.
