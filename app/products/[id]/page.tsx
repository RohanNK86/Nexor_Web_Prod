import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: { id: string };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen pt-16 pb-28">
      {/* Breadcrumb */}
      <div className="border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-ash-600">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-amber-400 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-ash-400">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-obsidian-800 border border-white/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-amber-400 text-black">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl overflow-hidden bg-obsidian-800 border cursor-pointer transition-colors ${
                    i === 1 ? "border-amber-400/50" : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      fill
                      className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                      sizes="10vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category / tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-amber-400 text-xs font-mono uppercase tracking-widest">
                {product.category}
              </span>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-white/5 text-ash-500 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-5">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-ash-700 fill-ash-700"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-medium text-sm">{product.rating}</span>
              <span className="text-ash-600 text-sm">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-ash-400 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display font-bold text-4xl text-white">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-ash-600 text-xl line-through">${product.originalPrice}</span>
                  <span className="px-2 py-1 rounded bg-red-500/15 text-red-400 text-sm font-semibold">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center rounded-full border border-white/10 overflow-hidden">
                <button className="w-11 h-12 text-ash-400 hover:text-white hover:bg-white/5 transition-colors text-lg">
                  −
                </button>
                <span className="w-12 text-center text-white font-medium text-sm">1</span>
                <button className="w-11 h-12 text-ash-400 hover:text-white hover:bg-white/5 transition-colors text-lg">
                  +
                </button>
              </div>

              <button className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-98 text-sm tracking-wide">
                Add to Cart
              </button>

              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-amber-400/30 hover:bg-amber-400/5 text-ash-500 hover:text-amber-400 transition-all flex-shrink-0">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Shipping / Returns */}
            <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-8">
              {productFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5">
                  <span className="text-amber-400 text-base">{f.icon}</span>
                  <div>
                    <p className="text-white text-xs font-medium">{f.label}</p>
                    <p className="text-ash-600 text-xs">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-3xl text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const productFeatures = [
  { icon: "⚡", label: "Fast Shipping", detail: "2-3 business days" },
  { icon: "↩", label: "Free Returns", detail: "30-day window" },
  { icon: "✦", label: "Authentic", detail: "100% verified" },
  { icon: "◈", label: "Warranty", detail: "1-year coverage" },
];
