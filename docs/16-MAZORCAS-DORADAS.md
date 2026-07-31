# Mazorcas Doradas · programa de fidelidad Cacao Colab

## 1. Qué es

Mazorcas Doradas (MD) es un sistema de puntos de fidelidad para reconocer aprendizaje, cuidado de labranzas, aportes comunitarios aprobados y compras verificadas. No es dinero, inversión, depósito, criptoactivo ni ingreso.

XP y MD son distintos:

- **XP:** progreso educativo y desbloqueo de contenido.
- **MD:** saldo de fidelidad sujeto a catálogo, stock, rango y términos.

## 2. Principio anti-pirámide

No existen:

- puntos por reclutar o invitar personas;
- árboles de referidos;
- comisiones sobre actividad de terceros;
- pagos por subir de rango;
- conversión de MD a efectivo.

Los rangos dependen exclusivamente de actividad propia verificable.

## 3. Fuentes de puntos

| Categoría | Ejemplo | MD | Validación |
|---|---|---|---|
| Aprendizaje | módulo de Microlearning CAÚA | 40 | slug permitido + `micro:<slug>` |
| Aprendizaje | misión Arquitecto de Fermentación | 30 | misión permitida + `campus:<curso>:<slug>` |
| Aprendizaje | curso Arquitecto completo | 120 | una sola vez por learner |
| Aprendizaje | misión Master Chocolatier | 30 | misión permitida + `campus:maestro-chocolatier:<slug>` |
| Aprendizaje | curso Master Chocolatier completo | 120 | una sola vez por learner |
| Cuidado | acción Cacao Gotchi | 5 | tope diario de 50 MD server-side |
| Cuidado | cosecha + fermentación completas | 60 | estado `complete` del run |
| Comunidad | evidencia de campo | — | moderación pendiente |
| Compra verificada | orden pagada | — | webhook de comercio futuro |

Los montos viven en `apps/web/lib/loyalty.ts` (`mazorcaRewards`) y **no** se derivan del XP: un módulo entrega 50 XP y 40 MD porque miden cosas distintas.

El ledger `mazorca_ledger` es append-only. Cada evento usa una clave idempotente para impedir doble acreditación.

## 3.1 Progreso registrado del microlearning

Al terminar un módulo, `completeMicroLesson()` guarda `campus_progress` con `course_slug = microlearning-caua` y acredita MD. Sin sesión el módulo sigue funcionando: el avance queda solo en `localStorage` y la pantalla final lo dice explícitamente en vez de prometer puntos.

Dónde se ve ese progreso:

| Superficie | Fuente | Qué declara |
|---|---|---|
| `/aprende` (`ProgressStrip`) | `campus_progress` con sesión, `localStorage` sin ella | Dice si el avance vive en la cuenta o solo en el navegador |
| `/cuenta` | `campus_progress` | Módulos guardados del microlearning |
| `/cuenta/mazorcas` | `mazorca_wallets` + `mazorca_ledger` | Saldo, rango y movimientos con su motivo |
| `/equipo` | agregados con `service_role` | MD emitidas, redimidas y canjes pendientes |

La lista de respaldo de beneficios en `apps/web/lib/loyalty.ts` es un espejo de la migración de seed: si se edita una, hay que editar la otra.

## 4. Rangos

Semilla → Brote → Labrador del cacao → Guardián de origen → Maestro Fine-Flavor → Legado Cacaotier.

El rango reconoce continuidad, no superioridad social. No otorga participación societaria ni derechos sobre marcas o territorios.

## 5. Canjes

Un beneficio solo se puede redimir cuando:

1. `benefit_catalog_items.status = active`;
2. existe stock o capacidad;
3. el conector/fulfillment está probado;
4. el usuario cumple saldo, rango y límite;
5. se muestran vigencia y términos.

Las tarjetas “planeadas” no son ofertas exigibles ni promesas de descuento.

## 6. Ecommerce de marcas

`@cacao-colab/commerce-connectors` define adaptadores para Colab nativo, cupones manuales, Shopify, WooCommerce y webhooks. Todos comienzan inactivos. Activar una marca requiere:

- acuerdo escrito;
- credenciales guardadas fuera del repositorio;
- reglas de inventario y reversos;
- pruebas de emisión y redención;
- soporte de devoluciones.

Dualita puede explicar y redirigir, pero no emitir puntos, redimir ni cerrar compras.

## 7. Cacao Gotchi y labranzas

El minijuego usa “labranza” para representar continuidad familiar y comunitaria. Registra biodiversidad, reserva de agua, polinizadores, cobertura de suelo, sistema de siembra y generación. Sigue siendo una simulación pedagógica, no una predicción agronómica.

## 8. Privacidad y antifraude

- mínima PII en metadata;
- `service_role` para créditos y débitos;
- topes diarios y cooldowns;
- reversos por devolución;
- contribuciones comunitarias moderadas;
- compras acreditadas únicamente al confirmarse pago;
- leaderboard futuro excluye compras para evitar pay-to-win.

## 9. Estado operativo

Migraciones requeridas en el proyecto Supabase:

1. `20260729213014_mazorcas_doradas_loyalty.sql` — wallets, ledger, rangos, catálogo, redenciones y adaptadores.
2. `20260730170013_benefit_catalog_seed.sql` — seis beneficios en estado `planned` y adaptadores `inactive` por marca.

`/marketplace/beneficios` lee el catálogo real cuando existe: muestra estado, conector y términos tal como están en la base. Si la migración no está aplicada, la página lo declara y usa la lista en código. El botón de canje solo se habilita cuando el ítem está `active` **y** su conector está `active`; hoy ninguna marca cumple ambas condiciones.
