"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/ThemeContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Shorthand helper for conditional colors
  const txt = (dark: string, light: string) => (isDark ? dark : light);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase not initialized. Check your environment variables.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 pb-28 pt-16 relative overflow-hidden transition-colors duration-300 ${
      isDark ? "bg-[#06060e] text-[#f0eeff]" : "bg-[#f5f0e6] text-gray-900"
    }`}>
      {/* Decorative orbs */}
      {isDark && (
        <>
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className={`rounded-3xl p-8 sm:p-10 border transition-all ${
          isDark 
            ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl shadow-purple-500/5" 
            : "bg-white border-gray-100 shadow-xl"
        }`}>
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/official_logo-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9vZmZpY2lhbF9sb2dvLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzc0MDgwOTE1LCJleHAiOjE4MDU2MTY5MTV9.EQgxHl1DhC7vXRKQEM80y1wyKHZ8JrMQpg43ejkeP1U"
                alt="Nexor Logo"
                className="h-14 w-auto object-contain transition-transform group-hover:scale-110"
              />
            </Link>
          </div>

          <h1 className={`text-3xl font-black text-center mb-2 tracking-tight ${txt("text-[#f0eeff]", "text-gray-900")}`}>
            Welcome Back
          </h1>
          <p className={`text-sm text-center mb-8 ${txt("text-[#f0eeff]/50", "text-gray-500")}`}>
            Sign in to your Nexor account
          </p>

          {error && (
            <div className={`mb-6 p-4 rounded-xl text-xs font-medium border ${
              isDark ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-red-50 border-red-100 text-red-600"
            }`}>
              {error}
            </div>
          )}

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => handleSocialLogin('google')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-all ${
                isDark 
                  ? "border-white/8 text-[#f0eeff]/70 hover:bg-white/5" 
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="G" />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-all ${
                isDark 
                  ? "border-white/8 text-[#f0eeff]/70 hover:bg-white/5" 
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-gray-100"}`} />
            <span className={`text-[10px] font-black uppercase tracking-tighter ${txt("text-white/20", "text-gray-400")}`}>or email</span>
            <div className={`h-px flex-1 ${isDark ? "bg-white/8" : "bg-gray-100"}`} />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={`w-full px-5 py-3.5 border rounded-2xl text-sm font-medium transition-all focus:outline-none ${
                    isDark 
                      ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-purple-500/50" 
                      : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-orange-500/50 focus:bg-white"
                }`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`block text-[10px] font-black uppercase tracking-widest ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>Password</label>
                <Link href="/forgot-password" className={`text-xs font-bold transition-colors ${txt("text-purple-400", "text-orange-600")}`}>
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className={`w-full px-5 py-3.5 border rounded-2xl text-sm font-medium transition-all focus:outline-none ${
                    isDark 
                      ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-purple-500/50" 
                      : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-orange-500/50 focus:bg-white"
                }`}
              />
            </div>

            <button
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-sm font-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 ${
                isDark 
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-xl shadow-purple-500/20" 
                  : "bg-black text-white shadow-lg"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className={`text-center text-sm mt-8 ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>
            New to Nexor?{" "}
            <Link href="/register" className={`font-black hover:underline transition-colors ${txt("text-purple-400", "text-orange-600")}`}>
              Create Account
            </Link>
          </p>
        </div>

        <div className="text-center mt-8 animate-fade-up">
          <Link href="/" className={`text-xs font-bold transition-colors flex items-center justify-center gap-2 ${txt("text-[#f0eeff]/30 hover:text-[#f0eeff]", "text-gray-400 hover:text-black")}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
