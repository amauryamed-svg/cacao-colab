#!/usr/bin/env python3
"""Genera SOP B0 V0 FEAR 5 · La Querencia (PPTX) con membrete Cacao Colab."""

from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

# Brand
FOREST = RGBColor(0x1A, 0x2E, 0x10)
CREAM = RGBColor(0xF7, 0xF1, 0xEE)
YELLOW = RGBColor(0xF2, 0xC8, 0x30)
CORAL = RGBColor(0xFF, 0x6A, 0x3D)
MUTED = RGBColor(0x5C, 0x6B, 0x52)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

W = Inches(13.333)
H = Inches(7.5)
OUT = Path(__file__).resolve().parent / "SOP-B0-V0-FEAR5-La-Querencia.pptx"
ART = Path("/opt/cursor/artifacts/SOP-B0-V0-FEAR5-La-Querencia.pptx")


def set_run(run, *, size=18, bold=False, color=FOREST, font="Georgia"):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font
    try:
        rPr = run._r.get_or_add_rPr()
        latin = rPr.get_or_add_latin()
        latin.typeface = font
    except Exception:
        pass


def add_textbox(slide, left, top, width, height, text, *, size=18, bold=False, color=FOREST, font="Georgia", align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    tf.auto_size = None
    try:
        tf._txBody.bodyPr.set("anchor", {MSO_ANCHOR.TOP: "t", MSO_ANCHOR.MIDDLE: "ctr", MSO_ANCHOR.BOTTOM: "b"}[anchor])
    except Exception:
        pass
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    set_run(run, size=size, bold=bold, color=color, font=font)
    return box


def add_para(tf, text, *, size=16, bold=False, color=FOREST, font="Calibri", space_before=6, space_after=4, align=PP_ALIGN.LEFT):
    p = tf.add_paragraph()
    p.alignment = align
    p.space_before = Pt(space_before)
    p.space_after = Pt(space_after)
    run = p.add_run()
    run.text = text
    set_run(run, size=size, bold=bold, color=color, font=font)
    return p


def letterhead(slide, *, dark=False):
    """Barra superior membrete Cacao Colab."""
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, Inches(0.72))
    bar.fill.solid()
    bar.fill.fore_color.rgb = FOREST if not dark else FOREST
    bar.line.fill.background()

    accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(0.72), W, Inches(0.08))
    accent.fill.solid()
    accent.fill.fore_color.rgb = YELLOW
    accent.line.fill.background()

    add_textbox(
        slide,
        Inches(0.55),
        Inches(0.14),
        Inches(6),
        Inches(0.45),
        "CACAO COLAB",
        size=20,
        bold=True,
        color=YELLOW,
        font="Georgia",
    )
    add_textbox(
        slide,
        Inches(7.2),
        Inches(0.18),
        Inches(5.5),
        Inches(0.4),
        "SOP · Fermentación de precisión  ·  Confidencial nodo",
        size=12,
        bold=False,
        color=CREAM,
        font="Calibri",
        align=PP_ALIGN.RIGHT,
    )


def footer(slide, page: int, total: int):
    add_textbox(
        slide,
        Inches(0.55),
        Inches(7.05),
        Inches(8),
        Inches(0.3),
        "La Querencia · FEAR 5 · B0 / V0  ·  cacaocolab.org",
        size=11,
        color=MUTED,
        font="Calibri",
    )
    add_textbox(
        slide,
        Inches(11.2),
        Inches(7.05),
        Inches(1.5),
        Inches(0.3),
        f"{page} / {total}",
        size=11,
        color=MUTED,
        font="Calibri",
        align=PP_ALIGN.RIGHT,
    )


def blank_slide(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def bullet_block(slide, left, top, width, height, lines, *, size=16, color=FOREST):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    first = True
    for line in lines:
        if first:
            p = tf.paragraphs[0]
            first = False
        else:
            p = tf.add_paragraph()
        p.alignment = PP_ALIGN.LEFT
        p.space_before = Pt(4)
        p.space_after = Pt(4)
        p.level = 0
        run = p.add_run()
        run.text = "•  " + line
        set_run(run, size=size, color=color, font="Calibri")
    return box


def card(slide, left, top, width, height, fill=CREAM):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.color.rgb = RGBColor(0xD8, 0xCF, 0xC2)
    shape.line.width = Pt(1)
    return shape


def build():
    prs = Presentation()
    prs.slide_width = W
    prs.slide_height = H
    total = 10

    # ── 1 Portada ──
    s = blank_slide(prs)
    bg = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, H)
    bg.fill.solid()
    bg.fill.fore_color.rgb = FOREST
    bg.line.fill.background()
    yellow_bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(6.55), W, Inches(0.95))
    yellow_bar.fill.solid()
    yellow_bar.fill.fore_color.rgb = YELLOW
    yellow_bar.line.fill.background()

    add_textbox(s, Inches(0.7), Inches(0.55), Inches(10), Inches(0.4), "CACAO COLAB  ×  LA QUERENCIA", size=14, bold=True, color=YELLOW, font="Calibri")
    add_textbox(s, Inches(0.7), Inches(1.4), Inches(11.5), Inches(1.2), "SOP B0 · Versión 0", size=44, bold=True, color=CREAM, font="Georgia")
    add_textbox(s, Inches(0.7), Inches(2.55), Inches(11.5), Inches(0.8), "Micro-lote FEAR 5 · Curva temperatura vs pH", size=26, color=YELLOW, font="Georgia")
    add_textbox(
        s,
        Inches(0.7),
        Inches(3.5),
        Inches(11),
        Inches(1.4),
        "Prueba experimental de 1,5 kg antes del bioreactor.\n"
        "Objetivo único: validar que la temperatura sube rápido a 45 °C,\n"
        "se sostiene, y el pH baja lento hasta ≤ 4,5 en 72–96 h.",
        size=18,
        color=CREAM,
        font="Calibri",
    )
    add_textbox(s, Inches(0.7), Inches(6.75), Inches(8), Inches(0.4), "Para: Rafael  ·  Operador de finca / fermentación", size=16, bold=True, color=FOREST, font="Calibri")
    add_textbox(s, Inches(9.2), Inches(6.75), Inches(3.5), Inches(0.4), "Documento V0 · Sep 2026", size=14, color=FOREST, font="Calibri", align=PP_ALIGN.RIGHT)

    # ── 2 Para qué es B0 ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.55), "1. Para qué sirve esta prueba B0", size=28, bold=True, color=FOREST, font="Georgia")
    bullet_block(
        s,
        Inches(0.55),
        Inches(1.75),
        Inches(12),
        Inches(4.5),
        [
            "No es un bioreactor todavía. Es la versión cero: tanque + cesta + termófilas + sol si hace falta.",
            "Validamos UNA hipótesis: curva de temperatura (rápida a 45 °C y estable) vs curva de pH (descenso lento a ≤ 4,5).",
            "Material: FEAR 5 en mini-cosecha (~12 días; la fecha exacta depende del clima).",
            "Escala: 1,5 kg de grano fresco desmucilaginado parcialmente.",
            "Éxito B0 = curvas registradas día a día + dos muestras (72 h y 96 h) para precursores de sabor.",
            "Después miramos B1 (bolsas al vacío + retrocirculador), B2 (tanque brewing/yogur) y B3 (bioreactor ~150 kg).",
        ],
        size=18,
    )
    footer(s, 2, total)

    # ── 3 Escalera B0–B3 ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "2. Escalera de versiones (contexto)", size=28, bold=True, color=FOREST, font="Georgia")
    add_textbox(s, Inches(0.55), Inches(1.55), Inches(12), Inches(0.4), "Ahora solo ejecutamos B0. Lo demás es mapa de ruta.", size=16, color=MUTED, font="Calibri")

    stages = [
        ("B0 · V0", "1,5 kg", "Tanque + cesta\nTermófilas / sol\nSin agua en grano", YELLOW),
        ("B1 · V1", "~1,5–15 kg", "Bolsas al vacío\nen el mismo tanque\n+ agua a 45 °C", CREAM),
        ("B2 · V2", "~15 kg", "Tanque brewing /\nyogur / amasado\nTemp. constante", CREAM),
        ("B3 · V3", "~150 kg", "Bioreactor tipo\nAgrosavia\nEscalamiento", CREAM),
    ]
    for i, (title, scale, body, fill) in enumerate(stages):
        left = Inches(0.55 + i * 3.15)
        card(s, left, Inches(2.2), Inches(2.95), Inches(3.6), fill=fill if fill != YELLOW else YELLOW)
        title_c = FOREST
        add_textbox(s, left + Inches(0.15), Inches(2.4), Inches(2.65), Inches(0.45), title, size=18, bold=True, color=title_c, font="Georgia")
        add_textbox(s, left + Inches(0.15), Inches(2.9), Inches(2.65), Inches(0.35), scale, size=14, bold=True, color=CORAL if fill == YELLOW else MUTED, font="Calibri")
        add_textbox(s, left + Inches(0.15), Inches(3.4), Inches(2.65), Inches(2.0), body, size=14, color=FOREST, font="Calibri")
    footer(s, 3, total)

    # ── 4 Materiales ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "3. Qué necesitas (B0)", size=28, bold=True, color=FOREST, font="Georgia")

    card(s, Inches(0.55), Inches(1.8), Inches(6.0), Inches(4.6), CREAM)
    add_textbox(s, Inches(0.75), Inches(2.0), Inches(5.5), Inches(0.4), "Equipo", size=18, bold=True, color=FOREST, font="Georgia")
    bullet_block(
        s,
        Inches(0.75),
        Inches(2.5),
        Inches(5.5),
        Inches(3.6),
        [
            "Tanque de acero inoxidable limpio",
            "Cesta para el grano (sin agua)",
            "Tapa / cobertor para fase anaeróbica",
            "Termómetro (ideal con registro)",
            "pH-metro calibrado + agua destilada",
            "Prensa de algodón (manual)",
            "Cantinas de miel (para mucílago)",
            "Balanza + bolsas para muestras 500 g",
            "Bitácora impresa o libreta",
        ],
        size=15,
    )

    card(s, Inches(6.8), Inches(1.8), Inches(5.9), Inches(4.6), CREAM)
    add_textbox(s, Inches(7.0), Inches(2.0), Inches(5.5), Inches(0.4), "Material biológico", size=18, bold=True, color=FOREST, font="Georgia")
    bullet_block(
        s,
        Inches(7.0),
        Inches(2.5),
        Inches(5.5),
        Inches(3.6),
        [
            "FEAR 5 fresco de La Querencia",
            "Carga objetivo: 1,5 kg de grano",
            "Mini-cosecha prevista ~12 días",
            "(ajustar según clima real)",
            "Opción: pasar grano desde el cajón",
            "cuando ya haya ganado calor",
            "hacia el tanque de acero",
        ],
        size=15,
    )
    footer(s, 4, total)

    # ── 5 Paso a paso preparación ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "4. Paso a paso · Preparación (Día 0)", size=28, bold=True, color=FOREST, font="Georgia")

    steps = [
        ("01", "Cosechar / seleccionar", "Solo FEAR 5 maduro de la mini-cosecha. Anotar fecha, lote y kilos frescos."),
        ("02", "Quitar ~20 % mucílago", "Prensa de algodón manual. No lavar con agua. Dejar mucílago residual en el grano."),
        ("03", "Recoger mucílago", "Llevar a cantinas de miel. Refrigerar o congelar. Etiquetar: fecha + FEAR 5 + Querencia."),
        ("04", "Cargar la cesta", "1,5 kg de grano en la cesta, sin agua, dentro del tanque de acero. Cubrir el cotiledón / masa."),
        ("05", "Arranque térmico", "Dejar que las termófilas suban el calor. Si no sube, ayudar al sol (aeróbico) hasta acercarse a 45 °C."),
    ]
    for i, (num, title, body) in enumerate(steps):
        top = Inches(1.7 + i * 0.95)
        num_box = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.55), top, Inches(0.55), Inches(0.55))
        num_box.fill.solid()
        num_box.fill.fore_color.rgb = YELLOW
        num_box.line.fill.background()
        add_textbox(s, Inches(0.55), top + Inches(0.1), Inches(0.55), Inches(0.4), num, size=14, bold=True, color=FOREST, font="Calibri", align=PP_ALIGN.CENTER)
        add_textbox(s, Inches(1.3), top, Inches(11), Inches(0.35), title, size=18, bold=True, color=FOREST, font="Georgia")
        add_textbox(s, Inches(1.3), top + Inches(0.35), Inches(11), Inches(0.45), body, size=14, color=MUTED, font="Calibri")
    footer(s, 5, total)

    # ── 6 Fermentación ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "5. Fermentación · Protocolo B0", size=28, bold=True, color=FOREST, font="Georgia")

    card(s, Inches(0.55), Inches(1.75), Inches(6.0), Inches(4.5), CREAM)
    add_textbox(s, Inches(0.75), Inches(1.95), Inches(5.5), Inches(0.4), "Fase A · Aeróbica (0–48 h)", size=18, bold=True, color=FOREST, font="Georgia")
    bullet_block(
        s,
        Inches(0.75),
        Inches(2.5),
        Inches(5.5),
        Inches(3.4),
        [
            "Grano en cesta, sin agua, tapado suave / ventilado.",
            "Meta: subir rápido hacia 45 °C.",
            "Si las termófilas no alcanzan: exposición solar controlada.",
            "Medir temperatura mínimo 2×/día (mañana y tarde).",
            "Medir pH 1×/día (misma hora). Anotar en bitácora.",
            "No agregar agua al grano.",
        ],
        size=15,
    )

    card(s, Inches(6.8), Inches(1.75), Inches(5.9), Inches(4.5), CREAM)
    add_textbox(s, Inches(7.0), Inches(1.95), Inches(5.5), Inches(0.4), "Fase B · Anaeróbica (48–96 h)", size=18, bold=True, color=FOREST, font="Georgia")
    bullet_block(
        s,
        Inches(7.0),
        Inches(2.5),
        Inches(5.5),
        Inches(3.4),
        [
            "Tapar bien (anaeróbico) una vez haya calor.",
            "Sostener lo más cerca posible de 45 °C constantes.",
            "pH debe bajar lento desde el valor inicial → 4,5 mínimo.",
            "Continuar bitácora diaria de T° y pH.",
            "Ventana de muestreo: hora 72 y hora 96.",
            "Si a las 72 h ya está ≤ 4,5 y T° estable: tomar muestra 1.",
        ],
        size=15,
    )
    footer(s, 6, total)

    # ── 7 Targets curvas ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "6. Lo que validamos: curvas", size=28, bold=True, color=FOREST, font="Georgia")

    card(s, Inches(0.55), Inches(1.8), Inches(6.0), Inches(4.4), FOREST)
    add_textbox(s, Inches(0.75), Inches(2.05), Inches(5.5), Inches(0.4), "Temperatura", size=20, bold=True, color=YELLOW, font="Georgia")
    bullet_block(
        s,
        Inches(0.75),
        Inches(2.65),
        Inches(5.5),
        Inches(3.2),
        [
            "Subir rápido a 45 °C",
            "Mantener ~45 °C durante 72 h (ideal)",
            "Extensión máxima de observación: 96 h",
            "Registrar cada medición (hora + °C)",
            "B0: control manual (termófilas + sol)",
        ],
        size=16,
        color=CREAM,
    )

    card(s, Inches(6.8), Inches(1.8), Inches(5.9), Inches(4.4), CREAM)
    add_textbox(s, Inches(7.0), Inches(2.05), Inches(5.5), Inches(0.4), "pH", size=20, bold=True, color=FOREST, font="Georgia")
    bullet_block(
        s,
        Inches(7.0),
        Inches(2.65),
        Inches(5.5),
        Inches(3.2),
        [
            "Partir del pH inicial real del lote",
            "Bajar lentamente (no forzar con ácidos)",
            "Meta: ≤ 4,5 (mínimo aceptable)",
            "1 medición diaria, misma hora",
            "Graficar pH vs horas (junto a T°)",
        ],
        size=16,
    )
    footer(s, 7, total)

    # ── 8 Muestreo ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "7. Muestreo 72 h y 96 h", size=28, bold=True, color=FOREST, font="Georgia")
    add_textbox(
        s,
        Inches(0.55),
        Inches(1.6),
        Inches(12),
        Inches(0.5),
        "Dos tomas de 500 g para comparar acumulación de precursores de sabor (referencia paper Santander 2025 · FEAR 5).",
        size=16,
        color=MUTED,
        font="Calibri",
    )

    for i, (title, when, note) in enumerate(
        [
            ("Muestra A", "Hora 72", "500 g · etiquetar B0-72h · fecha · pH · T°"),
            ("Muestra B", "Hora 96", "500 g · etiquetar B0-96h · fecha · pH · T°"),
        ]
    ):
        left = Inches(0.55 + i * 6.3)
        card(s, left, Inches(2.3), Inches(5.9), Inches(2.4), YELLOW if i == 0 else CREAM)
        add_textbox(s, left + Inches(0.25), Inches(2.5), Inches(5.4), Inches(0.4), title, size=22, bold=True, color=FOREST, font="Georgia")
        add_textbox(s, left + Inches(0.25), Inches(3.05), Inches(5.4), Inches(0.35), when, size=18, bold=True, color=CORAL if i == 1 else FOREST, font="Calibri")
        add_textbox(s, left + Inches(0.25), Inches(3.55), Inches(5.4), Inches(0.8), note, size=15, color=FOREST, font="Calibri")

    add_textbox(
        s,
        Inches(0.55),
        Inches(5.0),
        Inches(12),
        Inches(1.4),
        "Conservación: congelar o refrigerar según protocolo de laboratorio acordado.\n"
        "Más adelante (B1→B3) se mirará el decaimiento de los 7 biomarcadores precursores\n"
        "y la pérdida por errores de fermentación o transferencia tecnológica entre etapas.",
        size=15,
        color=FOREST,
        font="Calibri",
    )
    footer(s, 8, total)

    # ── 9 Bitácora ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "8. Bitácora diaria (imprimir / copiar)", size=28, bold=True, color=FOREST, font="Georgia")

    # Simple table
    rows, cols = 6, 6
    table = s.shapes.add_table(rows, cols, Inches(0.55), Inches(1.75), Inches(12.2), Inches(4.4)).table
    headers = ["Hora / día", "T °C", "pH", "Fase (A/B)", "Observación", "Iniciales"]
    widths = [1.8, 1.4, 1.4, 1.8, 4.0, 1.8]
    for j, h in enumerate(headers):
        cell = table.cell(0, j)
        cell.text = h
        for p in cell.text_frame.paragraphs:
            for run in p.runs:
                set_run(run, size=13, bold=True, color=FOREST, font="Calibri")
        cell.fill.solid()
        cell.fill.fore_color.rgb = YELLOW
        table.columns[j].width = Inches(widths[j])

    examples = [
        ["0 h (inicio)", "", "", "A", "Carga 1,5 kg / mucílago 20%", ""],
        ["24 h", "", "", "A", "", ""],
        ["48 h", "", "", "A→B", "Cierre anaeróbico", ""],
        ["72 h", "", "", "B", "Muestra A 500 g", ""],
        ["96 h", "", "", "B", "Muestra B 500 g", ""],
    ]
    for i, row in enumerate(examples, start=1):
        for j, val in enumerate(row):
            cell = table.cell(i, j)
            cell.text = val
            for p in cell.text_frame.paragraphs:
                for run in p.runs:
                    set_run(run, size=12, color=FOREST, font="Calibri")
            if i % 2 == 0:
                cell.fill.solid()
                cell.fill.fore_color.rgb = CREAM
    footer(s, 9, total)

    # ── 10 Checklist + cierre ──
    s = blank_slide(prs)
    letterhead(s)
    add_textbox(s, Inches(0.55), Inches(1.05), Inches(12), Inches(0.5), "9. Checklist B0 · Listo cuando…", size=28, bold=True, color=FOREST, font="Georgia")
    bullet_block(
        s,
        Inches(0.55),
        Inches(1.7),
        Inches(12),
        Inches(3.2),
        [
            "Bitácora completa de T° y pH (al menos 1 pH/día y 2 T°/día).",
            "Temperatura alcanzó ~45 °C y se sostuvo la mayor parte de 72 h.",
            "pH bajó de forma gradual hasta ≤ 4,5 (o se documentó por qué no).",
            "Muestras A (72 h) y B (96 h) de 500 g etiquetadas y conservadas.",
            "Mucílago (20 %) en cantinas, refrigerado/congelado, con etiqueta.",
            "Fotos del montaje (cesta + tanque) al inicio y al cierre.",
        ],
        size=17,
    )
    card(s, Inches(0.55), Inches(5.0), Inches(12.2), Inches(1.5), FOREST)
    add_textbox(
        s,
        Inches(0.8),
        Inches(5.2),
        Inches(11.7),
        Inches(1.1),
        "Siguiente paso: con las curvas de B0 decidimos B1 (bolsas al vacío + retrocirculador de agua a 45 °C).\n"
        "Rafael ejecuta B0. El Colab interpreta curvas y precursores. Sin B0 no hay B1.",
        size=16,
        color=CREAM,
        font="Calibri",
    )
    footer(s, 10, total)

    prs.save(OUT)
    prs.save(ART)
    print(f"Wrote {OUT}")
    print(f"Wrote {ART}")


if __name__ == "__main__":
    build()
