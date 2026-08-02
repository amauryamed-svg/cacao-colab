# Economía interna de Mazorcas Doradas · fintech gamificada de cacao

> Última actualización: 2026-08-02  
> Complementa `16-MAZORCAS-DORADAS.md` y `09-GAMIFICACION.md`.  
> Principio rector: **bonificación por productividad propia** (balanced scorecard), nunca multinivel.  
> Sostenibilidad: la actividad propia es un empujón con topes; **packs financian sinks** con costo real.

---

## 1. Qué problema resuelve

El Colab necesita una economía interna para:

1. **Comprar Mazorcas Doradas (MD)** y financiar acceso a cursos / aceleraciones / servicios.
2. **Canjear MD** por esos servicios cuando el catálogo esté activo.
3. Que el **XP** acumule maestría y **apalance** bonos de productividad → MD, sin convertir XP en moneda vendible ni premiar reclutamiento.

Es una **fintech gamificada de cacao**: wallet, ledger, sinks y sources auditables. No es depósito, inversión, cripto ni ingreso garantizado.

---

## 2. Dos unidades, dos trabajos

| Unidad | Mide | Se compra | Se canjea | Se convierte |
|---|---|---|---|---|
| **XP** | Dominio pedagógico (campus, gotchi) | No | No | No (solo apalanca) |
| **MD** | Fidelidad / acceso a servicios Colab | Sí (packs) | Sí (catálogo activo) | No a efectivo |

Regla dura (**D34 / D41**): el XP **no** se gasta ni se cambia 1:1 por MD. El XP entra solo como **coeficiente de apalancamiento** en el cierre del scorecard de productividad propia.

---

## 3. Anti-multinivel (qué está prohibido)

No existen y no se implementarán:

- puntos o MD por invitar / reclutar personas;
- árboles de referidos o “downline”;
- comisiones sobre actividad de terceros;
- pagos por subir de rango;
- venta de posiciones o “kits de ingreso” con promesa de renta;
- conversión de MD o XP a efectivo.

Los rangos reconocen **competencia y continuidad propia**, no tamaño de red ni volumen de ventas ajenas.

---

## 4. Balanced Scorecard de productividad cacaotera

Inspirado en Kaplan/Norton, adaptado al Colab. Cada periodo (semana UTC) mide **cuatro perspectivas de actividad propia**:

| Perspectiva BSC | En el Colab | KPI verificable (ejemplos) | Categoría ledger |
|---|---|---|---|
| Aprendizaje y crecimiento | Dualita / campus | Misiones y módulos completados | `learning` |
| Procesos internos | Cuidado de labranza | Acciones Gotchi, cosecha+fermentación | `care` |
| Comunidad / stakeholders | Evidencia moderada | Aportes de campo aprobados | `community` |
| Valor / comercio | Compra verificada | Orden pagada (webhook) | `verified_purchase` |

### 4.1 Rol → pesos (no jerarquía de reclutamiento)

El rol de marketplace (`actor_roles`: farmer / chocolatier / maquilador / buyer) solo **rebalancea qué perspectivas pesan más** en *tu* bono. No crea niveles sobre otras personas.

| Rol | Aprendizaje | Cuidado | Comunidad | Comercio |
|---|---|---|---|---|
| `farmer` | 0.9 | 1.3 | 1.0 | 0.8 |
| `chocolatier` | 1.3 | 0.9 | 1.0 | 1.0 |
| `maquilador` | 1.1 | 0.8 | 0.9 | 1.2 |
| `buyer` | 1.0 | 0.7 | 0.9 | 1.3 |
| sin rol (learner) | 1.0 | 1.0 | 1.0 | 1.0 |

### 4.2 Maestría (rango) → techo del bono

El rango por `lifetime_earned` (excluye packs comprados) fija el **techo semanal** del bono scorecard:

| Rango | Techo MD / semana | MD históricas mín. |
|---|---|---|
| Semilla | 6 | 0 |
| Brote | 12 | 120 |
| Labrador | 20 | 400 |
| Guardián | 32 | 1000 |
| Maestro | 42 | 2200 |
| Heritage | 55 | 5000 |

### 4.3 XP como apalancamiento (no conversión)

```
xp_total = suma de campus_progress.xp_total + gotchi_runs.xp_total
xp_leverage = clamp(1 + floor(xp_total / 750) * 0.03, 1.00, 1.12)
```

Ejemplo: 0 XP → ×1.00 · 750 XP → ×1.03 · 3 000 XP → ×1.12 (tope).

El XP **no baja** al liquidar el bono. Solo amplifica el reconocimiento de productividad equilibrada.

### 4.4 Fórmula de liquidación (idempotente por periodo)

Por cada perspectiva `p` con actividad propia en la semana:

```
coverage_p = min(1, eventos_p / meta_p)          # meta tipica: 4 eventos
score_p    = coverage_p * peso_rol_p
balance    = media geométrica de score_p activos  # premia equilibrio, no grind de una sola métrica
pool       = 16                                   # MD base semanal declarada
bonus_raw  = round(pool * balance * mastery_rank_factor * xp_leverage)
bonus_MD   = min(techo_rango, bonus_raw)
```

`mastery_rank_factor`: Semilla 1.00 … Heritage 1.12 (declarado en `loyalty.ts`).

Se acredita una sola vez por `(profile_id, period_key)` con `reason_code = scorecard_settlement` y categoría `adjustment` (o `scorecard_bonus` tras migración).

### 4.5 Por qué esto no es pirámide

- Solo cuenta **tu** actividad verificada.
- El equilibrio BSC castiga el “solo reclutar / solo comprar packs”.
- El rol reordena pesos productivos, no crea cadena de mando comercial.
- Comprar packs **no sube el rango** (no suma a `lifetime_earned`).

---

## 5. Comprar Mazorcas Doradas (packs)

Packs declarados en `apps/web/lib/loyalty.ts` (`mdBuyPacks`):

| Pack | MD | Precio lista (COP) | Notas |
|---|---|---|---|
| Saco | 80 | 28 000 | Entrada a canjes digitales (~350 COP/MD) |
| Cesta | 220 | 75 000 | Aceleraciones / cursos |
| Cosecha | 550 | 180 000 | Bundle intensivo |

Flujo previsto (Stripe — ver `08-PAGOS.md`):

1. Usuario elige pack en `/cuenta/mazorcas`.
2. `mazorca_pack_intents` guarda intención `pending`.
3. Checkout Stripe; webhook `payment_intent.succeeded`.
4. Crédito ledger `category = pack_purchase` (o `verified_purchase`) **sin** incrementar `lifetime_earned`.
5. Intent → `paid`.

Hasta tener Stripe live, la UI muestra packs y estado “pago pendiente de activación”; no inventa créditos.

---

## 6. Canjear por cursos y aceleraciones (sinks)

Beneficios Colab nativos (`fulfillment_type = colab_digital`) pueden activarse sin conector de marca externa:

| Servicio | Costo MD | Rango mín. | Efecto |
|---|---|---|---|
| Mentoría Dualita (cupo semanal) | 400 | Guardián | Fulfillment manual / cola |

**Masters no son sinks.** Acceso por rango (`lifetime_earned`): Arquitecto ≥ Brote (120); Chocolatier y Benevolo ≥ Labrador (400). Se ganan cultivando en Sembrar + Dualita (micro CAÚA + MOOC Zurych). Los antiguos canjes `aceleracion-arquitecto` / preview Chocolatier / ruta Benevolo están **retirados** y se **devuelven** (categoría ledger `refund`, sin inflar rango).

Emisión inmediata (`mazorcaRewards`): micro/misión Masters 6 MD; cierre Architect/Chocolatier 24; Benevolo 5/16; Sembrar cuidado 2 (tope 10/día care); cosecha Sembrar **+12 MD** al abrir lote y **+28 MD** al cerrar fermentación; hito **cuidado perfecto** (hora ≥100 y métricas al 100 % al cosechar) **+40 MD**; plan comparativo a **10 años** **+18 MD** (ambos idempotentes por labranza; sin tope diario de cuidado); learning tope **20 MD/día**. Completar todo el campus no debe financiar solo el catálogo de sinks.

Reglas de canje (igual que `16` §5): ítem `active`, saldo, rango, `per_user_limit`, términos visibles. Débito append-only + fila en `benefit_redemptions`.

---

## 7. Diagrama de flujo

```
Actividad propia ──► MD inmediatas (mazorcaRewards)
       │
       ├──► XP acumula (campus / gotchi)
       │         │
       │         └──► xp_leverage en cierre semanal
       │
       └──► Scorecard semanal ──► bono MD (techo por rango)

Pack Stripe ──► MD saldo (no rango)

MD saldo ──► Canje cursos / aceleraciones / beneficios activos
```

---

## 8. Implementación en repo

| Pieza | Ubicación |
|---|---|
| Constantes (rewards, packs, scorecard, sinks) | `apps/web/lib/loyalty.ts` |
| Award / redeem / preview+settle scorecard | `apps/web/lib/loyalty-server.ts` |
| API canje | `POST /api/loyalty/redeem` |
| API scorecard (preview + settle) | `GET|POST /api/loyalty/scorecard` |
| Wallet + packs + explicación BSC | `/cuenta/mazorcas` |
| Catálogo con canje | `/marketplace/beneficios` |
| Migración packs + scorecard + sinks Colab | `supabase/migrations/20260801120000_economia_md_scorecard.sql` |

---

## 9. Operación

1. Oscar aplica la migración en Supabase.
2. Amaury confirma precios COP de packs y activa Stripe cuando exista cuenta.
3. Hellen/Oscar revisan copy anti-pirámide en wallet y beneficios.
4. Cron semanal (futuro): `POST /api/loyalty/scorecard` con secret de cron para liquidar periodos cerrados.

---

## 10. Criterio de éxito

- Un learner entiende en una pantalla: ganar / comprar / canjear / apalancar.
- Ningún copy promete ingreso por reclutar.
- Canje digital Colab funciona con saldo real y deja rastro en ledger + redenciones.
- Packs no inflan rango.
- Scorecard solo bonifica actividad propia equilibrada, amplificada por XP/maestría.
- El grind orgánico no liquida sinks premium: packs cubren el gap financiero.
