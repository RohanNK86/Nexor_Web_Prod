import Link from "next/link";
// import {services} from "@/lib/data";

const services = [
  {
    id: "grocery",
    label: "Grocery",
    href: "/grocery",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <path d="M22 34 Q32 18 42 34" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <ellipse cx="32" cy="35" rx="10" ry="5" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="3" fill="#4ade80" opacity="0.9"/>
        <circle cx="32" cy="23" r="3.5" fill="#fb923c" opacity="0.9"/>
        <circle cx="38" cy="26" r="3" fill="#a78bfa" opacity="0.9"/>
        <path d="M20 38 Q32 42 44 38" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "food-delivery",
    label: "Food Delivery",
    href: "/food_delivery",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <rect x="18" y="26" width="20" height="10" rx="5" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
        <path d="M38 31 L46 31 L44 26 L38 26 Z" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="24" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="40" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <path d="M28 26 Q32 20 36 26" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="32" cy="22" r="2" fill="#fb923c"/>
      </svg>
    ),
  },
  {
    id: "medicines",
    label: "Medicines",
    href: "/medicines",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <rect x="27" y="17" width="10" height="22" rx="5" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1.5"/>
        <rect x="27" y="17" width="10" height="11" rx="5" fill="rgba(251,191,36,0.25)" stroke="#fbbf24" strokeWidth="1.5"/>
        <line x1="32" y1="28" x2="32" y2="39" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M22 32 L26 32 M38 32 L42 32" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 26 L32 30 M30 28 L34 28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "rides",
    label: "Rides",
    href: "/rides",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <rect x="19" y="27" width="26" height="10" rx="3" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
        <path d="M22 27 L25 21 L39 21 L42 27" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(251,191,36,0.08)"/>
        <circle cx="25" cy="38" r="3.5" fill="none" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="25" cy="38" r="1.5" fill="#fbbf24"/>
        <circle cx="39" cy="38" r="3.5" fill="none" stroke="#fbbf24" strokeWidth="2"/>
        <circle cx="39" cy="38" r="1.5" fill="#fbbf24"/>
        <rect x="27" y="22" width="5" height="5" rx="1" fill="rgba(147,197,253,0.4)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
        <rect x="33" y="22" width="5" height="5" rx="1" fill="rgba(147,197,253,0.4)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    id: "stays",
    label: "Stays",
    href: "/stays",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <path d="M20 38 L20 28 L32 19 L44 28 L44 38 Z" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M20 28 L32 19 L44 28" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(251,191,36,0.15)"/>
        <rect x="28" y="30" width="8" height="8" rx="1" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.2"/>
        <rect x="22" y="29" width="5" height="4" rx="1" fill="rgba(147,197,253,0.3)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
        <rect x="37" y="29" width="5" height="4" rx="1" fill="rgba(147,197,253,0.3)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
        <circle cx="32" cy="17" r="2" fill="#fbbf24"/>
      </svg>
    ),
  },
  {
    id: "travel",
    label: "Travel",
    href: "/travel",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <ellipse cx="32" cy="28" rx="11" ry="14" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <ellipse cx="32" cy="28" rx="18" ry="4" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
        <line x1="32" y1="14" x2="32" y2="42" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M19 22 Q32 26 45 22" stroke="#fbbf24" strokeWidth="1" fill="none"/>
        <path d="M19 34 Q32 30 45 34" stroke="#fbbf24" strokeWidth="1" fill="none"/>
        <circle cx="32" cy="28" r="2.5" fill="#fbbf24"/>
      </svg>
    ),
  },
  {
    id: "shopping",
    label: "Shopping",
    href: "/shopping",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <path d="M21 22 L23 36 L41 36 L43 22 Z" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M27 22 Q27 17 32 17 Q37 17 37 22" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="27" x2="41" y2="27" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="29" y1="22" x2="28" y2="36" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
        <line x1="35" y1="22" x2="36" y2="36" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
        <circle cx="26" cy="38" r="2" fill="#fbbf24"/>
        <circle cx="38" cy="38" r="2" fill="#fbbf24"/>
      </svg>
    ),
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <rect x="20" y="23" width="24" height="18" rx="3" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5"/>
        <line x1="20" y1="28" x2="44" y2="28" stroke="#fbbf24" strokeWidth="1.5"/>
        <rect x="24" y="19" width="3" height="7" rx="1.5" fill="#fbbf24"/>
        <rect x="37" y="19" width="3" height="7" rx="1.5" fill="#fbbf24"/>
        <circle cx="27" cy="33" r="1.5" fill="#fbbf24" opacity="0.6"/>
        <circle cx="32" cy="33" r="1.5" fill="#fbbf24"/>
        <circle cx="37" cy="33" r="1.5" fill="#fbbf24" opacity="0.6"/>
        <circle cx="27" cy="38" r="1.5" fill="#fbbf24" opacity="0.4"/>
        <circle cx="32" cy="38" r="1.5" fill="#fbbf24" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "quick-commerce",
    label: "Quick Commerce",
    href: "/quick_commerce",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <path d="M19 26 L22 22 L42 22 L45 26 L44 36 L20 36 Z" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="19" y1="26" x2="45" y2="26" stroke="#fbbf24" strokeWidth="1.2"/>
        <circle cx="25" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="39" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <path d="M30 29 L34 29 L32 33 L35 33 L29 39 L31 34 L28 34 Z" fill="#fbbf24" opacity="0.8"/>
      </svg>
    ),
  },
  {
    id: "nexor-pay",
    label: "Nexor Pay",
    href: "/nexor_pay",
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
        <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
        <rect x="18" y="22" width="28" height="18" rx="3" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5"/>
        <rect x="18" y="26" width="28" height="4" fill="rgba(251,191,36,0.25)"/>
        <rect x="22" y="33" width="8" height="2" rx="1" fill="#fbbf24" opacity="0.6"/>
        <rect x="22" y="36" width="5" height="2" rx="1" fill="#fbbf24" opacity="0.4"/>
        <circle cx="40" cy="34" r="4" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.2"/>
        <path d="M38 34 L39.5 35.5 L42 32.5" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];


export default function HomePage() {
  return (
    <div className="min-h-screen pb-32">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden hero-gradient">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-amber-400/20 text-amber-400 text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Everything in one place
          </div>

          <h1 className="font-display font-bold leading-[1.05] mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-7xl text-white mb-1">
              Your World,
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl gradient-text italic">
              Delivered.
            </span>
          </h1>

          <p className="text-ash-400 text-lg max-w-lg mx-auto leading-relaxed">
            Grocery, rides, food, travel and more — all from a single platform built for the way you live.
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="w-px h-10 bg-gradient-to-b from-ash-600 to-transparent" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] font-mono mb-3">
            Our Services
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white">
            What can we help with?
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border border-white/5 bg-obsidian-800/50 hover:bg-obsidian-800 hover:border-amber-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/5"
            >
              {/* Icon container */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full bg-amber-400/0 group-hover:bg-amber-400/8 blur-xl transition-all duration-300" />
                <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Label */}
              <span className="text-ash-400 group-hover:text-amber-400 text-xs sm:text-sm font-medium text-center leading-tight transition-colors duration-200">
                {service.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo strip */}
      <section className="px-6 pb-8 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{
            background: "radial-gradient(ellipse at left, rgba(251,191,36,0.07) 0%, transparent 60%), #10101e",
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-40 opacity-[0.04]"
            style={{
              background: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(251,191,36,1) 8px, rgba(251,191,36,1) 9px)",
            }}
          />
          <div>
            <p className="text-amber-400 text-xs font-mono uppercase tracking-widest mb-2">New User Offer</p>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
              Get ₹200 off your first order
            </h3>
            <p className="text-ash-500 text-sm">Use code <span className="text-amber-400 font-mono font-bold">NEXOR200</span> at checkout</p>
          </div>
          <button className="flex-shrink-0 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full text-sm transition-all hover:scale-105 active:scale-95">
            Claim Offer →
          </button>
        </div>
      </section>
    </div>
  );
}