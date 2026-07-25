# Cacao Colab — Product Requirements Document (PRD) v2

> Owner: Amaury Amed (CTO · CAÚA Colombia). Co-owner: Equipo Zurych.
> Derivado de `00-SPEC.md` — cualquier cambio de alcance se refleja primero ahí.
> Fecha: 2026-07-24.

---

## 1. Resumen ejecutivo

Cacao Colab es un marketplace transaccional que conecta agricultores de cacao colombiano con
chocolateros y maquiladores, con un sistema de aprendizaje gamificado (Dualita: MOOC + microlearning)
y un companion con IA real. Fundado por CAÚA Colombia y Chocolate Zurych, construido para
demostrar en ~2 años una plataforma lo bastante robusta y con tracción real (GMV, MRR, retención
de learners) para que actores como Luker o Nacional de Chocolates consideren licenciarla.

v2 es un pivote respecto a v1 (vitrina de leads sin transacciones, lanzada junio 2026 para
Alimentec) — no un reinicio: la marca, el onboarding, la integración HubSpot y la identidad visual
de v1 se conservan y se extienden, no se descartan.

## 2. Problema y oportunidad

**Problema del lado vendedor (farmers/chocolatiers/maquiladores):** el cacao colombiano de
especialidad se vende hoy por canales fragmentados — referidos, WhatsApp, ferias puntuales. No hay
un canal digital que combine descubrimiento, trazabilidad verificable y transacción en un solo
lugar. Los productores dependen de intermediarios; los chocolateros de autor no tienen un canal de
venta directa a HoReCa/retail de especialidad más allá de su propia red.

**Problema del lado comprador (HoReCa, retail de especialidad):** acceso fragmentado a proveedores
confiables de cacao colombiano trazable (heredado del análisis de v1, sigue vigente); además, poco
conocimiento aplicado sobre cómo evaluar y usar cacao de especialidad — de ahí el rol de Dualita.

**Oportunidad:** ningún actor del ecosistema cacaotero colombiano ha construido todavía la
combinación marketplace + educación + marca compartida con el nivel de producción que exige el
mercado B2B de especialidad (referencia: Callebaut/Valrhona a nivel de contenido). Cacao Colab
puede ocupar ese espacio antes que un jugador más grande (Luker, Nacional de Chocolates) lo haga
internamente — de ahí el horizonte de licenciamiento en vez de competencia directa.

## 3. Personas

| Persona | Rol en la plataforma | Objetivo principal | Frustración actual |
|---------|----------------------|---------------------|----------------------|
| **Farmer** (productor/finca) | Vendedor | Vender cacao trazable sin depender de intermediarios | Acceso fragmentado a compradores confiables, precio poco transparente |
| **Chocolatier** (chocolatero de autor) | Vendedor + comprador | Vender producto terminado/coberturas; comprar insumo trazable | Visibilidad limitada ante HoReCa; acceso a insumo con historia de origen verificable |
| **Maquilador** | Vendedor de servicio | Ofrecer capacidad de transformación (tostado, molienda, conchado) | Descubrimiento — hoy depende de boca a boca |
| **Buyer HoReCa** (chef, pastelero, bartender) | Comprador | Curaduría confiable + aprendizaje aplicado | Desconocimiento del cacao colombiano, proveedores dispersos |
| **Learner Dualita** (cualquier actor) | Usuario del LMS | Aprender cata, perfilación, procesos de transformación | Formación fragmentada, cara o inexistente en español para este nicho |
| **Colaborador interno** (Oscar/Hellen/Amaury) | Operador de plataforma | Moderar listings, operar CRM, dar soporte | — (rol nuevo en v2, no existía en v1) |
| **Owner** (CAÚA, Zurych) | Gobernanza | Decidir admisión de nuevos actores, dirección de marca | — heredado de v1 sin cambios |

## 4. Historias de usuario (MoSCoW por fase)

Fases referenciadas: ver `05-ROADMAP.md` § Fase 4-7.

### Fase 5 — MVP marketplace + auth + LMS esqueleto

**Must have**
- Como farmer, puedo crear una cuenta y publicar un listing con lote trazable, para que compradores lo descubran.
- Como buyer, puedo navegar listings publicados filtrados por territorio/categoría.
- Como learner, puedo completar una lección de microlearning y ver mi progreso persistido.
- Como colaborador interno, puedo moderar (aprobar/rechazar) un listing antes de que se publique.

**Should have**
- Como usuario, puedo autenticarme por WhatsApp OTP además de email (coherente con D10).
- Como usuario mobile, puedo navegar el marketplace en modo solo-lectura desde la app.

**Could have**
- Como buyer, puedo guardar listings favoritos.

**Won't have (esta fase)**
- Checkout / pago real — llega en Fase 6.

### Fase 6 — Pagos + CRM interno + sync HubSpot

**Must have**
- Como vendedor, puedo completar el onboarding de Stripe Connect Express para recibir pagos.
- Como buyer, puedo comprar un listing con checkout real (modo test primero, live después de KYC).
- Como vendedor, puedo suscribirme a un plan de membresía que determina mi tier de comisión.
- Como colaborador interno, puedo ver y editar contactos en el CRM interno.
- Como sistema, sincronizo contactos entre el CRM interno y el HubSpot compartido sin duplicados.

**Should have**
- Como vendedor, puedo ver el estado de mis payouts (`commission_ledger`) en mi perfil.

**Won't have (esta fase)**
- Gamificación completa, blog público, submission a tiendas.

### Fase 7 — Gamificación + blog + hardening + submission

**Must have**
- Como learner, gano XP, mantengo racha y desbloqueo badges reales (no simulados) por completar lecciones.
- Como learner, veo un leaderboard de usuarios reales (sin bots simulados — ver `09-GAMIFICACION.md` § 3).
- Como visitante, leo contenido de blog nivel Callebaut/Valrhona sobre tendencias de cacao/chocolate.
- Como usuario final, puedo instalar la app desde App Store o Play Store.

**Should have**
- Como learner, converso con Dualita (companion IA) para que me sugiera la siguiente lección o me explique un concepto usando contenido publicado real.

**Could have**
- Como vendedor, recibo notificaciones push de nuevas órdenes.

## 5. Fuera de alcance (explícito)

- **No es un marketplace de commodities genérico** — solo cacao colombiano trazable y sus
  transformaciones (coberturas, bean-to-bar, capacidad de maquila). No se expande a otros países de
  origen en v2.
- **No procesa pagos fuera de Stripe Connect** — no se construye un sistema de pagos propio desde cero.
- **No reemplaza HubSpot** — el CRM interno es complementario, no un CRM general-purpose para todo Caúa.
- **No incluye logística/envíos** en v2 — la coordinación de entrega queda fuera de la plataforma (a definir en una fase futura, no planificada aquí).
- **No incluye moderación automatizada de listings** en Fase 5-6 — es manual (Amaury/Oscar).
- **No incluye multi-idioma** — español únicamente en v2 (coherente con el mercado objetivo: Colombia y Latinoamérica).
- **La tesis de licenciamiento a Luker/Nacional de Chocolates es un horizonte, no un compromiso contractual** — no hay conversación ni acuerdo iniciado, es una meta de credibilidad de producto.

## 6. Métricas de éxito

Evoluciona el North Star de v1 (contactos HoReCa calificados) hacia métricas transaccionales reales:

| Métrica | Meta (horizonte Fase 7 / fin de año 1 de v2) | Cómo se mide |
|---------|-----------------------------------------------|----------------|
| GMV transaccionado | Definir con el equipo tras Fase 6 (sin dato histórico para proyectar — no inventar una cifra) | `orders` + `commission_ledger` |
| MRR de membresías | Definir tras fijar `membership_plans.price_cents` reales | `memberships` activas × precio de plan |
| Vendedores activos (con ≥1 listing publicado) | 20 en Fase 6, 100 en Fase 7 | `listings.status='published'` distinct sellers |
| Learners activos mensuales | 500 | `learner_progress` con actividad en 30 días |
| Retención de learners (D30) | 30% | cohortes sobre `learner_progress` |
| Usuarios soportados sin degradación | 10.000 | prueba de carga sintética, ver `06-ARQUITECTURA.md` § 3 |
| Contactos HoReCa calificados (heredado v1) | 500 (meta v1 original, sigue corriendo) | HubSpot CRM |

**Nota:** no se inventan cifras de GMV/MRR objetivo sin datos históricos — el equipo las fija tras
tener los primeros ciclos reales de Fase 6, coherente con la disciplina de no inventar cifras del
resto de la operación Caúa.

## 7. Riesgos y supuestos

| Riesgo/Supuesto | Impacto si falla | Mitigación |
|-------------------|---------------------|------------|
| Zurych no está alineado con el pivote de tesis (D11) | Alto — el Spec documenta la decisión de Amaury, no confirma acuerdo del co-founder | P8 en `00-SPEC.md`: confirmar con Zurych antes de comunicar el pivote externamente |
| KYC de Stripe Connect toma más de lo esperado | Medio — bloquea Fase 6 completa | Iniciar el proceso de entidad legal en paralelo a Fase 4-5, no esperar a Fase 6 |
| Adopción de vendedores (farmers) es más lenta de lo esperado — es un cambio de comportamiento real, no solo de canal | Alto — sin oferta, no hay marketplace | Reclutamiento manual de los primeros 10-20 vendedores piloto antes de abrir registro público |
| Volumen real de 10K usuarios no se alcanza en 3 meses | Bajo/Medio — la infra igual queda lista para cuando llegue | No se sobre-invierte en infra que exceda las necesidades de Fase 6-7 (ver `06-ARQUITECTURA.md` § costo) |
| Equipo de 3 personas (Oscar/Hellen/Amaury) es insuficiente para el alcance completo en 3 meses | Alto | El roadmap prioriza MoSCoW explícitamente — "Won't have" por fase es tan importante como "Must have" |

## 8. Dependencias externas

- Cuenta Stripe Connect de plataforma (entidad legal + KYC) — Amaury.
- Acceso de escritura al HubSpot compartido de Caúa (ya existe, solo falta el token real) — Amaury.
- Cuenta Apple Developer Program + Google Play Console — no existen todavía, ver `13-MOBILE.md`.
- Logo/ícono oficial de marca para assets de app — pendiente, ver P7 en `00-SPEC.md`.
- `supabase login` del founder para provisionar el proyecto real — Amaury.
