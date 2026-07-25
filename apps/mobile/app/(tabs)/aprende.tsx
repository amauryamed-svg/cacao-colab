import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "@cacao-colab/ui-tokens";

/**
 * Placeholder — Fase 3 porta la UX de gamificación del prototipo Python
 * (amauryamed-svg/dualita: xp_bar, streak_counter, achievement_badge, leaderboard) a componentes
 * RN reales, y conecta el companion con IA (apps/api /api/v1/dualita/chat). Ver docs/09-GAMIFICACION.md.
 */
export default function AprendeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aprende con Dualita</Text>
      <Text style={styles.subtitle}>MOOC Zurych + microlearning CAÚA Academy — próximamente acá.</Text>
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
