import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";

const tracks = [
  { id: "cacaotier", label: "Master Cacaotier", status: "6 misiones · 700 XP", color: colabColors.yellow },
  { id: "chocolatier", label: "Master Chocolatier", status: "próximamente", color: "#B9583B" },
];

const missions = [
  "Leer el lote",
  "Dominar las tres rutas",
  "Pilotar temperatura + pH",
  "Cazar precursores",
];

export default function AprendeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>cacaotier</Text>
      <Text style={styles.kicker}>CAMPUS · FORMACIÓN DUAL</Text>
      <Text style={styles.title}>Aprende haciendo.</Text>
      <Text style={styles.note}>
        Misiones de campo, laboratorio interactivo y credenciales para llevar
        cada lote a calidad Fine-Flavor.
      </Text>

      {tracks.map((track) => (
        <View key={track.id} style={[styles.card, { borderLeftColor: track.color }]}>
          <Text style={styles.cardTitle}>{track.label}</Text>
          <Text style={styles.cardStatus}>{track.status}</Text>
        </View>
      ))}
      <Text style={styles.section}>TU CAMPAÑA</Text>
      {missions.map((mission, index) => (
        <View key={mission} style={styles.mission}>
          <Text style={styles.number}>0{index + 1}</Text>
          <View style={styles.missionCopy}>
            <Text style={styles.missionTitle}>{mission}</Text>
            <Text style={styles.cardStatus}>{index === 0 ? "Disponible · 80 XP" : "Bloqueada"}</Text>
          </View>
          <Text style={styles.arrow}>{index === 0 ? "→" : "◇"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colabColors.forest },
  content: { padding: 20, gap: 12 },
  brand: { fontFamily: "serif", fontSize: 20, fontWeight: "800", color: colabColors.cream },
  kicker: { fontSize: 11, letterSpacing: 2, color: colabColors.yellow, fontWeight: "700" },
  title: { fontFamily: "serif", fontSize: 34, fontWeight: "800", color: colabColors.cream, marginBottom: 4 },
  note: { fontSize: 13, color: colabColors.cream, opacity: 0.6, marginBottom: 16 },
  card: {
    backgroundColor: "rgba(247,241,238,0.06)",
    borderRadius: 16,
    padding: 16,
    gap: 4,
    borderLeftWidth: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colabColors.cream },
  cardStatus: { fontSize: 12, color: colabColors.pod },
  section: { marginTop: 18, fontSize: 10, letterSpacing: 2, fontWeight: "800", color: colabColors.yellow },
  mission: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 14, backgroundColor: "rgba(247,241,238,0.04)" },
  number: { fontFamily: "serif", fontSize: 20, color: "rgba(247,241,238,0.3)" },
  missionCopy: { flex: 1, gap: 3 },
  missionTitle: { color: colabColors.cream, fontSize: 14, fontWeight: "700" },
  arrow: { color: colabColors.yellow, fontSize: 18 },
});
