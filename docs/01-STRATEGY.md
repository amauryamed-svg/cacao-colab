# Cacao Colab — Estrategia

> Derivado de `00-SPEC.md`. Cambia esto solo si cambia el Spec.
> Última actualización: 2026-07-26 (pivote v2)

---

## 0. Qué cambia en v2

La Fase 0 y Fase 1 de v1 (abajo) se mantienen tal cual — ya ejecutadas o en curso, sin cambios. A partir de la Fase 2 la estrategia evoluciona, y la Fase 3 pivotea de "vitrina + captura de leads" a **marketplace transaccional**: el criterio de éxito deja de ser solo "cuántos contactos capturamos" y pasa a incluir "cuánto GMV se transaccionó y qué tan bien retenemos learners de Dualita". Ver `11-PRD.md` para historias de usuario por actor y `00-SPEC.md` §0 para el resumen completo del pivote.

---

## 1. Posicionamiento

**v1:** Cacao Colab no es una marca. Es la plataforma de convergencia del ecosistema de cacao colombiano de especialidad para el canal HoReCa y retail de especialidad.

**v2:** Cacao Colab es el **marketplace transaccional** del ecosistema de cacao colombiano — conecta directamente a quien produce (farmer), quien transforma (chocolatier/maquilador) y quien compra (buyer/HoReCa), con aprendizaje gamificado como capa de retención y confianza.

**Para el comprador:** un solo punto de acceso a las mejores marcas de cacao colombiano, con checkout real, no solo un directorio.

**Para las marcas/productores:** un canal de venta directo con comisión reducida frente a la distribución tradicional, más visibilidad y aprendizaje.

---

## 2. Audiencia objetivo (expandida en v2)

### Primaria — compradores HoReCa (sin cambios desde v1)
- Chefs, pasteleros y bartenders en Colombia y Latinoamérica.
- Operaciones: restaurante, hotel, cafetería, pastelería/chocolatería.
- Buscan: cacao trazable, funcionalmente diferenciado, con historia de origen.
- Pain: acceso fragmentado a proveedores confiables; desconocimiento del cacao colombiano.

### Nueva en v2 — farmers (agricultores/productores)
- Buscan: canal de venta directo, precio justo, visibilidad de marca/lote propio.
- Pain: dependencia de intermediarios, precio de bolsa desfavorable.

### Nueva en v2 — chocolatiers / maquiladores
- Buscan: insumo trazable a precio competitivo, co-branding, red de distribución.
- Pain: proveeduría fragmentada, falta de trazabilidad certificable ante sus propios clientes.

### Secundaria — marcas de cacao con propósito (sin cambios desde v1)
- Productores o transformadores colombianos con trazabilidad por lote.
- Buscan: distribución, visibilidad y red de aprendizaje.
- Entrada al marketplace: propuesta diferenciada + visión de largo plazo.

---

## 3. Propuesta de valor por actor (expandida en v2)

| Actor | Qué recibe del Colab v2 |
|-------|----------------------|
| Comprador HoReCa/buyer | Curaduría confiable + checkout real + aprendizaje aplicado (Dualita) + acceso directo a marcas |
| Farmer | Canal de venta directo, comisión reducida vs. intermediarios, visibilidad de lote/origen |
| Chocolatier/maquilador | Insumo trazable, co-branding, distribución, aprendizaje técnico (Dualita) |
| CAÚA Colombia | Canal de awareness B2B + leads calificados + pull de marca (sin cambios desde v1) |
| Chocolate Zurych | Vitrina especializada + posicionamiento educativo (MOOC) + co-branding (sin cambios desde v1) |
| Marcas futuras | Red establecida + credibilidad por asociación + infraestructura de pagos ya lista |

---

## 4. Go-to-market

### Fase 0 — Alimentec (jun 2026) ✅ completada
- Presencia física conjunta CAÚA × Zurych.
- Lanzamiento co-branding NIBS (Blanco + Oscuro).
- Captura de leads via email seguimiento + plataforma web.

### Fase 1 — Activación digital (jun–ago 2026) ✅ en curso, sin cambios
- Plataforma en vivo (ahora en `cacao-colab-web.vercel.app`, ver D17 en `00-SPEC.md`).
- Onboarding gate → HubSpot → seguimiento por email/WA.
- Contenido semanal para HoReCa (LinkedIn + IG Cacao Colab).

### Fase 2 — Dualita activa (ago–oct 2026) — evoluciona en v2
- CAÚA Academy 6 módulos disponibles públicamente (v1, vigente).
- MOOC Zurych lanzado (pendiente Zurych, sin cambios).
- **Nuevo en v2:** gamificación real (XP, rachas, insignias, leaderboard semanal) — ver `09-GAMIFICACION.md`.
- **Nuevo en v2:** companion IA con guardrails de no-venta-directa — ver `10-DUALITA-IA.md`.

### Fase 3 — Marketplace transaccional (pivote v2, reemplaza "Marketplace abierto" de v1)
- Listings reales por organización, con checkout y pago vía Stripe Connect Express.
- Modelo híbrido: membresía + comisión reducida por transacción (`08-PAGOS.md`).
- Roles de actor reales (farmer/chocolatier/maquilador/buyer) con cuentas propias (`07-MODELO-DATOS.md`).
- App nativa (Expo) con el mismo marketplace, en modo lectura inicialmente y transaccional después (`13-MOBILE.md`).

### Fase 4 — Escala a 10K usuarios (nueva en v2)
- Supabase Pro + pooling (Supavisor), rate limiting (Upstash), jobs nativos (`pg_cron`/`pgmq`).
- Ver `06-ARQUITECTURA.md` §Infra para el detalle técnico completo.

---

## 5. Métricas clave

### v1 (vigentes como métricas de entrada de funnel)

| Métrica | Meta año 1 | Cómo se mide |
|---------|-----------|--------------|
| Leads HoReCa capturados | 500 contactos | HubSpot CRM |
| Tasa de conversión onboarding → contacto | > 40% | API /api/onboarding |
| Módulos Dualita completados | 1.000 | `learner_progress` (Supabase, antes "por implementar") |
| Marcas en marketplace | 4 | `organizations` (Supabase, antes manual) |
| Clientes convertidos (al menos 1 marca) | 80 | HubSpot + Shopify |

### v2 — North Star de negocio (nuevas)

| Métrica | Cómo se mide | Fuente |
|---------|--------------|--------|
| GMV transaccionado | Suma de `orders.total_cents` con status `paid`/`fulfilled` | Supabase + Stripe |
| Take rate (comisión + membresías) | `commission_ledger` + `memberships` activas | Supabase |
| MRR de membresías | Suma de `membership_plans.price_cents_monthly` × membresías activas | Supabase + Stripe Subscriptions |
| Retención de learners (Dualita) | % de profiles con `learner_progress` en 2+ semanas distintas | Supabase |

Ver `11-PRD.md` §Métricas de éxito para el desglose completo por fase y por actor.
