import { Tabs } from "expo-router";
import { colabColors } from "@cacao-colab/ui-tokens";

/**
 * Fase 0 — 3 tabs placeholder (docs/13-MOBILE.md): marketplace de solo
 * lectura, aprende (Dualita) y perfil. Sin auth de marketplace todavía
 * (eso vive en profiles/actor_roles — Fase 1). El login del portal
 * /equipo (Oscar/Hellen) es exclusivo de apps/web, no de esta app.
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colabColors.pod,
        tabBarInactiveTintColor: colabColors.ink,
        headerStyle: { backgroundColor: colabColors.forest },
        headerTintColor: colabColors.cream,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Marketplace" }} />
      <Tabs.Screen name="aprende" options={{ title: "Aprende" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
