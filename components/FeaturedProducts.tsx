import { products } from "@/lib/data";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section id="featured" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] font-mono mb-3">
            Featured
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight">
            Selected Works
          </h2>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-2 text-sm text-ash-400 hover:text-amber-400 transition-colors group font-medium self-start sm:self-auto"
        >
          View All Products
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
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Electronics", "Fashion", "Home", "Kitchen"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              i === 0
                ? "bg-amber-400 text-black"
                : "border border-white/8 text-ash-400 hover:text-white hover:border-white/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
