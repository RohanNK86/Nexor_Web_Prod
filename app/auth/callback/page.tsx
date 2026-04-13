"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      if (!supabase) {
        router.push("/login?error=" + encodeURIComponent("Supabase is not configured."));
        return;
      }

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const callbackError =
        url.searchParams.get("error_description") || url.searchParams.get("error");

      if (callbackError) {
        router.push("/login?error=" + encodeURIComponent(callbackError));
        return;
      }

      // PKCE flow: explicit exchange from callback code to real session.
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          const msg = exchangeError.message?.toLowerCase() || "";
          const isMissingVerifier =
            msg.includes("pkce code verifier") ||
            msg.includes("code verifier not found");

          // This can happen if the verifier key was cleared, but session may still be available.
          if (!isMissingVerifier) {
            router.push("/login?error=" + encodeURIComponent(exchangeError.message));
            return;
          }
        }
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth Callback Error:", error.message);
        router.push("/login?error=" + encodeURIComponent(error.message));
      } else if (!session?.user) {
        router.push("/login?error=" + encodeURIComponent("Unable to complete sign-in. Please try again."));
      } else {
        const metadata = session.user.user_metadata;
        if (!metadata.first_name && metadata.full_name) {
          const names = metadata.full_name.split(" ");
          await supabase.auth.updateUser({
            data: {
              first_name: names[0],
              last_name: names.slice(1).join(" "),
            },
          });
        }

        router.push("/events");
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
