# Cacao Colab — Estrategia

> Derivado de `00-SPEC.md`. Cambia esto solo si cambia el Spec.
> Última actualización v1: 2026-06-16 · **Extendido v2: 2026-07-24** (D11, ver `00-SPEC.md`)

---

## 0. Qué agrega v2 (leer primero)

Todo lo de abajo (secciones 1-5) es la estrategia **heredada de v1** — sigue vigente, no se
contradice. v2 la extiende: el posicionamiento pasa de "vitrina curada" a **"vitrina curada +
mercado transaccional"** — el comprador ya no solo descubre marcas, compra directamente; el
productor/chocolatero/maquilador ya no solo gana visibilidad, vende. Ver secciones 6-8 nuevas al
final de este documento.

---

## 1. Posicionamiento

Cacao Colab no es una marca. Es la **plataforma de convergencia** del ecosistema de cacao colombiano de especialidad para el canal HoReCa y retail de especialidad.

**Para el comprador:** un solo punto de acceso a las mejores marcas de cacao colombiano, seleccionadas por trazabilidad, origen verificado y propuesta funcional.

**Para las marcas:** amplificación de alcance sin ceder identidad. El Colab suma; no absorbe.

---

## 2. Audiencia objetivo

### Primaria — compradores HoReCa
- Chefs, pasteleros y bartenders en Colombia y Latinoamérica.
- Operaciones: restaurante, hotel, cafetería, pastelería/chocolatería.
- Buscan: cacao trazable, funcionalmente diferenciado, con historia de origen.
- Pain: acceso fragmentado a proveedores confiables; desconocimiento del cacao colombiano.

### Secundaria — marcas de cacao con propósito
- Productores o transformadores colombianos con trazabilidad por lote.
- Buscan: distribución, visibilidad y red de aprendizaje.
- Entrada al marketplace: propuesta diferenciada + visión de largo plazo.

---

## 3. Propuesta de valor por actor

| Actor | Qué recibe del Colab |
|-------|----------------------|
| Comprador HoReCa | Curaduría confiable + aprendizaje aplicado (Dualita) + acceso directo a marcas |
| CAÚA Colombia | Canal de awareness B2B + leads calificados + pull de marca |
| Chocolate Zurych | Vitrina especializada + posicionamiento educativo (MOOC) + co-branding |
| Marcas futuras | Red establecida + credibilidad por asociación |

---

## 4. Go-to-market año 1

### Fase 0 — Alimentec (jun 2026) ✅ completada
- Presencia física conjunta CAÚA × Zurych.
- Lanzamiento co-branding NIBS (Blanco + Oscuro).
- Captura de leads via email seguimiento + plataforma web.

### Fase 1 — Activación digital (jun–ago 2026)
- Plataforma en vivo: cacao-colab.vercel.app.
- Onboarding gate → HubSpot → seguimiento por email/WA.
- Contenido semanal para HoReCa (LinkedIn + IG Cacao Colab).

### Fase 2 — Dualita activa (ago–oct 2026)
- CAÚA Academy 6 módulos disponibles públicamente.
- MOOC Zurych lanzado (pendiente Zurych).
- Email nurturing automatizado en HubSpot para leads Dualita.

### Fase 3 — Marketplace abierto (oct 2026+)
- Marca 3 en el marketplace (solicitud via formulario /unete).
- Criterios de admisión publicados.
- Métricas de impacto por marca visibles en plataforma.

---

## 5. Métricas clave

| Métrica | Meta año 1 | Cómo se mide |
|---------|-----------|--------------|
| Leads HoReCa capturados | 500 contactos | HubSpot CRM |
| Tasa de conversión onboarding → contacto | > 40% | API /api/onboarding |
| Módulos Dualita completados | 1.000 | Analytics (por implementar) |
| Marcas en marketplace | 4 | Manual |
| Clientes convertidos (al menos 1 marca) | 80 | HubSpot + Shopify |

---

## 6. Audiencia v2 — actores transaccionales (nuevo)

Se suma a la audiencia de v1 (compradores HoReCa, sección 2) una audiencia **vendedora**:

- **Farmers (agricultores/productores)** — venden cacao en grano/pasta con trazabilidad por lote.
  Pain: acceso fragmentado a compradores confiables, dependencia de intermediarios.
- **Chocolatiers (chocolateros de autor/artesanales)** — venden coberturas, bean-to-bar, producto
  terminado. Pain: acceso a insumo trazable, visibilidad ante compradores HoReCa/retail.
- **Maquiladores** — venden capacidad de transformación (tostado, molienda, conchado por encargo).
  Pain: descubrimiento — hoy dependen de referidos boca a boca.

Ver `04-ACTORES.md` para la distinción entre estos roles de cuenta y el nivel de gobernanza
Owner/Colaborador (D19).

## 7. Propuesta de valor v2 — actores vendedores (extiende sección 3)

| Actor | Qué recibe del Colab en v2 |
|-------|------------------------------|
| Farmer | Canal de venta directa + comisión (no intermediarios) + Dualita microlearning gratuito |
| Chocolatier | Acceso a insumo trazable + canal de venta a HoReCa + MOOC Zurych |
| Maquilador | Descubrimiento por capacidad instalada + reputación vía historial de órdenes en la plataforma |

## 8. Go-to-market v2 (extiende sección 4)

### Fase 4 — Fundación técnica del marketplace transaccional (2026-07 → 2026-08)
- Monorepo + infra base (esta sesión). Repo privado, Oscar/Hellen incorporados.
- Sin dinero real todavía — Fases 0-3 de v1 siguen siendo la operación en vivo.

### Fase 5 — MVP transaccional (2026-08 → 2026-10)
- Listings reales de al menos 1 farmer/chocolatier piloto.
- Checkout funcional en modo test de Stripe.
- App móvil en TestFlight/Internal Testing (no pública todavía).

### Fase 6 — Lanzamiento público marketplace + submission stores (2026-10 → 2026-11)
- Stripe Connect en modo live.
- App aprobada en App Store + Play Store.
- Meta de infraestructura: 10.000 usuarios soportados sin degradación.

### Fase 7 — Narrativa de licenciamiento (2026-11 → 2027)
- Blog interno con cadencia sostenida (nivel Callebaut/Valrhona).
- Métricas de GMV/MRR presentables — insumo para conversación de licenciamiento con Luker/Nacional de Chocolates (horizonte ~2028, ver `00-SPEC.md` § 0).
