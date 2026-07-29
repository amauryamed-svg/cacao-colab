import { StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";

export default function PerfilScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>CACAO GOTCHI · PERFIL</Text>
      <View style={styles.avatar}><Text style={styles.avatarText}>◉</Text></View>
      <Text style={styles.title}>Aprendiz de pulpa</Text>
      <Text style={styles.stats}>0 XP  ·  0 días de racha  ·  rango 01</Text>
      <Text style={styles.note}>
        Tu identidad de farmer, chocolatier, maquilador o buyer se sincronizará
        con Supabase Auth. Hasta entonces, el progreso vive localmente.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: colabColors.cream },
  kicker: { fontSize: 10, letterSpacing: 2, color: colabColors.pod, fontWeight: "800", marginBottom: 22 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colabColors.yellow, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  avatarText: { fontSize: 34, color: colabColors.forest },
  title: { fontFamily: "serif", fontSize: 28, fontWeight: "800", color: colabColors.forest, marginBottom: 6 },
  stats: { fontSize: 11, color: colabColors.green, fontWeight: "700", marginBottom: 18 },
  note: { fontSize: 13, color: colabColors.ink, opacity: 0.65, textAlign: "center" },
});
