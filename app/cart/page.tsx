import { cartItems } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen pt-16 pb-28">
      {/* Header */}
      <div className="border-b border-white/5 bg-obsidian-900/50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] font-mono mb-3">Review</p>
          <h1 className="font-display font-bold text-5xl text-white">Your Cart</h1>
          <p className="text-ash-500 text-sm mt-2">{cartItems.length} items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">◎</div>
            <h2 className="font-display font-bold text-3xl text-white mb-4">Cart is empty</h2>
            <p className="text-ash-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full text-sm transition-all hover:scale-105"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-5 rounded-2xl bg-obsidian-800 border border-white/5 hover:border-white/10 transition-colors group"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-obsidian-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-ash-500 text-xs uppercase tracking-widest mb-1">{item.category}</p>
                    <h3 className="text-white font-medium text-sm leading-snug mb-2 truncate">{item.name}</h3>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-white/10 overflow-hidden">
                        <button className="w-8 h-8 text-ash-500 hover:text-white hover:bg-white/5 transition-colors text-sm">−</button>
                        <span className="w-8 text-center text-white text-xs font-medium">{item.quantity}</span>
                        <button className="w-8 h-8 text-ash-500 hover:text-white hover:bg-white/5 transition-colors text-sm">+</button>
                      </div>

                      <button className="text-ash-600 hover:text-red-400 transition-colors text-xs">
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                    {item.quantity > 1 && (
                      <p className="text-ash-600 text-xs mt-1">${item.price} each</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Promo code */}
              <div className="flex gap-3 pt-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-4 py-3 bg-obsidian-800 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 transition-colors"
                />
                <button className="px-6 py-3 border border-white/10 hover:border-amber-400/30 text-ash-300 hover:text-amber-400 font-medium rounded-xl text-sm transition-all">
                  Apply
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 p-6 rounded-2xl bg-obsidian-800 border border-white/5">
                <h2 className="font-display font-bold text-xl text-white mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-ash-400">Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ash-400">Shipping</span>
                    <span className="text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ash-400">Estimated Tax</span>
                    <span className="text-white">${tax}</span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-amber-400 font-bold text-xl font-display">${total.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full text-sm text-center transition-all hover:scale-[1.02] active:scale-98"
                >
                  Proceed to Checkout →
                </Link>

                <Link
                  href="/products"
                  className="block w-full py-3 text-center text-ash-500 hover:text-white text-sm mt-3 transition-colors"
                >
                  Continue Shopping
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-3">
                  {[
                    { icon: "🔒", label: "Secure" },
                    { icon: "↩", label: "Returns" },
                    { icon: "⚡", label: "Fast" },
                  ].map((badge) => (
                    <div key={badge.label} className="text-center">
                      <div className="text-xl mb-1">{badge.icon}</div>
                      <p className="text-ash-600 text-[10px] uppercase tracking-wide">{badge.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
