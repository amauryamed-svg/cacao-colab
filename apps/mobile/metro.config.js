// Config estándar de Expo para monorepos (pnpm workspaces) — necesaria
// para que Metro resuelva @cacao-colab/types y @cacao-colab/ui-tokens
// desde packages/*. Ver https://docs.expo.dev/guides/monorepos/.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
// pnpm usa symlinks — necesario para que Metro los siga en vez de tratar
// los paquetes del workspace como externos.
config.resolver.disableHierarchicalLookup = true;
config.resolver.unstable_enableSymlinks = true;

module.exports = config;
