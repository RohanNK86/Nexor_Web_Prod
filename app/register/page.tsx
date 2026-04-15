"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/ThemeContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const txt = (dark: string, light: string) => (isDark ? dark : light);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase not initialized. Check your environment variables.");
      return;
    }

    setLoading(true);
    setError(null);
    const redirectBase = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    try {
      // 1. Call secure server route to bypass email confirmation and rate limits
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const resData = await res.json();

      if (!res.ok || resData.error) {
        throw new Error(resData.error || "Failed to create account");
      }

      // 2. Account successfully created & auto-confirmed! Automatically log them in locally.
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      setSuccess(true);
      setLoading(false);
      
      // Auto-redirect to home immediately since they are logged in
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 pb-28 pt-16 relative overflow-hidden transition-colors duration-300 ${
      isDark ? "bg-[#06060e] text-[#f0eeff]" : "bg-[#f5f0e6] text-gray-900"
    }`}>
      {/* Decorative orbs */}
      {isDark && (
        <>
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="relative w-full max-w-md">
        <div className={`rounded-3xl p-8 sm:p-10 border transition-all ${
          isDark 
            ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl" 
            : "bg-white border-gray-100 shadow-xl"
        }`}>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="group">
              <img 
                src="https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/official_logo-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9vZmZpY2lhbF9sb2dvLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzc0MDgwOTE1LCJleHAiOjE4MDU2MTY5MTV9.EQgxHl1DhC7vXRKQEM80y1wyKHZ8JrMQpg43ejkeP1U"
                alt="Nexor Logo"
                className="h-14 w-auto drop-shadow-sm transition-transform group-hover:scale-110"
              />
            </Link>
          </div>

          <h1 className={`text-3xl font-black text-center mb-2 tracking-tight ${txt("text-[#f0eeff]", "text-gray-900")}`}>
            Create Account
          </h1>
          <p className={`text-sm text-center mb-8 ${txt("text-[#f0eeff]/50", "text-gray-500")}`}>
            Join Nexor for exclusive deals & faster delivery
          </p>

          {error && (
            <div className={`mb-6 p-4 rounded-xl text-xs font-medium border ${
              isDark ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-red-50 border-red-100 text-red-600"
            }`}>
              {error}
            </div>
          )}

          {success ? (
            <div className={`text-center py-10 animate-fade-up ${txt("text-cyan-400", "text-emerald-600")}`}>
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2">Registration Successful!</h3>
              <p className={`text-sm font-bold tracking-tight ${txt("text-cyan-400", "text-emerald-600")}`}>
                Your account is ready and you are logged in.
              </p>
              <p className="mt-8 text-xs font-bold animate-pulse">Entering store...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all focus:outline-none ${
                        isDark 
                          ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-purple-500/50" 
                          : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Chen"
                    className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all focus:outline-none ${
                        isDark 
                          ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-purple-500/50" 
                          : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@email.com"
                  className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all focus:outline-none ${
                      isDark 
                        ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-purple-500/50" 
                        : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all focus:outline-none ${
                      isDark 
                        ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-purple-500/50" 
                        : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white"
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl text-sm font-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 ${
                    isDark 
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-xl shadow-purple-500/20" 
                      : "bg-black text-white shadow-lg"
                  }`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          )}

          <p className={`text-center text-sm mt-8 ${txt("text-[#f0eeff]/40", "text-gray-500")}`}>
            Already have an account?{" "}
            <Link href="/login" className={`font-black hover:underline transition-colors ${txt("text-purple-400", "text-orange-600")}`}>
              Sign in
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
