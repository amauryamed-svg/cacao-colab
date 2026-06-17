# Cacao Colab — Plataforma técnica

> Estado: v1 live en cacao-colab.vercel.app
> Última actualización: 2026-06-16

---

## 1. Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js App Router | 16.2.9 |
| Estilos | Tailwind CSS | v4 (`@theme` tokens) |
| Lenguaje | TypeScript | — |
| Deploy | Vercel | Auto en push a main |
| CRM | HubSpot API v3 | Private App token |
| Repo | github.com/amauryamed-svg/cacao-colab | branch: main |

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
| `HUBSPOT_TOKEN` | Vercel env vars | Private App token HubSpot. Permisos: `crm.objects.contacts.write` + `read` |

Archivo local: `.env.local` (en .gitignore, no commitear).

Para agregarlo en Vercel: Settings → Environment Variables → Production + Preview + Development.

---

## 7. Deploy

Push a `main` → Vercel detecta automáticamente → build + deploy en ~60s.

URL producción: `https://cacao-colab.vercel.app`

Para revisar builds: Vercel dashboard → proyecto cacao-colab → Deployments.
