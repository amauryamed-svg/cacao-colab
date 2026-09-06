# Brus. · gaseosa de cacao (patrón DAYDRINK)

> Inspiración estructural de **DAYDRINK** (Coffee & Lemonade): lata blanca, dúo ilustrado, nombre `A & B`, wit.  
> No copiamos su IP (bicicleta/caras). Adaptamos el **sistema** a Benevolo + cacao colombiano.

---

## 1. Producto

| Clave | Valor |
|-------|--------|
| Línea | **Brus.** |
| Categoría | Gaseosa de cacao |
| Formato | Lata 355 ml (12 FL OZ) |
| Fondo | Blanco |
| Casa | Chocolate Benevolo · R&D Cacao Colab |

**Tagline madre**

> Como un half & half… pero con cacao en vez de té.

---

## 2. SKUs (pares)

| id | Producto en lata | Dúo ilustrado | Acento |
|----|------------------|---------------|--------|
| `limon` | **CACAO & LIMÓN** | Mazorca + limón | `#C6D600` |
| `naranja` | **CACAO & NARANJA** | Mazorca + naranja | `#F05A28` |
| `maracuya` | **CACAO & MARACUYÁ** | Mazorca + maracuyá | `#F5C518` |
| `jamaica` | **CACAO & JAMAICA** | Mazorca + flor jamaica | `#C41E6A` |

Flex: solo el par + acento. Locked: CB, Brus., lata blanca, layout.

---

## 3. Layout de lata (frente)

```
[ CB · CHOCOLATE BENEVOLO ]
[ Brus. ]          ← Bodoni italic + punto
[ ilustración dúo ]
[ CACAO & LIMÓN ]  ← display bold
[ tagline wit ]
[ 355 ml ]
```

## 4. Archivos

| Archivo | Qué |
|---------|-----|
| `brus-limon-can.svg` | Frente lata Limón |
| `brus-naranja-can.svg` | Naranja |
| `brus-maracuya-can.svg` | Maracuyá |
| `brus-jamaica-can.svg` | Jamaica |
| `brus-can-dieline.svg` | Wrap 360° V0 (frente + costados) |

Regen: `python3 brand/chocolate-benevolo/packaging/build_brus_cans.py`
