import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Automatically handle people putting in JUST the project ID instead of the full URL
if (supabaseUrl && !supabaseUrl.startsWith("http")) {
  supabaseUrl = `https://${supabaseUrl}.supabase.co`;
}

// Initialize as null first
let client: SupabaseClient<any> | undefined;

try {
  if (supabaseUrl && supabaseAnonKey) {
    client = createClient<any>(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "nexor-auth-token",
      },
    });
  } else {
    console.warn("Supabase credentials missing in .env.local.");
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
}

// export either the client or a placeholder that won't crash on load
export const supabase = client as SupabaseClient<any>;

