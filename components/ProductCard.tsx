import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/products/${product.id}`} className="group product-card block">
      <div className="relative overflow-hidden rounded-2xl bg-obsidian-800 border border-white/5 hover:border-amber-400/20 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/5 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-obsidian-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="product-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300" />

          {/* Quick view on hover */}
          <div className="product-overlay absolute bottom-4 inset-x-4 opacity-0 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
            <button className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black text-sm font-semibold rounded-xl transition-colors">
              Quick View
            </button>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                  product.badge === "Sale"
                    ? "bg-red-500/90 text-white"
                    : product.badge === "New"
                    ? "bg-amber-400 text-black"
                    : "bg-purple-500/90 text-white"
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Discount badge */}
          {discount && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-black/60 text-amber-400 backdrop-blur-sm">
                -{discount}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-ash-500 text-xs font-medium uppercase tracking-widest mb-1.5">
            {product.category}
          </p>
          <h3 className="text-white font-medium text-sm leading-snug mb-3 group-hover:text-amber-400/90 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-ash-600 fill-ash-600"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-ash-600 text-xs">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-white font-semibold text-base">${product.price}</span>
              {product.originalPrice && (
                <span className="text-ash-600 text-xs line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-ash-500 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-400/5 transition-all"
              aria-label="Add to wishlist"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
