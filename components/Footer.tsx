import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-obsidian-900 pb-28 pt-16">
      {/* Gradient fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-display font-bold">
                V
              </div>
              <span className="font-display font-semibold text-white text-lg tracking-wide">
                VAULT
              </span>
            </div>
            <p className="text-ash-500 text-sm leading-relaxed mb-6 max-w-xs">
              Curated objects for the discerning individual. Every product selected with intent.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-ash-500 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-200"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ash-500 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ash-500 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ash-500 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ash-600 text-xs">
            © 2026 Vault Commerce. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-ash-600 hover:text-ash-400 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-ash-600 hover:text-ash-400 text-xs transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-ash-600 hover:text-ash-400 text-xs transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Electronics", href: "/products?category=electronics" },
  { label: "Fashion", href: "/products?category=fashion" },
  { label: "Home & Living", href: "/products?category=home" },
  { label: "New Arrivals", href: "/products?filter=new" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Returns", href: "/returns" },
  { label: "Track Order", href: "/track" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "#",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
];
