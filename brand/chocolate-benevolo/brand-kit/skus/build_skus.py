#!/usr/bin/env python3
"""Bars. SKUs: San Vicente 41 (morado) y 70 % panela. UTF-8 only."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
KIT = ROOT.parent
FONTS = KIT / "type" / "fonts"
SRC = ROOT / "_sources"
PUB = Path("/workspace/apps/web/public/benevolo/brand-kit/skus")

PURPLE = "#4A0D6B"
PURPLE_DEEP = "#220536"
PURPLE_SHADOW = "#2A0845"
COCOA = "#2A140C"
PANELA = "#C17A2A"
CREAM = "#F7F1EE"
WHITE = "#FFFFFF"
CHAMPAGNE = "#E8C9A0"

CB_C = "M57.2 21.8C46.4 12.6 26.8 13.4 19.6 28.4C13.2 42.2 16.8 59.6 31.2 65.6C40.4 69.4 52.8 66.8 58.6 58.2"
CB_B = "M33.8 18.8C33.4 33.2 33.8 47.6 34.8 62.4M33.9 21.4C50.6 16.2 64.4 22.6 62.2 33.2C60.4 41.4 47.6 43.8 34.2 40.2C52.8 38.6 66.2 46.4 62.8 57.2C59.6 67.4 45.2 69.2 34.6 60.4"


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    path.read_text(encoding="utf-8")
    print("wrote", path.relative_to(ROOT.parent.parent.parent))


def cb(color: str, x: int = 80, y: int = 80) -> str:
    return f"""  <g id="logo-cb" transform="translate({x},{y})" fill="none" stroke="{color}" stroke-linecap="round">
    <circle cx="40" cy="40" r="36.2" stroke-width="1.7"/>
    <path stroke-width="3.35" d="{CB_C}"/>
    <path stroke-width="3.2" d="{CB_B}"/>
  </g>"""


def style(fill: str = WHITE) -> str:
    return f"""    <style type="text/css"><![CDATA[
      @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@1,500;1,900&display=swap');
      text {{ font-family: 'Bodoni Moda', Didot, Georgia, serif; font-style: italic; fill: {fill}; }}
      .kicker {{ font-weight: 500; letter-spacing: 0.28em; fill: #E8C9A0; }}
      .display {{ font-weight: 900; }}
      .body {{ font-weight: 500; }}
    ]]></style>"""


def frente(slug: str, bg: str, shadow: str, category: str, badge: str, legal: str, seal: str) -> str:
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" role="img">
  <title>Bars. {slug} · frente</title>
  <defs>
{style()}
  </defs>
  <rect id="bg" width="1080" height="1920" fill="{bg}"/>
{cb(WHITE)}
  <g id="type-brand">
    <text class="kicker" x="200" y="120" font-size="22">CHOCOLATE</text>
    <text class="display" x="196" y="210" font-size="64">BenevolO</text>
  </g>
  <g id="type-category">
    <text class="kicker" x="80" y="420" font-size="26">{category}</text>
  </g>
  <g id="type-badge">
    <text class="kicker" x="80" y="470" font-size="26">{badge}</text>
  </g>
  <g id="type-bars">
    <text class="display" x="92" y="760" font-size="180" fill="{shadow}">Bars.</text>
    <text class="display" x="80" y="744" font-size="180">Bars.</text>
  </g>
  <g id="type-legal">
    <text class="body" x="80" y="1680" font-size="24">{legal}</text>
  </g>
  <g id="seal-origen">
    <text class="kicker" x="80" y="1760" font-size="16">CACAO COLOMBIANO DE ORIGEN</text>
  </g>
  <g id="type-seal">
    <text class="display" x="80" y="1820" font-size="32">{seal}</text>
  </g>
  <g id="type-url">
    <text class="body" x="560" y="1820" font-size="22">Chocolate Benevolo.co</text>
  </g>
</svg>
"""


def dorso(slug: str, bg: str, line1: str, line2: str, contents: list[str], extra: str) -> str:
    body_lines = "\n".join(
        f'    <text class="body" x="80" y="{640 + i * 50}" font-size="26">{line}</text>'
        for i, line in enumerate(contents)
    )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" role="img">
  <title>Bars. {slug} · dorso</title>
  <defs>
{style()}
  </defs>
  <rect id="bg" width="1080" height="1920" fill="{bg}"/>
  <g id="type-slogan">
    <text class="kicker" x="80" y="220" font-size="22">ESLOGAN</text>
    <text class="display" x="80" y="320" font-size="40">{line1}</text>
    <text class="display" x="80" y="390" font-size="40">{line2}</text>
  </g>
  <g id="type-contents">
    <text class="kicker" x="80" y="560" font-size="22">CONTIENE</text>
{body_lines}
  </g>
  <g id="type-note">
    <text class="body" x="80" y="1480" font-size="22">{extra}</text>
  </g>
  <g id="type-manufacturer">
    <text class="kicker" x="80" y="1600" font-size="22">LEGAL</text>
    <text class="body" x="80" y="1660" font-size="24">Elaborado por: Chocolate Zurych SAS</text>
    <text class="body" x="80" y="1710" font-size="24">NSA-0011242-2021 · +573102227848</text>
    <text class="body" x="80" y="1760" font-size="24">Chocolate Benevolo.co · preventa</text>
  </g>
</svg>
"""


def compose_png(out: Path, bg: str, photo: Path, crop: str, lines: list[tuple[str, int, str]]) -> None:
    w, h = 1080, 1920
    canvas = Image.new("RGB", (w, h), bg)
    if photo.exists():
        im = Image.open(photo).convert("RGB")
        if crop == "pod":
            im = im.resize((520, 436))
            canvas.paste(im, (520, 980))
        else:
            im.thumbnail((980, 640))
            canvas.paste(im, (50, 980))
    draw = ImageDraw.Draw(canvas)
    f900 = ImageFont.truetype(str(FONTS / "BodoniModa-900Italic.ttf"), 72)
    f900b = ImageFont.truetype(str(FONTS / "BodoniModa-900Italic.ttf"), 160)
    f500 = ImageFont.truetype(str(FONTS / "BodoniModa-500Italic.ttf"), 28)
    for text, y, kind in lines:
        font = f900b if kind == "hero" else f900 if kind == "title" else f500
        fill = PANELA if kind == "gold" else WHITE
        draw.text((80, y), text, font=font, fill=fill)
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, quality=90)
    print("png", out.name)


def main() -> None:
    sources = """# Fuentes de imagen (Commons · no son packshot Benevolo)

## San Vicente 41 · mazorca morada
- Archivo: `cacao-pod-purple-commons.jpg`
- Wikimedia: https://commons.wikimedia.org/wiki/File:Theobroma_cacao_-_fruit,_from_inside,_beans.jpg
- Autor: Genet (Wikipedia en alemán)
- Licencia: reutilizar con atribución según la ficha Commons

## 70 % panela · barra dark de referencia
- Archivo: `dark-chocolate-blanxart-commons.jpg`
- Wikimedia: https://commons.wikimedia.org/wiki/File:Dark_chocolate_Blanxart.jpg
- Foto original: John Loo (Flickr) · 72 % cacao Blanxart (referencia de categoría dark, no es el SKU Benevolo)
- Licencia: CC BY 2.0 https://creativecommons.org/licenses/by/2.0

## Mazorca extra
- `cacao-pods-haiti-commons.jpg` · Nick Hobgood · Theobroma cacao (Haiti)

No atribuir medalla CoEx a Bars. Benevolo. San Vicente 41 = clon FSV41, no 41 % de cacao.
70 % panela ≠ capstone Master Chocolatier 70 %.
"""
    write(ROOT / "SOURCES.md", sources)

    sv = {
        "sku": "bars-san-vicente-41",
        "marca": "CHOCOLATE BENEVOLO",
        "linea": "Bars.",
        "origen": "San Vicente 41 · clon FSV41 · Santander / referencia Fedecacao",
        "acento": PURPLE,
        "nota": "41 es el número del clon, no el % de cacao. Sin medalla CoEx en el empaque.",
        "peso_neto": "80gr",
    }
    p70 = {
        "sku": "bars-70-panela",
        "marca": "CHOCOLATE BENEVOLO",
        "linea": "Bars.",
        "origen": "Cacao colombiano · 70 % · endulzado con panela",
        "acento": COCOA,
        "nota": "No es el capstone Master Chocolatier 70 %. Preventa. Foto Commons = referencia de categoría.",
        "peso_neto": "80gr",
    }
    write(ROOT / "san-vicente-41" / "sku.json", json.dumps(sv, ensure_ascii=False, indent=2) + "\n")
    write(ROOT / "70-panela" / "sku.json", json.dumps(p70, ensure_ascii=False, indent=2) + "\n")

    write(
        ROOT / "san-vicente-41" / "ADOBE-EXPRESS-PASTE.md",
        """# Bars. · San Vicente 41 · pegar en Express

Acento: morado intenso #4A0D6B
41 = clon FSV41, no porcentaje de cacao.

## Frente
### type-category
CACAO SAN VICENTE 41

### type-badge
CLON FSV41

### type-bars
Bars.

### type-legal
Chocolatina de origen. Neto 80gr.

### type-seal
FSV41

## Dorso
### type-slogan
By Benévolo - Buen Chocolate Indulgente.

### type-contents
Contiene:
Cacao San Vicente 41 (clon FSV41).
Fermentación controlada.
Leche en polvo avellanada.

### type-note
Sin medalla CoEx en este empaque. Preventa.
""",
    )
    write(
        ROOT / "70-panela" / "ADOBE-EXPRESS-PASTE.md",
        """# Bars. · 70 % panela · pegar en Express

Acento: cocoa #2A140C · panela #C17A2A
Foto: barra dark Commons (CC BY 2.0 · John Loo) — referencia, no el producto.

## Frente
### type-category
70 % CACAO

### type-badge
ENDULZADO CON PANELA

### type-bars
Bars.

### type-legal
Chocolatina dark. Neto 80gr.

### type-seal
70 %

## Dorso
### type-slogan
By Benévolo - Buen Chocolate Indulgente.

### type-contents
Contiene:
Cacao 70 % colombiano.
Endulzado con panela.
Manteca de cacao.

### type-note
No es el Master Chocolatier 70 %. Preventa. Foto de referencia Commons.
""",
    )

    write(
        ROOT / "san-vicente-41" / "frente-live.svg",
        frente(
            "San Vicente 41",
            PURPLE,
            PURPLE_SHADOW,
            "CACAO SAN VICENTE 41",
            "CLON FSV41",
            "Chocolatina de origen. Neto 80gr.",
            "FSV41",
        ),
    )
    write(
        ROOT / "san-vicente-41" / "dorso-live.svg",
        dorso(
            "San Vicente 41",
            PURPLE_DEEP,
            "By Benévolo -",
            "Buen Chocolate Indulgente.",
            [
                "Cacao San Vicente 41 (clon FSV41).",
                "Fermentación controlada.",
                "Leche en polvo avellanada.",
            ],
            "Sin medalla CoEx en este empaque. Preventa.",
        ),
    )
    write(
        ROOT / "70-panela" / "frente-live.svg",
        frente(
            "70 panela",
            COCOA,
            PANELA,
            "70 % CACAO",
            "ENDULZADO CON PANELA",
            "Chocolatina dark. Neto 80gr.",
            "70 %",
        ),
    )
    write(
        ROOT / "70-panela" / "dorso-live.svg",
        dorso(
            "70 panela",
            "#1A0C08",
            "By Benévolo -",
            "Buen Chocolate Indulgente.",
            [
                "Cacao 70 % colombiano.",
                "Endulzado con panela.",
                "Manteca de cacao.",
            ],
            "No es el Master Chocolatier 70 %. Preventa.",
        ),
    )

    import sys

    sys.path.insert(0, str(ROOT))
    from compose_pack import main as compose_packs

    compose_packs()


if __name__ == "__main__":
    main()
