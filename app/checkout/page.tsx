import { cartItems } from "@/lib/data";
import Image from "next/image";

export default function CheckoutPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen pt-16 pb-28">
      {/* Header */}
      <div className="border-b border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-black font-display font-bold text-sm">
              V
            </div>
            <span className="font-display font-semibold text-white">VAULT</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {["Cart", "Checkout", "Confirm"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i === 1
                      ? "bg-amber-400 text-black"
                      : i < 1
                      ? "bg-obsidian-700 text-amber-400 border border-amber-400/30"
                      : "bg-obsidian-800 text-ash-600 border border-white/8"
                  }`}
                >
                  {i < 1 ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    i === 1 ? "text-white font-medium" : i < 1 ? "text-ash-500" : "text-ash-700"
                  }`}
                >
                  {step}
                </span>
                {i < 2 && <div className="w-8 h-px bg-white/10 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Checkout Form */}
          <div className="lg:col-span-3 space-y-10">
            {/* Contact */}
            <section>
              <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs flex items-center justify-center font-mono">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="First Name" placeholder="Alex" />
                <FormField label="Last Name" placeholder="Chen" />
                <div className="sm:col-span-2">
                  <FormField label="Email Address" placeholder="alex@example.com" type="email" />
                </div>
                <div className="sm:col-span-2">
                  <FormField label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs flex items-center justify-center font-mono">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FormField label="Street Address" placeholder="123 Main Street, Apt 4B" />
                </div>
                <FormField label="City" placeholder="New York" />
                <FormField label="State / Province" placeholder="NY" />
                <FormField label="ZIP / Postal Code" placeholder="10001" />
                <div>
                  <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">
                    Country
                  </label>
                  <select className="w-full px-4 py-3 bg-obsidian-800 border border-white/8 rounded-xl text-ash-300 text-sm focus:outline-none focus:border-amber-400/30 transition-colors appearance-none">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              {/* Shipping method */}
              <div className="mt-6 space-y-3">
                <label className="block text-ash-400 text-xs uppercase tracking-widest mb-3">
                  Shipping Method
                </label>
                {shippingOptions.map((opt, i) => (
                  <label
                    key={opt.label}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      i === 0
                        ? "border-amber-400/40 bg-amber-400/5"
                        : "border-white/8 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === 0 ? "border-amber-400" : "border-white/20"}`}>
                        {i === 0 && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{opt.label}</p>
                        <p className="text-ash-600 text-xs">{opt.time}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${i === 0 ? "text-emerald-400" : "text-white"}`}>
                      {opt.price}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs flex items-center justify-center font-mono">3</span>
                Payment Details
              </h2>

              {/* Card number */}
              <div className="space-y-4">
                <div>
                  <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 pr-14 bg-obsidian-800 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 transition-colors font-mono"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-6 h-4 bg-yellow-400/20 rounded text-yellow-400 text-[8px] flex items-center justify-center font-bold">VISA</div>
                      <div className="w-6 h-4 bg-red-400/20 rounded text-red-400 text-[7px] flex items-center justify-center font-bold">MC</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Expiry Date" placeholder="MM / YY" />
                  <FormField label="CVV" placeholder="•••" />
                </div>

                <FormField label="Cardholder Name" placeholder="Alex Chen" />
              </div>
            </section>

            {/* Submit */}
            <button className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-full text-sm tracking-wide transition-all hover:scale-[1.01] active:scale-98">
              Place Order — ${total.toLocaleString()}
            </button>

            <p className="text-center text-ash-600 text-xs">
              🔒 Your payment info is encrypted and secure. We never store card details.
            </p>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <h2 className="font-display font-bold text-xl text-white mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-obsidian-800 border border-white/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full text-black text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{item.name}</p>
                      <p className="text-ash-600 text-xs">{item.category}</p>
                    </div>
                    <span className="text-white text-sm font-medium flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/5 mb-4" />

              {/* Totals */}
              <div className="space-y-2.5 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-ash-400">Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ash-400">Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ash-400">Tax (8%)</span>
                  <span className="text-white">${tax}</span>
                </div>
                <div className="h-px bg-white/5 my-1" />
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-amber-400 font-bold font-display text-xl">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-obsidian-800 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 focus:bg-obsidian-700 transition-all"
      />
    </div>
  );
}

const shippingOptions = [
  { label: "Standard Shipping", time: "3–5 business days", price: "Free" },
  { label: "Express Shipping", time: "1–2 business days", price: "$12.99" },
  { label: "Overnight", time: "Next business day", price: "$24.99" },
];
