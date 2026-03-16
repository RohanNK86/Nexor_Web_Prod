import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-16 pb-28">
      {/* Header */}
      <div className="border-b border-white/5 bg-obsidian-900/50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] font-mono mb-3">Catalog</p>
          <h1 className="font-display font-bold text-5xl text-white mb-4">All Products</h1>
          <p className="text-ash-400 text-base">{products.length} items across all categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <div className="sticky top-8 space-y-8">
              {/* Search */}
              <div>
                <label className="text-ash-400 text-xs uppercase tracking-widest block mb-3">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2.5 pl-9 bg-obsidian-800 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 transition-colors"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-ash-400 text-xs uppercase tracking-widest block mb-3">
                  Category
                </label>
                <div className="space-y-1">
                  {["All", "Electronics", "Fashion", "Home & Living", "Kitchen", "Sports"].map(
                    (cat, i) => (
                      <button
                        key={cat}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          i === 0
                            ? "bg-amber-400/10 text-amber-400"
                            : "text-ash-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Price range */}
              <div>
                <label className="text-ash-400 text-xs uppercase tracking-widest block mb-3">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 bg-obsidian-800 border border-white/8 rounded-lg text-white text-sm placeholder-ash-600 focus:outline-none focus:border-amber-400/30"
                  />
                  <span className="text-ash-600">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 bg-obsidian-800 border border-white/8 rounded-lg text-white text-sm placeholder-ash-600 focus:outline-none focus:border-amber-400/30"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-ash-400 text-xs uppercase tracking-widest block mb-3">
                  Sort By
                </label>
                <select className="w-full px-3 py-2.5 bg-obsidian-800 border border-white/8 rounded-xl text-ash-300 text-sm focus:outline-none focus:border-amber-400/30 appearance-none cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-ash-500 text-sm">{products.length} results</p>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button className="p-2 rounded-lg text-ash-500 hover:text-white hover:bg-white/5 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
