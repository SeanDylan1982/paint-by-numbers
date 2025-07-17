import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_paintings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          original_image_url: string;
          processed_image_url: string | null;
          painting_data: any;
          completion_percentage: number;
          is_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          original_image_url: string;
          processed_image_url?: string | null;
          painting_data?: any;
          completion_percentage?: number;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          original_image_url?: string;
          processed_image_url?: string | null;
          painting_data?: any;
          completion_percentage?: number;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};