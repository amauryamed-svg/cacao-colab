# Cacao Colab — App móvil (v2)

> Nuevo en v2. Última actualización: 2026-07-26.

---

## 1. Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Expo (managed workflow) | ~57.0.8 |
| Router | expo-router (file-based, igual patrón que Next.js App Router) | ~57.0.8 |
| Lenguaje | TypeScript | ^5 |
| UI | React Native core (`View`/`Text`/`StyleSheet`) — sin librería de componentes todavía | RN 0.86.0 |
| Tema | `@cacao-colab/ui-tokens` (mismo paquete que `apps/web`) | workspace |
| Tipos compartidos | `@cacao-colab/types` (Zod) | workspace |

**Por qué Expo managed y no bare React Native:** menor fricción para Hellen/Oscar, que vienen de Next.js — no hay que tocar código nativo (Xcode/Android Studio) para la mayoría del trabajo, y EAS Build gestiona los binarios cuando llegue el momento de publicar en stores.

---

## 2. Estructura

```
apps/mobile/
  app.json           ← config Expo (bundle IDs co.cacaocolab.app, scheme cacaocolab)
  metro.config.js    ← config de monorepo (watchFolders, symlinks de pnpm)
  babel.config.js    ← babel-preset-expo
  app/
    _layout.tsx       ← Stack root, importa react-native-gesture-handler primero
    (tabs)/
      _layout.tsx     ← Tabs navigator (3 tabs)
      index.tsx       ← Marketplace (placeholder, solo lectura)
      aprende.tsx     ← Dualita (placeholder)
      perfil.tsx      ← Perfil (placeholder, sin login)
```

---

## 3. Pantallas placeholder (Fase 0 — esta pasada)

| Tab | Contenido | Explícitamente NO incluye |
|-----|-----------|-----------------------------|
| Marketplace (`index.tsx`) | 3 organizaciones de ejemplo (CAÚA, Zurych, Lust) con el mismo shape que `Organization` de `@cacao-colab/types`, **marcadas como placeholder** en la UI y en comentarios de código | Conexión a Supabase/API real, búsqueda, filtros, checkout |
| Aprende (`aprende.tsx`) | Lista de 2 tracks (micro/MOOC) con su estado | Contenido real de lecciones, XP, companion IA |
| Perfil (`perfil.tsx`) | Mensaje explicando que no hay login todavía | Cualquier form de auth — el login de marketplace es Fase 1 (`profiles`), distinto del login de `/equipo` que es exclusivo de `apps/web` |

Los datos de marketplace mostrados son **idénticos en contenido** a `apps/web/lib/brands.ts` para consistencia visual entre plataformas, pero se declaran localmente en el archivo de la pantalla (no se importa `apps/web/lib/*` desde `apps/mobile` — evita acoplar dos apps que deben poder evolucionar independientemente).

---

## 4. Monorepo — cómo Metro resuelve los packages compartidos

Expo/Metro no soporta pnpm workspaces "out of the box" de la misma forma que Next.js — requiere `metro.config.js` explícito:

```js
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.disableHierarchicalLookup = true;
config.resolver.unstable_enableSymlinks = true;
```

Sin esto, Metro no encuentra `@cacao-colab/types` ni `@cacao-colab/ui-tokens` (viven en `packages/*`, fuera de `apps/mobile/node_modules` salvo por el symlink que crea pnpm).

**Fricción adicional encontrada y resuelta:** el ecosistema Expo/React Native asume una resolución "flat" de `node_modules` (varios paquetes — `expo-modules-core`, `react-fast-compare`, `whatwg-fetch`, incluso `semver` dentro de un script interno de `react-native-reanimated` — se importan sin estar declarados como dependencia directa, confiando en que alguien más los hoisteó). El aislamiento estricto de pnpm por defecto rompe esto. Se resolvió con `publicHoistPattern: ["*"]` en `pnpm-workspace.yaml` (hoist completo a `node_modules/` de raíz) + agregar `semver` como dependencia explícita de `apps/mobile` (dependencia real que `react-native-reanimated` usa mas no declara — un bug real de esa librería que el aislamiento de pnpm expuso). Documentado acá para que Oscar/Hellen no lo re-descubran.

---

## 5. Verificación hecha en esta pasada

- `pnpm --filter @cacao-colab/mobile build` (alias de `tsc --noEmit`) — **verde**, sin errores de tipos.
- `pnpm --filter @cacao-colab/mobile lint` (`eslint-config-expo`) — **verde**.
- `npx expo export --platform ios` — **verde**: 1605 módulos, bundle Hermes de 3.6MB generado sin errores. Este es el mismo bundle JS que correría dentro de Expo Go en un iPhone.
- `npx expo export --platform android` — **verde**: 1693 módulos, bundle Hermes de 3.8MB generado sin errores.
- **No verificado en un dispositivo/simulador real ni en Expo Go físico** — este entorno de ejecución no tiene Xcode Simulator, Android emulator, ni un dispositivo físico con Expo Go conectado disponible, así que no se pudo confirmar visualmente que las 3 pantallas rendericen bien (colores, layout, tabs tocables). El bundle compila y empaqueta correctamente para ambas plataformas nativas, que es la señal más fuerte disponible sin un dispositivo — pero no reemplaza abrir la app de verdad. Ver §6 para cómo el usuario lo verifica.

## 6. Cómo Amaury/Oscar/Hellen verifican en Expo Go (paso pendiente del usuario)

```bash
cd apps/mobile
pnpm install     # si no se corrió ya desde la raíz
pnpm start       # expo start
```

Escanear el QR con la app Expo Go (iOS/Android) — debería mostrar las 3 tabs con las pantallas placeholder descritas en §3. Esto es un paso que **debe correr el usuario** (o Oscar/Hellen) con un dispositivo real o simulador — no se puede verificar desde este entorno sin pantalla/dispositivo.

---

## 7. Qué falta (Fase 1+)

- Sentry (`@sentry/react-native` o `sentry-expo`) — no se agregó en esta pasada porque requiere un plugin de config nativo (`app.json` plugins) que no se pudo verificar sin un build nativo real; agregar cuando exista el proyecto Sentry y se pueda probar en un dispositivo.
- Login de marketplace (Supabase Auth, mismo `profiles`/`actor_roles` que la web).
- Conexión real a `apps/api` para listings/aprende (hoy 100% placeholder local).
- Gamificación (XP/rachas/badges) — ver `09-GAMIFICACION.md`.
- Checkout transaccional (Fase 3-4).
- Publicación en App Store / Play Store vía EAS Build (Fase 4).
