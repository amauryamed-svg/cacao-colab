# Cacao Colab — Integración HubSpot

> Última actualización: 2026-07-26 (pivote v2)

---

## 0. Qué cambia en v2

La lógica de este documento (mapeo de propiedades, upsert, email de seguimiento) **no cambia**. Lo que cambia:

- El cliente HubSpot se generalizó a `packages/hubspot-client` (antes vivía inline en `app/api/onboarding/route.ts`). Ver `06-ARQUITECTURA.md`.
- La env var se estandariza a **`HUBSPOT_ACCESS_TOKEN`** (nombre usado en el resto del ecosistema Caúa) — `HUBSPOT_TOKEN` sigue funcionando como fallback con warning de deprecación, para no romper el deploy actual mientras se actualiza Vercel.
- Nuevo caso de uso: el portal interno `/equipo` (apps/web) usa el mismo cliente para mostrarle a cada team member su propio contacto/deals de HubSpot — ver `14-CRM-INTERNO.md`.
- Nuevo dominio: CRM propio sincronizado bidireccionalmente con HubSpot (`crm_contacts`/`crm_activities`/`hubspot_sync_log`) — ver `07-MODELO-DATOS.md` y `14-CRM-INTERNO.md`.

---

## 1. Propósito

HubSpot es el CRM central del Cacao Colab. Captura todos los leads del onboarding web, permite seguimiento por email y WA al equipo, y ahora también alimenta el panel de datos del portal interno `/equipo`.

---

## 2. Setup requerido

1. Ir a HubSpot → Configuración → Integraciones → Aplicaciones privadas.
2. Crear app privada "Cacao Colab Platform" (o reusar la existente).
3. Permisos mínimos: `crm.objects.contacts.write` + `crm.objects.contacts.read` + `crm.objects.deals.read` (nuevo — necesario para el panel de `/equipo`, que lista deals asociados al contacto).
4. Copiar el token generado.
5. En Vercel → proyectos `cacao-colab-web` y `cacao-colab-api` → Settings → Environment Variables → agregar **`HUBSPOT_ACCESS_TOKEN`** (no `HUBSPOT_TOKEN`, aunque ese sigue funcionando).

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
- [ ] Workflow de nurturing por **consistencia** (ver `22-EMAIL-SEGUIMIENTO-CONSISTENCIA.md`):
  - día 1 → `emails/seguimiento/01-bienvenida-semilla.html`
  - día 7 → `emails/seguimiento/07-consistencia-mazorcas.html` (MD + tip Sembrar)
  - día 14 → `emails/seguimiento/14-maestria-repeticion.html`
- [ ] Crear props custom `colab_md_*`, `colab_rank`, `colab_micro_completed`, `colab_sembrar_*` (sync desde `followup-sync.ts`)
- [ ] Propiedad personalizada `colab_interes` para filtrar por motivación sin depender de `jobtitle`
- [ ] Renombrar `HUBSPOT_TOKEN` → `HUBSPOT_ACCESS_TOKEN` en Vercel (ambos proyectos)
- [ ] Agregar permiso `crm.objects.deals.read` a la Private App (necesario para el panel de `/equipo`)
- [ ] Decidir si se da de alta un contacto de HubSpot para Oscar Gamboa (`amadooscarito@gmail.com`) — hoy no existe, ver `14-CRM-INTERNO.md`

---

## 7. Panel de HubSpot en el portal interno `/equipo` (nuevo en v2)

`packages/hubspot-client` expone además:

- `getContactByEmail(email)` — búsqueda exacta por email, devuelve `null` si no existe (nunca inventa datos).
- `getDealsForContact(contactId)` — deals asociados vía `/crm/v3/objects/contacts/{id}/associations/deals` + batch read.

`apps/web/app/equipo/page.tsx` usa ambas para renderizar el panel de cada team member, cruzando con `team_members.hubspot_contact_email` (Supabase). Ver `14-CRM-INTERNO.md` para el flujo completo, incluyendo el caso de Oscar (sin contacto en HubSpot todavía).
