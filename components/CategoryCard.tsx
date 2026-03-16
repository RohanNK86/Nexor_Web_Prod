import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.id}`}
      className="group relative overflow-hidden rounded-2xl aspect-square block"
    >
      {/* Background image */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Amber tint on hover */}
      <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors duration-300" />

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-amber-400/30 transition-all duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300 origin-left">
          {category.icon}
        </div>
        <h3 className="text-white font-semibold text-sm leading-tight mb-1">
          {category.name}
        </h3>
        <p className="text-ash-400 text-xs">
          {category.count} items
        </p>

        {/* Arrow indicator */}
        <div className="mt-2 flex items-center gap-1 text-amber-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1 group-hover:translate-x-0 transform">
          <span>Explore</span>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
