# Exportación FOB · App Cacao Colab

> **App completa** de cotización internacional. Propietario: Cacao Colab (`/export`).
> Criterio operativo heredado de CAÚA Cloud.

## Rutas de la app

| Tab | Función |
|-----|---------|
| **Cotizar** | Producto × destino × kg → FOB / CIF / Landed + proforma WA |
| **Comparar mercados** | Misma SKU/cantidad en USA · UE · China · Japón |
| **Guía export** | Lote, Incoterm, cumplimiento, tienda Shopify |
| Presets | Sample USA · Pallet UE · FCL China · FCL Japón |

Acciones: pedir proforma WhatsApp · copiar cotización · imprimir/PDF.

## Código

| Recurso | Ruta |
|---------|------|
| Motor | `apps/web/lib/export-fob.ts` |
| UI app | `apps/web/components/export/FobCotizador.tsx` |
| Página | `apps/web/app/export/page.tsx` |

## Gobernanza

- Cifras **indicativas** Fine-Flavor. No proforma legal.
- Tienda digital: `cacao-colab.myshopify.com` (`/shop`).
