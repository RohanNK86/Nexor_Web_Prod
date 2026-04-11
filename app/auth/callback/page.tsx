"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      if (!supabase) return;

      // The supabase client automatically handles the session extraction from the URL
      // for client-side Auth. We just need to wait a moment and then redirect.
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth Callback Error:", error.message);
        router.push("/login?error=" + encodeURIComponent(error.message));
      } else {
        // If a new user, Google meta_data has 'full_name' but maybe not 'first_name' & 'last_name'
        // which your registration form uses.
        if (session?.user) {
          const metadata = session.user.user_metadata;
          if (!metadata.first_name && metadata.full_name) {
            // Optional: You could update the user's metadata here if needed
            // to maintain consistency with the registration page format
            const names = metadata.full_name.split(" ");
            await supabase.auth.updateUser({
              data: {
                first_name: names[0],
                last_name: names.slice(1).join(" "),
              }
            });
          }
        }
        
        router.push("/");
        router.refresh();
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06060e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-white/60 font-medium animate-pulse">Completing sign-in...</p>
      </div>
    </div>
  );
}
