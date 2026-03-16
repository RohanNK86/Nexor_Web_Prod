"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const cartCount = 3;

  return (
    <>
      <nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
        role="navigation"
      >
        <div className="pill-nav rounded-full px-4 py-3 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-black font-display font-bold text-sm group-hover:scale-110 transition-transform">
              <Image
                src="/icons/home_icon.svg"
                alt="Home"
                width={16}
                height={16}
              />
            </div>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Flash", href: "/flash" },
              { label: "Shopping", href: "/shopping" },
            ].map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                      : "text-ash-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-colors group ${
                pathname === "/cart"
                  ? "bg-amber-400/10 shadow-[0_0_14px_rgba(251,191,36,0.35)]"
                  : "hover:bg-white/5"
              }`}
              aria-label="Cart"
            >
              <CartIcon
                className={`w-5 h-5 transition-colors ${
                  pathname === "/cart"
                    ? "text-amber-400"
                    : "text-ash-300 group-hover:text-white"
                }`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-400 rounded-full text-black text-[10px] font-bold flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-black font-display font-bold text-sm group-hover:scale-110 transition-transform">
                <Image
                  src="/icons/profile_icon.svg"
                  alt="Profile"
                  width={16}
                  height={16}
                />
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1.5 w-4">
                <span
                  className={`block h-px transition-all duration-300 origin-center ${
                    mobileOpen
                      ? "rotate-45 translate-y-[3px] bg-amber-400"
                      : "bg-ash-300"
                  }`}
                />
                <span
                  className={`block h-px bg-ash-300 transition-all duration-300 ${
                    mobileOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-px transition-all duration-300 origin-center ${
                    mobileOpen
                      ? "-rotate-45 -translate-y-[3px] bg-amber-400"
                      : "bg-ash-300"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute bottom-full left-0 right-0 mb-2 glass rounded-2xl overflow-hidden transition-all duration-300 origin-bottom ${
            mobileOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
        >
          <div className="p-4 flex flex-col gap-1">
            {[
              { label: "Flash", href: "/flash" },
              { label: "Shopping", href: "/shopping" },
            ].map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "text-amber-400 bg-amber-400/10"
                      : "text-ash-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

function CartIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
