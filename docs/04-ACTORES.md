# Cacao Colab — Actores del ecosistema

> Última actualización: 2026-07-26 (pivote v2 — expandido para reconciliar 3 capas de "actor" distintas)

---

## 0. Tres capas de "actor" (v2) — no confundir

Spec v1 solo tenía **Owner/Colaborador**, un concepto de gobernanza de marca. El pivote v2 agrega dos capas más, con semántica distinta. Las tres coexisten y **no se solapan**:

| Capa | Tabla (Supabase) | Qué es | Ejemplo |
|------|-------------------|--------|---------|
| **Gobernanza de marca** | `organizations` | Quién controla decisiones de plataforma y admisión de nuevas marcas. Concepto institucional, ya existía en v1 (Owner/Colaborador). | CAÚA (Owner), Zurych (Owner), Lust (Colaborador) |
| **Rol de marketplace** | `profiles` + `actor_roles` | Qué hace una *persona* dentro del marketplace transaccional — nuevo en v2. Una persona puede tener más de un rol. No tiene relación jerárquica con Owner/Colaborador: un chocolatier puede comprar cacao de un farmer sin que su organización sea "Colaborador" del Colab. | farmer, chocolatier, maquilador, buyer |
| **Staff interno** | `team_members` | Quién trabaja *para* Cacao Colab (no es un actor del marketplace). Acceso al portal `/equipo`. Nuevo en v2, agregado durante la ejecución del pivote (2026-07-26). | Oscar Gamboa (backend), Hellen Bareño (frontend), Amaury Amed (founder) |

La confusión que **`04-ACTORES.md` v1 no resolvía**: "Owner/Colaborador" describía organizaciones (marcas), pero el pedido de pivote habla de "farmer/chocolatier/maquilador/buyer", que son roles de **personas**, no de marcas. Ambos conceptos son reales y necesarios — por eso quedan en tablas separadas (`organizations` vs `profiles`/`actor_roles`) en vez de forzar uno dentro del otro. Ver `07-MODELO-DATOS.md` para el detalle de columnas y relaciones.

---

## 1. Gobernanza de marca — Owner / Colaborador (sin cambios desde v1)

| Tipo | Descripción |
|------|-------------|
| **Owner** | Fundador del Colab. Control sobre plataforma, decisiones de marca y admisión de nuevos actores. |
| **Colaborador** | Marca o actor del ecosistema cacao con presencia en el marketplace o en la programación Dualita. No tiene control sobre la plataforma. Acuerdo no exclusivo. |

---

## Owners

### CAÚA Colombia
- **Rol:** Fundador · plataforma · origen · logística Colombia
- **Contacto:** Amaury Amed — amauryamed@gmail.com
- **Web:** cauacolombia.co
- **Productos en Colab:** Coberturas 70/85/100% · Ritual Cacao · NIBS cacao vivo
- **Contribución Dualita:** CAÚA Academy (6 módulos microlearning, gratuitos)

### Chocolate Zurych
- **Rol:** Fundador · coberturas funcionales HoReCa · MOOC
- **Web:** chocolatezurych.com
- **Productos en Colab:** Cobertura 70% (Santander) · Cobertura 85% (panela) · Cobertura 100% (moles/fondos) · Cobertura Blanca 40%
- **Contribución Dualita:** MOOC largo (en proceso — sin fecha de lanzamiento confirmada)

---

## Colaboradores

### Chocolate Lust
- **Tipo:** Colaborador
- **Descripción:** Marca de chocolate de autor colombiano.
- **Web:** chocolatelust.com
- **Relación con el Colab:** Co-branding NIBS CAÚA × Zurych × Lust (lanzado Alimentec jun 2026). Presencia en marketplace como colaborador, no owner — sin participación en decisiones de plataforma.
- **Acuerdo:** No exclusivo. Distribuido bajo la propuesta de valor del Colab sin royalty.
- **Estado:** Activo desde Alimentec 2026-06-09.

---

## Criterios de admisión para nuevos colaboradores

Un actor puede entrar al Colab como **Colaborador** si cumple:

1. **Origen colombiano verificado** — cacao de Colombia, trazable por lote o región.
2. **Propuesta diferenciada** — no es un producto genérico o intercambiable.
3. **Visión de largo plazo** — no participación oportunista puntual.
4. **Sin conflicto de canal** — no compite directamente con un Owner en su segmento principal.

La admisión la decide el equipo de Owners (CAÚA + Zurych) de forma conjunta.

Formulario de solicitud: botón "¿Tu marca aquí?" en el marketplace → WhatsApp pre-cargado.

---

## 2. Roles de marketplace — farmer / chocolatier / maquilador / buyer (nuevo en v2)

Un `profile` (cuenta de usuario del marketplace, 1:1 con `auth.users` de Supabase) puede tener uno o más `actor_roles`:

| Rol | Descripción | Qué puede hacer en el marketplace |
|-----|-------------|-----------------------------------|
| **farmer** | Agricultor/productor de cacao. | Crear `listings` (lotes/cosechas), recibir órdenes, cobrar vía Stripe Connect. |
| **chocolatier** | Transforma cacao en producto terminado (chocolate, coberturas). | Compra listings de farmers, puede también publicar los suyos. |
| **maquilador** | Procesa/maquila para terceros (ej. tolling de coberturas). | Igual que chocolatier — la distinción es de negocio, no técnica en el schema. |
| **buyer** | Compra para reventa o uso HoReCa (restaurantes, hoteles, retail de especialidad). | Compra listings, sin publicar los suyos. |

Un mismo profile puede ser `chocolatier` y `buyer` a la vez (ej. compra insumo y también compra empaques). `actor_roles.is_primary` marca cuál es el rol principal para efectos de UI/onboarding, sin restringir los demás.

**Relación con organizations:** un profile puede pertenecer a una `organization` (`profiles.organization_id`) si actúa en nombre de una marca del Colab (ej. un empleado de CAÚA que gestiona listings), pero no es obligatorio — un farmer independiente puede tener profile sin organization.

---

## 3. Staff interno — team_members (nuevo en v2, agregado 2026-07-26)

Distinto de `profiles`: es la cuenta de quien **trabaja en** Cacao Colab, no de quien participa **en** el marketplace. Acceso exclusivo al portal `/equipo` (login real vía Supabase Auth, magic link). Ver `14-CRM-INTERNO.md` para el detalle técnico completo.

| Persona | Email | Rol (`team_role`) | Contacto HubSpot vinculado |
|---------|-------|---------------------|------------------------------|
| Oscar Gamboa | `amadooscarito@gmail.com` | `engineering_backend` | Ninguno — no existe como contacto en HubSpot (verificado 2026-07-26, buscado por nombre/apellido/compañía, cero resultados). Pendiente: decisión de Amaury de darlo de alta o no. |
| Hellen Bareño | `hellenandba@gmail.com` | `engineering_frontend` | Sí — mismo email, contacto real confirmado en HubSpot. |
| Amaury Amed | — | `founder` | (no seedeado todavía — agregar fila en `supabase/seed.sql` cuando se defina el flujo del founder para `/equipo`) |

**Regla dura:** el panel de HubSpot del portal nunca inventa datos. Si `hubspot_contact_email` es `null` (caso de Oscar), el panel muestra un estado vacío explícito — nunca un placeholder que parezca un dato real.
