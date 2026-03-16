import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pb-28 pt-16 hero-gradient">
      {/* Decorative orbs */}
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 sm:p-10 border border-white/8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-black font-display font-bold">
                V
              </div>
              <span className="font-display font-semibold text-white text-xl tracking-wide">VAULT</span>
            </div>
          </div>

          <h1 className="font-display font-bold text-3xl text-white text-center mb-2">
            Create account
          </h1>
          <p className="text-ash-500 text-sm text-center mb-8">
            Join 40,000+ members and start shopping
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: "⚡", label: "Fast checkout" },
              { icon: "↩", label: "Easy returns" },
              { icon: "✦", label: "Exclusive deals" },
            ].map((b) => (
              <div
                key={b.label}
                className="text-center py-3 rounded-xl bg-obsidian-950/50 border border-white/5"
              >
                <div className="text-lg mb-1">{b.icon}</div>
                <p className="text-ash-500 text-[10px] uppercase tracking-wide">{b.label}</p>
              </div>
            ))}
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "Google", icon: "G" },
              { label: "Apple", icon: "⌘" },
            ].map((provider) => (
              <button
                key={provider.label}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/8 text-ash-300 hover:text-white hover:border-white/20 hover:bg-white/5 text-sm font-medium transition-all"
              >
                <span className="font-bold">{provider.icon}</span>
                {provider.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/8" />
            <span className="text-ash-600 text-xs">or with email</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Alex"
                  className="w-full px-4 py-3 bg-obsidian-950 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Chen"
                  className="w-full px-4 py-3 bg-obsidian-950 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                placeholder="alex@example.com"
                className="w-full px-4 py-3 bg-obsidian-950 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 bg-obsidian-950 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 transition-all"
              />
            </div>

            {/* Password strength */}
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i === 0 ? "bg-red-500/60" : "bg-white/8"
                  }`}
                />
              ))}
              <span className="text-ash-600 text-[10px] ml-1">Weak</span>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-amber-400/40 bg-amber-400/5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-ash-500 text-xs leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl text-sm transition-all hover:scale-[1.01] active:scale-98">
              Create Account
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-ash-600 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-ash-600 hover:text-ash-400 text-xs transition-colors flex items-center justify-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
