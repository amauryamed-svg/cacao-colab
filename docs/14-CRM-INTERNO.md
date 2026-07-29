# Cacao Colab — CRM interno (v2)

> Nuevo en v2. Última actualización: 2026-07-26.
> Cubre dos cosas relacionadas pero distintas: (1) el CRM propio sincronizado con HubSpot (`crm_contacts`/`crm_activities`/`hubspot_sync_log`) y (2) el portal interno `/equipo` con login real y panel de HubSpot — este segundo fue un **requerimiento agregado durante la ejecución** de este mismo pivote (2026-07-26), no parte del pedido original.

---

## 1. CRM propio — por qué no alcanza con HubSpot solo

HubSpot sigue siendo el CRM de marketing/ventas del ecosistema Caúa completo (no solo Cacao Colab). Pero:

- Pegarle a la API de HubSpot en cada request de la app (ej. para mostrar "tus últimas actividades" a un usuario) es lento y frágil ante rate limits.
- HubSpot no tiene el concepto de `learner_progress`/`orders`/`membership` — esos eventos de negocio son nativos de Cacao Colab, no de HubSpot.
- Se necesita una copia local navegable/reportable sin depender de exportar manualmente desde HubSpot.

**Solución:** `crm_contacts`/`crm_activities` como copia local, con `hubspot_sync_log` llevando el registro de qué se sincronizó en qué dirección y cuándo, para evitar loops.

### Anti-loop de sincronización bidireccional

```
Cambio en Supabase (ej. profile actualiza su teléfono)
    ↓
calcular payload_hash del subset de campos sincronizables
    ↓
¿es igual al último hash registrado en hubspot_sync_log para (crm_contact_id, 'to_hubspot')?
    ├── SÍ → no hacer nada (ya está sincronizado, evita loop)
    └── NO → PATCH a HubSpot → INSERT en hubspot_sync_log (direction: to_hubspot)

Webhook entrante de HubSpot (contact.propertyChange)
    ↓
mismo patrón, comparando contra (crm_contact_id, 'from_hubspot')
```

Implementado hoy: el webhook receptor (`apps/api/app/api/v1/webhooks/hubspot/route.ts`) calcula el hash y lo devuelve — el paso de comparar-contra-el-último-hash-y-decidir-si-escribir no está implementado todavía (requiere Supabase real para leer `hubspot_sync_log`). Es Fase 3 (ver `05-ROADMAP.md`).

---

## 2. Portal interno `/equipo` (requerimiento agregado 2026-07-26)

### 2.1 Qué se pidió

Una pantalla de login para los colaboradores del proyecto (Oscar y Hellen inicialmente) que muestre su nombre ("Hola Oscar" / "Hola Hellen") debajo del branding, y debajo un panel con datos reales de HubSpot CRM. Requisito explícito del usuario: **login real con autenticación**, no una bienvenida sin validar — vía Supabase Auth, ya que Postgres/Supabase es la base de datos elegida del pivote.

### 2.2 Tensión con una restricción existente, y cómo se resolvió

El plan original prohíbe crear el proyecto Supabase real (`supabase login` es interactivo, lo corre el usuario). El login real, por definición, necesita una base de datos de auth real. Resolución: **se escribió el código de auth completo y funcional** (rutas, componentes, server actions, trigger SQL, RLS) que depende de las env vars de Supabase (`NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`) — nada hardcodeado ni simulado. El resultado: **implementado pero no operable en vivo** hasta que exista el proyecto Supabase real. Es el mismo tratamiento que el resto de la fundación (migraciones escritas, sin aplicar).

### 2.3 Arquitectura

```
apps/web/
  middleware.ts                     ← refresca sesión, scoped a /equipo y /auth
  app/
    equipo/
      login/page.tsx                 ← formulario de magic link
      login/actions.ts               ← requestMagicLink() [server action]
      page.tsx                       ← protegido: bienvenida + panel HubSpot
      actions.ts                     ← signOutTeamMember() [server action]
    auth/callback/route.ts           ← exchangeCodeForSession()
  components/team/
    LoginForm.tsx                    ← client, llama requestMagicLink
    TeamWelcome.tsx                  ← "Hola {nombre}" + wordmark
    TeamHubspotPanel.tsx             ← 3 estados: sin mapping / sin contacto / datos reales

packages/supabase-client/
  src/browser.ts, server.ts, middleware.ts   ← 3 entry points separados (ver 06-ARQUITECTURA.md §4)
  src/database.types.ts              ← tipo hand-written de team_members (hasta gen types real)

packages/hubspot-client/
  src/contacts.ts  → getContactByEmail()
  src/deals.ts     → getDealsForContact()

supabase/migrations/20260726100011_team_auth.sql   ← tabla team_members + trigger + RLS
supabase/seed.sql                                   ← pre-registro de Oscar y Hellen
```

### 2.4 Modelo de datos — `team_members`

Ver `07-MODELO-DATOS.md` y el archivo de migración para el schema completo. Puntos clave:

- **Pre-registro por email, no auto-signup:** a diferencia del marketplace (cualquiera se registra), el portal `/equipo` solo funciona para emails ya sembrados en `supabase/seed.sql`. El trigger `link_team_member()` conecta `user_id` la primera vez que esa persona hace login con ese email exacto — si alguien más pide un magic link con un email no sembrado, Supabase Auth igual le crea una cuenta (no hay forma de bloquear el signup en sí sin configurar Supabase Auth más estrictamente, fuera de alcance de esta pasada), pero `/equipo` le mostrará "tu email no está registrado" en vez de datos de otra persona — nunca hay fuga de datos entre cuentas gracias al RLS `auth.uid() = user_id`.
- **`hubspot_contact_email` nullable a propósito** — no todo team member tiene contacto real en HubSpot.

### 2.5 Datos reales verificados (2026-07-26)

| Persona | Email (confirmado por Amaury) | Contacto en HubSpot | Cómo se verificó |
|---------|----------------------------------|--------------------------|----------------------|
| Hellen Bareño | `hellenandba@gmail.com` | **Sí existe** | Búsqueda directa en HubSpot CRM |
| Oscar Gamboa | `amadooscarito@gmail.com` | **No existe** | Búsqueda por nombre, apellido "Gamboa", y compañía — cero resultados. Existe un "Oscar Alfonso" de Hotel Campestre en HubSpot, pero es una persona distinta (lead de HoReCa, no el Oscar del equipo) — no se usó ese registro. |

`supabase/seed.sql` refleja esto exactamente: la fila de Oscar tiene `hubspot_contact_email = null`. **No se creó un contacto de HubSpot para Oscar** — esa es una decisión que le corresponde al usuario, no al agente.

### 2.6 Los 3 estados del panel (`TeamHubspotPanel.tsx`)

| Estado | Cuándo ocurre | Qué se muestra |
|--------|------------------|--------------------|
| Sin mapping | `hubspot_contact_email` es `null` (hoy: Oscar) | "Sin contacto de HubSpot vinculado todavía" |
| Mapping sin contacto | `hubspot_contact_email` tiene valor pero `getContactByEmail()` devuelve `null` | "Existe mapping pero no hay contacto en HubSpot" (no debería pasar hoy con los datos sembrados, pero el código lo maneja por si el contacto se borra en HubSpot) |
| Datos reales | `hubspot_contact_email` tiene valor y el contacto existe (hoy: Hellen) | Nombre, email, compañía, etapa + lista de deals asociados |

Ningún estado inventa datos — es la regla explícita que motivó este diseño de 3 estados en vez de un simple `if (contact)`.

### 2.7 Qué falta para que esto sea real (checklist)

1. Proyecto Supabase real (`supabase login` + `supabase link` + aplicar las 11 migraciones + `supabase db seed`).
2. Configurar el proveedor de email de Supabase Auth (magic link necesita SMTP o el servicio default de Supabase, con límites bajos en el plan Free — revisar si alcanza o si se necesita configurar uno propio).
3. `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`/`NEXT_PUBLIC_SITE_URL` en Vercel (`cacao-colab-web`).
4. `HUBSPOT_ACCESS_TOKEN` con permiso `crm.objects.deals.read` agregado (ver `03-HUBSPOT.md`).
5. Decidir si Oscar se da de alta como contacto en HubSpot (pendiente del usuario, no se hace unilateralmente).
6. Amaury está incluido como founder en `supabase/seed.sql` y en la migración de campus 0012; aplicar `supabase db push` para reflejarlo en el proyecto vivo.
