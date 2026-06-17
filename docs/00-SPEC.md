# Cacao Colab — Spec v1 (Master)

> **Método:** Spec-Driven. Este documento es la fuente de verdad del proyecto. Cualquier cambio de rumbo se reescribe aquí *antes* de tocar código, diseño o procesos.
> **Owner principal:** Amaury Amed (CTO · CAÚA Colombia)
> **Co-owner:** Equipo Zurych
> **Fecha de corte v1:** 2026-06-16

---

## 1. Tesis estratégica

> **Cacao Colab es una iniciativa colaborativa entre actores de la escena del cacao colombiano con impacto social y ambiental — "Cacao con propósito."**

No es un joint venture legal. Es una plataforma compartida de marca, distribución y aprendizaje que amplifica a cada participante sin diluir su identidad individual.

### Participantes fundadores

| Marca | Rol | Web |
|-------|-----|-----|
| **CAÚA Colombia** | Origen, producto, logística Colombia | cauacolombia.co |
| **Chocolate Zurych** | Coberturas funcionales HoReCa | chocolatezurych.com |

### Propósito del Colab

1. **Marketplace** — vitrina conjunta para compradores HoReCa y retail de especialidad que buscan cacao colombiano trazable.
2. **Dualita** — sistema de aprendizaje dual: MOOC largo (Zurych) + microlearning corto (CAÚA Academy, 6 módulos gratuitos).
3. **Co-branding** — productos conjuntos puntuales (e.g. NIBS CAÚA × Zurych × Lust, lanzados en Alimentec 2026).

### North Star

**Contactos HoReCa calificados capturados** → convertidos en clientes de al menos una marca del Colab.

Métrica secundaria: **engagement Dualita** (módulos completados + registros MOOC).

---

## 2. Decisiones cerradas

| # | Decisión | Valor | Implicación |
|---|----------|-------|-------------|
| D1 | Identidad del Colab | **Iniciativa colaborativa, no alianza de marca** | El copy habla de "actores de la escena del cacao colombiano", no de "alianza CAÚA × Zurych". |
| D2 | Plataforma técnica | **Next.js 16 App Router + Tailwind v4 + Vercel** | Repo: github.com/amauryamed-svg/cacao-colab. Deploy automático en `cacao-colab.vercel.app`. |
| D3 | CRM | **HubSpot** | Onboarding → contactos HubSpot vía API. Lifecycle = lead, status = NEW al entrar. |
| D4 | Onboarding de entrada | **Gate fullscreen en primera visita** | Cookie `colab_onboarded` (1 año, servidor). Al completar → HubSpot. Skip → solo cookie. |
| D5 | MOOC | **Pertenece a Zurych · en proceso** | No afirmar fecha de lanzamiento. Copy: "próximamente". Microlearning (CAÚA Academy) sí disponible y gratuito. |
| D6 | Cupón Alimentec | **ALIMENTEC10 · tienda CAÚA · cauacolombia.co** | No aplicar al marketplace Zurych ni a Dualita. |
| D7 | Emails HubSpot | **Body-only HTML sin DOCTYPE** | Archivo `colab-seguimiento-hubspot.html` es el que se pega en Source code del módulo texto enriquecido. `colab-seguimiento-body.html` es solo para preview local. |
| D8 | Paleta visual | **Dark bg (#1A2E10 forest)** | CacaoFrutaBrutal = dark bg. No mezclar con Heirloom White de cauacolombia.co. |
| D9 | Tipografía plataforma | **Georgia serif (display) + Arial (UI)** | Sin dependencias de Google Fonts en la plataforma Next.js v1. |
| D10 | WhatsApp contacto | **+57 310 222 7848** | Número único del equipo Cacao Colab para pre-fills y CTAs. |

---

## 3. Requerimientos funcionales

### RF-1 — Plataforma web (cacao-colab.vercel.app)

- **Landing page** (`/`): Hero + Marketplace + Dualita + CTA Únete + CTA Marcas.
- **Marketplace** (`/marketplace`): galería de marcas del Colab con BrandCard.
- **Aprende** (`/aprende`): hub Dualita — MOOC track + Microlearning track.
- **Únete** (`/unete`): página standalone del onboarding (accesible también directamente).

### RF-2 — Onboarding gate

- Aparece en primera visita a cualquier ruta de la webapp.
- 5 pasos: tipo de operación → nombre + operación → motivación → ciudad → contacto (email + WA).
- Al hacer submit: `POST /api/onboarding` → HubSpot + `Set-Cookie: colab_onboarded=done`.
- Al saltar: `POST /api/onboarding/skip` → `Set-Cookie: colab_onboarded=skipped`.
- Cookie dura 1 año. Gate no vuelve a aparecer en visitas posteriores.
- El formulario es tolerante a fallos de HubSpot — falla silenciosamente, no bloquea al usuario.

### RF-3 — Integración HubSpot CRM

- Variable de entorno: `HUBSPOT_TOKEN` (Private App, permisos `contacts.write` + `contacts.read`).
- Propiedades mapeadas:

| Campo onboarding | Propiedad HubSpot |
|------------------|--------------------|
| nombre | `firstname` |
| email | `email` (dedup key) |
| operacion | `company` |
| ciudad | `city` |
| whatsapp | `mobilephone` |
| tipo + interes | `jobtitle` (concatenado con ` · `) |
| — | `lifecyclestage = lead` |
| — | `hs_lead_status = NEW` |

- Upsert: si el email ya existe (409) → PATCH por ID.

### RF-4 — Email seguimiento Alimentec

- Archivo: `colab-seguimiento-hubspot.html` (body-only para HubSpot).
- Secciones: saludo personalizado · marketplace · Dualita · NIBS co-branding · CTA · cupón ALIMENTEC10 · firma · footer.
- Tokens válidos: `{{ contact.firstname }}`, `{{ contact.company }}`.
- Sin `{{ unsubscribe_link }}` — HubSpot lo agrega automáticamente.

### RF-5 — HoReCa landing (cauacolombia.co/pages/horeca)

- Archivo local: `~/Documents/Caua/Alimentec/emails/horeca-final.html`.
- Diseño: brutalista luxury botanical. Google Fonts: Bebas Neue + DM Serif Display + DM Sans.
- Pendiente: deploy a Shopify (página `/pages/horeca` en cauacolombia.co).

---

## 4. Estado actual (2026-06-16)

| Componente | Estado | Notas |
|------------|--------|-------|
| Landing `/` | ✅ Live | cacao-colab.vercel.app |
| Onboarding gate + 5 pasos | ✅ Live | Cookie servidor |
| API `/api/onboarding` → HubSpot | ✅ Código deploado | Pendiente: `HUBSPOT_TOKEN` en Vercel |
| Marketplace `/marketplace` | ✅ Live | CAÚA + Zurych + 2 slots |
| Dualita `/aprende` | ✅ Live | MOOC "próximamente", micro gratis |
| Email seguimiento HubSpot | ✅ Listo para pegar | `colab-seguimiento-hubspot.html` |
| HoReCa landing | ⚠️ Solo local | Pendiente push a Shopify |

---

## 5. Pendientes abiertos

| # | Tarea | Prioridad | Owner |
|---|-------|-----------|-------|
| P1 | Agregar `HUBSPOT_TOKEN` en Vercel env vars | 🔴 Alta | Amaury |
| P2 | Push `horeca-final.html` a Shopify (`/pages/horeca`) | 🟡 Media | Amaury |
| P3 | Activar MOOC Zurych cuando esté listo | 🟢 Baja | Zurych |
| P4 | Añadir página `/aprende` con contenido real de Academy | 🟡 Media | Amaury |
| P5 | OG image para redes sociales (`/public/og-cacao-colab.png`) | 🟢 Baja | Diseño |

---

*Este Spec se actualiza con cada cambio de rumbo. Ver `05-ROADMAP.md` para detalle de fases.*
