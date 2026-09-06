#!/usr/bin/env python3
"""Brus. · latas gaseosa de cacao (patrón DAYDRINK: blanco + dúo + CACAO & X)."""

from __future__ import annotations

import html
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PUBLIC = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/packaging"
OUT = ROOT / "brus"

ORANGE = "#F05A28"
NAVY = "#15243F"
CREAM = "#F7F1EE"
CHAMP = "#E8C9A0"
SHADOW = "#C43A18"
WHITE = "#FFFFFF"
COCOA = "#3D2314"

SKUS = [
    {
        "id": "limon",
        "pair": "LIMÓN",
        "accent": "#C6D600",
        "accent_dark": "#7A8A00",
        "tagline": "Como un half &amp; half... pero con cacao en vez de té.",
        "partner": "lemon",
    },
    {
        "id": "naranja",
        "pair": "NARANJA",
        "accent": "#F05A28",
        "accent_dark": "#B33A12",
        "tagline": "Burbujas de oficio · cacao & cítrico colombiano.",
        "partner": "orange",
    },
    {
        "id": "maracuya",
        "pair": "MARACUYÁ",
        "accent": "#F5C518",
        "accent_dark": "#B89000",
        "tagline": "Acido, efervescente, con alma de mazorca.",
        "partner": "passion",
    },
    {
        "id": "jamaica",
        "pair": "JAMAICA",
        "accent": "#C41E6A",
        "accent_dark": "#7A1242",
        "tagline": "Flor, cacao y gas - refresco de oficio.",
        "partner": "jamaica",
    },
]


def duo_illustration(partner: str, accent: str, accent_dark: str) -> str:
    """Flat duo: cacao-pod head + flavor head on a tandem scooter (DAYDRINK spirit, own IP)."""
    # Partner head shapes
    if partner == "lemon":
        partner_head = f'''
      <ellipse cx="132" cy="78" rx="22" ry="28" fill="{accent}"/>
      <ellipse cx="132" cy="78" rx="16" ry="22" fill="{accent_dark}" opacity="0.25"/>
      <path d="M132 48 C138 52 140 58 138 62" fill="none" stroke="{accent_dark}" stroke-width="3"/>
      <circle cx="126" cy="74" r="2.2" fill="{NAVY}"/>
      <circle cx="138" cy="74" r="2.2" fill="{NAVY}"/>
      <path d="M126 86 Q132 90 138 86" fill="none" stroke="{NAVY}" stroke-width="2"/>
'''
    elif partner == "orange":
        partner_head = f'''
      <circle cx="132" cy="78" r="24" fill="{accent}"/>
      <circle cx="132" cy="78" r="18" fill="{accent_dark}" opacity="0.2"/>
      <circle cx="126" cy="74" r="2.2" fill="{NAVY}"/>
      <circle cx="138" cy="74" r="2.2" fill="{NAVY}"/>
      <path d="M126 86 Q132 91 138 86" fill="none" stroke="{NAVY}" stroke-width="2"/>
'''
    elif partner == "passion":
        partner_head = f'''
      <ellipse cx="132" cy="78" rx="20" ry="26" fill="{accent}"/>
      <ellipse cx="132" cy="82" rx="10" ry="12" fill="{accent_dark}"/>
      <circle cx="126" cy="72" r="2.2" fill="{NAVY}"/>
      <circle cx="138" cy="72" r="2.2" fill="{NAVY}"/>
      <path d="M126 88 Q132 92 138 88" fill="none" stroke="{NAVY}" stroke-width="2"/>
'''
    else:  # jamaica flower-ish
        partner_head = f'''
      <g transform="translate(132,78)">
        <circle r="8" fill="{accent_dark}"/>
        <ellipse cx="0" cy="-16" rx="7" ry="14" fill="{accent}"/>
        <ellipse cx="14" cy="-6" rx="7" ry="14" fill="{accent}" transform="rotate(60)"/>
        <ellipse cx="14" cy="10" rx="7" ry="14" fill="{accent}" transform="rotate(120)"/>
        <ellipse cx="0" cy="16" rx="7" ry="14" fill="{accent}" transform="rotate(180)"/>
        <ellipse cx="-14" cy="10" rx="7" ry="14" fill="{accent}" transform="rotate(240)"/>
        <ellipse cx="-14" cy="-6" rx="7" ry="14" fill="{accent}" transform="rotate(300)"/>
      </g>
      <circle cx="126" cy="74" r="2" fill="{NAVY}"/>
      <circle cx="138" cy="74" r="2" fill="{NAVY}"/>
      <path d="M126 88 Q132 92 138 88" fill="none" stroke="{NAVY}" stroke-width="2"/>
'''

    return f'''  <g id="DUO" transform="translate(20,95)">
    <!-- scooter / tandem frame -->
    <g id="VEHICLE" fill="none" stroke="{NAVY}" stroke-width="3.2" stroke-linecap="round">
      <circle cx="48" cy="168" r="18"/>
      <circle cx="148" cy="168" r="18"/>
      <path d="M48 168 L78 120 L120 120 L148 168"/>
      <path d="M78 120 L78 100"/>
      <path d="M120 120 L120 100"/>
      <path d="M70 100 H130"/>
    </g>
    <!-- front rider: cacao pod head -->
    <g id="CACAO_RIDER">
      <path d="M78 100 L70 128 L86 128 Z" fill="{ORANGE}"/>
      <ellipse cx="78" cy="72" rx="20" ry="28" fill="{ORANGE}"/>
      <path d="M66 58 Q78 52 90 58" fill="none" stroke="{COCOA}" stroke-width="2"/>
      <path d="M64 72 Q78 68 92 72" fill="none" stroke="{COCOA}" stroke-width="1.6"/>
      <path d="M64 86 Q78 82 92 86" fill="none" stroke="{COCOA}" stroke-width="1.6"/>
      <circle cx="72" cy="70" r="2.2" fill="{NAVY}"/>
      <circle cx="84" cy="70" r="2.2" fill="{NAVY}"/>
      <path d="M72 82 Q78 86 84 82" fill="none" stroke="{NAVY}" stroke-width="2"/>
      <rect x="70" y="98" width="16" height="28" rx="4" fill="{NAVY}"/>
    </g>
    <!-- rear rider: flavor head -->
    <g id="FLAVOR_RIDER">
      <path d="M120 100 L112 128 L128 128 Z" fill="{accent}"/>
      <rect x="112" y="98" width="16" height="28" rx="4" fill="{NAVY}"/>
{partner_head}
    </g>
  </g>
'''


def can_front(sku: dict) -> str:
    w, h = 70, 120  # mm face of 355ml can approx
    pair = sku["pair"]
    accent = sku["accent"]
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}mm" height="{h}mm" viewBox="0 0 {w*10} {h*10}"
  role="img" aria-label="Brus. CACAO &amp; {pair}">
  <title>Brus. · CACAO &amp; {pair}</title>
  <desc>Gaseosa de cacao Benevolo · lata blanca patrón DAYDRINK (sistema, no copia).</desc>

  <g id="ARTWORK">
    <rect width="{w*10}" height="{h*10}" fill="{WHITE}"/>
    <!-- soft top wash -->
    <rect width="{w*10}" height="80" fill="{CREAM}"/>

    <!-- CB lockup -->
    <g id="LOCKUP_CB" transform="translate(40,36)">
      <circle cx="22" cy="22" r="20" fill="none" stroke="{NAVY}" stroke-width="2.5"/>
      <text x="22" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="18" font-weight="700" fill="{NAVY}">CB</text>
      <text x="52" y="18" font-family="Georgia, serif" font-size="14" font-weight="700" fill="{NAVY}" letter-spacing="1.2">CHOCOLATE</text>
      <text x="52" y="36" font-family="Georgia, serif" font-size="14" font-weight="700" fill="{ORANGE}" letter-spacing="1.2">BENEVOLO</text>
    </g>

    <!-- Wordmark Brus. -->
    <g id="WORDMARK">
      <text x="44" y="148" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="72" font-style="italic" font-weight="900" fill="{SHADOW}">Brus.</text>
      <text x="40" y="144" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="72" font-style="italic" font-weight="900" fill="{NAVY}">Brus.</text>
    </g>
    <text x="44" y="178" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="16" fill="{ORANGE}" letter-spacing="2">GASEOSA DE CACAO</text>

{duo_illustration(sku["partner"], accent, sku["accent_dark"]).replace('transform="translate(20,95)"', 'transform="translate(20,185)"')}

    <!-- Product pair name -->
    <text x="350" y="780" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="48" font-weight="800" fill="{NAVY}" letter-spacing="2">CACAO &amp; {pair}</text>
    <rect x="200" y="800" width="300" height="8" rx="4" fill="{accent}"/>

    <text x="350" y="860" text-anchor="middle" font-family="Georgia, serif" font-size="18" font-style="italic" fill="{NAVY}">{html.escape(sku["tagline"])}</text>

    <text x="350" y="1080" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="{NAVY}">355 ml · 12 FL OZ</text>
    <text x="350" y="1120" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="16" fill="{ORANGE}">chocolatebenevolo.co</text>
  </g>

  <g id="DIELINE_CUT" fill="none" stroke="#FF00FF" stroke-width="1.5" opacity="0.5">
    <rect x="4" y="4" width="{w*10-8}" height="{h*10-8}" rx="40"/>
  </g>
</svg>
'''


def write_both(rel: Path, content: str):
    dest = OUT / rel
    pub = PUBLIC / "brus" / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    pub.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    pub.write_text(content, encoding="utf-8")
    print("wrote", rel)


def main():
    for sku in SKUS:
        write_both(Path(f"brus-{sku['id']}-can.svg"), can_front(sku))

    readme = """# Brus. · gaseosa de cacao

Patrón DAYDRINK (lata blanca · dúo · `CACAO & X`) · marca Chocolate Benevolo.

Ver `SYSTEM.md`.

| SKU | Archivo |
|-----|---------|
| Limón | `brus-limon-can.svg` |
| Naranja | `brus-naranja-can.svg` |
| Maracuyá | `brus-maracuya-can.svg` |
| Jamaica | `brus-jamaica-can.svg` |

```bash
python3 brand/chocolate-benevolo/packaging/build_brus_cans.py
```
"""
    (OUT / "README.md").write_text(readme, encoding="utf-8")
    (PUBLIC / "brus" / "README.md").write_text(readme, encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
