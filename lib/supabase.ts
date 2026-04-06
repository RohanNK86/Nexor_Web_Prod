import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Automatically handle people putting in JUST the project ID instead of the full URL
if (supabaseUrl && !supabaseUrl.startsWith("http")) {
  supabaseUrl = `https://${supabaseUrl}.supabase.co`;
}

// Initialize as null first
let client;

try {
  if (supabaseUrl && supabaseAnonKey) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn("Supabase credentials missing in .env.local.");
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
}

// export either the client or a placeholder that won't crash on load
export const supabase = client as ReturnType<typeof createClient>;

