# Cacao Colab — PRD (Product Requirements Document) v2

> Documento nuevo, pedido explícitamente en el pivote v2. Última actualización: 2026-07-26.
> Complementa `00-SPEC.md` (decisiones) y `01-STRATEGY.md` (go-to-market). Este documento se enfoca en **qué construir y por qué**, priorizado; `12-SRS.md` cubre **cómo se especifica técnicamente**.

---

## 1. Resumen ejecutivo

Cacao Colab pasa de ser una landing de captura de leads HoReCa (Spec v1, jun 2026) a un **marketplace transaccional** que conecta agricultores de cacao colombiano con chocolateros, maquiladores y compradores, con aprendizaje gamificado (Dualita), pagos internos (membresía + comisión vía Stripe Connect), CRM propio sincronizado con HubSpot, blog de tendencias y app nativa. El objetivo de negocio detrás del pivote: capturar valor transaccional real del ecosistema que Cacao Colab ya agregó como vitrina, en vez de solo generar leads para que otros (CAÚA, Zurych) los conviertan fuera de la plataforma.

Esta pasada (2026-07-26) entrega la **fundación**: arquitectura, modelo de datos, scaffolding de las 3 apps, y toda la documentación — no el feature-set completo. Oscar (backend) y Hellen (frontend) toman este PRD y el SRS como punto de partida de implementación.

---

## 2. Problema y oportunidad

### Problema actual (post Spec v1)
- Cacao Colab genera leads HoReCa calificados pero **no captura ningún valor de la transacción real** — el comprador termina comprándole a CAÚA o Zurych directamente, fuera de la plataforma, sin que el Colab reciba nada del volumen que ayudó a generar.
- Los productores/farmers no tienen ningún canal directo dentro del Colab — solo CAÚA y Zurych (como Owners) y Lust (como Colaborador) tienen presencia, todos ellos marcas ya establecidas, no productores individuales.
- El aprendizaje (Dualita) es contenido estático sin mecanismo de retención — no hay razón estructural para que un usuario vuelva dos veces.
- El CRM depende 100% de HubSpot — no hay capa propia de datos que permita análisis o automatización sin pegarle a la API externa en cada operación.

### Oportunidad
- Un marketplace con comisión reducida es más atractivo para farmers/chocolatiers que canales de distribución tradicionales (típicamente con márgenes mayores).
- La gamificación real de Dualita puede convertir el microlearning gratuito en un motor de retención y de calificación de leads (quién completa más módulos, más probable que compre).
- Un CRM propio permite reportar métricas de negocio (GMV, take rate) sin depender de exportar datos de HubSpot manualmente.

---

## 3. Personas por actor

| Persona | Rol de marketplace | Objetivo principal | Frustración hoy |
|---------|----------------------|----------------------|--------------------|
| **Doña Marta** (ejemplo, no un Guardián real nombrado — ver nota de cumplimiento) | farmer | Vender su cosecha directo, sin intermediario que se quede con el margen | Depende del precio de bolsa y de compradores esporádicos |
| **Chef Andrés** | buyer | Conseguir cacao trazable para su restaurante, con historia de origen que pueda contar en el menú | Proveeduría fragmentada, no sabe a quién comprarle con confianza |
| **Taller de chocolate "X"** | chocolatier/maquilador | Conseguir insumo consistente lote a lote, con posibilidad de co-branding | Variabilidad de calidad entre proveedores, sin trazabilidad certificable |
| **Amaury** | founder (staff, no marketplace) | Liderar marketing/ventas, ver el estado del negocio sin pedirle a Oscar cada dato | Sin panel propio, depende de reportes manuales |
| **Oscar** | staff (backend) | Ejecutar sobre una fundación clara sin tener que re-derivar decisiones de arquitectura | Sin este PRD/SRS, cada decisión de modelo de datos se discute desde cero |
| **Hellen** | staff (frontend) | Construir UI sobre contratos de API estables (Zod schemas) | Sin tipos compartidos, cada feature requiere re-alinear el shape de los datos a mano |

---

## 4. Historias de usuario priorizadas (MoSCoW por fase)

### Fase 1 — Activación digital (en curso, sin cambios de alcance por el pivote)
- **Must:** Como comprador HoReCa, quiero completar el onboarding y que mis datos lleguen a HubSpot, para que el equipo me haga seguimiento. *(ya implementado, Spec v1)*

### Fase 2 — Dualita gamificada
- **Must:** Como learner, quiero ganar XP al completar una lección, para sentir progreso medible.
- **Must:** Como learner, quiero ver mi racha de días activos, para tener un incentivo de volver.
- **Should:** Como learner, quiero ver un leaderboard semanal, para comparar mi progreso con otros.
- **Could:** Como learner, quiero ganar insignias por hitos, para tener reconocimiento visible.
- **Won't (esta fase):** Sistema de recompensas canjeables por productos reales — no hay unit economics definida para eso todavía.

### Fase 3 — Marketplace transaccional
- **Must:** Como farmer, quiero publicar un listing de mi cosecha, para que compradores lo encuentren.
- **Must:** Como buyer, quiero comprar un listing y pagar dentro de la plataforma, para no depender de coordinación manual por WhatsApp.
- **Must:** Como plataforma, necesito calcular y registrar la comisión de cada orden de forma auditable (`commission_ledger`), para poder reportar take rate real.
- **Should:** Como organización vendedora, quiero suscribirme a un plan de membresía con comisión reducida, para bajar mi costo si transacciono mucho volumen.
- **Could:** Como comprador, quiero dejar una reseña verificada de una compra real, para ayudar a otros compradores.
- **Won't (esta fase):** Logística/envíos dentro de la plataforma — se coordina fuera, como hoy.

### Fase 4 — Escala a 10K usuarios
- **Must:** Como plataforma, necesito rate limiting en la API transaccional, para no caer ante picos de tráfico.
- **Must:** Como usuario, quiero usar la app nativa para ver el marketplace y comprar, no solo la web.
- **Should:** Como plataforma, quiero jobs automáticos (refresh de leaderboard, digest de CRM) sin intervención manual.

---

## 5. Métricas de éxito

Ver `01-STRATEGY.md` §5 para el detalle completo. Resumen:

| Fase | Métrica primaria | Meta (a validar con el founder, no inventada acá) |
|------|----------------------|--------------------------------------------------|
| Fase 1 (vigente) | Leads HoReCa capturados | 500 contactos/año — meta ya existente en Spec v1 |
| Fase 2 | Retención de learners (2+ semanas activas) | Sin meta numérica definida todavía |
| Fase 3 | GMV transaccionado + take rate | Sin meta numérica definida todavía — requiere que el founder defina el % de comisión real primero (ver `08-PAGOS.md` §5) |
| Fase 4 | Usuarios activos (marketplace + Dualita) | 10.000 en 3 meses desde el lanzamiento de Fase 3 — meta del pedido original del founder |

**Nota:** no se inventan metas numéricas de negocio que el founder no haya confirmado explícitamente (GMV objetivo, % de comisión, precio de membresía) — donde no hay una cifra confirmada, este documento dice "sin definir" en vez de rellenar con un número plausible.

---

## 6. Fuera de alcance (de todo el pivote v2, no solo de esta pasada)

- Logística/envío de producto físico dentro de la plataforma.
- Certificaciones de calidad/orgánico gestionadas dentro del producto (siguen siendo procesos externos que se documentan por lote).
- Multi-moneda / venta internacional dentro del marketplace (`currency = 'COP'` fijo por ahora).
- Marketplace de servicios (solo producto físico de cacao/cobertura/derivados).
- Cualquier feature que involucre nombrar Guardianes/agricultores individuales por nombre en contenido público (ver nota de cumplimiento, `04-ACTORES.md`).

---

## 7. Riesgos y supuestos

| Riesgo/supuesto | Impacto si falla | Mitigación |
|-------------------|----------------------|--------------|
| El founder no define el % de comisión ni el precio de membresía a tiempo | Fase 3 no puede calcular `commission_rules` reales, queda bloqueada | Documentado explícitamente como pendiente (`08-PAGOS.md` §5), no se inventa un número |
| La cuenta Stripe Connect requiere KYC de una entidad legal que todavía no está definida | Bloquea todo pago real | Mismo tratamiento — pendiente explícito, no se avanza sin esto |
| Farmers/productores no tienen conectividad/dispositivo para gestionar listings ellos mismos | Baja adopción del lado de la oferta | Fuera del alcance de esta pasada — es una decisión de UX/soporte a resolver en Fase 3, posiblemente con un flujo asistido (alguien del equipo carga el listing por ellos) |
| El contenido de Dualita real (lecciones, MOOC Zurych) no está listo cuando la gamificación esté construida | Gamificación sin contenido que gamificar | Fase 2 depende de que el contenido real exista primero — documentado en `05-ROADMAP.md` como dependencia |
| Supuesto: Oscar y Hellen tienen conocimiento de Next.js/React — no de Expo/React Native previo | Curva de aprendizaje en `apps/mobile` | Se eligió Expo managed específicamente por ser el camino de menor fricción para devs de React web |
