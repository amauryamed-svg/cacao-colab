import { Tabs } from "expo-router";
import { colabColors } from "@cacao-colab/ui-tokens";

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
      <Tabs.Screen name="index" options={{ title: "Mercado", headerTitle: "Cacao Colab" }} />
      <Tabs.Screen name="aprende" options={{ title: "Campus", headerTitle: "cacaotier" }} />
      <Tabs.Screen name="beneficios" options={{ title: "Mazorcas", headerTitle: "Beneficios Colab" }} />
      <Tabs.Screen name="perfil" options={{ title: "Mi lote", headerTitle: "Cacao Gotchi" }} />
    </Tabs>
  );
}
