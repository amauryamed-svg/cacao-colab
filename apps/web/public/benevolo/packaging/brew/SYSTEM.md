# Brew. · gaseosa de cacao (patrón WATERLOO)

> Inspiración **estructural** de Waterloo Sparkling Water (degradado de sabor → blanco, fruta hero, nombre stacked, claims 0/0/0).  
> **No** copiamos tipografía, wordmark ni ilustraciones Waterloo. IP propia: **CB · Brew. · cacao**.

Referencia de briefing (Frambuesa · Nectarina):

```json
{
  "categoria": "SPARKLING WATER → SPARKLING CACAO",
  "sabor": "RASPBERRY NECTARINE → FRAMBUESA NECTARINA",
  "nutricion": { "calorias": 0, "azucar": 0, "sodio": 0 },
  "lata": { "degradado": "magenta → blanco", "ilustracion": "frambuesas + tajada nectarina + cue mazorca" }
}
```

---

## 1. Producto

| Clave | Valor |
|-------|--------|
| Línea | **Brew.** |
| Categoría | Sparkling cacao / gaseosa de cacao |
| Formato | Lata 355 ml (12 FL OZ) |
| Fondo | Degradado de sabor → blanco |
| Casa | Chocolate Benevolo · R&D Cacao Colab |

---

## 2. SKUs

| id | Sabor hero | Acento |
|----|------------|--------|
| `frambuesa-nectarina` | FRAMBUESA / NECTARINA | `#C41E6A` |
| `limon` | CACAO & LIMÓN | `#C6D600` |
| `naranja` | CACAO & NARANJA | `#F05A28` |
| `maracuya` | CACAO & MARACUYÁ | `#F5C518` |
| `jamaica` | CACAO & JAMAICA | `#C41E6A` |

Locked: CB, Brew., claims 0 CAL / 0 AZÚCAR / 0 SODIO, 355 ml, FEAR 5.  
Flex: par de fruta + acento del degradado.

---

## 3. Layout (frente)

```
[ CB · CHOCOLATE BENEVOLO ]
[ Brew. ]
[ SPARKLING CACAO ]
[ ilustración fruta + cue mazorca ]
[ SABOR LÍNEA 1 ]
[ SABOR LÍNEA 2 ]
[ naturally flavored · gaseosa de cacao ]
[ 0 CAL | 0 AZÚCAR | 0 SODIO ]
[ 355 ml · chocolatebenevolo.co ]
```

## 4. Regen

```bash
python3 brand/chocolate-benevolo/packaging/build_brew_cans.py
```
