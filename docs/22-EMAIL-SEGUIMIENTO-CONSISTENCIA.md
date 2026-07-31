# Emails de seguimiento · Mazorcas Doradas + Sembrar + consistencia

> Última actualización: 2026-07-31  
> Dueños: Amaury (copy / HubSpot workflows) · Oscar (sync props) · Hellen (UI consejo)

---

## 1. Principio

**La maestría se logra cuando la consistencia en la repetición de estudiar y practicar se hace.**

Los correos no empujan “más contenido”, empujan el **mismo gesto** (módulo Dualita + cuidado Sembrar) hasta que el learner lo interioriza. Las **Mazorcas Doradas** son el marcador de ese ritmo; el **estado de Sembrar** es el consejo de avance de conocimiento aplicado.

---

## 2. Secuencia de envío — Resend, no HubSpot Workflows

> **Pivote 2026-07-31:** HubSpot Workflows (y hasta el envío de un correo de
> prueba) están bloqueados en este portal — requieren upgrade a Marketing
> Hub Pro / Suite Starter / Hub Starter respectivamente. El envío real corre
> por **Resend** (`resend.emails.send`), disparado por un **Vercel Cron**
> diario (`vercel.json` → `/api/cron/followup-emails`, `apps/web/app/api/cron/followup-emails/route.ts`).
> HubSpot sigue recibiendo el sync de las props `colab_*` (§3) en cada envío
> — solo cambió *quién manda el correo*, no el tracking.
>
> Mismo archivo `.html` en los dos mundos: `emails/seguimiento/*.html` es lo
> que se pega a mano en HubSpot (si algún día se activa un workflow) y lo
> que `apps/web/lib/followup-email-render.ts` lee con `fs` para renderizar
> el envío real vía Resend — un solo origen, dos destinos.
>
> Sandbox: sin dominio propio de Cacao Colab verificado en Resend
> (`cauaculture.co` queda fuera a propósito, es de otro producto CAÚA), el
> remitente `onboarding@resend.dev` solo entrega al email dueño de la cuenta
> Resend. El envío a usuarios reales queda pausado hasta verificar un
> dominio propio — ver `apps/web/lib/resend.ts`.

| Día | Plantilla | Disparo | Mensaje |
|-----|-----------|---------|---------|
| 1 | `emails/seguimiento/01-bienvenida-semilla.html` | Cron: `now - profiles.created_at >= 0` | Primer surco · estudiar + practicar |
| 7 | `emails/seguimiento/07-consistencia-mazorcas.html` | Cron: `now - profiles.created_at >= 7d` | MD recolectadas · rango · tip Sembrar |
| 14 | `emails/seguimiento/14-maestria-repeticion.html` | Cron: `now - profiles.created_at >= 14d` | Ritual 3+3 · maestría por repetición |

Idempotencia vía `followup_email_log` (constraint `unique(profile_id, email_key)`, migración `20260731230000`). Gate obligatorio: `profiles.marketing_opt_in = true` (migración `20260731220000_privacy_consent.sql`) — nunca se manda nurture sin consentimiento explícito del signup.

Sustituye el diseño original de HubSpot Workflow que documentaba esta sección antes del pivote (enroll por lista + delay nodes) — ver `03-HUBSPOT.md` para el checklist previo, ya superseded.

---

## 3. Propiedades HubSpot a crear

> **Actualización 2026-07-31 (creación real):** el portal comparte un límite
> de 10 propiedades custom con todo el ecosistema CAÚA — con 9 slots ya
> ocupados (arquetipo/tarot, `caua_completed_orders`, etc.) solo quedó **1
> libre** para las 3 que faltaban. Se consolidó `colab_sembrar_genotype` +
> `colab_sembrar_phase` en una sola `colab_sembrar_meta` (ej. `"FEAR 5 · fase
> fermentación"`), y se sacó `colab_last_advice` del sync a HubSpot por
> completo — ningún email la usa como token, y el texto ya queda logueado en
> `crm_activities.metadata.advice` (Supabase). La tabla de abajo refleja lo
> que **existe de verdad** en el portal, ya no el diseño original de 8.

Settings → Properties → Contact → create (tipo texto / número según aplique):

| Internal name | Label | Tipo |
|---------------|-------|------|
| `colab_md_balance` | Colab MD saldo | number |
| `colab_md_lifetime` | Colab MD lifetime | number |
| `colab_rank` | Colab rango | single-line text |
| `colab_micro_completed` | Colab módulos Dualita | number |
| `colab_sembrar_stage` | Colab Sembrar etapa | single-line text |
| `colab_sembrar_meta` | Colab Sembrar detalle | single-line text |

El sync las escribe vía `upsertContactByEmail` desde `apps/web/lib/followup-sync.ts` tras:

- completar módulo microlearning (`completeMicroLesson`)
- guardar labranza Sembrar (`saveGotchiRun`)

Si alguna propiedad no existe en HubSpot, el PATCH completo falla en
silencio (no rompe la lección) — por eso el nombre interno debe coincidir
**exacto** con lo creado en HubSpot, HubSpot rechaza el request entero si
una sola key del payload no existe, no ignora solo esa key.

---

## 4. Motor de consejo (código)

| Archivo | Rol |
|---------|-----|
| `apps/web/lib/followup-advice.ts` | Genera headline, tips estudiar/practicar/Sembrar, CTAs |
| `apps/web/lib/followup-sync.ts` | Carga wallet + campus_progress + gotchi_runs → CRM note + HubSpot |
| `/cuenta/consejo` | UI del learner con el mismo consejo |

Entrada tipada: MD balance/lifetime, módulos Dualita, fase/etapa/genotipo Sembrar, bitácoras.

---

## 5. Actividad CRM local

Cada sync inserta `crm_activities` tipo `note` con `metadata.kind = followup_advice` (MD, rango, Sembrar, texto completo). Vincula `crm_contacts.profile_id` cuando hay match por email.

---

## 6. Checklist Amaury

- [x] Crear las 6 propiedades custom en HubSpot (consolidadas, ver §3) — hecho 2026-07-31
- [x] Pegar las 3 plantillas HTML en HubSpot como borradores (por si algún día se activa un workflow) — hecho 2026-07-31
- [x] `RESEND_API_KEY` en Supabase secrets (SMTP de Auth) — hecho
- [ ] `RESEND_API_KEY` en Vercel (env del cron) — pendiente de confirmar
- [ ] Verificar dominio propio de Cacao Colab en Resend (hoy en sandbox, solo entrega a la cuenta dueña)
- [ ] Confirmar cron activo tras el deploy (`vercel.json` → `0 14 * * *`, ~9am Bogotá)
- [ ] Probar: crear/usar un profile con `marketing_opt_in = true` y disparar el cron manualmente

---

## 7. Relación con Mazorcas

Ver `16-MAZORCAS-DORADAS.md`. Los montos no cambian. El email **narra** lifetime/rango; no promete canjes planeados como activos.

---

## 8. Fuera de alcance de esta pasada

- Dominio propio verificado en Resend (bloquea envío real a usuarios, no solo a Amaury)
- `pg_cron` digest semanal (roadmap Fase 4)
- Emails por rank-up instantáneo (evento adicional, no ligado a los 3 checkpoints de días)
- Reactivar HubSpot Workflow si algún día se sube de plan (los 3 correos ya quedaron pegados como borradores, listos)
