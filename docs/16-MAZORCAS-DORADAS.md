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

| Categoría | Ejemplo | Validación |
|---|---|---|
| Aprendizaje | misión Master Cacaotier | misión permitida + idempotencia |
| Cuidado | acción Cacao Gotchi | tope diario server-side |
| Comunidad | evidencia de campo | moderación pendiente |
| Compra verificada | orden pagada | webhook de comercio futuro |

El ledger `mazorca_ledger` es append-only. Cada evento usa una clave idempotente para impedir doble acreditación.

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

La migración `20260729213014_mazorcas_doradas_loyalty.sql` debe aplicarse. Ningún ecommerce está conectado todavía. El catálogo web muestra esta condición explícitamente y bloquea la redención de beneficios planeados.
