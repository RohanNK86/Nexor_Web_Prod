import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
if (supabaseUrl && !supabaseUrl.startsWith("http")) {
  supabaseUrl = `https://${supabaseUrl}.supabase.co`;
}

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Admin client bypasses Row Level Security (RLS) entirely.
// Only use this in trusted server-side execution (e.g. API routes).
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
