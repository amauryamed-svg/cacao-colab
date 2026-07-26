import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";
import type { OrganizationRole } from "@cacao-colab/types";

type PlaceholderOrg = {
  name: string;
  tagline: string;
  role: OrganizationRole;
};

// Placeholder explícito — NO son datos reales de Supabase (que todavía no
// existe). Mismo contenido que apps/web/lib/brands.ts, solo para
// visualizar el shape de `Organization` (@cacao-colab/types) en la app
// nativa. Ver docs/13-MOBILE.md.
const placeholderOrgs: PlaceholderOrg[] = [
  { name: "CAÚA Colombia", tagline: "Cacao de origen. Cero azúcar añadida.", role: "owner" },
  { name: "Chocolate Zurych", tagline: "Coberturas funcionales para el profesional.", role: "owner" },
  { name: "Chocolate Lust", tagline: "Chocolate de autor colombiano.", role: "colaborador" },
];

export default function MarketplaceScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>MARKETPLACE · SOLO LECTURA</Text>
      <Text style={styles.title}>Marcas del Colab</Text>
      <Text style={styles.note}>
        Placeholder de Fase 0 — sin conexión a Supabase todavía. Estos datos
        no son en vivo.
      </Text>

      {placeholderOrgs.map((org) => (
        <View key={org.name} style={styles.card}>
          <Text style={styles.cardTitle}>{org.name}</Text>
          <Text style={styles.cardTagline}>{org.tagline}</Text>
          <Text style={styles.badge}>{org.role === "owner" ? "FUNDADOR" : "COLABORADOR"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colabColors.cream },
  content: { padding: 20, gap: 12 },
  kicker: { fontSize: 11, letterSpacing: 2, color: colabColors.pod, fontWeight: "700" },
  title: { fontSize: 26, fontWeight: "800", color: colabColors.forest, marginBottom: 4 },
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
