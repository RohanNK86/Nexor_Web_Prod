"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/ThemeContext";
import { useAuth } from "@/lib/AuthContext";
import React, { useEffect, useState } from "react";

/* ── Icons ─────────────────────────────────── */
const MoonIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.02 0-.71-.71M6.34 6.34l-.71-.71M12 5a7 7 0 100 14A7 7 0 0012 5z" />
  </svg>
);

/* ── Theme Toggle Pill ──────────────────────── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="theme-toggle" title="Toggle theme">
      <button
        onClick={!isDark ? toggleTheme : undefined}
        className={`theme-toggle-btn ${isDark ? "active" : ""}`}
        aria-label="Dark mode"
      >
        <MoonIcon />
      </button>
      <button
        onClick={isDark ? toggleTheme : undefined}
        className={`theme-toggle-btn ${!isDark ? "active" : ""}`}
        aria-label="Light mode"
      >
        <SunIcon />
      </button>
    </div>
  );
}

/* ── Mobile Top Navbar ──────────────────────── */
function MobileTopNavbar({ user, userInitial, isDark, toggleTheme }: { user: any, userInitial: string, isDark: boolean, toggleTheme: () => void }) {
  return (
    <header className={`md:hidden px-4 pt-5 pb-3 flex items-center justify-between sticky top-0 z-[60] transition-colors duration-300 ${
      isDark ? "bg-[#06060e]/80 backdrop-blur-xl border-b border-white/5" : "bg-[#f5f0e6]/90 backdrop-blur-md border-b border-gray-100"
    }`}>
      <div className="flex items-center">
        <Link href="/" className="block">
          <img
            src="https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/official_logo-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9vZmZpY2lhbF9sb2dvLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzc0MDgwOTE1LCJleHAiOjE4MDU2MTY5MTV9.EQgxHl1DhC7vXRKQEM80y1wyKHZ8JrMQpg43ejkeP1U"
            alt="Nexor Logo"
            className="h-10 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
          />
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Theme Toggle (Mobile) */}
        <button 
          onClick={toggleTheme} 
          className={`p-2 rounded-xl transition-all ${isDark ? "bg-white/5 text-purple-400" : "bg-white text-orange-500 shadow-sm border border-gray-100"}`}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </button>

        {/* Profile / Login Indicator (Mobile) */}
        {user ? (
          <Link href="/profile" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-lg transition-transform group-active:scale-95 ${
              isDark ? "bg-gradient-to-br from-purple-500 to-cyan-500 text-white" : "bg-black text-white"
            }`}>
              {userInitial}
            </div>
          </Link>
        ) : (
          <Link href="/login" className={`p-2 rounded-xl transition-all ${isDark ? "bg-white/5 text-[#f0eeff]/60" : "bg-white text-gray-600 shadow-sm border border-gray-100"}`}>
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [locationName, setLocationName] = useState("Bengaluru");
  const [isLocating, setIsLocating] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use reverse geocoding here.
          // For now, we'll indicate 'Live' to confirm it's working.
          setLocationName("Live Location");
          setIsLocating(false);
        },
        (error) => {
          console.warn("Location access denied or failed.");
          setIsLocating(false);
        }
      );
    }
  }, []);

  const tabs = [
    {
      label: "Home",
      href: "/",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 z-10 relative">
          <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" />
        </svg>
      ),
    },
    {
      label: "Flash",
      href: "/flash",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M13 3L4 14H12L11 21L20 10H12L13 3Z" />
        </svg>
      ),
    },
    {
      label: "Grid",
      href: "/categories",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zm-10 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      label: "Orders",
      href: "/orders",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      ),
    },
  ];

  const userInitial = user?.user_metadata?.first_name 
    ? user.user_metadata.first_name[0].toUpperCase() 
    : user?.email ? user.email[0].toUpperCase() : "?";

  return (
    <>
      {/* ── Mobile Top Navbar ── */}
      <MobileTopNavbar user={user} userInitial={userInitial} isDark={isDark} toggleTheme={toggleTheme} />

      {/* ── Desktop Top Navbar ── */}
      <nav
        className={`hidden md:flex items-center justify-between px-8 py-4 sticky top-0 z-50 transition-all duration-300 ${isDark
            ? "bg-[#06060e]/80 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_24px_rgba(168,85,247,0.12)]"
            : "bg-[#f5f0e6]/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="block">
            <img
              src="https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/official_logo-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9vZmZpY2lhbF9sb2dvLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzc0MDgwOTE1LCJleHAiOjE4MDU2MTY5MTV9.EQgxHl1DhC7vXRKQEM80y1wyKHZ8JrMQpg43ejkeP1U"
              alt="Nexor Logo"
              className="h-12 md:h-16 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
            />
          </Link>
          <div className={`flex items-center gap-1.5 cursor-pointer transition-colors ${isDark ? "text-[#f0eeff]/50 hover:text-[#f0eeff]" : "text-gray-600 hover:text-gray-900"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={`font-semibold text-sm ${isDark ? "text-[#f0eeff]/70" : "text-gray-700"} flex items-center gap-2`}>
              {locationName}
              {locationName === "Live Location" && (
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
              {isLocating && "..."}
            </span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="flex-1 max-w-xl px-8">
          <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${isDark
              ? "bg-white/6 border border-white/10 focus-within:bg-white/10 focus-within:border-purple-500/40 focus-within:shadow-[0_0_0_3px_rgba(168,85,247,0.15)] backdrop-blur-md"
              : "bg-gray-100 border border-transparent focus-within:bg-[#f5f0e6] focus-within:border-gray-200 focus-within:shadow-md"
            }`}>
            <svg className={`w-5 h-5 ${isDark ? "text-[#f0eeff]/40" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for essentials, food, and more..."
              className={`bg-transparent border-none outline-none w-full text-sm font-medium ${isDark ? "placeholder-white/30 text-[#f0eeff]" : "placeholder-gray-500 text-gray-900"}`}
            />
          </div>
        </div>

        {/* Desktop Links + Toggle */}
        <div className="flex items-center gap-6">
          <Link href="/flash" className={`font-semibold text-sm transition-colors ${isDark ? "text-[#f0eeff]/60 hover:text-[#f0eeff]" : "text-gray-600 hover:text-black"}`}>Flash Deals</Link>
          <Link href="/orders" className={`font-semibold text-sm transition-colors ${isDark ? "text-[#f0eeff]/60 hover:text-[#f0eeff]" : "text-gray-600 hover:text-black"}`}>Orders</Link>
          <Link href="/admin" className={`font-black text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${isDark ? "text-amber-400 border-amber-400/30 hover:bg-amber-400/10" : "text-amber-600 border-amber-600/30 hover:bg-amber-600/10"}`}>Admin</Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className={`flex items-center gap-2 font-bold text-sm transition-colors ${isDark ? "text-[#f0eeff]" : "text-gray-900"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-md ${isDark ? "bg-gradient-to-br from-purple-500 to-cyan-500 text-white" : "bg-black text-white"
                  }`}>
                  {userInitial}
                </div>
                {user.user_metadata?.first_name || "Profile"}
              </Link>
              <button
                onClick={signOut}
                className={`text-xs font-black p-2 rounded-lg hover:underline ${isDark ? "text-[#f0eeff]/40" : "text-gray-400"}`}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={`flex items-center gap-2 font-semibold text-sm transition-colors ${isDark ? "text-[#f0eeff]/60 hover:text-[#f0eeff]" : "text-gray-600 hover:text-black"}`}>
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
              </svg>
              Sign In
            </Link>
          )}

          <ThemeToggle />

          <button
            aria-label="Cart"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 ${isDark
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_28px_rgba(168,85,247,0.6)]"
                : "bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
          </button>
        </div>
      </nav>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="bottom-tab-bar md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between px-4">
          {tabs.map((tab) => {
            const active = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
            const isHome = tab.label === "Home";

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`relative flex flex-col items-center justify-center w-[72px] h-[56px] transition-colors ${active
                    ? isDark ? "text-[#f0eeff]" : "text-black"
                    : isDark ? "text-[#f0eeff]/30 hover:text-[#f0eeff]/60" : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                {isHome && active && (
                  <div className={`absolute top-1 w-14 h-14 rounded-full -z-0 ${isDark ? "bg-purple-600/40 blur-sm" : "bg-[#A3E635]"}`}></div>
                )}
                <div className={`flex items-center justify-center z-10 ${isHome && active ? "mt-3 mb-0" : "mb-1 mt-2"}`}>
                  {tab.icon}
                </div>
                <span className="text-[11px] font-semibold mt-auto mb-1 z-10 tracking-tight">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
