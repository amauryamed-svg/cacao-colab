import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";
import type { OrganizationRole } from "@cacao-colab/types";

type PlaceholderOrg = {
  name: string;
  tagline: string;
  role: OrganizationRole;
};

const placeholderOrgs: PlaceholderOrg[] = [
  { name: "cacaotier", tagline: "Bogotá · epicentro educativo y builder.", role: "owner" },
  { name: "Zurych", tagline: "Landázuri · Santander.", role: "colaborador" },
  { name: "La Querencia", tagline: "Arbeláez · Cundinamarca.", role: "colaborador" },
  { name: "La Lomita", tagline: "Paicol · Huila.", role: "colaborador" },
  { name: "Quara Cacao", tagline: "Tame · Arauca.", role: "colaborador" },
  { name: "Chocolover", tagline: "Guamal · Meta.", role: "colaborador" },
];

export default function MarketplaceScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>cacaotier</Text>
      <Text style={styles.kicker}>CACAO FINE-FLAVOR · MERCADO</Text>
      <Text style={styles.title}>Del conocimiento al mercado.</Text>
      <Text style={styles.note}>
        Recorre los nodos regionales del ecosistema. Cada marca conserva su
        identidad; el círculo permanece abierto.
      </Text>

      {placeholderOrgs.map((org) => (
        <View key={org.name} style={styles.card}>
          <Text style={styles.cardTitle}>{org.name}</Text>
          <Text style={styles.cardTagline}>{org.tagline}</Text>
          <Text style={styles.badge}>{org.role === "owner" ? "EPICENTRO" : "NODO REGIONAL"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colabColors.cream },
  content: { padding: 20, gap: 12 },
  brand: { fontFamily: "serif", fontSize: 20, fontWeight: "800", color: colabColors.forest },
  kicker: { fontSize: 11, letterSpacing: 2, color: colabColors.pod, fontWeight: "700" },
  title: { fontFamily: "serif", fontSize: 32, lineHeight: 36, fontWeight: "800", color: colabColors.forest, marginBottom: 4 },
  note: { fontSize: 13, color: colabColors.ink, opacity: 0.6, marginBottom: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(26,46,16,0.08)",
  },
  cardTitle: { fontSize: 17, fontWeight: "700", color: colabColors.forest },
  cardTagline: { fontSize: 13, color: colabColors.ink, opacity: 0.7 },
  badge: { fontSize: 10, letterSpacing: 1, color: colabColors.amber, fontWeight: "700", marginTop: 6 },
});
