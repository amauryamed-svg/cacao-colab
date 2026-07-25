import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@cacao-colab/ui-tokens";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.colabForest} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
