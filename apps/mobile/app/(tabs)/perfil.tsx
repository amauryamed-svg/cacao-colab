import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";

export default function PerfilScreen() {
  const [care, setCare] = useState(0);
  const stage = care >= 8 ? "Floración" : care >= 4 ? "Árbol joven" : care >= 2 ? "Plántula" : "Semilla";

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>CACAO GOTCHI · PERFIL</Text>
      <View style={styles.avatar}><Text style={styles.avatarText}>{care >= 2 ? "♧" : "●"}</Text></View>
      <Text style={styles.title}>{stage}</Text>
      <Text style={styles.stats}>{care * 15} XP  ·  {care * 5} Mazorcas Doradas  ·  Semilla</Text>
      <Text style={styles.note}>
        Cuida tu labranza virtual y entrena el criterio de observación. Esta
        demo reinicia al cerrar la app; la sincronización llega con Supabase.
      </Text>
      <Pressable style={styles.action} onPress={() => setCare((value) => value + 1)}>
        <Text style={styles.actionText}>◎ Observar y cuidar · +15 XP</Text>
      </Pressable>
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
  action: { marginTop: 24, borderRadius: 999, paddingVertical: 13, paddingHorizontal: 20, backgroundColor: colabColors.forest },
  actionText: { color: colabColors.yellow, fontWeight: "800", fontSize: 12 },
});
