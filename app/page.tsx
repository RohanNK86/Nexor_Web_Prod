"use client";

import Link from "next/link";
import { useTheme } from "@/lib/ThemeContext";

const categories = [
  { id: "grocery", label: "Grocery", emoji: "🍇", image: "/icons/grocery.png", href: "/grocery" },
  { id: "food", label: "Food\nDelivery", emoji: "🛵", image: "/icons/fooddelivery.png", href: "/food_delivery" },
  { id: "medicines", label: "Medicines", emoji: "💊", image: "/icons/medicines.png", href: "/medicines" },
  { id: "rides", label: "Rides", emoji: "🚙", image: "/icons/ride.png", href: "/rides" },
  { id: "stays", label: "Stays", emoji: "🏨", image: "/icons/stays.png", href: "/stays" },
  { id: "travel", label: "Travel", emoji: "🧳", image: "/icons/travel.png", href: "/travel" },
  { id: "shopping", label: "Shopping", emoji: "🛍️", image: "/icons/shopping.png", href: "/shopping" },
  { id: "events", label: "Events", emoji: "🎸", image: "https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/banners/Events.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0V2ZW50cy5wbmciLCJpYXQiOjE3NzM4NTc5NzUsImV4cCI6MTgwNTM5Mzk3NX0.rPLvRZYTp25bWXWOZSk4GfWvv2KCkwi3mLD08gP9kNY", href: "/events" },
  { id: "quick", label: "Quick\nCommerce", emoji: "🛒", href: "/quick_commerce" },
  { id: "pay", label: "Nexor Pay", emoji: "💳", image: "/icons/nexor pay.png", href: "/nexor_pay" },
];

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Shorthand helpers
  const txt = (dark: string, light: string) => isDark ? dark : light;

  return (
    <>
      <div className={`min-h-screen pb-28 md:pb-12 relative max-w-lg md:max-w-7xl mx-auto border-x md:border-none shadow-sm md:shadow-none transition-colors duration-300 ${isDark ? "bg-transparent text-[#f0eeff] border-white/5" : "bg-[#f5f0e6] text-gray-900 border-gray-100"
        }`}>


        {/* Search (Mobile Only) */}
        <div className="px-4 py-2 mb-2 md:hidden">
          <div className="search-bar flex items-center gap-2 px-4 py-3">
            <svg className={`w-5 h-5 ${txt("text-[#f0eeff]/40", "text-gray-400")}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className={`bg-transparent border-none outline-none w-full text-base font-medium ${txt("placeholder-white/30 text-[#f0eeff]", "placeholder-gray-400 text-gray-900")}`}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-2 md:px-6 md:py-8 py-4">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-y-6 md:gap-y-8 gap-x-1 md:gap-x-4">
            {categories.map((cat, i) => (
              <Link
                href={cat.href}
                key={cat.id}
                className={`service-icon-card transform-gpu transition-all duration-300 animate-fade-up`}
                style={{ animationDelay: `${(i % 5) * 0.03}s` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 text-5xl md:text-[56px] leading-none flex items-center justify-center drop-shadow-sm filter transition-transform">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-contain p-1" />
                  ) : (
                    cat.emoji
                  )}
                </div>
                <span className={`text-[12px] md:text-sm md:mt-1 font-medium text-center leading-snug px-0.5 whitespace-pre-line text-balance ${txt("text-[#f0eeff]/80", "text-gray-800")}`}>
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Deals -> Event Banner */}
        <div className="mt-8 md:mt-12 px-4 md:px-6">
          <h2 className={`text-[22px] md:text-3xl font-bold mb-6 animate-fade-up tracking-tight ${txt("text-[#f0eeff]", "text-gray-900")}`}>Today's Deals !</h2>
          
          <Link href="/events" className="block relative w-full overflow-hidden rounded-[2rem] shadow-2xl animate-fade-up hover:shadow-cyan-500/20 transition-all hover:-translate-y-1 group">
            <div className="w-full aspect-[21/9] md:aspect-[3/1] bg-gray-900 relative">
              <img 
                src="https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/events/BollyWebNewBanner.JPEG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJldmVudHMvQm9sbHlXZWJOZXdCYW5uZXIuSlBFRyIsImlhdCI6MTc3NjI1NzE3MiwiZXhwIjoxNzc4ODQ5MTcyfQ.L0KwAXo78xDOyWgShRwNIPkogpIFaIY3dxYqP6ZHTvc" 
                alt="BollyVibe Event" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            {/* Action Button */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
              <div className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-widest shadow-xl backdrop-blur-md transition-all group-hover:scale-105 ${
                  isDark ? "bg-white/10 text-white border border-white/20" : "bg-white/90 text-black border border-white/50"
              }`}>
                Book Tickets
              </div>
            </div>
          </Link>
        </div>

        {/* Tip Callout */}
        <div className="px-6 md:px-8 mb-10 overflow-hidden relative">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 z-0 ${isDark ? "bg-purple-500/30" : "bg-blue-200 opacity-50"}`}></div>
          <div className={`absolute top-0 left-[calc(50%+8px)] -translate-x-1/2 w-1 h-32 z-0 md:left-[calc(50%+16px)] ${isDark ? "bg-cyan-500/30" : "bg-blue-200 opacity-50"}`}></div>
          <div className={`text-center animate-fade-up relative z-10 py-2 md:py-6 ${isDark
            ? "bg-[#06060e]/80 backdrop-blur-sm shadow-[0_0_30px_15px_rgba(6,6,14,0.8)]"
            : "bg-[#f5f0e6] shadow-[0_0_20px_10px_rgba(245,240,230,1)]"
            }`}>
            <p className={`font-bold text-[15px] md:text-xl leading-snug tracking-tight ${txt("text-[#f0eeff]", "text-gray-900")}`}>
              Use Quick Commerce section for fast deliveries of essentials
            </p>
          </div>
        </div>

        {/* What's brewing */}
        <div className="px-4 md:px-6 pb-12 relative max-w-4xl mx-auto">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 z-0 md:hidden ${isDark ? "bg-purple-500/30" : "bg-blue-200 opacity-50"}`}></div>
          <div className={`absolute top-0 left-[calc(50%+8px)] -translate-x-1/2 w-1 h-32 z-0 md:hidden ${isDark ? "bg-cyan-500/30" : "bg-blue-200 opacity-50"}`}></div>
          <h2 className={`text-[22px] md:text-3xl font-bold mb-6 md:mb-8 relative z-10 inline-block pr-4 ${isDark
            ? "text-[#f0eeff] bg-[#06060e]/80 backdrop-blur-sm shadow-[0_0_12px_12px_rgba(6,6,14,0.8)]"
            : "text-gray-900 bg-[#f5f0e6] shadow-[0_0_10px_10px_rgba(245,240,230,1)]"
            }`}>What's brewing in your head?</h2>

          <div className={`rounded-2xl overflow-hidden relative shadow-sm transition-all ${isDark
            ? "bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/40 hover:shadow-purple-900/30 hover:shadow-xl"
            : "bg-[#fff9e6] border border-orange-100/50 hover:shadow-md"
            }`}>
            <div className="p-8 md:p-12 pb-32 md:pb-32">
              <h3 className={`text-xl md:text-3xl font-bold ${txt("text-[#f0eeff]", "text-orange-900")}`}>Breakfast Specials</h3>
              <p className={`text-sm md:text-lg mt-1 md:mt-2 ${txt("text-[#f0eeff]/60", "text-orange-800")}`}>Start your day right</p>
            </div>
            {isDark ? (
              <>
                <div className="absolute -bottom-10 -right-4 md:-right-10 md:-bottom-20 w-48 h-48 md:w-80 md:h-80 bg-purple-600 rounded-full mix-blend-screen blur-2xl opacity-30"></div>
                <div className="absolute -bottom-10 -left-4 w-40 h-40 md:w-64 md:h-64 bg-cyan-500 rounded-full mix-blend-screen blur-2xl opacity-20"></div>
              </>
            ) : (
              <div className="absolute -bottom-10 -right-4 md:-right-10 md:-bottom-20 w-48 h-48 md:w-80 md:h-80 bg-orange-200 rounded-full mix-blend-multiply blur-xl opacity-50"></div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}