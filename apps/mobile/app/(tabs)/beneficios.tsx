import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";

const benefits = [
  ["cacaotier", "Reto avanzado", "Colab nativo · inactivo"],
  ["Zurych", "Beneficio ecommerce", "Sin conector"],
  ["Nodos regionales", "Experiencias de territorio", "Acuerdos pendientes"],
];

export default function BeneficiosScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>MAZORCAS DORADAS</Text>
      <Text style={styles.title}>Cultiva beneficios.</Text>
      <View style={styles.wallet}><Text style={styles.balance}>0</Text><Text style={styles.walletLabel}>MD · SEMILLA</Text></View>
      <Text style={styles.note}>Ningún ecommerce está conectado todavía. Estas tarjetas son planificación transparente, no cupones activos.</Text>
      {benefits.map(([brand, title, status]) => (
        <View key={brand} style={styles.card}>
          <Text style={styles.brand}>{brand}</Text><Text style={styles.cardTitle}>{title}</Text><Text style={styles.status}>{status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colabColors.cream },
  content: { padding: 20, gap: 12 },
  kicker: { color: colabColors.green, fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  title: { color: colabColors.forest, fontFamily: "serif", fontSize: 32, fontWeight: "900" },
  wallet: { backgroundColor: colabColors.yellow, borderRadius: 18, padding: 18, marginVertical: 8 },
  balance: { color: colabColors.forest, fontFamily: "serif", fontSize: 42, fontWeight: "900" },
  walletLabel: { color: colabColors.forest, fontSize: 10, fontWeight: "800" },
  note: { color: colabColors.ink, fontSize: 12, lineHeight: 18, opacity: 0.55, marginBottom: 8 },
  card: { backgroundColor: "white", borderRadius: 15, padding: 16, gap: 4 },
  brand: { color: colabColors.green, fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
  cardTitle: { color: colabColors.forest, fontSize: 16, fontWeight: "800" },
  status: { color: colabColors.amber, fontSize: 11 },
});
