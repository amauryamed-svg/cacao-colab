// eslint-config-expo ships a flat config preset (mismo mecanismo que
// `expo lint` genera por defecto en SDK 57+).
import expoConfig from "eslint-config-expo/flat.js";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...expoConfig,
  globalIgnores(["dist/**", ".expo/**", "node_modules/**"]),
]);
