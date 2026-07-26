import { StyleSheet, Text, View } from "react-native";
import { colabColors } from "@cacao-colab/ui-tokens";

/**
 * Placeholder de Fase 0. El login de marketplace (profiles + actor_roles,
 * Supabase Auth) llega en Fase 1 — distinto del login del portal /equipo
 * (apps/web/app/equipo), que es exclusivo del equipo interno y no vive en
 * esta app. Ver docs/13-MOBILE.md.
 */
export default function PerfilScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tu perfil</Text>
      <Text style={styles.note}>
        Sin login todavía. El registro de farmer/chocolatier/maquilador/buyer
        se conecta a Supabase Auth en Fase 1 (docs/07-MODELO-DATOS.md).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: colabColors.cream },
  title: { fontSize: 22, fontWeight: "800", color: colabColors.forest, marginBottom: 8 },
  note: { fontSize: 13, color: colabColors.ink, opacity: 0.65, textAlign: "center" },
});
