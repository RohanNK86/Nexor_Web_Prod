import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:top-16 sm:left-16">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-amber-400 border border-amber-400/20 animate-fade-up">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          Spring Collection 2026
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="text-ash-500 text-sm uppercase tracking-[0.3em] mb-6 animate-fade-up font-mono">
          Curated Excellence
        </p>

        {/* Headline */}
        <h1 className="font-display font-bold leading-[1.05] mb-8 animate-fade-up-delay-1">
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-white mb-2">
            Objects Worth
          </span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl gradient-text italic">
            Owning.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-ash-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up-delay-2">
          We source only what survives scrutiny — products designed to outlast trends and reward daily use.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
          <Link
            href="/products"
            className="group px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm tracking-wide"
          >
            Shop Collection
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="#featured"
            className="px-8 py-4 border border-white/10 hover:border-amber-400/30 text-ash-300 hover:text-white font-medium rounded-full transition-all duration-200 hover:bg-white/5 text-sm tracking-wide"
          >
            View Highlights
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-up-delay-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-ash-500 text-xs uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-ash-600 text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ash-600 to-transparent" />
      </div>
    </section>
  );
}

const stats = [
  { value: "12K+", label: "Products" },
  { value: "98%", label: "Satisfaction" },
  { value: "48hr", label: "Delivery" },
  { value: "Free", label: "Returns" },
];
