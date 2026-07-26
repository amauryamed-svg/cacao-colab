// Debe ser el primer import del entry — requisito de react-native-gesture-handler.
import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* Con edge-to-edge (Android) y New Architecture, el color de fondo del
          status bar ya no se controla por prop acá — lo hereda del layout. */}
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
