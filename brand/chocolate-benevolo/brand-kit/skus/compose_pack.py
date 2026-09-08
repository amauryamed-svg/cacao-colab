#!/usr/bin/env python3
"""Compose Bars. SKU packs in the Fear5 carton system.

Locked: CB fluid paths · CHOCOLATE + B/enevol/O · Bars. with extrusion ·
official swirl motif · halo rings · circular hero · origin seal · footer.
Flex: accent field + swirl ink + descriptor + hero crop.
"""

from __future__ import annotations

import io
from pathlib import Path

import cairosvg
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SKU = Path(__file__).resolve().parent
SRC = SKU / "_sources"
PUB = Path("/workspace/apps/web/public/benevolo/brand-kit/skus")
ART = Path("/opt/cursor/artifacts")
FONT_DIR = ROOT / "type" / "fonts"
INTER = Path("/usr/share/fonts/truetype/macos/Inter-Regular.ttf")
INTER_MED = Path("/usr/share/fonts/truetype/macos/Inter-Medium.ttf")

CB_C = "M57.2 21.8C46.4 12.6 26.8 13.4 19.6 28.4C13.2 42.2 16.8 59.6 31.2 65.6C40.4 69.4 52.8 66.8 58.6 58.2"
CB_B = "M33.8 18.8C33.4 33.2 33.8 47.6 34.8 62.4M33.9 21.4C50.6 16.2 64.4 22.6 62.2 33.2C60.4 41.4 47.6 43.8 34.2 40.2C52.8 38.6 66.2 46.4 62.8 57.2C59.6 67.4 45.2 69.2 34.6 60.4"

# Official motif (800×500) plus sibling ribbons so the wrap matches Fear5 density.
SWIRL_RIBBONS = (
    (38, "M-20 420 C 80 380, 140 260, 240 250 C 360 236, 400 360, 520 340 C 640 320, 700 180, 840 160"),
    (28, "M-10 200 C 120 160, 180 80, 300 90 C 430 102, 470 210, 600 190"),
    (18, "M 80 480 C 200 450, 260 390, 380 400"),
    (34, "M-40 90 C 90 40, 220 130, 350 70 C 500 10, 580 170, 860 50"),
    (46, "M 160 520 C 300 430, 470 500, 640 360 C 780 250, 840 310, 920 210"),
)

WRAP = (1800, 950)
STORY = (1080, 1920)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / name), size)


def sans(size: int, medium: bool = False) -> ImageFont.FreeTypeFont:
    path = INTER_MED if medium and INTER_MED.exists() else INTER
    return ImageFont.truetype(str(path), size)


def svg_png(svg: str, width: int, height: int | None = None) -> Image.Image:
    raw = cairosvg.svg2png(
        bytestring=svg.encode("utf-8"),
        output_width=width,
        output_height=height,
    )
    return Image.open(io.BytesIO(raw)).convert("RGBA")


def swirl_field(size: tuple[int, int], bg: str, ink: str) -> Image.Image:
    w, h = size
    sx, sy = w / 800.0, h / 500.0
    paths = "\n".join(
        f'    <path stroke-width="{sw}" d="{d}"/>' for sw, d in SWIRL_RIBBONS
    )
    extra = ""
    if sy / sx > 1.35:
        extra = f"""  <g transform="translate(0,{h * 0.34}) scale({sx},{sx})" fill="none" stroke="{ink}" stroke-linecap="round">
{paths}
  </g>
  <g transform="translate(0,{h * 0.68}) scale({sx},{sx})" fill="none" stroke="{ink}" stroke-linecap="round">
{paths}
  </g>"""
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <rect width="{w}" height="{h}" fill="{bg}"/>
  <g transform="scale({sx:.4f},{sy:.4f})" fill="none" stroke="{ink}" stroke-linecap="round" stroke-linejoin="round">
{paths}
  </g>
{extra}
</svg>"""
    return svg_png(svg, w, h)


def render_cb(px: int, color: str) -> Image.Image:
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
  <g fill="none" stroke="{color}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="40" cy="40" r="36.2" stroke-width="1.7"/>
    <path stroke-width="3.35" d="{CB_C}"/>
    <path stroke-width="3.2" d="{CB_B}"/>
  </g>
</svg>"""
    return svg_png(svg, px)


def _matte(im: Image.Image, mode: str) -> Image.Image:
    arr = np.array(im).astype(np.float32)
    rgb = arr[:, :, :3]
    luma = rgb.mean(axis=2)
    warmth = rgb[:, :, 0] - rgb[:, :, 2]
    if mode == "pod":
        keep = (warmth > 12) | ((luma < 95) & (rgb[:, :, 0] > rgb[:, :, 2] - 8))
        alpha = np.where(keep, 255.0, 0.0)
    else:
        dist_white = np.linalg.norm(rgb - 255.0, axis=2)
        alpha = np.clip((210.0 - luma) * 3.2, 0.0, 255.0)
        alpha = np.where(dist_white < 48, 0.0, alpha)
    arr[:, :, 3] = alpha
    out = Image.fromarray(arr.astype(np.uint8), "RGBA")
    a = out.split()[-1].filter(ImageFilter.MedianFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    out.putalpha(a)
    return out


def _soft_circle(im: Image.Image, tight: bool) -> Image.Image:
    w, h = im.size
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = w / 2.0, h / 2.0
    rx, ry = (w * 0.46, h * 0.48) if tight else (w * 0.58, h * 0.52)
    d = ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2
    fall = np.clip((1.15 - d) / (0.28 if tight else 0.22), 0.0, 1.0)
    arr = np.array(im).astype(np.float32)
    arr[:, :, 3] *= fall
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


def cutout_hero(
    src: Path,
    height: int,
    crop: tuple[float, float, float, float],
    mode: str,
) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    l, t, r, b = crop
    im = im.crop((int(im.width * l), int(im.height * t), int(im.width * r), int(im.height * b)))
    im = _matte(im, mode)
    im = ImageEnhance.Contrast(im).enhance(1.16)
    im = ImageEnhance.Color(im).enhance(1.08)
    ratio = height / im.height
    im = im.resize((max(1, int(im.width * ratio)), height), Image.Resampling.LANCZOS)
    im = _soft_circle(im, tight=(mode == "bar"))
    return im


def draw_halo(draw: ImageDraw.ImageDraw, cx: int, cy: int, r: int, color: str, alpha: int = 210) -> None:
    h = color.lstrip("#")
    rgb = tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))
    for i in range(6):
        pad = 18 + i * 28
        draw.ellipse(
            (cx - r - pad, cy - r - pad, cx + r + pad, cy + r + pad),
            outline=(*rgb, max(40, alpha - i * 22)),
            width=2,
        )


def draw_lockup(img: Image.Image, left: int, top: int, ink: str, scale: float, cat1: str, cat2: str) -> None:
    cb = render_cb(int(118 * scale), ink)
    img.alpha_composite(cb, (left + int(86 * scale), top))
    d = ImageDraw.Draw(img)
    choc = font("BodoniModa-500Italic.ttf", int(17 * scale))
    d.text(
        (left + int(134 * scale), top + int(112 * scale)),
        "CHOCOLATE",
        font=choc,
        fill=ink,
        anchor="mm",
    )
    b_f = font("BodoniModa-900Italic.ttf", int(72 * scale))
    m_f = font("BodoniModa-500Italic.ttf", int(48 * scale))
    o_f = font("BodoniModa-900Italic.ttf", int(72 * scale))
    word = "enevol"
    bw = d.textlength("B", font=b_f)
    mw = d.textlength(word, font=m_f)
    ow = d.textlength("O", font=o_f)
    total = bw + mw + ow + 6 * scale
    x = left + int(134 * scale) - total / 2
    y = top + int(186 * scale)
    d.text((x, y), "B", font=b_f, fill=ink, anchor="ls")
    d.text((x + bw + 1 * scale, y - 5 * scale), word, font=m_f, fill=ink, anchor="ls")
    d.text((x + bw + mw + 5 * scale, y), "O", font=o_f, fill=ink, anchor="ls")
    cat = font("BodoniModa-500Italic.ttf", int(15 * scale))
    d.text((left + int(134 * scale), top + int(214 * scale)), cat1, font=cat, fill=ink, anchor="mm")
    d.text((left + int(134 * scale), top + int(236 * scale)), cat2, font=cat, fill=ink, anchor="mm")


def bars_word(draw: ImageDraw.ImageDraw, x: int, y: int, size: int, extrusion: tuple[int, int, int]) -> None:
    f = font("BodoniModa-900Italic.ttf", size)
    for i, a in enumerate((90, 70, 50, 32)):
        dx, dy = 4 + i * 3, 3 + i * 3
        draw.text((x + dx, y + dy), "Bars.", font=f, fill=(*extrusion, a), anchor="mm")
    draw.text((x, y), "Bars.", font=f, fill="white", anchor="mm")


def origin_seal(draw: ImageDraw.ImageDraw, x: int, y: int, ink: str, mark: str, sub: str) -> None:
    r = 54
    draw.ellipse((x - r, y - r, x + r, y + r), outline=ink, width=2)
    draw.ellipse((x - r + 6, y - r + 6, x + r - 6, y + r - 6), outline=ink, width=1)
    tiny = sans(9, medium=True)
    draw.text((x, y - 28), "CACAO COLOMBIANO", font=tiny, fill=ink, anchor="mm")
    draw.text((x, y - 16), "DE ORIGEN", font=tiny, fill=ink, anchor="mm")
    hero = font("BodoniModa-900Italic.ttf", 28 if len(mark) > 2 else 34)
    draw.text((x, y + 8), mark, font=hero, fill=ink, anchor="mm")
    draw.text((x, y + 30), sub, font=sans(9), fill=ink, anchor="mm")


def hex_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def compose_wrap(cfg: dict) -> Image.Image:
    W, H = WRAP
    bg = swirl_field((W, H), cfg["bg"], cfg["swirl"])
    d = ImageDraw.Draw(bg, "RGBA")

    hx, hy = 1368, 428
    draw_halo(d, hx, hy, 220, cfg["halo"])
    hero = cutout_hero(cfg["photo"], 560, cfg["crop"], cfg["hero_mode"])
    hx0 = hx - hero.width // 2
    hy0 = hy - hero.height // 2
    shadow = Image.new("RGBA", (hero.width + 24, hero.height + 24), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse((12, hero.height * 0.72, hero.width + 8, hero.height + 10), fill=(0, 0, 0, 50))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    bg.alpha_composite(shadow, (hx0 - 4, hy0 + 8))
    bg.alpha_composite(hero, (hx0, hy0))

    draw_lockup(bg, 92, 28, cfg["ink"], 1.08, cfg["cat1"], cfg["cat2"])
    d = ImageDraw.Draw(bg, "RGBA")
    bars_word(d, 620, 548, 236, hex_rgb(cfg["extrusion"]))

    d.text((88, 888), cfg["footer"], font=sans(20), fill=cfg["ink"], anchor="ls")
    origin_seal(d, 1648, 792, cfg["ink"], cfg["seal"], cfg["seal_sub"])
    d.text((1648, 888), "ChocolateBenevolo.co", font=font("BodoniModa-500Italic.ttf", 20), fill=cfg["ink"], anchor="mm")
    return bg.convert("RGB")


def compose_story(wrap: Image.Image, cfg: dict) -> Image.Image:
    W, H = STORY
    canvas = swirl_field((W, H), cfg["bg"], cfg["swirl"])
    draw_lockup(canvas, 340, 70, cfg["ink"], 1.15, cfg["cat1"], cfg["cat2"])

    slab = wrap.resize((980, 517), Image.Resampling.LANCZOS)
    shadow = Image.new("RGBA", (980, 517), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((0, 0, 979, 516), radius=8, fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    canvas.alpha_composite(shadow, (58, 708))
    canvas.paste(slab, (50, 690))

    d = ImageDraw.Draw(canvas, "RGBA")
    d.text((W // 2, 1320), cfg["line"], font=font("BodoniModa-500Italic.ttf", 28), fill=cfg["ink"], anchor="mm")
    d.text(
        (W // 2, 1748),
        "Preventa · WhatsApp confirma el lote",
        font=sans(20),
        fill=cfg["ink"],
        anchor="mm",
    )
    d.text(
        (W // 2, 1790),
        cfg["honesty"],
        font=sans(16),
        fill=cfg["ink"],
        anchor="mm",
    )
    d.text(
        (W // 2, 1840),
        "ChocolateBenevolo.co",
        font=font("BodoniModa-500Italic.ttf", 22),
        fill=cfg["ink"],
        anchor="mm",
    )
    return canvas.convert("RGB")


def write_front_svg(path: Path, cfg: dict) -> None:
    ribbons = "\n".join(
        f'      <path stroke-width="{sw}" d="{d}"/>' for sw, d in SWIRL_RIBBONS
    )
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1800 950" width="1800" height="950" role="img">
  <title>{cfg["title"]}</title>
  <desc>Wrap 180×95 mm · sistema Fear5. Foto Commons = referencia, no packshot de fábrica.</desc>
  <defs>
    <clipPath id="hero-soft"><circle cx="1368" cy="428" r="300"/></clipPath>
    <style type="text/css"><![CDATA[
      @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@1,500;1,900&display=swap');
      .serif {{ font-family: 'Bodoni Moda', Didot, Georgia, serif; font-style: italic; fill: {cfg["ink"]}; }}
      .sans {{ font-family: Inter, Outfit, Helvetica, Arial, sans-serif; fill: {cfg["ink"]}; }}
    ]]></style>
  </defs>
  <rect id="BG" width="1800" height="950" fill="{cfg["bg"]}"/>
  <g id="MOTIF_SWIRLS" transform="scale(2.25 1.9)" fill="none" stroke="{cfg["swirl"]}" stroke-linecap="round" stroke-linejoin="round">
{ribbons}
  </g>
  <g id="MOTIF_HALO" fill="none" stroke="{cfg["halo"]}" stroke-width="2" opacity="0.72">
    <circle cx="1368" cy="428" r="262"/>
    <circle cx="1368" cy="428" r="290"/>
    <circle cx="1368" cy="428" r="318"/>
    <circle cx="1368" cy="428" r="346"/>
    <circle cx="1368" cy="428" r="374"/>
    <circle cx="1368" cy="428" r="402"/>
  </g>
  <image id="HERO" xlink:href="{cfg["href"]}" x="1188" y="148" width="360" height="560" preserveAspectRatio="xMidYMid meet" clip-path="url(#hero-soft)"/>
  <g id="LOCKUP_CB" transform="translate(156,44) scale(1.2)" fill="none" stroke="{cfg["ink"]}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="40" cy="40" r="36.2" stroke-width="1.7"/>
    <path stroke-width="3.35" d="{CB_C}"/>
    <path stroke-width="3.2" d="{CB_B}"/>
  </g>
  <text class="serif" x="204" y="186" text-anchor="middle" font-size="17" font-weight="500" letter-spacing="7">CHOCOLATE</text>
  <text class="serif" x="204" y="258" text-anchor="middle">
    <tspan font-size="72" font-weight="900">B</tspan><tspan font-size="48" font-weight="500">enevol</tspan><tspan font-size="72" font-weight="900">O</tspan>
  </text>
  <text class="serif" x="204" y="286" text-anchor="middle" font-size="15" font-weight="500" letter-spacing="3">{cfg["cat1"]}</text>
  <text class="serif" x="204" y="308" text-anchor="middle" font-size="15" font-weight="500" letter-spacing="3">{cfg["cat2"]}</text>
  <text x="568" y="536" text-anchor="middle" fill="{cfg["extrusion"]}" opacity="0.45" font-family="Bodoni Moda, Didot, serif" font-size="228" font-style="italic" font-weight="900">Bars.</text>
  <text x="560" y="528" text-anchor="middle" fill="#FFFFFF" font-family="Bodoni Moda, Didot, serif" font-size="228" font-style="italic" font-weight="900">Bars.</text>
  <text class="sans" x="88" y="888" font-size="20">{cfg["footer"]}</text>
  <g id="SEAL_ORIGEN" fill="none" stroke="{cfg["ink"]}">
    <circle cx="1648" cy="792" r="54" stroke-width="2"/>
    <circle cx="1648" cy="792" r="48" stroke-width="1"/>
  </g>
  <text class="sans" x="1648" y="772" text-anchor="middle" font-size="9">CACAO COLOMBIANO</text>
  <text class="sans" x="1648" y="784" text-anchor="middle" font-size="9">DE ORIGEN</text>
  <text class="serif" x="1648" y="808" text-anchor="middle" font-size="28" font-weight="900">{cfg["seal"]}</text>
  <text class="sans" x="1648" y="828" text-anchor="middle" font-size="9">{cfg["seal_sub"]}</text>
  <text class="serif" x="1648" y="888" text-anchor="middle" font-size="20">ChocolateBenevolo.co</text>
</svg>
"""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(svg, encoding="utf-8")
    path.read_text(encoding="utf-8")


def configs() -> list[dict]:
    return [
        {
            "id": "san-vicente-41",
            "bg": "#4A0D6B",
            "swirl": "#1A0528",
            "ink": "#FFFFFF",
            "halo": "#FFFFFF",
            "extrusion": "#220536",
            "photo": SRC / "cacao-pod-purple-commons.jpg",
            "crop": (0.00, 0.00, 0.38, 0.72),
            "hero_mode": "pod",
            "cat1": "CACAO SAN VICENTE 41",
            "cat2": "CLON FSV41",
            "line": "Cacao San Vicente 41  ·  clon FSV41",
            "footer": "Chocolatina de origen. Neto 80gr.  ·  preventa",
            "honesty": "41 es el clon FSV41, no el % de cacao  ·  sin medalla CoEx",
            "seal": "FSV41",
            "seal_sub": "Fedecacao",
            "title": "Bars. San Vicente 41 — pack Fear5 system",
            "href": "hero-cutout.png",
            "art": "benevolo_bars_san_vicente_41_pack_20260908.png",
            "art_story": "benevolo_bars_san_vicente_41_story_20260908.png",
        },
        {
            "id": "70-panela",
            "bg": "#C17A2A",
            "swirl": "#2A140C",
            "ink": "#FFFFFF",
            "halo": "#F7F1EE",
            "extrusion": "#2A140C",
            "photo": SRC / "dark-chocolate-blanxart-commons.jpg",
            "crop": (0.18, 0.08, 0.96, 0.96),
            "hero_mode": "bar",
            "cat1": "70 % CACAO",
            "cat2": "ENDULZADO CON PANELA",
            "line": "70 % cacao  ·  endulzado con panela",
            "footer": "Chocolatina dark. Neto 80gr.  ·  preventa",
            "honesty": "Extensión de línea  ·  no es Master Chocolatier 70 %",
            "seal": "70",
            "seal_sub": "panela",
            "title": "Bars. 70 % panela — pack Fear5 system",
            "href": "hero-cutout.png",
            "art": "benevolo_bars_70_panela_pack_20260908.png",
            "art_story": "benevolo_bars_70_panela_story_20260908.png",
        },
    ]


def main() -> None:
    ART.mkdir(parents=True, exist_ok=True)
    PUB.mkdir(parents=True, exist_ok=True)
    # Public SVGs reference hero-cutout PNGs, not the raw Commons JPEGs.

    for cfg in configs():
        wrap = compose_wrap(cfg)
        story = compose_story(wrap, cfg)
        folder = SKU / cfg["id"]
        folder.mkdir(parents=True, exist_ok=True)
        hero = cutout_hero(cfg["photo"], 560, cfg["crop"], cfg["hero_mode"])
        hero.save(folder / "hero-cutout.png")
        wrap.save(folder / "pack-frente.png", optimize=True)
        wrap.save(folder / "frente.png", optimize=True)
        story.save(folder / "story-1080x1920.png", optimize=True)
        write_front_svg(folder / "frente-live.svg", cfg)
        write_front_svg(folder / "pack-frente-live.svg", cfg)

        wrap.save(PUB / f"{cfg['id']}-pack-frente.png", optimize=True)
        wrap.save(PUB / f"{cfg['id']}-frente.png", optimize=True)
        story.save(PUB / f"{cfg['id']}-story.png", optimize=True)
        hero.save(PUB / f"{cfg['id']}-hero-cutout.png")
        pub_svg = cfg.copy()
        pub_svg["href"] = f"{cfg['id']}-hero-cutout.png"
        write_front_svg(PUB / f"{cfg['id']}-frente-live.svg", pub_svg)
        write_front_svg(PUB / f"{cfg['id']}-pack-frente-live.svg", pub_svg)

        wrap.save(ART / cfg["art"], optimize=True)
        story.save(ART / cfg["art_story"], optimize=True)
        print("wrote", cfg["id"], wrap.size, story.size)


if __name__ == "__main__":
    main()
