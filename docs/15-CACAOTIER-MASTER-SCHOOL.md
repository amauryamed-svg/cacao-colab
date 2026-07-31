# cacaotier · Master School

> Producto y autoría: **Amaury Amed**  
> Núcleo: **Cacao Fine-Flavor**  
> Plataforma: **Cacao Colab**  
> Estado: experiencia web y base móvil implementadas; comercio, pagos y sincronización LMS dependen de servicios externos.

## Ownership y builders

- **Amaury Amed** es founder y owner de `cacaotier`, Master Cacaotier y Master Chocolatier.
- **Amaury Amed, Hellen Bareño y Oscar Gamboa** son los tres builders visibles de Cacao Colab.
- Las marcas regionales son nodos de una red abierta; su participación no transfiere propiedad ni implica sociedad legal.
- Epicentro: `cacaotier`, Bogotá.
- Nodos: Zurych (Landázuri), La Querencia (Arbeláez), La Lomita (Paicol), Quara Cacao (Tame) y Chocolover (Guamal).

## 1. Tesis de producto

**cacaotier** es la identidad educativa profesional del ecosistema Cacao Colab. Conecta cuatro ciclos:

1. **Master Cacaotier**: cultivo, poscosecha, fermentación, secado, datos y calidad.
2. **Master Chocolatier**: tostión, molienda, formulación, sensorial y aplicaciones.
3. **Cacao Gotchi**: capa de hábito; el learner cuida un lote virtual, mantiene racha y toma decisiones.
4. **Cacao Colab**: capa de mercado; evidencia, reputación, actores y productos Fine-Flavor.

Dualita sigue siendo el motor pedagógico de doble velocidad:

- microlearning para una decisión aplicable en menos de 10 minutos;
- MOOC/maestría para competencia profunda y proyecto verificable.

La progresión usa misiones, XP, rangos y credenciales. El XP motiva; la bitácora de lote demuestra la competencia.

## 2. Primer curso: fermentación de precisión

Ruta web: `/aprende/cacaotier`.

### Resultado de aprendizaje

El learner puede comparar tres diseños de fermentación, leer curvas de temperatura y pH, reconocer ventanas de formación de precursores y diseñar un piloto trazable sin confundir una guía con un setpoint universal.

### Seis misiones

| # | Misión | Competencia | XP |
|---|---|---|---:|
| 01 | Leer el lote | Línea base y trazabilidad | 80 |
| 02 | Dominar las tres rutas | Diseño experimental | 100 |
| 03 | Pilotar temperatura + pH | Curvas y decisiones | 120 |
| 04 | Cazar precursores | Metabolitos de aroma | 110 |
| 05 | Elegir el punto de corte | Calidad y riesgo | 130 |
| 06 | Convertir grano en evidencia | Secado, chocolate y réplica | 160 |

Total: **700 XP**.

## 3. Segundo curso: Master Chocolatier · bean-to-bar COEX

| Capa | Ruta |
|---|---|
| Syllabus / marketing | `/aprende/chocolatier` |
| Campaña Dualita (auth) | `/campus/maestro-chocolatier` |

### Resultado de aprendizaje

El learner formula chocolate bean-to-bar con rigor defendible ante un panel estilo Cacao of Excellence: lee el grano, diseña tostión, produce licor limpio, cata a ciegas, formula duja de marañón y entrega **Chocolate Benevolo** como capstone de mercado (preventa).

### Seis misiones

| # | Misión | Competencia | XP |
|---|---|---|---:|
| 01 | Leer el grano FEAR 5 | Materia prima + trazabilidad | 90 |
| 02 | Diseñar la tostión | Tostión + precursores | 110 |
| 03 | Licor, refino y textura | Proceso bean-to-bar | 120 |
| 04 | Panel a la altura COEX | Sensorial + vocabulario | 100 |
| 05 | Formulación duja de marañón | Gianduja + innovación | 140 |
| 06 | Capstone · Chocolate Benevolo | Producto + mercado | 160 |

Total: **720 XP**. Cada misión: 3 pasos + quiz + Dualita. Progreso en `campus_progress` (`maestro-chocolatier`) + Mazorcas Doradas (30 MD/misión, 120 MD al completar).

### Output: Chocolate Benevolo

- FEAR 5 del nodo **Quara Cacao** (Tame · Arauca)
- Alianza de transformación **Zurych**
- Duja de marañón local, leche en polvo orgánica, alulosa y stevia
- Formato Bars. 80 g · preventa en `/benevolo`
- Lente COEX (criterios), no medalla atribuida a la SKU

Código: `apps/web/lib/chocolatier-course.ts`, `apps/web/components/campus/ChocolatierCoursePlayer.tsx`, `apps/web/app/campus/maestro-chocolatier/page.tsx`, `apps/web/app/aprende/chocolatier/page.tsx`.

## 4. Base científica y límites

### Fuente principal

Santander, M. et al. (2025). “Influence of driven fermentation of cacao in bioreactors on quality: decoding the effect of temperature, mixing, and pH on metabolomic, sensory, and volatile profiles”. *LWT—Food Science and Technology*, 231, 118313.

- ScienceDirect: https://www.sciencedirect.com/science/article/pii/S0023643825009971
- DOI: https://doi.org/10.1016/j.lwt.2025.118313

El estudio trabajó con FEAR 5 Trinitario de una finca de Arauquita, un lote homogeneizado, aproximadamente 17 % de remoción de pulpa, biorreactores con 4,5 kg y un control de 60 kg en cajón. Comparó 45 °C constante (Tc) contra gradiente 35→40→45 °C (Tg), dos frecuencias de mezcla y pH espontáneo (pH) contra acidificación inicial (pH_C).

Hallazgos usados en el curso:

- la temperatura y la acidificación inicial fueron los factores dominantes; la mezcla mecánica tuvo efecto limitado;
- la condición Tc-pH (45 °C constante, pH espontáneo) fue la mejor valorada entre las ensayadas;
- el pH interno descendió aproximadamente de 6,3–6,7 a 4,3; **la velocidad** de caída importó más que el valor final;
- una acidificación rápida (~pH 4,6 en 48–72 h) se asoció con mayor amargor y astringencia;
- reducciones más lentas hacia 72–96 h produjeron chocolates con atributos superiores (frutal, nuez, floral, especiado);
- el cajón llegó aproximadamente a 45 °C y pH 4,5 hacia 96 h;
- después de 144 h aumentaron señales asociadas a sobrefermentación y biomarcadores de calidad inferior.

### Tiempos: no hay un solo reloj

| Régimen | Óptimo propuesto (paper) | Pico de marcadores superiores | Evidencia sensorial de chocolate |
|---|---|---|---|
| Tc-pH (45 °C, pH espontáneo) | **72 h** | 72–120 h | Chocolateado a **120 h** (Fig. 6) |
| Biorreactor con pH controlado | **48–72 h** | 24–72 h | No usar como receta de dosificación |
| Cajón estándar (Sg-pH) | **96–120 h** | 72–96 h | Coherente con máximos regionales ~96 h (Llano 2025) |

**Por qué aparece 120 h:** no porque sea el óptimo de precursores en Tc-pH, sino porque ahí se elaboró el chocolate de biorreactor y se correlacionaron péptidos, volátiles y atributos sensoriales. 72 h es una inferencia metabolómica; 120 h es el ancla comparable del panel.

Marcadores de calidad inferior se intensifican entre **96–120 h** en biorreactor y entre **144–192 h** en cajón (p. ej. m/z 349.2124 / Desconocido 15 de Llano et al. 2025).

### Biomarcadores de calidad superior (más abundantes en Tc-pH)

FASKDQPLNA, FASKDQPL, LAIN, ESYF, GINDYRL, IFVPHYNSKAT, FGVPSKL y varios iones m/z asociados. Derivados de vicilina (p. ej. FASKDQPLNAVAF aa 476–488). Correlacionan positivamente con aroma superior y negativamente con acidez, astringencia y amargor.

Redes a 120 h (ejemplos didácticos):

- FASKDQPLNA ↔ acetato de etilo, heptan-2-ol, notas especiadas/vegetales;
- FGVPSKL ↔ linalol, furfural, 2-acetilpirrol, 2-fenilacetaldehído.

Estos marcadores son candidatos; el paper pide validación futura (p. ej. ensayos Maillard in vitro). La app los enseña como hipótesis trazables, no como setpoints de finca.

### Fuente regional complementaria

Llano, S. et al. (2025). “Metabolomic insights into flavour precursor dynamics during fermentation of cacao beans cultivated in diverse climatic production zones in Colombia”. *Food Research International*, 205, 115978. DOI: https://doi.org/10.1016/j.foodres.2025.115978

Incluyó 180 fincas de Arauca y mezclas de materiales, no FEAR 5 puro. El compromiso a 96 h no debe presentarse como óptimo específico de FEAR 5.

### Lo que no se debe afirmar

- que 45 °C/72 h sea óptimo universal;
- que el estudio validó escala industrial;
- que los triplicados analíticos equivalen a réplicas independientes de fermentación;
- que “pH controlado” significó realimentación continua: fue acidificación inicial;
- que la línea de cantina/tanque cervecero fue ensayada por AGROSAVIA.

La concentración de ácido tiene una inconsistencia entre el texto metodológico y la tabla del artículo. La app no prescribe esa dosificación.

## 5. Tres líneas de aprendizaje

### A. Biorreactor isotérmico a 45 °C

Reproduce visualmente la condición publicada más favorable (Tc-pH). Es referencia de precisión a pequeña escala, no receta universal. La réplica inicial debe conservar el cierre a **120 h** para hacer comparable el chocolate del paper; después se pueden comparar cortes experimentales a **72 h** (óptimo metabolómico propuesto).

### B. Cantina de leche o tanque cervecero adaptado

Es una **hipótesis de transferencia tecnológica**. Propone permitir la sucesión inicial y aplicar control térmico gradual desde 48 h. “Control de pH” significa medir y tomar decisiones; no agregar ácido automáticamente. Requiere validar:

- acero inoxidable y aptitud alimentaria;
- geometría, drenaje y limpieza;
- masa mínima/máxima;
- uniformidad centro–pared;
- cizalla de la agitación;
- inocuidad;
- cortes a 96 y 120 h.

### C. Cajón tradicional de madera

Es la referencia de finca. La masa, la geometría, el ambiente y los volteos cambian la curva. Debe medirse en centro, periferia y, si aplica, diferentes alturas.

## 6. Arquitectura implementada

### Web

- `apps/web/app/page.tsx`: nueva narrativa del ecosistema.
- `apps/web/app/aprende/page.tsx`: campus Master Cacaotier/Master Chocolatier.
- `apps/web/app/aprende/cacaotier/page.tsx`: curso y laboratorio.
- `apps/web/app/aprende/chocolatier/page.tsx`: syllabus bean-to-bar COEX y capstone Benevolo.
- `apps/web/app/campus/maestro-chocolatier/page.tsx`: campaña Dualita auth-gated.
- `apps/web/components/campus/ChocolatierCoursePlayer.tsx`: player de misiones, quiz y XP.
- `apps/web/components/cacaotier/FermentationLab.tsx`: simulador cliente, curvas SVG y línea temporal.
- `apps/web/lib/cacaotier-course.ts`: contenido tipado, métodos, datos didácticos, misiones y fuentes.
- `apps/web/lib/chocolatier-course.ts`: misiones, formulación Benevolo y principios COEX.
- `apps/web/proxy.ts`: convención de Next.js 16 para refresco de Supabase Auth.

### Mobile

El scaffold Expo presenta la misma arquitectura conceptual:

- Mercado: directorio Cacao Colab;
- Campus: maestrías y campaña;
- Mi lote: identidad Cacao Gotchi.

No duplica todavía toda la simulación web. La siguiente extracción debe mover `cacaotier-course.ts` a un package compartido, separando datos puros de URLs web.

## 7. Ejecución plug-and-play

Requisitos: Node 20.9+ y pnpm 11.

```bash
pnpm install
pnpm dev:web
```

Web: `http://localhost:3000`  
Curso: `http://localhost:3000/aprende/cacaotier`

Validación:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Mobile:

```bash
pnpm dev:mobile
```

## 8. Variables externas

La experiencia pública y el curso funcionan sin credenciales. Para funciones conectadas:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` solo en servidor
- `HUBSPOT_ACCESS_TOKEN`
- `STRIPE_SECRET_KEY` y secretos de webhooks cuando exista cuenta Connect
- `ANTHROPIC_API_KEY` para el companion
- `NEXT_PUBLIC_SENTRY_DSN`/DSN por app, opcional

Nunca exponer claves de servicio en Expo ni en variables `NEXT_PUBLIC_*`.

## 9. Camino a App Store

1. Extraer contenido compartido a `packages/course-content`.
2. Persistir progreso, XP y rachas en Supabase con cola offline.
3. Implementar autenticación de learners y migración del progreso local.
4. Construir el laboratorio con `react-native-svg`.
5. Añadir descarga offline de lecciones y bitácora de campo.
6. Implementar compras según reglas de Apple/Google; no asumir que Stripe web puede vender contenido digital dentro de la app.
7. Configurar EAS Build, identificadores, privacidad, borrado de cuenta y revisión de store.

## 10. Próximos contratos funcionales

- `Course`, `Mission`, `Observation`, `Batch`, `CurveSample`, `AssessmentAttempt`.
- `Observation`: hora, temperatura centro/periferia, pH interno, olor, corte, operador y timestamp.
- modo offline-first con UUID local e idempotencia al sincronizar;
- evidencia adjunta por lote;
- certificado solo tras evaluación y proyecto, no por XP;
- catálogo marketplace con claims verificables y trazabilidad visible.

## 11. Criterio editorial

Todo valor mostrado debe marcarse como:

- **publicado**: trazable a fuente;
- **observado**: dato de un lote del usuario;
- **propuesto**: hipótesis o diseño piloto;
- **calculado**: transformación explícita de datos.

Esta taxonomía evita convertir una visualización pedagógica en una recomendación agronómica universal.

## 12. Cacao Gotchi alpha

Ruta web: `/juega`.

La primera alpha implementa:

- estados desde semilla hasta cosecha;
- decisiones de agua, sombra, observación y suelo;
- humedad, vitalidad y conocimiento;
- XP, racha local y progresión por acciones;
- persistencia en `localStorage` bajo `cacao_gotchi_v1`;
- demo móvil de cuidado en la pestaña `Mi lote`.

La simulación no representa un modelo agronómico calibrado. La siguiente fase debe conectar observaciones reales, clima, fotos, bitácoras y badges verificables. El XP reconoce participación; no certifica calidad por sí solo.

## 13. Sincronía pedagógica

| Capa | Propósito | Participación visible |
|---|---|---|
| MOOC Contexto Cacao | Historia, territorio, cultura y futuro del cacao | Patrocinado por Zurych |
| Microlearning Cacao Funcional | Elección de producto, hábitos y consumo saludable en contexto | Contenido educativo CAÚA |
| Master Cacaotier / Chocolatier | Competencia profesional, proyecto y evidencia | Marca fundada por Amaury Amed |
| Nodos regionales | Retos, lotes y conocimiento territorial | Zurych, La Querencia, La Lomita, Quara Cacao y Chocolover |

Una pauta o patrocinio debe identificarse como tal. Financiar contenido no compra una conclusión científica, una credencial ni un claim de salud.

## 14. Campus registrado

Rutas:

- `/cuenta/entrar`: Google, Apple y magic link;
- `/cuenta`: identidad y accesos del learner;
- `/campus/arquitecto-fermentacion`: seis misiones guiadas por Dualita;
- `/juega`: Cacao Gotchi registrado.

La migración `20260729190012_campus_registered_progress.sql` crea:

- `campus_progress`: estado y XP por campaña;
- `gotchi_runs`: nodo, genotipo, tratamiento y estado del árbol/lote;
- RLS para que cada persona solo gestione sus propias filas;
- registro idempotente de Amaury Amed como tercer builder del portal interno.

Configuración externa obligatoria:

1. Habilitar Email, Google y Apple en Supabase Auth.
2. Agregar `https://cacao-colab.vercel.app/auth/callback` y URLs de preview permitidas.
3. Configurar credenciales OAuth de Google.
4. Configurar Service ID, Team ID y key de Apple.
5. Ejecutar `supabase db push` para aplicar la migración.

Sin estos pasos, el código compila pero OAuth o el guardado remoto responderán con un error explícito.

## 15. Arquitecto de Fermentación

La campaña completa contiene 18 tarjetas, seis retos y 700 XP:

1. línea base y trazabilidad;
2. diseño de tres rutas;
3. curvas de temperatura y pH;
4. precursores de aroma;
5. punto de corte;
6. réplica, evaluación y claim responsable.

Dualita mantiene tres corazones por reto, ofrece feedback y desbloquea las misiones secuencialmente. El avance se guarda en `campus_progress`; `localStorage` conserva una copia resiliente.

## 16. Crecimiento horario y fermentación Gotchi

Cacao Gotchi v2 registra edad en horas, altura, hojas, flores, mazorcas, humedad, nutrición, pH de suelo, sombra, salud y conocimiento. El modelo:

- aplica crecimiento según tiempo real transcurrido;
- ofrece avance comprimido de 12 h para entrenamiento;
- permite elegir uno de los cinco nodos;
- usa FEAR 5 Trinitario comercial como escenario declarado, no como disponibilidad confirmada;
- desbloquea “Fermentación controlada Cacaotier” después de cosecha;
- recorre controles a 0, 24, 48, 72, 96 y 120 h.

No es un modelo agronómico predictivo ni demuestra que FEAR 5 esté cultivado o disponible en cada nodo.
