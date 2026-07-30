# Ecosistema de conocimiento · Cacao Colab

## 1. Propósito

Traducir conocimiento especializado (biotecnología de fermentación, regulación UE, calidad internacional y genética) a rutas prácticas: siembra, labranza, campus y producto comestible. La punta de lanza es **Chocolate Benevolo**, output del módulo **Master Chocolatier**.

## 2. Superficies

| Ruta | Contenido |
|---|---|
| `/conocimiento` | Hub de rutas con nivel de evidencia |
| `/conocimiento/[slug]` | EUDR, orgánico/cooperación, DO, COEX, Ecoyuma/FEAR 5, Benevolo |
| `/aprende/chocolatier` | Master Chocolatier · bean-to-bar con lente COEX · capstone Benevolo |
| `/benevolo` | Chocolate Benevolo Bars. · FEAR 5 Quara × Zurych · preventa WhatsApp |
| Ecoyuma (externo) | Plántulas FEAR-5, TCS-19, TCS-06 |

## 3. Reglas de honestidad

- **EUDR** se cita como Reglamento (UE) 2023/1115; las fechas de aplicación se verifican en fuentes oficiales porque han cambiado.
- **Orgánico ≠ libre de deforestación.**
- **Denominación de origen araucana** se presenta como proceso territorial en curso, no como DO ya registrada.
- **Swisscontact / FAO / UE** aparecen como actores del ecosistema público, no como contratos firmados del Colab salvo evidencia explícita.
- **Cacao of Excellence** y el trabajo de Sebastián Escobar se enlazan como referencia de calidad/investigación.
- **Ecoyuma** es catálogo externo: stock y precio viven en `tienda.ecoyuma.com.co`.
- En Ecoyuma los códigos son **TCS-19** y **TCS-06**; en campo a veces se dicen TSS.
- **Benevolo** es preventa: no se simula checkout ni stock.
- **COEX lens**: usamos criterios de Cacao of Excellence (ciego, tipicidad, cero defectos negociables); no atribuimos medalla COEX a la SKU.
- **Quara Cacao** (Tame · Arauca) es el nodo FEAR 5 del Colab para Benevolo.

## 4. Eventos analytics

`knowledge_link_clicked`, `ecoyuma_link_clicked`, `benevolo_interest` — migración `20260730182015_knowledge_ecosystem_events.sql`.

## 5. Código

- `apps/web/lib/knowledge-base.ts`
- `apps/web/lib/chocolatier-course.ts`
- `apps/web/app/conocimiento/*`
- `apps/web/app/aprende/chocolatier/page.tsx`
- `apps/web/app/benevolo/page.tsx`
- Marcas `benevolo`, `quara` y `ecoyuma` en `apps/web/lib/brands.ts`
