# Cacao Colab — CRM interno

> Operado día a día por Oscar, Hellen y Amaury. **Coexiste** con el HubSpot compartido de Caúa
> (D16, `00-SPEC.md`) — no lo reemplaza. Ver `03-HUBSPOT.md` para la integración HubSpot original.

---

## 1. Por qué un CRM interno además de HubSpot

HubSpot es compartido con **todo** el ecosistema Caúa — leads de Cacao Colab conviven ahí con leads
de CauaColombia.co, Cauaculture, etc. El CRM interno (`crm_contacts` en Supabase) es la vista
**operativa diaria y específica de Cacao Colab** que los 3 colaboradores necesitan: seguimiento de
vendedores (farmers/chocolatiers/maquiladores) en proceso de onboarding, notas internas, actividad
por dueño — sin filtrar entre el ruido del HubSpot general de Caúa.

## 2. Modelo de datos

Ver `07-MODELO-DATOS.md` § 8 y `supabase/migrations/0008_crm.sql`:

```
crm_contacts (hubspot_contact_id nullable, owner_profile_id)
    └─< crm_activities (note | call | email | whatsapp | meeting)

hubspot_sync_log (entity_type, local_id, hubspot_id, direction, payload_hash, status)
```

`crm_contacts.hubspot_contact_id` es **nullable** — un contacto puede existir solo en el CRM
interno (ej. un farmer en conversación temprana que todavía no calificó para entrar a HubSpot) o
estar sincronizado con ambos sistemas.

## 3. Sync bidireccional — mecanismo anti-loop

**El problema que resuelve:** sin control, un push saliente a HubSpot dispara un webhook entrante
de HubSpot, que si se reenvía sin más dispara otro push saliente — loop infinito.

**La solución:** `hubspot_sync_log.payload_hash` — hash SHA-256 de las propiedades relevantes
(`hashPayload()` en `packages/hubspot-client`).

```
Push saliente (crm_contact → HubSpot):
  1. calcular payloadHash del estado actual
  2. comparar contra el último hubspot_sync_log de este contacto
  3. si es igual → skip (no llamar a HubSpot)
  4. si es distinto → upsertContact() → log con direction='to_hubspot'

Webhook entrante (HubSpot → crm_contact):
  1. HubSpot notifica un property change
  2. calcular payloadHash del nuevo valor
  3. actualizar crm_contacts + log con direction='from_hubspot'
  4. el próximo push saliente (arriba) ve este hash y no reenvía
```

Implementado en `apps/api/app/api/v1/webhooks/hubspot/route.ts` (recepción) y
`packages/hubspot-client::upsertContact()` (envío, con parámetro `lastKnownHash`).

## 4. Operación diaria (los 3 colaboradores)

- **Amaury** — dueño de la relación con leads HoReCa (heredado de v1) y con marcas Owner/Colaborador.
- **Oscar** — dueño técnico de la integridad del sync (revisa `hubspot_sync_log` cuando algo no cuadra).
- **Hellen** — construye la UI de `apps/web/admin` donde los 3 ven/editan `crm_contacts` (no
  implementada todavía — Fase 6).

No hay una policy de RLS pública sobre `crm_contacts`/`crm_activities` — el acceso es exclusivamente
vía `createServiceClient()` desde `apps/web/admin`, protegido por autenticación de los 3
colaboradores (mecanismo de rol interno a definir en Fase 6, no un simple `authenticated` genérico
de Supabase).

## 5. Qué NO está implementado todavía

- UI del CRM interno en `apps/web/admin` (solo el schema y el webhook receptor existen).
- Suscripción real del webhook `contact.propertyChange` configurada en el Private App de HubSpot
  (requiere acceso al HubSpot compartido — pendiente, ver P5 en `00-SPEC.md`).
- Upsert real en `crm_contacts` desde el webhook entrante (el route handler solo registra el log
  por ahora, con un `TODO` explícito).
- Rol interno de autenticación (hoy Supabase Auth no distingue "colaborador interno" de "usuario
  del marketplace" — hay que agregarlo antes de exponer `apps/web/admin`).
