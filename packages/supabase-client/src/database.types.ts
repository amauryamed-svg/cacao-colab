/**
 * Tipos de la base de datos escritos a mano — placeholder hasta que exista
 * el proyecto Supabase real y se pueda correr:
 *
 *   supabase gen types typescript --project-id <id> > database.types.ts
 *
 * Solo se tipan aquí las tablas que el código de la Fase 0 consulta
 * directamente (team_members, para el login de /equipo). El resto de
 * dominios vive como Zod schemas en @cacao-colab/types — ver
 * docs/07-MODELO-DATOS.md sobre por qué ambos existen en paralelo por
 * ahora (Zod = contrato de API/app; este archivo = shape real de Postgres
 * una vez generado).
 *
 * La forma (Tables/Views/Functions/Enums/CompositeTypes, todas presentes
 * aunque vacías) replica exactamente lo que genera `supabase gen types`,
 * porque @supabase/supabase-js exige esa forma completa para inferir tipos
 * en `.from(...)` — si falta alguna, TypeScript cae a `never` en vez de
 * marcar error, y falla en silencio recién en el call site.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      team_members: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          full_name: string;
          team_role:
            | "founder"
            | "engineering_backend"
            | "engineering_frontend"
            | "design";
          hubspot_contact_email: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          full_name: string;
          team_role:
            | "founder"
            | "engineering_backend"
            | "engineering_frontend"
            | "design";
          hubspot_contact_email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          full_name?: string;
          team_role?:
            | "founder"
            | "engineering_backend"
            | "engineering_frontend"
            | "design";
          hubspot_contact_email?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      campus_progress: {
        Row: {
          id: string;
          profile_id: string;
          course_slug: string;
          state: Json;
          xp_total: number;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          course_slug: string;
          state?: Json;
          xp_total?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          state?: Json;
          xp_total?: number;
          completed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      gotchi_runs: {
        Row: {
          id: string;
          profile_id: string;
          slot: number;
          selected_node: string | null;
          genotype: string;
          treatment: string | null;
          state: Json;
          xp_total: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          slot?: number;
          selected_node?: string | null;
          genotype?: string;
          treatment?: string | null;
          state?: Json;
          xp_total?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          selected_node?: string | null;
          genotype?: string;
          treatment?: string | null;
          state?: Json;
          xp_total?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
