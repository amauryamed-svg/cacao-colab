import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";

const tracks = [
  { id: "micro", label: "CAÚA Academy (microlearning)", status: "6 módulos · gratis" },
  { id: "mooc", label: "MOOC Zurych", status: "en proceso" },
];

export default function AprendeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>DUALITA</Text>
      <Text style={styles.title}>Aprende</Text>
      <Text style={styles.note}>
        Placeholder de Fase 0. El companion IA (@cacao-colab/ai-companion) y
        el contenido real de lecciones se conectan en Fase 1 — ver
        docs/09-GAMIFICACION.md y docs/10-DUALITA-IA.md.
      </Text>

      {tracks.map((track) => (
        <View key={track.id} style={styles.card}>
          <Text style={styles.cardTitle}>{track.label}</Text>
          <Text style={styles.cardStatus}>{track.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colabColors.forest },
  content: { padding: 20, gap: 12 },
  kicker: { fontSize: 11, letterSpacing: 2, color: colabColors.yellow, fontWeight: "700" },
  title: { fontSize: 26, fontWeight: "800", color: colabColors.cream, marginBottom: 4 },
  note: { fontSize: 13, color: colabColors.cream, opacity: 0.6, marginBottom: 16 },
  card: {
    backgroundColor: "rgba(247,241,238,0.06)",
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colabColors.cream },
  cardStatus: { fontSize: 12, color: colabColors.pod },
});
