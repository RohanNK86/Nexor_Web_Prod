import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pb-28 pt-16 hero-gradient">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
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
            Welcome back
          </h1>
          <p className="text-ash-500 text-sm text-center mb-8">
            Sign in to your account to continue
          </p>

          {/* Social login */}
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
            <span className="text-ash-600 text-xs">or</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-ash-400 text-xs uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-obsidian-950 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 focus:bg-obsidian-900 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-ash-400 text-xs uppercase tracking-widest">Password</label>
                <Link href="/forgot-password" className="text-amber-400/80 hover:text-amber-400 text-xs transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full px-4 py-3 bg-obsidian-950 border border-white/8 rounded-xl text-white placeholder-ash-600 text-sm focus:outline-none focus:border-amber-400/30 focus:bg-obsidian-900 transition-all"
              />
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-white/15 group-hover:border-amber-400/40 transition-colors flex-shrink-0" />
              <span className="text-ash-500 text-sm">Remember me for 30 days</span>
            </label>

            <button className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl text-sm transition-all hover:scale-[1.01] active:scale-98">
              Sign In
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-ash-600 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Create one
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
