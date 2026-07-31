export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      actor_roles: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean
          profile_id: string
          role: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean
          profile_id: string
          role: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean
          profile_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "actor_roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "actor_roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json
          pathname: string | null
          profile_id: string | null
          session_id: string
          target: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json
          pathname?: string | null
          profile_id?: string | null
          session_id: string
          target?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json
          pathname?: string | null
          profile_id?: string | null
          session_id?: string
          target?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "analytics_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          description: string
          icon_emoji: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          description: string
          icon_emoji: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          description?: string
          icon_emoji?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      benefit_catalog_items: {
        Row: {
          brand_key: string
          cost_md: number
          created_at: string
          description: string
          fulfillment_type: string
          id: string
          metadata: Json
          min_rank_slug: string | null
          per_user_limit: number
          slug: string
          status: string
          stock_qty: number | null
          terms: string
          title: string
        }
        Insert: {
          brand_key: string
          cost_md: number
          created_at?: string
          description: string
          fulfillment_type: string
          id?: string
          metadata?: Json
          min_rank_slug?: string | null
          per_user_limit?: number
          slug: string
          status?: string
          stock_qty?: number | null
          terms: string
          title: string
        }
        Update: {
          brand_key?: string
          cost_md?: number
          created_at?: string
          description?: string
          fulfillment_type?: string
          id?: string
          metadata?: Json
          min_rank_slug?: string | null
          per_user_limit?: number
          slug?: string
          status?: string
          stock_qty?: number | null
          terms?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "benefit_catalog_items_min_rank_slug_fkey"
            columns: ["min_rank_slug"]
            isOneToOne: false
            referencedRelation: "community_ranks"
            referencedColumns: ["slug"]
          },
        ]
      }
      benefit_redemptions: {
        Row: {
          catalog_item_id: string
          cost_md: number
          created_at: string
          fulfillment_payload: Json
          id: string
          ledger_debit_id: string | null
          profile_id: string
          status: string
          updated_at: string
        }
        Insert: {
          catalog_item_id: string
          cost_md: number
          created_at?: string
          fulfillment_payload?: Json
          id?: string
          ledger_debit_id?: string | null
          profile_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          catalog_item_id?: string
          cost_md?: number
          created_at?: string
          fulfillment_payload?: Json
          id?: string
          ledger_debit_id?: string | null
          profile_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "benefit_redemptions_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "benefit_catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "benefit_redemptions_ledger_debit_id_fkey"
            columns: ["ledger_debit_id"]
            isOneToOne: false
            referencedRelation: "mazorca_ledger"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "benefit_redemptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "benefit_redemptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_commerce_adapters: {
        Row: {
          adapter_type: string
          brand_key: string
          last_sync_at: string | null
          public_config: Json
          status: string
          updated_at: string
        }
        Insert: {
          adapter_type?: string
          brand_key: string
          last_sync_at?: string | null
          public_config?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          adapter_type?: string
          brand_key?: string
          last_sync_at?: string | null
          public_config?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      campus_progress: {
        Row: {
          completed_at: string | null
          course_slug: string
          created_at: string
          id: string
          profile_id: string
          state: Json
          updated_at: string
          xp_total: number
        }
        Insert: {
          completed_at?: string | null
          course_slug: string
          created_at?: string
          id?: string
          profile_id: string
          state?: Json
          updated_at?: string
          xp_total?: number
        }
        Update: {
          completed_at?: string | null
          course_slug?: string
          created_at?: string
          id?: string
          profile_id?: string
          state?: Json
          updated_at?: string
          xp_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "campus_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "campus_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_ledger: {
        Row: {
          amount_cents: number
          commission_rule_id: string | null
          created_at: string
          id: string
          order_id: string
          reversal_of_ledger_id: string | null
        }
        Insert: {
          amount_cents: number
          commission_rule_id?: string | null
          created_at?: string
          id?: string
          order_id: string
          reversal_of_ledger_id?: string | null
        }
        Update: {
          amount_cents?: number
          commission_rule_id?: string | null
          created_at?: string
          id?: string
          order_id?: string
          reversal_of_ledger_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_ledger_commission_rule_id_fkey"
            columns: ["commission_rule_id"]
            isOneToOne: false
            referencedRelation: "commission_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_ledger_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_ledger_reversal_of_ledger_id_fkey"
            columns: ["reversal_of_ledger_id"]
            isOneToOne: false
            referencedRelation: "commission_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_rules: {
        Row: {
          created_at: string
          effective_from: string
          effective_to: string | null
          id: string
          membership_plan_id: string | null
          organization_id: string | null
          ratio_basis_points: number
        }
        Insert: {
          created_at?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          membership_plan_id?: string | null
          organization_id?: string | null
          ratio_basis_points: number
        }
        Update: {
          created_at?: string
          effective_from?: string
          effective_to?: string | null
          id?: string
          membership_plan_id?: string | null
          organization_id?: string | null
          ratio_basis_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "commission_rules_membership_plan_id_fkey"
            columns: ["membership_plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_rules_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      community_ranks: {
        Row: {
          description: string
          icon: string
          min_lifetime_md: number
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          description: string
          icon: string
          min_lifetime_md: number
          name: string
          slug: string
          sort_order: number
        }
        Update: {
          description?: string
          icon?: string
          min_lifetime_md?: number
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      companion_conversations: {
        Row: {
          ended_at: string | null
          id: string
          lesson_id: string | null
          profile_id: string | null
          started_at: string
        }
        Insert: {
          ended_at?: string | null
          id?: string
          lesson_id?: string | null
          profile_id?: string | null
          started_at?: string
        }
        Update: {
          ended_at?: string | null
          id?: string
          lesson_id?: string | null
          profile_id?: string | null
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "companion_conversations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companion_conversations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "companion_conversations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companion_memory: {
        Row: {
          id: string
          key: string
          profile_id: string
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          profile_id: string
          updated_at?: string
          value: string
        }
        Update: {
          id?: string
          key?: string
          profile_id?: string
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "companion_memory_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "companion_memory_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companion_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "companion_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "companion_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      connected_accounts: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          payouts_enabled: boolean
          status: string
          stripe_account_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          payouts_enabled?: boolean
          status?: string
          stripe_account_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          payouts_enabled?: boolean
          status?: string
          stripe_account_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connected_accounts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          id: string
          owner_organization_id: string | null
          slug: string
          title: string
          track: string
        }
        Insert: {
          created_at?: string
          id?: string
          owner_organization_id?: string | null
          slug: string
          title: string
          track: string
        }
        Update: {
          created_at?: string
          id?: string
          owner_organization_id?: string | null
          slug?: string
          title?: string
          track?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_owner_organization_id_fkey"
            columns: ["owner_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_activities: {
        Row: {
          created_at: string
          crm_contact_id: string
          id: string
          metadata: Json
          type: string
        }
        Insert: {
          created_at?: string
          crm_contact_id: string
          id?: string
          metadata?: Json
          type: string
        }
        Update: {
          created_at?: string
          crm_contact_id?: string
          id?: string
          metadata?: Json
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_crm_contact_id_fkey"
            columns: ["crm_contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contacts: {
        Row: {
          city: string | null
          company: string | null
          created_at: string
          email: string
          full_name: string
          hubspot_contact_id: string | null
          id: string
          lifecycle_stage: string | null
          phone: string | null
          profile_id: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          company?: string | null
          created_at?: string
          email: string
          full_name: string
          hubspot_contact_id?: string | null
          id?: string
          lifecycle_stage?: string | null
          phone?: string | null
          profile_id?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string
          hubspot_contact_id?: string | null
          id?: string
          lifecycle_stage?: string | null
          phone?: string | null
          profile_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "crm_contacts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gotchi_runs: {
        Row: {
          created_at: string
          genotype: string
          id: string
          profile_id: string
          selected_node: string | null
          slot: number
          state: Json
          treatment: string | null
          updated_at: string
          xp_total: number
        }
        Insert: {
          created_at?: string
          genotype?: string
          id?: string
          profile_id: string
          selected_node?: string | null
          slot?: number
          state?: Json
          treatment?: string | null
          updated_at?: string
          xp_total?: number
        }
        Update: {
          created_at?: string
          genotype?: string
          id?: string
          profile_id?: string
          selected_node?: string | null
          slot?: number
          state?: Json
          treatment?: string | null
          updated_at?: string
          xp_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "gotchi_runs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "gotchi_runs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hubspot_sync_log: {
        Row: {
          created_at: string
          crm_contact_id: string
          direction: string
          error_message: string | null
          id: string
          payload_hash: string
          success: boolean
        }
        Insert: {
          created_at?: string
          crm_contact_id: string
          direction: string
          error_message?: string | null
          id?: string
          payload_hash: string
          success: boolean
        }
        Update: {
          created_at?: string
          crm_contact_id?: string
          direction?: string
          error_message?: string | null
          id?: string
          payload_hash?: string
          success?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "hubspot_sync_log_crm_contact_id_fkey"
            columns: ["crm_contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      learner_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          profile_id: string
          quiz_score: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          profile_id: string
          quiz_score?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          profile_id?: string
          quiz_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "learner_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learner_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "learner_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          body_mdx: string
          companion_complete: string
          companion_intro: string
          companion_mid: string
          companion_quiz: string
          companion_tips: string[]
          emoji: string | null
          id: string
          module_id: string
          slug: string
          title: string
          xp: number
        }
        Insert: {
          body_mdx: string
          companion_complete: string
          companion_intro: string
          companion_mid: string
          companion_quiz: string
          companion_tips?: string[]
          emoji?: string | null
          id?: string
          module_id: string
          slug: string
          title: string
          xp?: number
        }
        Update: {
          body_mdx?: string
          companion_complete?: string
          companion_intro?: string
          companion_mid?: string
          companion_quiz?: string
          companion_tips?: string[]
          emoji?: string | null
          id?: string
          module_id?: string
          slug?: string
          title?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_media: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          listing_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          listing_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          listing_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_media_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          created_at: string
          currency: string
          description: string
          id: string
          min_order_qty: number
          organization_id: string
          price_cents: number
          status: string
          stock_qty: number | null
          territory_id: string | null
          title: string
          unit: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description: string
          id?: string
          min_order_qty?: number
          organization_id: string
          price_cents: number
          status?: string
          stock_qty?: number | null
          territory_id?: string | null
          title: string
          unit: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string
          id?: string
          min_order_qty?: number
          organization_id?: string
          price_cents?: number
          status?: string
          stock_qty?: number | null
          territory_id?: string | null
          title?: string
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_territory_id_fkey"
            columns: ["territory_id"]
            isOneToOne: false
            referencedRelation: "territories"
            referencedColumns: ["id"]
          },
        ]
      }
      mazorca_ledger: {
        Row: {
          amount: number
          category: string
          created_at: string
          id: string
          idempotency_key: string
          metadata: Json
          profile_id: string
          reason_code: string
          reversal_of_id: string | null
          source_id: string | null
          source_type: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          id?: string
          idempotency_key: string
          metadata?: Json
          profile_id: string
          reason_code: string
          reversal_of_id?: string | null
          source_id?: string | null
          source_type?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          id?: string
          idempotency_key?: string
          metadata?: Json
          profile_id?: string
          reason_code?: string
          reversal_of_id?: string | null
          source_id?: string | null
          source_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mazorca_ledger_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "mazorca_ledger_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mazorca_ledger_reversal_of_id_fkey"
            columns: ["reversal_of_id"]
            isOneToOne: false
            referencedRelation: "mazorca_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      mazorca_wallets: {
        Row: {
          balance: number
          lifetime_earned: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          balance?: number
          lifetime_earned?: number
          profile_id: string
          updated_at?: string
        }
        Update: {
          balance?: number
          lifetime_earned?: number
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mazorca_wallets_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "mazorca_wallets_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_plans: {
        Row: {
          commission_ratio_basis_points: number
          created_at: string
          id: string
          name: string
          price_cents_monthly: number
          slug: string
          tier: string
        }
        Insert: {
          commission_ratio_basis_points: number
          created_at?: string
          id?: string
          name: string
          price_cents_monthly: number
          slug: string
          tier: string
        }
        Update: {
          commission_ratio_basis_points?: number
          created_at?: string
          id?: string
          name?: string
          price_cents_monthly?: number
          slug?: string
          tier?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          organization_id: string
          plan_id: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          organization_id: string
          plan_id: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          organization_id?: string
          plan_id?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          course_id: string
          duration_label: string
          id: string
          number: number
          sort_order: number
          title: string
        }
        Insert: {
          course_id: string
          duration_label: string
          id?: string
          number: number
          sort_order?: number
          title: string
        }
        Update: {
          course_id?: string
          duration_label?: string
          id?: string
          number?: number
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          listing_id: string
          order_id: string
          qty: number
          total_price_cents: number
          unit_price_cents: number
        }
        Insert: {
          id?: string
          listing_id: string
          order_id: string
          qty: number
          total_price_cents: number
          unit_price_cents: number
        }
        Update: {
          id?: string
          listing_id?: string
          order_id?: string
          qty?: number
          total_price_cents?: number
          unit_price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_profile_id: string
          commission_cents: number
          created_at: string
          currency: string
          id: string
          seller_organization_id: string
          status: string
          stripe_payment_intent_id: string | null
          subtotal_cents: number
          total_cents: number
          updated_at: string
        }
        Insert: {
          buyer_profile_id: string
          commission_cents: number
          created_at?: string
          currency?: string
          id?: string
          seller_organization_id: string
          status?: string
          stripe_payment_intent_id?: string | null
          subtotal_cents: number
          total_cents: number
          updated_at?: string
        }
        Update: {
          buyer_profile_id?: string
          commission_cents?: number
          created_at?: string
          currency?: string
          id?: string
          seller_organization_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_profile_id_fkey"
            columns: ["buyer_profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "orders_buyer_profile_id_fkey"
            columns: ["buyer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_seller_organization_id_fkey"
            columns: ["seller_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          accent_color: string
          bg_color: string
          created_at: string
          cta_label: string
          cta_url: string
          description: string
          id: string
          name: string
          products: string[]
          role: string
          slug: string
          tagline: string
          text_color: string
          updated_at: string
        }
        Insert: {
          accent_color: string
          bg_color: string
          created_at?: string
          cta_label: string
          cta_url: string
          description: string
          id?: string
          name: string
          products?: string[]
          role?: string
          slug: string
          tagline: string
          text_color: string
          updated_at?: string
        }
        Update: {
          accent_color?: string
          bg_color?: string
          created_at?: string
          cta_label?: string
          cta_url?: string
          description?: string
          id?: string
          name?: string
          products?: string[]
          role?: string
          slug?: string
          tagline?: string
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_profile_id: string | null
          body_mdx: string
          cover_image_url: string | null
          created_at: string
          excerpt: string
          id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_profile_id?: string | null
          body_mdx: string
          cover_image_url?: string | null
          created_at?: string
          excerpt: string
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_profile_id?: string | null
          body_mdx?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "posts_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          profile_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          profile_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_badges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "profile_badges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          marketing_opt_in: boolean
          marketing_opt_in_at: string | null
          organization_id: string | null
          phone: string | null
          privacy_accepted_at: string | null
          privacy_policy_version: string | null
          terms_accepted_at: string | null
          terms_version: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          marketing_opt_in?: boolean
          marketing_opt_in_at?: string | null
          organization_id?: string | null
          phone?: string | null
          privacy_accepted_at?: string | null
          privacy_policy_version?: string | null
          terms_accepted_at?: string | null
          terms_version?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          marketing_opt_in?: boolean
          marketing_opt_in_at?: string | null
          organization_id?: string | null
          phone?: string | null
          privacy_accepted_at?: string | null
          privacy_policy_version?: string | null
          terms_accepted_at?: string | null
          terms_version?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      privacy_consents: {
        Row: {
          created_at: string
          email: string | null
          event: string
          id: string
          metadata: Json
          policy_version: string | null
          profile_id: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          event: string
          id?: string
          metadata?: Json
          policy_version?: string | null
          profile_id?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          event?: string
          id?: string
          metadata?: Json
          policy_version?: string | null
          profile_id?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "privacy_consents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string
          options: Json
          question: string
        }
        Insert: {
          id?: string
          lesson_id: string
          options: Json
          question: string
        }
        Update: {
          id?: string
          lesson_id?: string
          options?: Json
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      streaks: {
        Row: {
          current_length: number
          id: string
          last_activity_date: string
          longest_length: number
          profile_id: string
        }
        Insert: {
          current_length?: number
          id?: string
          last_activity_date?: string
          longest_length?: number
          profile_id: string
        }
        Update: {
          current_length?: number
          id?: string
          last_activity_date?: string
          longest_length?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "streaks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          access_level: string
          created_at: string
          email: string
          full_name: string
          hubspot_contact_email: string | null
          id: string
          team_role: string
          user_id: string | null
        }
        Insert: {
          access_level?: string
          created_at?: string
          email: string
          full_name: string
          hubspot_contact_email?: string | null
          id?: string
          team_role: string
          user_id?: string | null
        }
        Update: {
          access_level?: string
          created_at?: string
          email?: string
          full_name?: string
          hubspot_contact_email?: string | null
          id?: string
          team_role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      territories: {
        Row: {
          accent_color: string
          created_at: string
          flavor_profile: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          accent_color: string
          created_at?: string
          flavor_profile: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          accent_color?: string
          created_at?: string
          flavor_profile?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      xp_ledger: {
        Row: {
          amount: number
          created_at: string
          id: string
          lesson_id: string | null
          profile_id: string
          reason: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          lesson_id?: string | null
          profile_id: string
          reason: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          lesson_id?: string | null
          profile_id?: string
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "xp_ledger_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "xp_ledger_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_weekly"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "xp_ledger_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leaderboard_weekly: {
        Row: {
          full_name: string | null
          profile_id: string | null
          rank: number | null
          week_start: string | null
          xp_total: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      claim_team_membership: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
