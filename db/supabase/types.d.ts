/* eslint-disable @typescript-eslint/indent */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          create_at: string;
          id: number;
          name: string;
          pid: number;
          has_child: boolean;
          sort: number;
          category_name: string;
          name_ja: string;
          name_de: string;
          name_es: string;
          name_fr: string;
          name_pt: string;
          name_ru: string;
          name_zh: string;
          name_tw: string;
          name_ko: string;
          name_it: string;
          name_ar: string;
          name_in: string;
          name_ms: string;
          name_th: string;
          name_vi: string;
          title: string;
          title_tr: string;
          title_pl: string;
          title_nl: string;
          title_ja: string;
          title_de: string;
          title_es: string;
          title_fr: string;
          title_pt: string;
          title_ru: string;
          title_zh: string;
          title_tw: string;
          title_ko: string;
          title_it: string;
          title_ar: string;
          title_in: string;
          title_ms: string;
          title_th: string;
          title_vi: string;
          content: string;
          content_tr: string;
          content_pl: string;
          content_nl: string;
          content_ja: string;
          content_de: string;
          content_es: string;
          content_fr: string;
          content_pt: string;
          content_ru: string;
          content_zh: string;
          content_tw: string;
          content_ko: string;
          content_it: string;
          content_ar: string;
          content_in: string;
          content_ms: string;
          content_th: string;
          content_vi: string;
          h1: string;
          h1_tr: string;
          h1_pl: string;
          h1_nl: string;
          h1_ja: string;
          h1_de: string;
          h1_es: string;
          h1_fr: string;
          h1_pt: string;
          h1_ru: string;
          h1_zh: string;
          h1_tw: string;
          h1_ko: string;
          h1_it: string;
          h1_ar: string;
          h1_in: string;
          h1_ms: string;
          h1_th: string;
          h1_vi: string;
        };
        Insert: {
          create_at?: string;
          id?: never;
          name: string;
          sort?: number;
          category_name?: string | null;
          pid?: number;
          has_child?: boolean;
          name_ja?: string | null;
          name_de?: string | null;
          name_es?: string | null;
          name_fr?: string | null;
          name_pt?: string | null;
          name_ru?: string | null;
          name_zh?: string | null;
          name_tw?: string | null;
          name_ko?: string | null;
          name_it?: string | null;
          name_ar?: string | null;
          name_in?: string | null;
          name_ms?: string | null;
          name_th?: string | null;
          name_vi?: string | null;
          name_tr?: string | null;
          name_pl?: string | null;
          name_nl?: string | null;
          title: string;
          title_ja?: string | null;
          title_de?: string | null;
          title_es?: string | null;
          title_fr?: string | null;
          title_pt?: string | null;
          title_ru?: string | null;
          title_zh?: string | null;
          title_tw?: string | null;
          title_ko?: string | null;
          title_it?: string | null;
          title_ar?: string | null;
          title_in?: string | null;
          title_ms?: string | null;
          title_th?: string | null;
          title_vi?: string | null;
          title_tr?: string | null;
          title_pl?: string | null;
          title_nl?: string | null;
          content: string;
          content_ja?: string | null;
          content_de?: string | null;
          content_es?: string | null;
          content_fr?: string | null;
          content_pt?: string | null;
          content_ru?: string | null;
          content_zh?: string | null;
          content_tw?: string | null;
          content_ko?: string | null;
          content_it?: string | null;
          content_ar?: string | null;
          content_in?: string | null;
          content_ms?: string | null;
          content_th?: string | null;
          content_vi?: string | null;
          content_tr?: string | null;
          content_pl?: string | null;
          content_nl?: string | null;
          h1: string;
          h1_ja?: string | null;
          h1_de?: string | null;
          h1_es?: string | null;
          h1_fr?: string | null;
          h1_pt?: string | null;
          h1_ru?: string | null;
          h1_zh?: string | null;
          h1_tw?: string | null;
          h1_ko?: string | null;
          h1_it?: string | null;
          h1_ar?: string | null;
          h1_in?: string | null;
          h1_ms?: string | null;
          h1_th?: string | null;
          h1_vi?: string | null;
          h1_tr?: string | null;
          h1_pl?: string | null;
          h1_nl?: string | null;
        };
        Update: {
          create_at?: string;
          id?: number;
          name: string;
          sort?: number;
          category_name?: string | null;
          pid?: number;
          has_child?: boolean;
          name_ja?: string | null;
          name_de?: string | null;
          name_es?: string | null;
          name_fr?: string | null;
          name_pt?: string | null;
          name_ru?: string | null;
          name_zh?: string | null;
          name_tw?: string | null;
          name_ko?: string | null;
          name_it?: string | null;
          name_ar?: string | null;
          name_in?: string | null;
          name_ms?: string | null;
          name_th?: string | null;
          name_vi?: string | null;
          name_tr?: string | null;
          name_pl?: string | null;
          name_nl?: string | null;
          title: string;
          title_ja?: string | null;
          title_de?: string | null;
          title_es?: string | null;
          title_fr?: string | null;
          title_pt?: string | null;
          title_ru?: string | null;
          title_zh?: string | null;
          title_tw?: string | null;
          title_ko?: string | null;
          title_it?: string | null;
          title_ar?: string | null;
          title_in?: string | null;
          title_ms?: string | null;
          title_th?: string | null;
          title_vi?: string | null;
          title_tr?: string | null;
          title_pl?: string | null;
          title_nl?: string | null;
          content: string;
          content_ja?: string | null;
          content_de?: string | null;
          content_es?: string | null;
          content_fr?: string | null;
          content_pt?: string | null;
          content_ru?: string | null;
          content_zh?: string | null;
          content_tw?: string | null;
          content_ko?: string | null;
          content_it?: string | null;
          content_ar?: string | null;
          content_in?: string | null;
          content_ms?: string | null;
          content_th?: string | null;
          content_vi?: string | null;
          content_tr?: string | null;
          content_pl?: string | null;
          content_nl?: string | null;
          h1: string;
          h1_ja?: string | null;
          h1_de?: string | null;
          h1_es?: string | null;
          h1_fr?: string | null;
          h1_pt?: string | null;
          h1_ru?: string | null;
          h1_zh?: string | null;
          h1_tw?: string | null;
          h1_ko?: string | null;
          h1_it?: string | null;
          h1_ar?: string | null;
          h1_in?: string | null;
          h1_ms?: string | null;
          h1_th?: string | null;
          h1_vi?: string | null;
          h1_tr?: string | null;
          h1_pl?: string | null;
          h1_nl?: string | null;
        };
        Relationships: [];
      };
      submit: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          is_feature: number | null;
          name: string | null;
          status: number | null;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          is_feature?: number | null;
          name?: string | null;
          status?: number | null;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          is_feature?: number | null;
          name?: string | null;
          status?: number | null;
          url?: string | null;
        };
        Relationships: [];
      };
      product_detail: {
        Row: {
          id: number;
          created_at: string;
          collection_time: string;
          content: string;
          detail: string;
          image_url: string;
          name: string;
          star_rating: number;
          thumbnail_url: string;
          title: string;
          url: string;
          url_key: string;
          h1: string;
          website_data: string;
          title_ja: string;
          detail_ja: string;
          content_ja: string;
          h1_ja: string;
          title_de: string;
          detail_de: string;
          content_de: string;
          h1_de: string;
          title_es: string;
          detail_es: string;
          content_es: string;
          h1_es: string;
          title_fr: string;
          detail_fr: string;
          content_fr: string;
          h1_fr: string;
          title_pt: string;
          detail_pt: string;
          content_pt: string;
          h1_pt: string;
          title_ru: string;
          detail_ru: string;
          content_ru: string;
          h1_ru: string;
          title_zh: string;
          detail_zh: string;
          content_zh: string;
          h1_zh: string;
          title_tw: string;
          detail_tw: string;
          content_tw: string;
          h1_tw: string;
          title_ko: string;
          detail_ko: string;
          content_ko: string;
          h1_ko: string;
          title_it: string;
          detail_it: string;
          content_it: string;
          h1_it: string;
          title_ar: string;
          detail_ar: string;
          content_ar: string;
          h1_ar: string;
          title_in: string;
          detail_in: string;
          content_in: string;
          h1_in: string;
          title_ms: string;
          detail_ms: string;
          content_ms: string;
          h1_ms: string;
          title_th: string;
          detail_th: string;
          content_th: string;
          h1_th: string;
          title_vi: string;
          detail_vi: string;
          content_vi: string;
          h1_vi: string;
          title_tr: string;
          detail_tr: string;
          content_tr: string;
          h1_tr: string;
          title_pl: string;
          detail_pl: string;
          content_pl: string;
          h1_pl: string;
          title_nl: string;
          detail_nl: string;
          content_nl: string;
          h1_nl: string;
        };
        Insert: {
          collection_time?: string | null;
          content?: string | null;
          detail?: string | null;
          id?: number;
          image_url?: string | null;
          name: string;
          star_rating?: number | null;
          thumbnail_url?: string | null;
          title?: string | null;
          url?: string | null;
          url_key?: string | null;
          h1?: string | null;
          website_data?: string | null;
          title_ja?: string | null;
          detail_ja?: string | null;
          content_ja?: string | null;
          h1_ja?: string | null;
          title_de?: string | null;
          detail_de?: string | null;
          content_de?: string | null;
          h1_de?: string | null;
          title_es?: string | null;
          detail_es?: string | null;
          content_es?: string | null;
          h1_es?: string | null;
          title_fr?: string | null;
          detail_fr?: string | null;
          content_fr?: string | null;
          h1_fr?: string | null;
          title_pt?: string | null;
          detail_pt?: string | null;
          content_pt?: string | null;
          h1_pt?: string | null;
          title_ru?: string | null;
          detail_ru?: string | null;
          content_ru?: string | null;
          h1_ru?: string | null;
          title_zh?: string | null;
          detail_zh?: string | null;
          content_zh?: string | null;
          h1_zh?: string | null;
          title_tw?: string | null;
          detail_tw?: string | null;
          content_tw?: string | null;
          h1_tw?: string | null;
          title_ko?: string | null;
          detail_ko?: string | null;
          content_ko?: string | null;
          h1_ko?: string | null;
          title_it?: string | null;
          detail_it?: string | null;
          content_it?: string | null;
          h1_it?: string | null;
          title_ar?: string | null;
          detail_ar?: string | null;
          content_ar?: string | null;
          h1_ar?: string | null;
          title_in?: string | null;
          detail_in?: string | null;
          content_in?: string | null;
          h1_in?: string | null;
          title_ms?: string | null;
          detail_ms?: string | null;
          content_ms?: string | null;
          h1_ms?: string | null;
          title_th?: string | null;
          detail_th?: string | null;
          content_th?: string | null;
          h1_th?: string | null;
          title_vi?: string | null;
          detail_vi?: string | null;
          content_vi?: string | null;
          h1_vi?: string | null;
          title_tr?: string | null;
          detail_tr?: string | null;
          content_tr?: string | null;
          h1_tr?: string | null;
          title_pl?: string | null;
          detail_pl?: string | null;
          content_pl?: string | null;
          h1_pl?: string | null;
          title_nl?: string | null;
          detail_nl?: string | null;
          content_nl?: string | null;
          h1_nl?: string | null;
        };
        Update: {
          collection_time?: string | null;
          content?: string | null;
          detail?: string | null;
          id?: number;
          image_url?: string | null;
          name?: string;
          star_rating?: number | null;
          thumbnail_url?: string | null;
          title?: string | null;
          url?: string | null;
          url_key?: string | null;
          h1?: string | null;
          website_data?: string | null;
          title_ja?: string | null;
          detail_ja?: string | null;
          content_ja?: string | null;
          h1_ja?: string | null;
          title_de?: string | null;
          detail_de?: string | null;
          content_de?: string | null;
          h1_de?: string | null;
          title_es?: string | null;
          detail_es?: string | null;
          content_es?: string | null;
          h1_es?: string | null;
          title_fr?: string | null;
          detail_fr?: string | null;
          content_fr?: string | null;
          h1_fr?: string | null;
          title_pt?: string | null;
          detail_pt?: string | null;
          content_pt?: string | null;
          h1_pt?: string | null;
          title_ru?: string | null;
          detail_ru?: string | null;
          content_ru?: string | null;
          h1_ru?: string | null;
          title_zh?: string | null;
          detail_zh?: string | null;
          content_zh?: string | null;
          h1_zh?: string | null;
          title_tw?: string | null;
          detail_tw?: string | null;
          content_tw?: string | null;
          h1_tw?: string | null;
          title_ko?: string | null;
          detail_ko?: string | null;
          content_ko?: string | null;
          h1_ko?: string | null;
          title_it?: string | null;
          detail_it?: string | null;
          content_it?: string | null;
          h1_it?: string | null;
          title_ar?: string | null;
          detail_ar?: string | null;
          content_ar?: string | null;
          h1_ar?: string | null;
          title_in?: string | null;
          detail_in?: string | null;
          content_in?: string | null;
          h1_in?: string | null;
          title_ms?: string | null;
          detail_ms?: string | null;
          content_ms?: string | null;
          h1_ms?: string | null;
          title_th?: string | null;
          detail_th?: string | null;
          content_th?: string | null;
          h1_th?: string | null;
          title_vi?: string | null;
          detail_vi?: string | null;
          content_vi?: string | null;
          h1_vi?: string | null;
          title_tr?: string | null;
          detail_tr?: string | null;
          content_tr?: string | null;
          h1_tr?: string | null;
          title_pl?: string | null;
          detail_pl?: string | null;
          content_pl?: string | null;
          h1_pl?: string | null;
          title_nl?: string | null;
          detail_nl?: string | null;
          content_nl?: string | null;
          h1_nl?: string | null;
        };
        Relationships: [];
      };
      product_tag: {
        Row: {
          created_at: string;
          id: number;
          product_id: number;
          tag_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          product_id: number;
          tag_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          product_id: number;
          tag_id: number;
        };
        Relationships: [];
      };
      product: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          url: string;
          status: number;
          source: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string;
          url?: string;
          status?: number;
          source?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          url?: string;
          status?: number;
          source?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type NavigationCategory = Database['public']['Tables']['category']['Row'];
export type Submit = Database['public']['Tables']['submit']['Row'];
export type WebNavigation = Database['public']['Tables']['product_detail']['Row'];

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
