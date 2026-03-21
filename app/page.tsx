import Link from "next/link";
import Image from "next/image";

const categories = [
  { id: "grocery", label: "Grocery", emoji: "🍇", image: "/icons/grocery.png", href: "/grocery" },
  { id: "food", label: "Food\nDelivery", emoji: "🛵", image: "/icons/fooddelivery.png", href: "/food" },
  { id: "medicines", label: "Medicines", emoji: "💊", image: "/icons/medicines.png", href: "/medicines" },
  { id: "rides", label: "Rides", emoji: "🚙", image: "/icons/ride.png", href: "/rides" },
  { id: "stays", label: "Stays", emoji: "🏨", image: "/icons/stays.png", href: "/stays" },
  { id: "travel", label: "Travel", emoji: "🧳", image: "/icons/travel.png", href: "/travel" },
  { id: "shopping", label: "Shopping", emoji: "🛍️", image: "/icons/shopping.png", href: "/shopping" },
  { id: "events", label: "Events", emoji: "🎸", image: "https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/banners/Events.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0V2ZW50cy5wbmciLCJpYXQiOjE3NzM4NTc5NzUsImV4cCI6MTgwNTM5Mzk3NX0.rPLvRZYTp25bWXWOZSk4GfWvv2KCkwi3mLD08gP9kNY", href: "/events" },
  { id: "quick", label: "Quick\nCommerce", emoji: "🛒", href: "/quick" },
  { id: "pay", label: "Nexor Pay", emoji: "💳", image: "/icons/nexor pay.png", href: "/pay" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-28 md:pb-12 bg-[#f5f0e6] text-gray-900 relative max-w-lg md:max-w-7xl mx-auto border-x md:border-none border-gray-100 shadow-sm md:shadow-none">
      {/* Header (Mobile Only) */}
      <header className="top-header md:hidden px-4 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center cursor-pointer">
          <img
            src="https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/official_logo-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9vZmZpY2lhbF9sb2dvLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzc0MDgwOTE1LCJleHAiOjE4MDU2MTY5MTV9.EQgxHl1DhC7vXRKQEM80y1wyKHZ8JrMQpg43ejkeP1U"
            alt="Nexor Logo"
            className="h-12 w-auto object-contain drop-shadow-sm scale-125 origin-left"
          />
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Scan QR"><svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg></button>
          <button aria-label="Dark Mode"><svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg></button>
          <button aria-label="Cart"><svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg></button>
        </div>
      </header>

      {/* Search (Mobile Only) */}
      <div className="px-4 py-2 mb-2 md:hidden">
        <div className="search-bar flex items-center gap-2 px-4 py-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none w-full text-base placeholder-gray-400 font-medium"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-2 md:px-6 md:py-8 py-4">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-y-6 md:gap-y-8 gap-x-1 md:gap-x-4">
          {categories.map((cat, i) => (
            <Link href={cat.href} key={cat.id} className={`service-icon-card md:hover:scale-105 animate-fade-up-delay-${(i % 5) + 1}`}>
              <div className="w-16 h-16 md:w-20 md:h-20 text-5xl md:text-[56px] leading-none flex items-center justify-center drop-shadow-sm filter transition-transform">
                {cat.image ? (
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-contain p-1" />
                ) : (
                  cat.emoji
                )}
              </div>
              <span className="text-[12px] md:text-sm md:mt-1 font-medium text-center leading-snug px-0.5 text-gray-800 whitespace-pre-line text-balance">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Deals */}
      <div className="mt-8 md:mt-12 px-4 md:px-6">
        <h2 className="text-[22px] md:text-3xl font-bold text-gray-900 mb-6 animate-fade-up tracking-tight">Today's Deals !</h2>
        <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-4 snap-x relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Main Deal Card */}
          <div className="deal-card min-w-[320px] sm:min-w-[360px] md:min-w-0 md:min-h-[250px] flex-shrink-0 snap-center p-5 md:p-8 flex flex-col justify-end text-white shadow-xl shadow-emerald-900/10 animate-fade-up hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="absolute top-4 md:top-8 left-5 md:left-8 w-3/4">
              <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-1 opacity-90 drop-shadow-md">Munch<br />Mania</h3>
              <p className="text-xs md:text-base font-semibold opacity-90 tracking-wide mt-2">Game on, hunger gone!</p>
            </div>

            {/* Discount Badge */}
            <div className="absolute top-0 right-5 md:right-8 bg-white text-emerald-800 px-3 md:px-4 py-1.5 md:py-2.5 rounded-b-lg text-center shadow-lg border border-gray-100 flex flex-col items-center">
              <span className="block text-[8px] md:text-[10px] font-black uppercase text-emerald-900 tracking-wider">Up to</span>
              <span className="block text-[22px] md:text-[32px] font-black leading-none my-0 md:my-1 text-emerald-700">30%</span>
              <span className="block text-[8px] md:text-[10px] font-black uppercase text-emerald-900 tracking-wider">Off</span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100"></div>
            </div>

            <div className="mt-32 md:mt-40">
              <button className="bg-white text-black px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-transform">Order Now</button>
            </div>
          </div>

          {/* Second Deal Card */}
          <div className="deal-card min-w-[320px] sm:min-w-[360px] md:min-w-0 md:min-h-[250px] flex-shrink-0 snap-center p-5 md:p-8 flex flex-col justify-end text-white shadow-xl animate-fade-up hover:shadow-2xl transition-all hover:-translate-y-1" style={{ background: "linear-gradient(135deg, #111827, #000000)" }}>
            <div className="absolute left-5 md:left-8 top-5 md:top-8">
              <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none mb-1">FAST<br />&<br />FRESH</h3>
            </div>
            <div className="mt-40 md:mt-48">
              <button className="bg-white text-black px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-md hover:scale-105 transition-transform">Shop Now</button>
            </div>
          </div>
        </div>

        {/* Carousel indicators (Mobile Only) */}
        <div className="flex md:hidden justify-center gap-1.5 mt-1 mb-8">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>
      </div>

      {/* Tip Callout */}
      <div className="px-6 md:px-8 mb-10 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-blue-200 opacity-50 z-0"></div>
        <div className="absolute top-0 left-[calc(50%+8px)] -translate-x-1/2 w-1 h-32 bg-blue-200 opacity-50 z-0 md:left-[calc(50%+16px)]"></div>
        <div className="text-center animate-fade-up relative z-10 bg-[#f5f0e6] shadow-[0_0_20px_10px_rgba(245,240,230,1)] py-2 md:py-6">
          <p className="font-bold text-gray-900 text-[15px] md:text-xl leading-snug tracking-tight">
            Use Quick Commerce section for fast deliveries of essentials
          </p>
        </div>
      </div>

      {/* What's brewing */}
      <div className="px-4 md:px-6 pb-12 relative max-w-4xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-blue-200 opacity-50 z-0 md:hidden"></div>
        <div className="absolute top-0 left-[calc(50%+8px)] -translate-x-1/2 w-1 h-32 bg-blue-200 opacity-50 z-0 md:hidden"></div>
        <h2 className="text-[22px] md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 relative z-10 bg-[#f5f0e6] inline-block pr-4 shadow-[0_0_10px_10px_rgba(245,240,230,1)]">What's brewing in your head?</h2>
        <div className="bg-[#fff9e6] rounded-2xl overflow-hidden relative shadow-sm border border-orange-100/50 hover:shadow-md transition-shadow">
          <div className="p-8 md:p-12 pb-32 md:pb-32">
            <h3 className="text-xl md:text-3xl font-bold text-orange-900">Breakfast Specials</h3>
            <p className="text-orange-800 text-sm md:text-lg mt-1 md:mt-2">Start your day right</p>
          </div>
          <div className="absolute -bottom-10 -right-4 md:-right-10 md:-bottom-20 w-48 h-48 md:w-80 md:h-80 bg-orange-200 rounded-full mix-blend-multiply blur-xl opacity-50"></div>
        </div>
      </div>

    </div>
  );
}