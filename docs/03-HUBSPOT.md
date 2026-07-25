# Cacao Colab — Integración HubSpot

> Última actualización: 2026-06-16 · **v2: 2026-07-24** — ver `14-CRM-INTERNO.md` para el CRM
> interno nuevo que coexiste con esta integración (D16, `00-SPEC.md`).

---

## 1. Propósito

HubSpot es el CRM **compartido con el resto de Caúa**. Captura todos los leads del onboarding web
y del companion Dualita (`flagBuyerIntent`, ver `10-DUALITA-IA.md`), y permite seguimiento por
email y WA al equipo. En v2 se suma un **CRM interno** (`crm_contacts` en Supabase) que los 3
colaboradores operan día a día — HubSpot sigue siendo la fuente compartida con el resto de Caúa,
no se reemplaza. Ver `14-CRM-INTERNO.md`.

---

## 2. Setup requerido

1. Ir a HubSpot → Configuración → Integraciones → Aplicaciones privadas.
2. Crear app privada "Cacao Colab Platform".
3. Permisos mínimos: `crm.objects.contacts.write` + `crm.objects.contacts.read`.
4. Copiar el token generado.
5. En Vercel → proyectos `cacao-colab-web` y `cacao-colab-api` → Settings → Environment Variables → agregar `HUBSPOT_ACCESS_TOKEN` (renombrado de `HUBSPOT_TOKEN` en v2, D18 — ambos proyectos lo necesitan, no solo el original).

---

## 3. Mapeo de propiedades

| Campo del onboarding | Propiedad HubSpot | Tipo | Notas |
|---------------------|-------------------|------|-------|
| `nombre` | `firstname` | string | — |
| `email` | `email` | string | Clave de deduplicación |
| `operacion` | `company` | string | Nombre de la operación HoReCa |
| `ciudad` | `city` | string | Ciudad / País |
| `whatsapp` | `mobilephone` | string | Formato libre |
| `tipo` + `interes` | `jobtitle` | string | "Restaurante · Los productos" |
| — | `lifecyclestage` | enum | Siempre `lead` |
| — | `hs_lead_status` | enum | Siempre `NEW` |

---

## 4. Lógica upsert

```
POST /api/onboarding
  → HubSpot POST /crm/v3/objects/contacts
    ├── 201 Created → ok, nuevo contacto
    ├── 409 Conflict → email ya existe
    │     → POST /crm/v3/objects/contacts/search (buscar por email)
    │     → PATCH /crm/v3/objects/contacts/{id} (actualizar propiedades)
    └── otro error → log, responder { ok: false } pero NO bloquear al usuario
```

La cookie `colab_onboarded=done` se pone en todos los casos (incluso si HubSpot falla) para no bloquear el flujo.

---

## 5. Email seguimiento (Alimentec 2026)

- **Archivo para HubSpot:** `~/Documents/Caua/Alimentec/emails/colab-seguimiento-hubspot.html`
- **Archivo preview local:** `~/Documents/Caua/Alimentec/emails/colab-seguimiento-body.html`
- **Preview local:** `http://localhost:3131/colab-seguimiento-body.html` (servidor Python en puerto 3131)

### Cómo pegar en HubSpot
1. Marketing → Email → Correo electrónico regular → crear.
2. Abrir el módulo de texto enriquecido → ícono `<>` (Source code).
3. Pegar el contenido de `colab-seguimiento-hubspot.html` completo.
4. Guardar → Vista previa → Enviar prueba a amauryamed@gmail.com.

### Tokens válidos en el email
- `{{ contact.firstname }}` — nombre del contacto
- `{{ contact.company }}` — nombre de la operación
- HubSpot agrega el enlace de cancelación automáticamente (no incluir `{{ unsubscribe_link }}`).

---

## 6. Pendientes HubSpot

- [ ] Crear lista segmentada: "Leads Cacao Colab 2026"
- [ ] Workflow de nurturing: lead entra → email día 1 (bienvenida) → día 7 (Dualita) → día 14 (catálogo)
- [ ] Propiedad personalizada `colab_interes` para filtrar por motivación sin depender de `jobtitle`

---

## 7. v2 — lógica de upsert generalizada + sync interno (nuevo)

La lógica de la sección 4 vive ahora en `packages/hubspot-client` (`upsertContact()`), reusada por
`apps/web/app/api/onboarding/route.ts` y por la tool `flagBuyerIntent` del companion Dualita
(`packages/ai-companion`). El CRM interno (`14-CRM-INTERNO.md`) agrega `hubspot_sync_log`: cada
push a HubSpot y cada webhook entrante de HubSpot se registra con un hash del payload, para que un
webhook entrante no dispare inmediatamente un push saliente del mismo estado (anti-loop).
