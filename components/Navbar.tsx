"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { 
      label: "Home", 
      href: "/", 
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 z-10 relative">
          <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" />
        </svg>
      ) 
    },
    { 
      label: "Flash", 
      href: "/flash", 
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M13 3L4 14H12L11 21L20 10H12L13 3Z" />
        </svg>
      ) 
    },
    { 
      label: "Grid", 
      href: "/categories", 
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zm-10 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ) 
    },
    { 
      label: "Orders", 
      href: "/orders", 
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ) 
    },
    { 
      label: "Profile", 
      href: "/profile", 
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      ) 
    },
  ];

  return (
    <>
      {/* Desktop Top Navbar (hidden on mobile) */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-[#f5f0e6]/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/" className="block">
            <img 
              src="https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/official_logo-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9vZmZpY2lhbF9sb2dvLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzc0MDgwOTE1LCJleHAiOjE4MDU2MTY5MTV9.EQgxHl1DhC7vXRKQEM80y1wyKHZ8JrMQpg43ejkeP1U" 
              alt="Nexor Logo" 
              className="h-12 md:h-16 w-auto object-contain drop-shadow-sm" 
            />
          </Link>
          <div className="flex items-center gap-1.5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-semibold text-sm">Bengaluru</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="flex-1 max-w-xl px-8">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 border border-transparent focus-within:bg-[#f5f0e6] focus-within:border-gray-200 focus-within:shadow-md rounded-full transition-all">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search for essentials, food, and more..." 
              className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500 font-medium text-gray-900"
            />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="flex items-center gap-8">
          <Link href="/flash" className="text-gray-600 hover:text-black font-semibold text-sm transition-colors">Flash Deals</Link>
          <Link href="/orders" className="text-gray-600 hover:text-black font-semibold text-sm transition-colors">Orders</Link>
          <Link href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-black font-semibold text-sm transition-colors">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
            </svg>
            Sign In
          </Link>
          <button aria-label="Cart" className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Cart
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar (hidden on desktop) */}
      <nav className="bottom-tab-bar md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between px-4">
          {tabs.map((tab) => {
            const active = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
            const isHome = tab.label === 'Home';
            
            return (
              <Link 
                key={tab.label} 
                href={tab.href}
                className={`relative flex flex-col items-center justify-center w-[72px] h-[56px] transition-colors ${active ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {isHome && active && (
                  <div className="absolute top-1 w-14 h-14 bg-[#A3E635] rounded-full -z-0"></div>
                )}
                <div className={`flex items-center justify-center z-10 ${isHome && active ? 'mt-3 mb-0' : 'mb-1 mt-2'}`}>
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
