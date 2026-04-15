"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState("");
  const router = useRouter();

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthLoading(true);
    setAdminAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      
      if (data.success) {
        window.location.href = data.redirectUrl;
      } else {
        setAdminAuthError(data.error || "Incorrect Password");
      }
    } catch (err: any) {
      setAdminAuthError(err.message || "Something went wrong.");
    } finally {
      setAdminAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-[#12121e] border border-white/10 p-8 sm:p-12 rounded-[2rem] shadow-2xl w-full max-w-md text-center backdrop-blur-xl">
        <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
          <span className="text-3xl">🔏</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-widest text-white mb-2">Host Access</h1>
        <p className="text-white/40 text-xs mb-8 font-bold tracking-widest uppercase">Enter Admin Scanner Vault Password</p>
        
        <form onSubmit={handleAdminAuth} className="space-y-4">
          <div>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all text-center tracking-widest font-mono"
              placeholder="••••••••"
              autoFocus
              required
            />
          </div>

          {adminAuthError && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center py-3 rounded-lg uppercase tracking-widest">
              {adminAuthError}
            </div>
          )}

          <button
            type="submit"
            disabled={adminAuthLoading}
            className="w-full bg-rose-500 hover:bg-rose-400 text-black font-black uppercase tracking-[0.2em] py-4 px-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(225,29,72,0.3)] transition-all disabled:opacity-50"
          >
            {adminAuthLoading ? "Verifying..." : "Unlock Scanner"}
          </button>
        </form>
      </div>
    </div>
  );
}
