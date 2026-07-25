import { Tabs } from "expo-router";
import { colors } from "@cacao-colab/ui-tokens";

/**
 * 3 tabs iniciales alineadas a los actores del marketplace: comprar/vender (Marketplace),
 * aprender (Dualita), y perfil/membresía. Se expande en Fase 1 (docs/06-ARQUITECTURA.md).
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.colabForest },
        headerTintColor: colors.colabCream,
        tabBarActiveTintColor: colors.colabYellow,
        tabBarInactiveTintColor: colors.colabMist,
        tabBarStyle: { backgroundColor: colors.colabForest },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Marketplace" }} />
      <Tabs.Screen name="aprende" options={{ title: "Aprende" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
