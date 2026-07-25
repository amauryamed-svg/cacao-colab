# Cacao Colab — Actores del ecosistema

> Última actualización: 2026-06-17 · **v2: 2026-07-24** — se agrega la distinción D19 (`00-SPEC.md`)

---

## 0. D19 — dos niveles distintos, no una jerarquía (nuevo en v2)

v1 solo tenía **Owner/Colaborador**, un nivel de **gobernanza de organización**: quién decide sobre
la plataforma (marca, admisión de nuevos actores). v2 introduce un segundo nivel, independiente,
de **cuenta transaccional**: qué hace un `profile` individual en el marketplace.

- **Owner/Colaborador** (tabla `organizations`) — sigue exactamente igual que en v1, ver secciones 1-4 abajo.
- **farmer / chocolatier / maquilador / buyer** (tabla `actor_roles`, N:N con `profiles`) — nuevo en v2, define qué puede hacer un usuario individual: vender cacao en grano (farmer), vender chocolate/coberturas (chocolatier), ofrecer capacidad de transformación (maquilador), o comprar (buyer).

**No son la misma jerarquía.** Un empleado de CAÚA Colombia (Owner) puede tener el `actor_role`
`chocolatier` para publicar listings en el marketplace. Un farmer independiente sin ninguna
afiliación a una `organization` puede vender igual — `organization_id` en `profiles` es nullable.
Ver `07-MODELO-DATOS.md` para el esquema completo.

---

## Tipos de actor — gobernanza (heredado de v1, sin cambios)

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

## Roles de cuenta transaccional (nuevo en v2, ver D19)

| Rol | Qué vende/hace | Verificación de admisión |
|-----|-----------------|----------------------------|
| **farmer** | Cacao en grano/pasta, trazable por lote | `traceability_lot_code` obligatorio en cada listing |
| **chocolatier** | Coberturas, bean-to-bar, producto terminado | Moderación manual del listing (Fase 1, ver `05-ROADMAP.md`) |
| **maquilador** | Capacidad de transformación por encargo (tostado, molienda, conchado) | Moderación manual del listing |
| **buyer** | Compra en el marketplace (HoReCa, retail de especialidad, otro actor) | Sin verificación adicional — mismo onboarding de v1 |

Un `profile` puede tener varios `actor_roles` a la vez (ej. un chocolatier que también compra
grano como buyer). La moderación de listings en Fase 1 es manual (Amaury/Oscar revisan antes de
`status='published'`) — se automatiza más adelante si el volumen lo justifica, no antes.
