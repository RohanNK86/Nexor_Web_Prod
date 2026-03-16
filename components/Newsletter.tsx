export default function Newsletter() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative line */}
        <div className="flex items-center gap-4 justify-center mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/20" />
          <span className="text-amber-400 text-xs font-mono uppercase tracking-widest">
            Stay Informed
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/20" />
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-5">
          New drops. <span className="gradient-text italic">First.</span>
        </h2>
        <p className="text-ash-400 text-base max-w-md mx-auto mb-10 leading-relaxed">
          Join 40,000+ members who get early access to new products, exclusive discounts, and design stories.
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-5 py-3.5 rounded-full bg-obsidian-800 border border-white/8 text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/40 focus:bg-obsidian-700 transition-all"
          />
          <button className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full text-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
            Subscribe
          </button>
        </div>

        <p className="text-ash-600 text-xs mt-5">
          No spam. Unsubscribe anytime. By subscribing, you agree to our{" "}
          <a href="/privacy" className="text-ash-500 hover:text-amber-400 transition-colors underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>

        {/* Social proof */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {["bg-purple-400", "bg-blue-400", "bg-amber-400", "bg-rose-400", "bg-emerald-400"].map(
              (color, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${color} border-2 border-obsidian-950 opacity-80`}
                />
              )
            )}
          </div>
          <p className="text-ash-500 text-xs">
            <span className="text-white font-medium">40,218</span> subscribers
          </p>
        </div>
      </div>
    </section>
  );
}
