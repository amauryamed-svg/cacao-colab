#!/usr/bin/env python3
"""Brew. · gaseosa de cacao — patrón WATERLOO (sistema, no copia).

Referencia estructural (Waterloo Sparkling Water):
- degradado de sabor → blanco
- ilustración de fruta (dúo) con oficio
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
LEAF = "#3D7A2C"
LEAF2 = "#4E8C38"
STEM = "#154010"

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


def cacao_pod(cx: float, cy: float, scale: float = 1.0) -> str:
    return f"""
      <g transform="translate({cx},{cy}) scale({scale})">
        <ellipse cx="0" cy="8" rx="34" ry="48" fill="{ORANGE}"/>
        <ellipse cx="-10" cy="0" rx="14" ry="34" fill="#FF8A55" opacity="0.35"/>
        <path d="M0 -38 Q-28 -10 -30 10 Q-28 34 0 52" fill="none" stroke="{COCOA}" stroke-width="2.2" opacity="0.75"/>
        <path d="M0 -38 Q-14 -8 -14 12 Q-12 36 0 52" fill="none" stroke="{COCOA}" stroke-width="1.6" opacity="0.55"/>
        <path d="M0 -38 Q14 -8 14 12 Q12 36 0 52" fill="none" stroke="{COCOA}" stroke-width="1.6" opacity="0.55"/>
        <path d="M0 -38 Q28 -10 30 10 Q28 34 0 52" fill="none" stroke="{COCOA}" stroke-width="2.2" opacity="0.75"/>
        <rect x="-5" y="-52" width="10" height="16" rx="4" fill="{STEM}"/>
        <path d="M0 -48 Q22 -62 28 -48 Q14 -40 0 -48 Z" fill="{LEAF}"/>
        <path d="M0 -48 Q-20 -64 -26 -50 Q-12 -40 0 -48 Z" fill="{LEAF2}"/>
        <ellipse cx="-12" cy="-8" rx="8" ry="5" fill="{WHITE}" opacity="0.28"/>
      </g>"""


def leaf(cx: float, cy: float, rot: float = -30, scale: float = 1.0) -> str:
    return f"""
      <g transform="translate({cx},{cy}) rotate({rot}) scale({scale})">
        <path d="M0 0 Q28 -18 52 0 Q28 20 0 0 Z" fill="{LEAF}"/>
        <path d="M0 0 Q28 -10 48 0" fill="none" stroke="#1E5014" stroke-width="1.5"/>
        <path d="M12 -4 Q22 -12 30 -2" fill="none" stroke="#5FAF44" stroke-width="1" opacity="0.7"/>
      </g>"""


def raspberry(cx: float, cy: float, r: float, a: str, am: str, ad: str) -> str:
    spots = [
        (0, -0.55), (0.48, -0.28), (-0.48, -0.28),
        (0.48, 0.28), (-0.48, 0.28), (0, 0.55),
        (0, 0), (0.78, 0), (-0.78, 0),
        (0.28, -0.78), (-0.28, -0.78), (0.28, 0.78), (-0.28, 0.78),
        (0.65, -0.55), (-0.65, -0.55), (0.65, 0.55), (-0.65, 0.55),
    ]
    beads = []
    for i, (dx, dy) in enumerate(spots):
        fill = am if i % 3 == 0 else (ad if i % 2 == 0 else a)
        rr = r * (0.26 if i else 0.3)
        bx = cx + dx * r
        by = cy + dy * r
        beads.append(f'<circle cx="{bx}" cy="{by}" r="{rr}" fill="{fill}"/>')
        beads.append(
            f'<circle cx="{bx - rr * 0.25}" cy="{by - rr * 0.3}" r="{rr * 0.28}" fill="{WHITE}" opacity="0.32"/>'
        )
    return f"""
      <g>
        <circle cx="{cx}" cy="{cy}" r="{r * 0.9}" fill="{a}"/>
        {''.join(beads)}
        <path d="M{cx - r * 0.15} {cy - r * 0.95} Q{cx} {cy - r * 1.32} {cx + r * 0.35} {cy - r * 1.02}" fill="{ad}"/>
        <path d="M{cx} {cy - r * 1.02} Q{cx + r * 0.55} {cy - r * 1.38} {cx + r * 0.72} {cy - r * 1.02} Q{cx + r * 0.35} {cy - r * 0.92} {cx} {cy - r * 1.02} Z" fill="{LEAF}"/>
        <path d="M{cx} {cy - r * 1.02} Q{cx - r * 0.5} {cy - r * 1.32} {cx - r * 0.58} {cy - r * 0.98} Q{cx - r * 0.2} {cy - r * 0.92} {cx} {cy - r * 1.02} Z" fill="{LEAF2}"/>
      </g>"""


def nectarine_wedge(cx: float, cy: float, nect: str, flesh: str, ad: str) -> str:
    return f"""
      <g transform="translate({cx},{cy})">
        <path d="M0 0 A135 135 0 0 1 -155 -155 L-22 -22 Z" fill="{nect}"/>
        <path d="M-10 -10 A105 105 0 0 1 -132 -132 L-22 -22 Z" fill="{flesh}"/>
        <ellipse cx="-30" cy="-30" rx="24" ry="30" fill="#C47A3A" opacity="0.55" transform="rotate(-40 -30 -30)"/>
        <ellipse cx="-30" cy="-30" rx="14" ry="18" fill="#8A4A18" opacity="0.72" transform="rotate(-40 -30 -30)"/>
        <path d="M-75 -95 Q-52 -72 -42 -48" fill="none" stroke="{WHITE}" stroke-width="7" stroke-linecap="round" opacity="0.42"/>
        <path d="M-115 -62 Q-92 -42 -72 -30" fill="none" stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round" opacity="0.28"/>
        <path d="M0 0 L-22 -22" stroke="{ad}" stroke-width="2.5" opacity="0.4"/>
      </g>"""


def fruit_art(sku: dict) -> str:
    fruit = sku["fruit"]
    a, am, ad = sku["accent"], sku["accent_mid"], sku["accent_dark"]
    nect, flesh = sku["nectarine"], sku["nectarine_flesh"]

    if fruit == "raspberry_nectarine":
        return f"""
    <g id="FRUIT" transform="translate(55,270)">
      {leaf(420, 70, -18, 1.45)}
      {leaf(470, 110, 28, 1.15)}
      {nectarine_wedge(430, 230, nect, flesh, ad)}
      {raspberry(155, 145, 82, a, am, ad)}
      {raspberry(95, 265, 60, a, am, ad)}
      {raspberry(245, 275, 50, am, a, ad)}
      {cacao_pod(520, 295, 0.9)}
      <ellipse cx="290" cy="380" rx="210" ry="18" fill="{NAVY}" opacity="0.07"/>
    </g>"""

    if fruit == "lemon":
        return f"""
    <g id="FRUIT" transform="translate(95,290)">
      {leaf(370, 55, 12, 1.35)}
      {leaf(305, 40, -42, 1.05)}
      <ellipse cx="225" cy="175" rx="122" ry="148" fill="{a}"/>
      <ellipse cx="190" cy="140" rx="52" ry="72" fill="{am}" opacity="0.42"/>
      <path d="M225 32 C262 58 275 98 262 130" fill="none" stroke="{ad}" stroke-width="5.5" stroke-linecap="round"/>
      <ellipse cx="225" cy="28" rx="11" ry="7" fill="{ad}"/>
      <g fill="{ad}" opacity="0.22">
        <circle cx="160" cy="120" r="2.6"/><circle cx="255" cy="95" r="2.2"/><circle cx="290" cy="175" r="2.6"/>
        <circle cx="170" cy="205" r="2.2"/><circle cx="215" cy="245" r="2.6"/><circle cx="270" cy="225" r="2"/>
        <circle cx="145" cy="165" r="2"/><circle cx="240" cy="150" r="2.4"/>
      </g>
      <g transform="translate(35,215)">
        <ellipse cx="0" cy="0" rx="82" ry="94" fill="{a}"/>
        <ellipse cx="0" cy="0" rx="66" ry="76" fill="{flesh}"/>
        <ellipse cx="0" cy="0" rx="15" ry="17" fill="{am}"/>
        <path d="M0 0 L0 -74 M0 0 L62 -30 M0 0 L62 30 M0 0 L0 74 M0 0 L-62 30 M0 0 L-62 -30" stroke="{a}" stroke-width="3.2"/>
        <path d="M0 0 L42 -58 M0 0 L42 58" stroke="{a}" stroke-width="2" opacity="0.55"/>
      </g>
      {cacao_pod(450, 265, 0.85)}
      <ellipse cx="250" cy="380" rx="190" ry="16" fill="{NAVY}" opacity="0.07"/>
    </g>"""

    if fruit == "orange":
        return f"""
    <g id="FRUIT" transform="translate(85,280)">
      {leaf(370, 50, 8, 1.4)}
      {leaf(415, 95, 38, 1.05)}
      <circle cx="235" cy="175" r="132" fill="{a}"/>
      <circle cx="200" cy="130" r="58" fill="{am}" opacity="0.35"/>
      <g fill="{ad}" opacity="0.2">
        <circle cx="170" cy="105" r="3.2"/><circle cx="270" cy="85" r="2.6"/><circle cx="310" cy="160" r="3"/>
        <circle cx="175" cy="205" r="2.6"/><circle cx="245" cy="240" r="3.2"/><circle cx="290" cy="215" r="2.2"/>
        <circle cx="145" cy="160" r="2.4"/><circle cx="225" cy="135" r="2.8"/><circle cx="260" cy="175" r="2"/>
      </g>
      <g transform="translate(55,220) rotate(-22)">
        <path d="M0 0 A95 95 0 0 1 95 -12 L0 0 Z" fill="{a}"/>
        <path d="M10 -5 A72 72 0 0 1 76 -10 L0 0 Z" fill="{flesh}"/>
        <path d="M0 0 L42 -42 M0 0 L74 -6 M0 0 L58 22" stroke="{a}" stroke-width="2.8"/>
      </g>
      <path d="M235 45 Q252 30 262 45" fill="{ad}"/>
      {cacao_pod(455, 275, 0.85)}
      <ellipse cx="250" cy="380" rx="200" ry="16" fill="{NAVY}" opacity="0.07"/>
    </g>"""

    if fruit == "passion":
        return f"""
    <g id="FRUIT" transform="translate(100,290)">
      {leaf(390, 70, -12, 1.25)}
      <ellipse cx="205" cy="155" rx="108" ry="128" fill="{a}"/>
      <ellipse cx="178" cy="120" rx="42" ry="58" fill="{am}" opacity="0.42"/>
      <ellipse cx="205" cy="38" rx="13" ry="9" fill="{ad}"/>
      <g transform="translate(55,220)">
        <ellipse cx="0" cy="0" rx="92" ry="104" fill="{a}"/>
        <ellipse cx="0" cy="0" rx="74" ry="84" fill="{ad}"/>
        <ellipse cx="0" cy="0" rx="24" ry="28" fill="{flesh}" opacity="0.88"/>
        <g fill="{flesh}">
          <ellipse cx="-30" cy="-22" rx="8" ry="5.5" transform="rotate(-28 -30 -22)"/>
          <ellipse cx="12" cy="-38" rx="8" ry="5.5" transform="rotate(18 12 -38)"/>
          <ellipse cx="36" cy="-12" rx="8" ry="5.5" transform="rotate(42 36 -12)"/>
          <ellipse cx="28" cy="28" rx="8" ry="5.5" transform="rotate(-8 28 28)"/>
          <ellipse cx="-18" cy="34" rx="8" ry="5.5" transform="rotate(16 -18 34)"/>
          <ellipse cx="-38" cy="6" rx="8" ry="5.5" transform="rotate(-38 -38 6)"/>
          <ellipse cx="6" cy="6" rx="7" ry="4.5"/>
          <ellipse cx="-6" cy="-16" rx="7" ry="4.5" transform="rotate(48 -6 -16)"/>
          <ellipse cx="20" cy="-22" rx="6.5" ry="4" transform="rotate(-15 20 -22)"/>
        </g>
        <g fill="{COCOA}">
          <circle cx="-30" cy="-22" r="2.4"/><circle cx="12" cy="-38" r="2.2"/><circle cx="36" cy="-12" r="2.4"/>
          <circle cx="28" cy="28" r="2.2"/><circle cx="-18" cy="34" r="2.4"/><circle cx="-38" cy="6" r="2.2"/>
          <circle cx="6" cy="6" r="2"/><circle cx="-6" cy="-16" r="2"/><circle cx="20" cy="-22" r="1.8"/>
        </g>
      </g>
      {cacao_pod(445, 265, 0.85)}
      <ellipse cx="240" cy="380" rx="190" ry="16" fill="{NAVY}" opacity="0.07"/>
    </g>"""

    return f"""
    <g id="FRUIT" transform="translate(110,270)">
      {leaf(110, 70, -48, 1.45)}
      {leaf(380, 90, 32, 1.25)}
      <ellipse cx="115" cy="230" rx="20" ry="30" fill="{am}" transform="rotate(-25 115 230)"/>
      <ellipse cx="420" cy="210" rx="18" ry="26" fill="{a}" transform="rotate(22 420 210)"/>
      <g transform="translate(260,175)">
        <ellipse cx="0" cy="-66" rx="30" ry="72" fill="{a}"/>
        <ellipse cx="57" cy="-33" rx="30" ry="72" fill="{am}" transform="rotate(60)"/>
        <ellipse cx="57" cy="33" rx="30" ry="72" fill="{a}" transform="rotate(120)"/>
        <ellipse cx="0" cy="66" rx="30" ry="72" fill="{am}" transform="rotate(180)"/>
        <ellipse cx="-57" cy="33" rx="30" ry="72" fill="{a}" transform="rotate(240)"/>
        <ellipse cx="-57" cy="-33" rx="30" ry="72" fill="{am}" transform="rotate(300)"/>
        <circle r="30" fill="{ad}"/>
        <circle r="17" fill="{a}"/>
        <circle cx="-5" cy="-5" r="7" fill="{WHITE}" opacity="0.28"/>
        <g fill="{nect}">
          <circle cx="0" cy="-12" r="3.2"/><circle cx="9" cy="5" r="2.8"/><circle cx="-9" cy="5" r="2.8"/>
          <circle cx="0" cy="10" r="2.4"/>
        </g>
      </g>
      {cacao_pod(480, 285, 0.88)}
      <ellipse cx="270" cy="380" rx="200" ry="16" fill="{NAVY}" opacity="0.07"/>
    </g>"""


def nutrition_inline() -> str:
    """Claims 0/0/0 — línea limpia, sin cajas pesadas."""
    return f"""
    <g id="NUTRITION" transform="translate(40,940)">
      <text x="0" y="0" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="{NAVY}">0</text>
      <text x="28" y="0" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="{NAVY}" letter-spacing="1.5">CAL</text>
      <circle cx="95" cy="-6" r="3" fill="{ORANGE}"/>
      <text x="115" y="0" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="{NAVY}">0</text>
      <text x="143" y="0" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="{NAVY}" letter-spacing="1.5">AZÚCAR</text>
      <circle cx="250" cy="-6" r="3" fill="{ORANGE}"/>
      <text x="270" y="0" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="{NAVY}">0</text>
      <text x="298" y="0" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="{NAVY}" letter-spacing="1.5">SODIO</text>
    </g>"""


def can_front(sku: dict) -> str:
    """Layout V2: Waterloo fruit hero + franja naranja Benevolo locked abajo."""
    w, h = 700, 1200
    band = 118  # franja naranja Benevolo
    a, am, al = sku["accent"], sku["accent_mid"], sku["accent_light"]
    f1 = html.escape(sku["flavor_line1"])
    f2 = html.escape(sku["flavor_line2"])
    # Fruit sits in flavor wash; scale up composition
    fruit = fruit_art(sku).replace(
        'transform="translate(55,270)"', 'transform="translate(40,175) scale(1.08)"'
    ).replace(
        'transform="translate(95,290)"', 'transform="translate(70,185) scale(1.06)"'
    ).replace(
        'transform="translate(85,280)"', 'transform="translate(60,180) scale(1.06)"'
    ).replace(
        'transform="translate(100,290)"', 'transform="translate(75,185) scale(1.05)"'
    ).replace(
        'transform="translate(110,270)"', 'transform="translate(80,175) scale(1.06)"'
    )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="70mm" height="120mm" viewBox="0 0 {w} {h}"
  role="img" aria-label="Brew. {html.escape(sku['pair_label'])}">
  <title>Brew. · {html.escape(sku["pair_label"])}</title>
  <desc>Brew. Benevolo · Waterloo structure + franja naranja CB. No copia IP Waterloo.</desc>
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{a}"/>
      <stop offset="32%" stop-color="{am}"/>
      <stop offset="55%" stop-color="{al}"/>
      <stop offset="72%" stop-color="{CREAM}"/>
      <stop offset="100%" stop-color="{WHITE}"/>
    </linearGradient>
  </defs>

  <g id="ARTWORK">
    <rect width="{w}" height="{h}" fill="url(#wash)"/>

    <!-- CB lockup -->
    <g id="LOCKUP_CB" transform="translate(36,28)">
      <circle cx="20" cy="20" r="18" fill="{ORANGE}"/>
      <text x="20" y="26" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="700" fill="{WHITE}">CB</text>
      <text x="50" y="16" font-family="Georgia, serif" font-size="13" font-weight="700" fill="{WHITE}" letter-spacing="1.4">CHOCOLATE</text>
      <text x="50" y="34" font-family="Georgia, serif" font-size="13" font-weight="700" fill="{WHITE}" letter-spacing="1.4">BENEVOLO</text>
    </g>

    <!-- Brew. wordmark -->
    <g id="WORDMARK">
      <text x="40" y="128" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="92" font-style="italic" font-weight="900" fill="{SHADOW}" opacity="0.45">Brew.</text>
      <text x="34" y="122" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="92" font-style="italic" font-weight="900" fill="{WHITE}">Brew.</text>
    </g>
    <text x="40" y="158" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="14" fill="{WHITE}" letter-spacing="3.5">SPARKLING CACAO</text>

{fruit}

    <!-- Flavor block on cream zone -->
    <text x="40" y="780" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="62" font-weight="900" fill="{NAVY}" letter-spacing="0.5">{f1}</text>
    <text x="40" y="848" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="62" font-weight="900" fill="{NAVY}" letter-spacing="0.5">{f2}</text>
    <rect x="40" y="868" width="120" height="8" rx="4" fill="{ORANGE}"/>
    <text x="40" y="910" font-family="Georgia, serif" font-size="20" font-style="italic" fill="{NAVY}">{html.escape(sku["tagline"])}</text>

{nutrition_inline()}

    <!-- FRANJA NARANJA BENEVOLO (locked abajo) -->
    <g id="ORANGE_BAND">
      <rect x="0" y="{h - band}" width="{w}" height="{band}" fill="{ORANGE}"/>
      <rect x="0" y="{h - band}" width="{w}" height="6" fill="{SHADOW}" opacity="0.35"/>
      <text x="350" y="{h - band + 48}" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" fill="{WHITE}" letter-spacing="2">355 ml · 12 FL OZ</text>
      <text x="350" y="{h - band + 82}" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="{WHITE}" letter-spacing="1.5">chocolatebenevolo.co · FEAR 5</text>
    </g>
  </g>

  <g id="DIELINE_CUT" fill="none" stroke="#FF00FF" stroke-width="1.5" opacity="0.35">
    <rect x="4" y="4" width="{w - 8}" height="{h - 8}" rx="40"/>
  </g>
</svg>
"""


def write_both(rel: Path, content: str) -> None:
    dest = OUT / rel
    pub = PUBLIC / "brew" / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    pub.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    pub.write_text(content, encoding="utf-8")
    print("wrote", rel)


def main() -> None:
    for old in OUT.glob("brew-*-can.svg"):
        old.unlink(missing_ok=True)
    for old in (PUBLIC / "brew").glob("brew-*-can.svg"):
        old.unlink(missing_ok=True)

    for sku in SKUS:
        write_both(Path(f"brew-{sku['id']}-can.svg"), can_front(sku))

    system = """# Brew. · gaseosa de cacao (patrón WATERLOO + franja Benevolo)

> Estructura Waterloo (degradado sabor → cream, fruta hero, claims 0/0/0) + **franja naranja `#F05A28` locked abajo** (sistema Bars./Benevolo).
> No copiamos IP Waterloo.

## Layout

```
[ CB filled orange · CHOCOLATE BENEVOLO ]
[ Brew. ]
[ SPARKLING CACAO ]
[ fruta hero + mazorca ]
—— cream zone ——
[ SABOR L1 / L2 ]
[ regla naranja ]
[ tagline ]
[ 0 CAL · 0 AZÚCAR · 0 SODIO ]
████ FRANJA NARANJA ████
[ 355 ml · chocolatebenevolo.co · FEAR 5 ]
```

## SKUs

| id | Sabor | Acento wash |
|----|-------|-------------|
| `frambuesa-nectarina` | FRAMBUESA / NECTARINA | magenta |
| `limon` | CACAO & LIMÓN | lima |
| `naranja` | CACAO & NARANJA | naranja |
| `maracuya` | CACAO & MARACUYÁ | amarillo |
| `jamaica` | CACAO & JAMAICA | magenta |

```bash
python3 brand/chocolate-benevolo/packaging/build_brew_cans.py
```
"""
    (OUT / "SYSTEM.md").write_text(system, encoding="utf-8")
    (PUBLIC / "brew" / "SYSTEM.md").write_text(system, encoding="utf-8")

    rows = "\n".join(f"| {s['pair_label']} | `brew-{s['id']}-can.svg` |" for s in SKUS)
    readme = f"""# Brew. · gaseosa de cacao

Patrón **Waterloo** (degradado · fruta con oficio · 0/0/0) · Chocolate Benevolo.

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
    print("done")


if __name__ == "__main__":
    main()
