#!/usr/bin/env python3
"""Brew. · gaseosa de cacao — patrón WATERLOO (sistema, no copia).

Referencia estructural (Waterloo Sparkling Water):
- degradado de sabor → blanco
- ilustración de fruta (dúo)
- nombre de sabor hero
- claims nutricionales 0 / 0 / 0
- categoría sparkling + pack 355 ml

IP propia: CB · Brew. · cacao colombiano · fruta local. No tipografía ni arte Waterloo.
"""

from __future__ import annotations

import html
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PUBLIC = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/packaging"
OUT = ROOT / "brew"

ORANGE = "#F05A28"
NAVY = "#15243F"
CREAM = "#F7F1EE"
SHADOW = "#C43A18"
WHITE = "#FFFFFF"
COCOA = "#3D2314"

# Waterloo-style SKUs: flavor gradient + fruit duo + 0/0/0
SKUS = [
    {
        "id": "frambuesa-nectarina",
        "flavor_line1": "FRAMBUESA",
        "flavor_line2": "NECTARINA",
        "pair_label": "CACAO · FRAMBUESA NECTARINA",
        "accent": "#C41E6A",
        "accent_mid": "#E85A9A",
        "accent_light": "#F7D0E2",
        "accent_dark": "#7A1242",
        "nectarine": "#F5A24B",
        "nectarine_flesh": "#FFD4A8",
        "tagline": "Naturally flavored sparkling cacao.",
        "fruit": "raspberry_nectarine",
    },
    {
        "id": "limon",
        "flavor_line1": "CACAO",
        "flavor_line2": "& LIMÓN",
        "pair_label": "CACAO & LIMÓN",
        "accent": "#C6D600",
        "accent_mid": "#DCE84A",
        "accent_light": "#F2F7B8",
        "accent_dark": "#7A8A00",
        "nectarine": "#C6D600",
        "nectarine_flesh": "#F2F7B8",
        "tagline": "Cítrico efervescente con alma de mazorca.",
        "fruit": "lemon",
    },
    {
        "id": "naranja",
        "flavor_line1": "CACAO",
        "flavor_line2": "& NARANJA",
        "pair_label": "CACAO & NARANJA",
        "accent": "#F05A28",
        "accent_mid": "#FF8A55",
        "accent_light": "#FFD4C2",
        "accent_dark": "#B33A12",
        "nectarine": "#F05A28",
        "nectarine_flesh": "#FFD4C2",
        "tagline": "Burbujas de oficio · cítrico colombiano.",
        "fruit": "orange",
    },
    {
        "id": "maracuya",
        "flavor_line1": "CACAO",
        "flavor_line2": "& MARACUYÁ",
        "pair_label": "CACAO & MARACUYÁ",
        "accent": "#F5C518",
        "accent_mid": "#FFE066",
        "accent_light": "#FFF3B0",
        "accent_dark": "#B89000",
        "nectarine": "#F5C518",
        "nectarine_flesh": "#FFF3B0",
        "tagline": "Ácido, efervescente, con punta de cacao.",
        "fruit": "passion",
    },
    {
        "id": "jamaica",
        "flavor_line1": "CACAO",
        "flavor_line2": "& JAMAICA",
        "pair_label": "CACAO & JAMAICA",
        "accent": "#C41E6A",
        "accent_mid": "#E85A9A",
        "accent_light": "#F7D0E2",
        "accent_dark": "#7A1242",
        "nectarine": "#C41E6A",
        "nectarine_flesh": "#F7D0E2",
        "tagline": "Flor, cacao y gas — refresco de oficio.",
        "fruit": "jamaica",
    },
]


def fruit_art(sku: dict) -> str:
    """Flat fruit/cacao illustration — Waterloo spirit (produce hero), Benevolo IP."""
    fruit = sku["fruit"]
    a, am, ad = sku["accent"], sku["accent_mid"], sku["accent_dark"]
    nect, flesh = sku["nectarine"], sku["nectarine_flesh"]

    if fruit == "raspberry_nectarine":
        return f'''
    <g id="FRUIT" transform="translate(90,320)">
      <!-- nectarine wedge -->
      <path d="M320 180 A120 120 0 0 1 180 40 L250 180 Z" fill="{nect}"/>
      <path d="M320 180 A120 120 0 0 1 180 40 L250 180 Z" fill="{flesh}" opacity="0.45"/>
      <path d="M250 180 L320 180" stroke="{ad}" stroke-width="3"/>
      <ellipse cx="285" cy="110" rx="18" ry="8" fill="{WHITE}" opacity="0.35"/>
      <!-- raspberries cluster -->
      <g transform="translate(40,40)">
        <circle cx="70" cy="90" r="38" fill="{a}"/>
        <circle cx="48" cy="78" r="14" fill="{am}"/>
        <circle cx="78" cy="70" r="14" fill="{am}"/>
        <circle cx="96" cy="92" r="14" fill="{ad}" opacity="0.55"/>
        <circle cx="58" cy="104" r="13" fill="{ad}" opacity="0.45"/>
        <circle cx="82" cy="108" r="12" fill="{am}"/>
        <path d="M70 52 Q78 40 88 48" fill="{ad}"/>
      </g>
      <g transform="translate(20,150)">
        <circle cx="60" cy="70" r="32" fill="{a}"/>
        <circle cx="44" cy="60" r="11" fill="{am}"/>
        <circle cx="70" cy="54" r="11" fill="{am}"/>
        <circle cx="80" cy="74" r="11" fill="{ad}" opacity="0.5"/>
        <circle cx="52" cy="82" r="10" fill="{am}"/>
      </g>
      <!-- tiny cacao pod cue -->
      <ellipse cx="420" cy="220" rx="28" ry="40" fill="{ORANGE}"/>
      <path d="M406 200 Q420 194 434 200" fill="none" stroke="{COCOA}" stroke-width="2"/>
      <path d="M404 220 Q420 214 436 220" fill="none" stroke="{COCOA}" stroke-width="1.6"/>
      <path d="M406 240 Q420 234 434 240" fill="none" stroke="{COCOA}" stroke-width="1.6"/>
    </g>'''

    if fruit == "lemon":
        return f'''
    <g id="FRUIT" transform="translate(140,340)">
      <ellipse cx="220" cy="160" rx="110" ry="130" fill="{a}"/>
      <ellipse cx="220" cy="160" rx="90" ry="108" fill="{am}" opacity="0.35"/>
      <path d="M220 40 C250 70 255 100 245 120" fill="none" stroke="{ad}" stroke-width="6"/>
      <ellipse cx="160" cy="200" rx="70" ry="90" fill="{a}" opacity="0.9"/>
      <ellipse cx="380" cy="210" rx="26" ry="38" fill="{ORANGE}"/>
      <path d="M368 192 Q380 186 392 192" fill="none" stroke="{COCOA}" stroke-width="2"/>
    </g>'''

    if fruit == "orange":
        return f'''
    <g id="FRUIT" transform="translate(120,330)">
      <circle cx="240" cy="170" r="120" fill="{a}"/>
      <circle cx="240" cy="170" r="95" fill="{am}" opacity="0.25"/>
      <path d="M240 50 L240 290 M120 170 L360 170" stroke="{ad}" stroke-width="2" opacity="0.35"/>
      <path d="M155 95 L325 245 M325 95 L155 245" stroke="{ad}" stroke-width="2" opacity="0.25"/>
      <ellipse cx="400" cy="230" rx="26" ry="38" fill="{ORANGE}"/>
      <path d="M388 212 Q400 206 412 212" fill="none" stroke="{COCOA}" stroke-width="2"/>
    </g>'''

    if fruit == "passion":
        return f'''
    <g id="FRUIT" transform="translate(150,340)">
      <ellipse cx="220" cy="170" rx="100" ry="120" fill="{a}"/>
      <ellipse cx="220" cy="185" rx="55" ry="60" fill="{ad}"/>
      <circle cx="200" cy="175" r="6" fill="{flesh}"/>
      <circle cx="230" cy="190" r="5" fill="{flesh}"/>
      <circle cx="245" cy="170" r="5" fill="{flesh}"/>
      <ellipse cx="380" cy="220" rx="26" ry="38" fill="{ORANGE}"/>
      <path d="M368 202 Q380 196 392 202" fill="none" stroke="{COCOA}" stroke-width="2"/>
    </g>'''

    # jamaica
    return f'''
    <g id="FRUIT" transform="translate(160,320)">
      <g transform="translate(200,160)">
        <circle r="18" fill="{ad}"/>
        <ellipse cx="0" cy="-48" rx="18" ry="42" fill="{a}"/>
        <ellipse cx="42" cy="-18" rx="18" ry="42" fill="{am}" transform="rotate(60)"/>
        <ellipse cx="42" cy="30" rx="18" ry="42" fill="{a}" transform="rotate(120)"/>
        <ellipse cx="0" cy="48" rx="18" ry="42" fill="{am}" transform="rotate(180)"/>
        <ellipse cx="-42" cy="30" rx="18" ry="42" fill="{a}" transform="rotate(240)"/>
        <ellipse cx="-42" cy="-18" rx="18" ry="42" fill="{am}" transform="rotate(300)"/>
      </g>
      <ellipse cx="380" cy="240" rx="26" ry="38" fill="{ORANGE}"/>
      <path d="M368 222 Q380 216 392 222" fill="none" stroke="{COCOA}" stroke-width="2"/>
    </g>'''


def nutrition_strip() -> str:
    """0 / 0 / 0 callouts — Waterloo layout language."""
    cells = [
        ("0", "CAL"),
        ("0", "AZÚCAR"),
        ("0", "SODIO"),
    ]
    parts = []
    x0 = 95
    for i, (n, lab) in enumerate(cells):
        x = x0 + i * 170
        parts.append(
            f'''
      <g transform="translate({x},980)">
        <rect width="150" height="90" rx="16" fill="{WHITE}" fill-opacity="0.92" stroke="{NAVY}" stroke-width="2"/>
        <text x="75" y="42" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="36" font-weight="900" fill="{NAVY}">{n}</text>
        <text x="75" y="70" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="{NAVY}" letter-spacing="2">{lab}</text>
      </g>'''
        )
    return "\n".join(parts)


def can_front(sku: dict) -> str:
    w, h = 700, 1200
    a, am, al = sku["accent"], sku["accent_mid"], sku["accent_light"]
    f1, f2 = html.escape(sku["flavor_line1"]), html.escape(sku["flavor_line2"])
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="70mm" height="120mm" viewBox="0 0 {w} {h}"
  role="img" aria-label="Brew. {html.escape(sku['pair_label'])}">
  <title>Brew. · {html.escape(sku["pair_label"])}</title>
  <desc>Gaseosa de cacao Benevolo · patrón Waterloo (degradado + fruta + 0/0/0). Sistema propio, no copia IP.</desc>
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{a}"/>
      <stop offset="42%" stop-color="{am}"/>
      <stop offset="72%" stop-color="{al}"/>
      <stop offset="100%" stop-color="{WHITE}"/>
    </linearGradient>
  </defs>

  <g id="ARTWORK">
    <rect width="{w}" height="{h}" fill="url(#wash)"/>

    <!-- CB lockup -->
    <g id="LOCKUP_CB" transform="translate(36,32)">
      <circle cx="20" cy="20" r="18" fill="none" stroke="{WHITE}" stroke-width="2.4"/>
      <text x="20" y="26" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="700" fill="{WHITE}">CB</text>
      <text x="48" y="16" font-family="Georgia, serif" font-size="13" font-weight="700" fill="{WHITE}" letter-spacing="1.2">CHOCOLATE</text>
      <text x="48" y="34" font-family="Georgia, serif" font-size="13" font-weight="700" fill="{CREAM}" letter-spacing="1.2">BENEVOLO</text>
    </g>

    <!-- Wordmark Brew. -->
    <g id="WORDMARK">
      <text x="40" y="130" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="78" font-style="italic" font-weight="900" fill="{SHADOW}" opacity="0.55">Brew.</text>
      <text x="36" y="126" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="78" font-style="italic" font-weight="900" fill="{WHITE}">Brew.</text>
    </g>
    <text x="40" y="162" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="15" fill="{WHITE}" letter-spacing="3">SPARKLING CACAO</text>

{fruit_art(sku)}

    <!-- Flavor hero (Waterloo stacked name) -->
    <text x="40" y="760" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="58" font-weight="900" fill="{NAVY}" letter-spacing="1">{f1}</text>
    <text x="40" y="820" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="58" font-weight="900" fill="{NAVY}" letter-spacing="1">{f2}</text>
    <text x="40" y="860" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="16" fill="{NAVY}" opacity="0.7" letter-spacing="1">NATURALLY FLAVORED · GASEOSA DE CACAO</text>
    <text x="40" y="890" font-family="Georgia, serif" font-size="18" font-style="italic" fill="{NAVY}">{html.escape(sku["tagline"])}</text>

{nutrition_strip()}

    <text x="350" y="1125" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="{NAVY}">355 ml · 12 FL OZ</text>
    <text x="350" y="1155" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="14" fill="{ORANGE}">chocolatebenevolo.co · FEAR 5</text>
  </g>

  <g id="DIELINE_CUT" fill="none" stroke="#FF00FF" stroke-width="1.5" opacity="0.45">
    <rect x="4" y="4" width="{w-8}" height="{h-8}" rx="40"/>
  </g>
</svg>
'''


def write_both(rel: Path, content: str):
    dest = OUT / rel
    pub = PUBLIC / "brew" / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    pub.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    pub.write_text(content, encoding="utf-8")
    print("wrote", rel)


def main():
    # drop old DAYDRINK-only files that we replace
    for old in OUT.glob("brew-*-can.svg"):
        old.unlink(missing_ok=True)
    for old in (PUBLIC / "brew").glob("brew-*-can.svg"):
        old.unlink(missing_ok=True)

    for sku in SKUS:
        write_both(Path(f"brew-{sku['id']}-can.svg"), can_front(sku))

    system = """# Brew. · gaseosa de cacao (patrón WATERLOO)

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
"""
    (OUT / "SYSTEM.md").write_text(system, encoding="utf-8")
    (PUBLIC / "brew" / "SYSTEM.md").write_text(system, encoding="utf-8")

    rows = "\n".join(
        f"| {s['pair_label']} | `brew-{s['id']}-can.svg` |" for s in SKUS
    )
    readme = f"""# Brew. · gaseosa de cacao

Patrón **Waterloo** (degradado · fruta · 0/0/0) · marca Chocolate Benevolo.

Ver `SYSTEM.md`.

| SKU | Archivo |
|-----|---------|
{rows}

```bash
python3 brand/chocolate-benevolo/packaging/build_brew_cans.py
```
"""
    (OUT / "README.md").write_text(readme, encoding="utf-8")
    (PUBLIC / "brew" / "README.md").write_text(readme, encoding="utf-8")

    # stash reference brief
    ref = OUT / "references"
    ref.mkdir(exist_ok=True)
    (ref / "waterloo-raspberry-nectarine.brief.json").write_text(
        """{
  "marca": "WATERLOO",
  "categoria": "SPARKLING WATER",
  "sabor": "RASPBERRY NECTARINE",
  "detalles_sabor": "NATURALLY FLAVORED WITH OTHER NATURAL FLAVORS",
  "informacion_nutricional_destacada": { "calorias": 0, "azucar": 0, "sodio": 0 },
  "empaque": {
    "caja": {
      "cantidad": "8 CANS",
      "volumen_total": "8-12 FL OZ CANS (96 FL OZ) / 8-355 ML CANS",
      "certificaciones": ["NON GMO Project VERIFIED"]
    },
    "lata": {
      "tipo": "Lata de aluminio",
      "color_dominante": "Magenta / Magenta degradado a blanco",
      "ilustracion": "Frambuesas y una tajada de nectarina"
    }
  },
  "uso_benevolo": "Referencia estructural para Brew. · no copiar IP Waterloo"
}
""",
        encoding="utf-8",
    )
    print("done")


if __name__ == "__main__":
    main()
