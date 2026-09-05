# Exportación FOB · Cacao Colab (propietario)

> Cotizador de internacionalización Fine-Flavor. Criterio operativo heredado de CAÚA Cloud;
> **Cacao Colab es el propietario** de la herramienta en `cacaocolab.org/export`.

## Qué cotiza

| Campo | Detalle |
|-------|---------|
| Incoterm ancla | **FOB Cartagena** (ex-works + inland + docs + stuffing) |
| Destinos | **USA** · **UE** · **China** · **Japón** (Asia) |
| Productos | Grano FF, nibs, licor, cobertura 70 %, cobertura 100 % |
| Moneda | USD |
| Salidas | FOB/kg, CIF estimado, landed (arancel + IVA tipificados) |

## Código

| Recurso | Ruta |
|---------|------|
| Motor de precios | `apps/web/lib/export-fob.ts` |
| UI | `apps/web/components/export/FobCotizador.tsx` |
| Página | `apps/web/app/export/page.tsx` |

## Gobernanza

- Cifras **indicativas** (tabla Fine-Flavor Q3 2026). No proforma legal.
- Proforma real → WhatsApp con lote trazable.
- EUDR / cadmio / certificados de origen se documentan en `/conocimiento`, no en el cotizador.
- Actualizar `exWorksUsdPerKg` y `oceanBaseUsd20ft` cuando cambie el mercado o el flete.

## Relación con marcas

La plataforma de nodos (`/marketplace`, `/nodo`) da **visibilidad**. El cotizador FOB da **precio de salida** hacia compradores internacionales. Juntos sostienen la internacionalización sin fingir stock.
