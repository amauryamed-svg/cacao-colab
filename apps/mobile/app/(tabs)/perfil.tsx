import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "@cacao-colab/ui-tokens";

/** Placeholder — Fase 1 conecta Supabase Auth; Fase 2 agrega estado de membresía/comisión. */
export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Login, membresía y cuenta conectada de pagos — Fase 1-2.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colabForest,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: colors.colabYellow,
    fontSize: 28,
    fontFamily: fonts.display,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.colabMist,
    fontSize: 15,
  },
});
