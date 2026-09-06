# Bons. · familia de sabores (inspiración Deit)

Patrón de empaque multi-SKU tomado de bolsas tipo **Deit** (bolitas de dátil):

1. **Categoría fija** en todas las variantes (*Bombón grande de chocolate*).
2. **Nombre de sabor** corto y memorable (flex).
3. **Ingredientes principales** listados (2–4), legibles a 1 metro.
4. Misma estructura de bolsa/caja — solo cambia el sabor + ingredientes.

> No copiamos la marca Deit. Solo el sistema: familia + variantes + ingredientes.

## Arquitectura verbal (como Deit)

| Deit | Benevolo Bons. |
|------|----------------|
| Bolitas de dátil con X y Y | Bombón grande con X, Y y Z |
| Lista de ingredientes principales | Capas del relleno |
| Misma bolsa, otro sabor | Mismo L0/L2, otro SKU |

## SKUs Bons.

```json
{
  "marca": "Chocolate Benevolo",
  "linea": "Bons.",
  "descripcion_general": "Bombones grandes de chocolate · molde mazorca",
  "sabores": [
    {
      "id": "caramelo",
      "nombre": "Caramelo",
      "nombre_largo": "Bons. con caramelo, malvavisco y galleta",
      "ingredientes_principales": ["Caramelo", "Malvavisco", "Galleta"]
    },
    {
      "id": "dubai",
      "nombre": "Dubai",
      "nombre_largo": "Bons. con pistacho, crocante y mantequilla",
      "ingredientes_principales": ["Pistacho", "Crocante", "Mantequilla"]
    },
    {
      "id": "tiramisu",
      "nombre": "Tiramisú",
      "nombre_largo": "Bons. con soletilla, café y cacao",
      "ingredientes_principales": ["Bizcocho soletilla", "Café", "Crema", "Cacao en polvo"]
    }
  ]
}
```

## Reglas de diseño en empaque

- Locked: CB · Chocolate Benevolo · `Bons.` · swirls/mazorca Bars. · URL
- Flex por SKU: **nombre** + **lista de ingredientes** (una variable perceptual)
- Frente: categoría → wordmark → sabor → ingredientes (stack)
- Dorso: Contiene + legal Zurych (como Bars. PDF)
- No inventar claims (orgánico, sin azúcar) si no están verificados

Archivos: `bons/bons-{caramelo|dubai|tiramisu}-*.jpg`  
Regen: `python3 brand/chocolate-benevolo/packaging/build_faithful.py`
