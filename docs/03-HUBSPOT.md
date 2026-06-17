# Cacao Colab — Integración HubSpot

> Última actualización: 2026-06-16

---

## 1. Propósito

HubSpot es el CRM central del Cacao Colab. Captura todos los leads del onboarding web y permite seguimiento por email y WA al equipo.

---

## 2. Setup requerido

1. Ir a HubSpot → Configuración → Integraciones → Aplicaciones privadas.
2. Crear app privada "Cacao Colab Platform".
3. Permisos mínimos: `crm.objects.contacts.write` + `crm.objects.contacts.read`.
4. Copiar el token generado.
5. En Vercel → proyecto cacao-colab → Settings → Environment Variables → agregar `HUBSPOT_TOKEN`.

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
