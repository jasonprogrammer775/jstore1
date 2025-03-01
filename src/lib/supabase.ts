import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Product = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
};

export type Category = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  image_url: string;
};
