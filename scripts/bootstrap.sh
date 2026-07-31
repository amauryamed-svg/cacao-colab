#!/usr/bin/env bash
# Cacao Colab — plug-and-play bootstrap
# Builders fundadores: Amaury (PM) · Hellen (Frontend) · Oscar (Backend)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo ""
echo "  Cacao Colab · plug and play"
echo "  Builders fundadores: Amaury · Hellen · Oscar"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "✗ Node.js no encontrado. Instala Node ≥ 20: https://nodejs.org"
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "✗ Node $NODE_MAJOR detectado. Se requiere ≥ 20."
  exit 1
fi
echo "✓ Node $(node -v)"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "→ Activando pnpm vía corepack…"
  corepack enable
  corepack prepare pnpm@11.17.0 --activate
fi
echo "✓ pnpm $(pnpm -v)"

echo ""
echo "→ pnpm install (monorepo)…"
pnpm install

echo ""
echo "════════════════════════════════════════════"
echo "  Listo. Arranca según tu rol:"
echo ""
echo "  Hellen (Frontend)  pnpm dev:web"
echo "  Oscar  (Backend)   pnpm dev:api"
echo "  Móvil  (Expo Go)   pnpm --filter @cacao-colab/mobile start"
echo "  Typecheck          pnpm typecheck"
echo ""
echo "  Docs:   docs/20-PLUG-AND-PLAY.md"
echo "  Stores: docs/21-APP-STORES.md"
echo "  Live:   https://cacao-colab.vercel.app"
echo "════════════════════════════════════════════"
echo ""
