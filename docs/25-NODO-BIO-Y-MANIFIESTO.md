# Bio de Nodo · red social interna · Manifiesto .org

> 2026-08-01 · Amaury (producto / manifiesto) · Hellen (UI) · Oscar (migración Supabase)

---

## 1. Manifiesto

- URL: `/manifiesto`
- Copy: `apps/web/lib/manifiesto.ts`
- Posicionamiento: **organización sin ánimo de lucro** (`cacaocolab.org`) — intermediarios que potencian la comunidad colectiva y colaborativa del cacao.

---

## 2. Onboarding Unirme → Bio de nodo

| Paso | Ruta |
|------|------|
| Unirme (lead) | `/unete` (Navbar CTA) |
| Tras confirmar | CTA **Crear bio de nodo →** |
| Wizard bio (onboarding) | `/unete/bio` |
| Gestión en Mi cuenta | `/cuenta` (wallet + bio) · `/cuenta/bio` |
| API | `POST /api/onboarding/node-bio` |
| Perfil público | `/nodo/[slug]` |
| Directorio | `/nodo` |

**Mi cuenta** es el hub personal: wallet MD, bio de nodo, consejo, beneficios y atajos de campus. La bio también se crea/edita desde `/cuenta/bio` (mismo wizard, con vuelta a la cuenta).

Campos: tipo Colab, nombre, finca/marca, ciudad, intro, foto de perfil, imagen de cacao/producto, contacto, opt-in legal.

Tras publicar: enlace compartible + WhatsApp + copiar.

---

## 3. Migración (Oscar)

```text
supabase/migrations/20260801060000_node_bios.sql
```

Tabla `node_bios` + bucket Storage `node-media`. Sin migración, el API responde 503 con mensaje claro.

---

## 4. Compartir

`https://cacaocolab.org/nodo/{slug}`

Cada nodo puede enviar ese link a aliados para activar la red.
