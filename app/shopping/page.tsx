import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryCard from "@/components/CategoryCard";
import Newsletter from "@/components/Newsletter";
import { categories } from "@/lib/data";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Categories Section */}
      <section className="py-20 px-6 bg-obsidian-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] font-mono mb-3">Browse</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-obsidian-800 border border-amber-400/10">
            {/* Background glow */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/3 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Diagonal stripe accent */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(251,191,36,0.8) 10px,
                  rgba(251,191,36,0.8) 11px
                )`,
              }}
            />

            <div className="relative z-10 p-10 sm:p-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
                  Limited Offer
                </span>
                <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
                  Up to <span className="gradient-text">40% off</span>
                  <br />
                  this season.
                </h2>
                <p className="text-ash-400 text-base max-w-xs leading-relaxed">
                  Our biggest sale of the year. Ends Sunday at midnight.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Countdown */}
                <div className="flex gap-3">
                  {[
                    { value: "02", label: "Days" },
                    { value: "14", label: "Hours" },
                    { value: "37", label: "Min" },
                    { value: "09", label: "Sec" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="w-14 h-14 bg-obsidian-950 border border-white/8 rounded-xl flex items-center justify-center font-mono font-bold text-xl text-white">
                        {item.value}
                      </div>
                      <p className="text-ash-600 text-[10px] uppercase tracking-wide mt-1">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/products?filter=sale"
                  className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full text-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Shop the Sale →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
