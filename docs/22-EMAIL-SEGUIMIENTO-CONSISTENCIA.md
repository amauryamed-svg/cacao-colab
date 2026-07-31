# Emails de seguimiento · Mazorcas Doradas + Sembrar + consistencia

> Última actualización: 2026-07-31  
> Dueños: Amaury (copy / HubSpot workflows) · Oscar (sync props) · Hellen (UI consejo)

---

## 1. Principio

**La maestría se logra cuando la consistencia en la repetición de estudiar y practicar se hace.**

Los correos no empujan “más contenido”, empujan el **mismo gesto** (módulo Dualita + cuidado Sembrar) hasta que el learner lo interioriza. Las **Mazorcas Doradas** son el marcador de ese ritmo; el **estado de Sembrar** es el consejo de avance de conocimiento aplicado.

---

## 2. Secuencia HubSpot (nurturing)

| Día | Plantilla | Disparo | Mensaje |
|-----|-----------|---------|---------|
| 1 | `emails/seguimiento/01-bienvenida-semilla.html` | Onboarding / `account_registered` | Primer surco · estudiar + practicar |
| 7 | `emails/seguimiento/07-consistencia-mazorcas.html` | Timer 7d **o** `colab_md_lifetime >= 1` | MD recolectadas · rango · tip Sembrar |
| 14 | `emails/seguimiento/14-maestria-repeticion.html` | Timer 14d | Ritual 3+3 · maestría por repetición |

Sustituye / amplía el checklist anterior “día 1 Dualita / día 14 catálogo” en `03-HUBSPOT.md`.

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

## 6. Checklist Amaury (HubSpot UI)

- [x] Crear las 6 propiedades custom (consolidadas, ver §3) — hecho 2026-07-31
- [ ] Pegar las 3 plantillas HTML (Source)
- [ ] Workflow: enroll al crear contacto Colab / lista “Leads Cacao Colab”
- [ ] Delay 0 → email día 1
- [ ] Delay 7 días → email día 7 (o if/then `colab_md_lifetime` conocida)
- [ ] Delay 14 días → email día 14
- [ ] Enviar pruebas a amauryamed@gmail.com + hellenandba@gmail.com

---

## 7. Relación con Mazorcas

Ver `16-MAZORCAS-DORADAS.md`. Los montos no cambian. El email **narra** lifetime/rango; no promete canjes planeados como activos.

---

## 8. Fuera de alcance de esta pasada

- Envío transaccional desde el monorepo (Resend/etc.)
- `pg_cron` digest semanal (roadmap Fase 4)
- Emails por rank-up instantáneo (se puede añadir if/then HubSpot cuando `colab_rank` cambie)
