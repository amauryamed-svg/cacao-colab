#!/usr/bin/env python3
"""
Benevolo packaging fiel al cartón impreso Bars Benevolo.pdf.

Composición limpia (sin sobreposición):
  - Izquierda: panel naranja + swirls navy reconstruidos + wordmark + CB + relleno
  - Derecha: mazorca / ripples / sello FEAR 5 del arte Bars. real
  - Footer único cocoa

Bons. = bombón grande · 3 rellenos (Caramelo / Dubai / Tiramisú).
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent
PUBLIC = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/packaging"
ASSETS = ROOT / "shared/assets"
REFS = Path(__file__).resolve().parents[1] / "references"

BARS_ART = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/packaging/bars-fear5-front-art.jpg"
PDF_UPLOADS = [
    Path("/home/ubuntu/.cursor/projects/workspace/uploads/Bars_Benevolo_3ae8.pdf"),
    Path("/home/ubuntu/.cursor/projects/workspace/uploads/Bars_Benevolo_51af.pdf"),
]

ORANGE = (240, 90, 40)
NAVY = (21, 36, 63)
SHADOW = (196, 58, 24)
WHITE = (255, 255, 255)
CREAM = (247, 241, 238)
CHAMP = (232, 201, 160)
COCOA = (20, 14, 10)

BONS_SKUS = [
    {
        "id": "caramelo",
        "name": "Caramelo",
        "nombre_largo": "Bons. con caramelo, malvavisco y galleta",
        "ingredientes": ["Caramelo", "Malvavisco", "Galleta"],
        "bottom": "Bombón grande · Caramelo · malvavisco · galleta",
    },
    {
        "id": "dubai",
        "name": "Dubai",
        "nombre_largo": "Bons. con pistacho, crocante y mantequilla",
        "ingredientes": ["Pistacho", "Crocante", "Mantequilla"],
        "bottom": "Bombón grande · Dubai · pistacho · crocante",
    },
    {
        "id": "tiramisu",
        "name": "Tiramisú",
        "nombre_largo": "Bons. con soletilla, café y cacao",
        "ingredientes": ["Bizcocho soletilla", "Café", "Crema", "Cacao en polvo"],
        "bottom": "Bombón grande · Tiramisú · soletilla · café",
    },
]


def font(size: int):
    for c in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    ):
        if Path(c).exists():
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def sans(size: int, bold=False):
    path = (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    )
    return ImageFont.truetype(path, size) if Path(path).exists() else ImageFont.load_default()


def ensure_assets():
    ASSETS.mkdir(parents=True, exist_ok=True)
    REFS.mkdir(parents=True, exist_ok=True)
    if not BARS_ART.exists():
        raise SystemExit(f"missing Bars art: {BARS_ART}")
    art = Image.open(BARS_ART).convert("RGB")
    art.save(ASSETS / "bars-fear5-front-art.jpg", quality=95)
    try:
        import fitz

        for pdf in PDF_UPLOADS:
            if not pdf.exists():
                continue
            doc = fitz.open(str(pdf))
            pix = doc[0].get_pixmap(matrix=fitz.Matrix(2.5, 2.5))
            full = ASSETS / "bars-carton-dieline.png"
            pix.save(str(full))
            im = Image.open(full).convert("RGB")
            thumb = im.copy()
            thumb.thumbnail((1100, 1100))
            thumb.save(REFS / "bars_benevolo_pdf_p1_web.jpg", quality=88, optimize=True)
            print("wrote PDF dieline", full)
            break
    except Exception as e:
        print("PDF render skip:", e)
    return art


def paint_swirls(d: ImageDraw.ImageDraw, w: int, h: int):
    strokes = [
        ((-w * 0.15, h * 0.25, w * 0.55, h * 1.15), 200, 420, int(h * 0.14)),
        ((-w * 0.05, h * 0.05, w * 0.70, h * 0.95), 180, 400, int(h * 0.11)),
        ((w * 0.05, h * 0.35, w * 0.75, h * 1.25), 210, 430, int(h * 0.10)),
        ((-w * 0.2, h * 0.45, w * 0.45, h * 1.2), 190, 380, int(h * 0.09)),
    ]
    for bbox, start, end, width in strokes:
        d.arc(bbox, start=start, end=end, fill=NAVY, width=width)
    for cx, cy, rx, ry in (
        (w * 0.18, h * 0.78, w * 0.22, h * 0.18),
        (w * 0.42, h * 0.88, w * 0.20, h * 0.14),
        (w * 0.08, h * 0.55, w * 0.16, h * 0.20),
    ):
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=NAVY)


def draw_cb_lockup(im: Image.Image, x: int, y: int, scale: float = 1.0):
    d = ImageDraw.Draw(im)
    r = int(38 * scale)
    d.ellipse((x, y, x + 2 * r, y + 2 * r), outline=WHITE, width=max(2, int(3 * scale)))
    f = font(int(34 * scale))
    bbox = d.textbbox((0, 0), "CB", font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((x + r - tw // 2, y + r - th // 2 - 2), "CB", font=f, fill=WHITE)
    f2 = sans(max(14, int(16 * scale)), bold=True)
    d.text((x + 2 * r + int(10 * scale), y + int(10 * scale)), "CHOCOLATE", font=f2, fill=WHITE)
    d.text((x + 2 * r + int(10 * scale), y + int(28 * scale)), "BENEVOLO", font=f2, fill=CHAMP)


def draw_extruded_wordmark(im: Image.Image, text: str, xy: tuple[int, int], size: int, angle: float = -5):
    f = font(size)
    tmp = Image.new("RGBA", (1, 1))
    d0 = ImageDraw.Draw(tmp)
    bbox = d0.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0] + size // 3, bbox[3] - bbox[1] + size // 3
    layer = Image.new("RGBA", (tw + size, th + size), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    depth = max(4, size // 18)
    for i in range(depth, 0, -1):
        d.text((depth + i, depth + i), text, font=f, fill=SHADOW + (255,))
    d.text((depth, depth), text, font=f, fill=WHITE + (255,))
    rotated = layer.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    im.paste(rotated, xy, rotated)


def compose_front(
    art: Image.Image,
    wordmark: str,
    flavor: str,
    ingredientes: list[str],
    bottom: str,
) -> Image.Image:
    """Deit-style: categoría fija + sabor + ingredientes apilados. Arte Bars. limpio."""
    w, h = art.size
    split = int(w * 0.56)

    canvas = Image.new("RGB", (w, h), ORANGE)
    paint_swirls(ImageDraw.Draw(canvas), int(w * 0.70), h)

    right_src = art.crop((int(w * 0.52), 0, w, h)).convert("RGBA")
    rw, rh = right_src.size
    rd = ImageDraw.Draw(right_src)
    rd.rectangle((0, 0, int(rw * 0.16), rh), fill=ORANGE + (255,))
    rd.rectangle((0, int(rh * 0.72), rw, rh), fill=ORANGE + (255,))
    alpha = Image.new("L", (rw, rh), 255)
    ad = ImageDraw.Draw(alpha)
    ramp = int(rw * 0.28)
    for i in range(ramp):
        ad.line([(i, 0), (i, rh)], fill=int(255 * (i / max(1, ramp))))
    bramp = int(rh * 0.12)
    for j in range(bramp):
        y = rh - bramp + j
        fade = int(255 * (1 - j / bramp))
        for x in range(rw):
            cur = alpha.getpixel((x, y))
            alpha.putpixel((x, y), min(cur, fade))
    right_src.putalpha(alpha)
    target_w = w - split + int(w * 0.06)
    target_h = int(h * 0.92)
    right = right_src.resize((target_w, target_h), Image.Resampling.LANCZOS)
    canvas_rgba = canvas.convert("RGBA")
    canvas_rgba.paste(right, (split - int(w * 0.06), 0), right)
    canvas = canvas_rgba.convert("RGB")

    draw_cb_lockup(canvas, int(w * 0.03), int(h * 0.04), scale=max(0.8, h / 1050))

    d = ImageDraw.Draw(canvas)
    # Categoría fija (como "Bolitas de dátil")
    f_cat = sans(max(16, h // 48), bold=True)
    d.text((int(w * 0.04), int(h * 0.22)), "BOMBÓN GRANDE", font=f_cat, fill=CREAM)

    wm_size = int(min(h * 0.28, (split - int(w * 0.08)) * 0.52))
    draw_extruded_wordmark(canvas, wordmark, (int(w * 0.04), int(h * 0.26)), size=wm_size, angle=-3)

    # Sabor + ingredientes principales (patrón Deit)
    f_name = sans(max(24, h // 30), bold=True)
    f_ing = sans(max(18, h // 42))
    fy = int(h * 0.58)
    d.text((int(w * 0.04), fy), flavor.upper(), font=f_name, fill=WHITE)
    iy = fy + max(32, h // 26)
    for ing in ingredientes:
        d.text((int(w * 0.04), iy), f"·  {ing}", font=f_ing, fill=CREAM)
        iy += max(26, h // 36)

    band_y = int(h * 0.90)
    d.rectangle((0, band_y, w, h), fill=COCOA)
    f_foot = sans(max(18, h // 42))
    d.text((int(w * 0.03), band_y + int(h * 0.028)), bottom, font=f_foot, fill=WHITE)
    url = "ChocolateBenevolo.co"
    bbox = d.textbbox((0, 0), url, font=f_foot)
    tw = bbox[2] - bbox[0]
    d.text((w - tw - int(w * 0.03), band_y + int(h * 0.028)), url, font=f_foot, fill=WHITE)
    return canvas


def make_line_front(
    art: Image.Image,
    wordmark: str,
    flavor: str,
    ingredientes: list[str],
    bottom: str,
    out_path: Path,
    size: tuple[int, int] | None = None,
    wm_size_ratio: float = 0.42,
):
    base = compose_front(art, wordmark, flavor, ingredientes, bottom)
    if size:
        base = base.resize(size, Image.Resampling.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(out_path, quality=94)
    print("wrote", out_path.name)


def make_l0_sticker(front: Image.Image, out_path: Path, box=(50, 45), dpi=14):
    target = (box[0] * dpi, box[1] * dpi)
    sticker = front.resize(target, Image.Resampling.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    sticker.convert("RGB").save(out_path, quality=94)
    print("wrote", out_path.name)


def navy_back_panel(out_path: Path, title: str, variant: str, body_lines: list[str], size=(900, 1200)):
    im = Image.new("RGB", size, NAVY)
    d = ImageDraw.Draw(im)
    d.line((size[0] - 18, 40, size[0] - 18, size[1] - 40), fill=WHITE, width=2)
    y = 70
    d.text((48, y), title, font=font(64), fill=WHITE)
    y += 78
    d.text((48, y), variant, font=font(40), fill=CHAMP)
    y += 60
    d.text((48, y), "By Benévolo", font=font(34), fill=CHAMP)
    y += 58
    d.text((48, y), "Buen Chocolate Indulgente.", font=font(36), fill=CREAM)
    y += 80
    d.text((48, y), "Contiene:", font=sans(26, bold=True), fill=WHITE)
    y += 44
    for line in body_lines:
        d.text((48, y), line, font=sans(28), fill=CREAM)
        y += 36
    y += 28
    d.text((48, y), "Bombón grande · molde mazorca", font=sans(24), fill=CHAMP)
    y += 50
    d.text((48, y), "Elaborado por:", font=sans(26, bold=True), fill=WHITE)
    y += 40
    d.text((48, y), "Chocolate Zurych SAS", font=sans(28), fill=CREAM)
    y += 36
    d.text((48, y), "NSA-0011242-2021", font=sans(24), fill=CHAMP)
    y += 50
    d.text((48, y), "Contacto:", font=sans(26, bold=True), fill=WHITE)
    y += 40
    d.text((48, y), "+57 310 222 7848", font=sans(28), fill=CREAM)
    y += 40
    d.text((48, y), "ChocolateBenevolo.co", font=sans(28), fill=WHITE)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(out_path, quality=94)
    print("wrote", out_path.name)


def svg_image_label(mm_w, mm_h, href_rel: str, title: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="{mm_w}mm" height="{mm_h}mm" viewBox="0 0 {mm_w*10} {mm_h*10}"
  role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>Arte derivado del cartón impreso Bars Benevolo.pdf. Capas guides ocultas.</desc>
  <g id="layer-guides" display="none">
    <rect id="bleed" x="-30" y="-30" width="{mm_w*10+60}" height="{mm_h*10+60}" fill="none" stroke="#00AEEF" stroke-width="2" stroke-dasharray="8 6"/>
    <rect id="trim" x="0" y="0" width="{mm_w*10}" height="{mm_h*10}" fill="none" stroke="#FF00AA" stroke-width="2"/>
    <rect id="safe" x="30" y="30" width="{mm_w*10-60}" height="{mm_h*10-60}" fill="none" stroke="#00FF88" stroke-width="1" stroke-dasharray="4 4"/>
  </g>
  <g id="layer-artwork">
    <image x="0" y="0" width="{mm_w*10}" height="{mm_h*10}" preserveAspectRatio="xMidYMid slice"
      href="{href_rel}" xlink:href="{href_rel}"/>
  </g>
</svg>
'''


def write_both(rel: Path, content: str | None = None, binary: Path | None = None):
    dest = ROOT / rel
    pub = PUBLIC / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    pub.parent.mkdir(parents=True, exist_ok=True)
    if binary:
        data = binary.read_bytes()
        dest.write_bytes(data)
        pub.write_bytes(data)
    elif content is not None:
        dest.write_text(content, encoding="utf-8")
        pub.write_text(content, encoding="utf-8")
    print("mirrored", rel)


def main():
    art = ensure_assets()

    for sku in BONS_SKUS:
        sid = sku["id"]
        front = ASSETS / f"bons-{sid}-front.jpg"
        l0 = ASSETS / f"bons-{sid}-l0.jpg"
        back = ASSETS / f"bons-{sid}-back.jpg"

        make_line_front(art, "Bons.", sku["name"], sku["ingredientes"], sku["bottom"], front)
        make_l0_sticker(Image.open(front), l0)
        navy_back_panel(
            back,
            "Bons.",
            sku["name"],
            ["Ingredientes principales:"] + sku["ingredientes"],
        )

        write_both(Path(f"bons/bons-{sid}-front.jpg"), binary=front)
        write_both(Path(f"bons/bons-{sid}-l0.jpg"), binary=l0)
        write_both(Path(f"bons/bons-{sid}-back.jpg"), binary=back)
        write_both(
            Path(f"bons/bons-{sid}-l0.svg"),
            content=svg_image_label(50, 45, f"bons-{sid}-l0.jpg", f"Bons. {sku['name']} L0"),
        )
        write_both(
            Path(f"bons/bons-{sid}-front.svg"),
            content=svg_image_label(90, 50, f"bons-{sid}-front.jpg", f"Bons. {sku['name']} frente"),
        )
        write_both(
            Path(f"bons/bons-{sid}-back.svg"),
            content=svg_image_label(50, 45, f"bons-{sid}-back.jpg", f"Bons. {sku['name']} dorso"),
        )

    for alias, src in [
        ("bons/bons-l0-front-faithful.jpg", ASSETS / "bons-caramelo-l0.jpg"),
        ("bons/bons-front-faithful.jpg", ASSETS / "bons-caramelo-front.jpg"),
        ("bons/bons-back-faithful.jpg", ASSETS / "bons-caramelo-back.jpg"),
    ]:
        write_both(Path(alias), binary=src)
    write_both(Path("bons/bons-l0-front.svg"), content=svg_image_label(50, 45, "bons-caramelo-l0.jpg", "Bons. Caramelo L0"))
    write_both(Path("bons/bons-label-front-v0.svg"), content=svg_image_label(90, 50, "bons-caramelo-front.jpg", "Bons. Caramelo frente"))
    write_both(Path("bons/bons-l0-back.svg"), content=svg_image_label(50, 45, "bons-caramelo-back.jpg", "Bons. Caramelo dorso"))

    nibs = ASSETS / "nibs-front-faithful.jpg"
    cob = ASSETS / "coberturas-front-faithful.jpg"
    make_line_front(art, "Nibs.", "Tostados", ["100% cacao", "Origen seleccionado"], "Nibs de origen · Neto 150–250 g", nibs)
    make_line_front(
        art,
        "Coberturas.",
        "70%",
        ["1 kg", "Obrador", "Temperar"],
        "Cobertura profesional · temperar",
        cob,
        size=(1800, 900),
    )
    write_both(Path("nibs/nibs-front-faithful.jpg"), binary=nibs)
    write_both(Path("coberturas/coberturas-front-faithful.jpg"), binary=cob)
    write_both(Path("nibs/nibs-l0-sticker.svg"), content=svg_image_label(70, 40, "nibs-front-faithful.jpg", "Nibs."))
    write_both(
        Path("coberturas/coberturas-l0-sticker.svg"),
        content=svg_image_label(70, 40, "coberturas-front-faithful.jpg", "Coberturas."),
    )

    if (ASSETS / "bars-fear5-front-art.jpg").exists():
        write_both(Path("shared/assets/bars-fear5-front-art.jpg"), binary=ASSETS / "bars-fear5-front-art.jpg")

    readme = """# Bons. · familia Deit-style · arte Bars.

Categoría fija: **Bombón grande**. Flex: sabor + ingredientes principales.

| SKU | Nombre largo | Ingredientes |
|-----|--------------|--------------|
| Caramelo | Bons. con caramelo, malvavisco y galleta | Caramelo · Malvavisco · Galleta |
| Dubai | Bons. con pistacho, crocante y mantequilla | Pistacho · Crocante · Mantequilla |
| Tiramisú | Bons. con soletilla, café y cacao | Soletilla · Café · Crema · Cacao |

Ver `FAMILY-FLAVORS.md`.

```bash
python3 brand/chocolate-benevolo/packaging/build_faithful.py
```
"""
    (ROOT / "bons/README-SKUS.md").write_text(readme, encoding="utf-8")
    (ROOT / "FAITHFUL.md").write_text(readme, encoding="utf-8")
    (PUBLIC / "FAITHFUL.md").write_text(readme, encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
