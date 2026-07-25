import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "@cacao-colab/ui-tokens";

/**
 * Placeholder — Fase 1 conecta GET /api/v1/listings (apps/api) vía @cacao-colab/supabase-client
 * o fetch directo al API headless. Ver docs/12-SRS.md RF-6.
 */
export default function MarketplaceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>
      <Text style={styles.subtitle}>
        Agricultores, chocolateros y maquiladores — listings reales llegan en Fase 1.
      </Text>
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
