export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  icon: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Obsidian Pro Headphones",
    price: 349,
    originalPrice: 429,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    badge: "Sale",
    rating: 4.9,
    reviews: 2341,
    description: "Premium noise-cancelling headphones with 40-hour battery life and spatial audio.",
    tags: ["wireless", "noise-cancelling", "premium"],
  },
  {
    id: "2",
    name: "Minimal Leather Watch",
    price: 289,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    badge: "New",
    rating: 4.8,
    reviews: 892,
    description: "Swiss-movement timepiece with Italian leather strap and sapphire crystal glass.",
    tags: ["luxury", "minimal", "leather"],
  },
  {
    id: "3",
    name: "Matte Glass Desk Lamp",
    price: 129,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    rating: 4.7,
    reviews: 543,
    description: "Touch-controlled LED lamp with wireless charging base and 5 brightness levels.",
    tags: ["smart", "minimalist", "wireless"],
  },
  {
    id: "4",
    name: "Carbon Fiber Wallet",
    price: 79,
    originalPrice: 99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    badge: "Hot",
    rating: 4.6,
    reviews: 1204,
    description: "Slim RFID-blocking wallet with aerospace-grade carbon fiber construction.",
    tags: ["rfid", "slim", "carbon-fiber"],
  },
  {
    id: "5",
    name: "Architect Mechanical Keyboard",
    price: 229,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1601445638532-1ca6dd8ded21?w=600&q=80",
    badge: "New",
    rating: 4.9,
    reviews: 3102,
    description: "Hot-swappable 75% layout with custom POM plate and south-facing RGB.",
    tags: ["mechanical", "rgb", "hot-swap"],
  },
  {
    id: "6",
    name: "Frosted Glass Diffuser",
    price: 64,
    category: "Home",
    image: "https://images.unsplash.com/photo-1608571423539-e951bd435a3c?w=600&q=80",
    rating: 4.5,
    reviews: 678,
    description: "Ultrasonic aromatherapy diffuser with 7 ambient color modes and 12-hour mist.",
    tags: ["aromatherapy", "ambient", "wellness"],
  },
  {
    id: "7",
    name: "Titanium Sunglasses",
    price: 319,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    rating: 4.8,
    reviews: 421,
    description: "Ultralight titanium frame with polarized mineral glass lenses and UV400 protection.",
    tags: ["polarized", "titanium", "uv-protection"],
  },
  {
    id: "8",
    name: "Ceramic Pour-Over Set",
    price: 94,
    originalPrice: 120,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    badge: "Sale",
    rating: 4.7,
    reviews: 956,
    description: "Hand-thrown ceramic dripper, server, and kettle in matte obsidian glaze.",
    tags: ["coffee", "handmade", "ceramic"],
  },
];

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    count: 248,
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80",
    icon: "⚡",
  },
  {
    id: "fashion",
    name: "Fashion",
    count: 412,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    icon: "✦",
  },
  {
    id: "home",
    name: "Home & Living",
    count: 187,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    icon: "◈",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    count: 93,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    icon: "◎",
  },
  {
    id: "sports",
    name: "Sports",
    count: 156,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    icon: "▲",
  },
  {
    id: "beauty",
    name: "Beauty",
    count: 203,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    icon: "✿",
  },
];

// export const services = [
//   {
//     id: "grocery",
//     label: "Grocery",
//     href: "/grocery",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <path d="M22 34 Q32 18 42 34" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none"/>
//         <ellipse cx="32" cy="35" rx="10" ry="5" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <circle cx="26" cy="26" r="3" fill="#4ade80" opacity="0.9"/>
//         <circle cx="32" cy="23" r="3.5" fill="#fb923c" opacity="0.9"/>
//         <circle cx="38" cy="26" r="3" fill="#a78bfa" opacity="0.9"/>
//         <path d="M20 38 Q32 42 44 38" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
//       </svg>
//     ),
//   },
//   {
//     id: "food-delivery",
//     label: "Food Delivery",
//     href: "/food_delivery",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <rect x="18" y="26" width="20" height="10" rx="5" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <path d="M38 31 L46 31 L44 26 L38 26 Z" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <circle cx="24" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
//         <circle cx="40" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
//         <path d="M28 26 Q32 20 36 26" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
//         <circle cx="32" cy="22" r="2" fill="#fb923c"/>
//       </svg>
//     ),
//   },
//   {
//     id: "medicines",
//     label: "Medicines",
//     href: "/medicines",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <rect x="27" y="17" width="10" height="22" rx="5" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <rect x="27" y="17" width="10" height="11" rx="5" fill="rgba(251,191,36,0.25)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <line x1="32" y1="28" x2="32" y2="39" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2"/>
//         <path d="M22 32 L26 32 M38 32 L42 32" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M32 26 L32 30 M30 28 L34 28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
//       </svg>
//     ),
//   },
//   {
//     id: "rides",
//     label: "Rides",
//     href: "/rides",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <rect x="19" y="27" width="26" height="10" rx="3" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <path d="M22 27 L25 21 L39 21 L42 27" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(251,191,36,0.08)"/>
//         <circle cx="25" cy="38" r="3.5" fill="none" stroke="#fbbf24" strokeWidth="2"/>
//         <circle cx="25" cy="38" r="1.5" fill="#fbbf24"/>
//         <circle cx="39" cy="38" r="3.5" fill="none" stroke="#fbbf24" strokeWidth="2"/>
//         <circle cx="39" cy="38" r="1.5" fill="#fbbf24"/>
//         <rect x="27" y="22" width="5" height="5" rx="1" fill="rgba(147,197,253,0.4)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
//         <rect x="33" y="22" width="5" height="5" rx="1" fill="rgba(147,197,253,0.4)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
//       </svg>
//     ),
//   },
//   {
//     id: "stays",
//     label: "Stays",
//     href: "/stays",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <path d="M20 38 L20 28 L32 19 L44 28 L44 38 Z" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/>
//         <path d="M20 28 L32 19 L44 28" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(251,191,36,0.15)"/>
//         <rect x="28" y="30" width="8" height="8" rx="1" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.2"/>
//         <rect x="22" y="29" width="5" height="4" rx="1" fill="rgba(147,197,253,0.3)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
//         <rect x="37" y="29" width="5" height="4" rx="1" fill="rgba(147,197,253,0.3)" stroke="rgba(147,197,253,0.6)" strokeWidth="1"/>
//         <circle cx="32" cy="17" r="2" fill="#fbbf24"/>
//       </svg>
//     ),
//   },
//   {
//     id: "travel",
//     label: "Travel",
//     href: "/travel",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <ellipse cx="32" cy="28" rx="11" ry="14" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
//         <ellipse cx="32" cy="28" rx="18" ry="4" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
//         <line x1="32" y1="14" x2="32" y2="42" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2"/>
//         <path d="M19 22 Q32 26 45 22" stroke="#fbbf24" strokeWidth="1" fill="none"/>
//         <path d="M19 34 Q32 30 45 34" stroke="#fbbf24" strokeWidth="1" fill="none"/>
//         <circle cx="32" cy="28" r="2.5" fill="#fbbf24"/>
//       </svg>
//     ),
//   },
//   {
//     id: "shopping",
//     label: "Shopping",
//     href: "/shopping",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <path d="M21 22 L23 36 L41 36 L43 22 Z" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/>
//         <path d="M27 22 Q27 17 32 17 Q37 17 37 22" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
//         <line x1="23" y1="27" x2="41" y2="27" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2"/>
//         <line x1="29" y1="22" x2="28" y2="36" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
//         <line x1="35" y1="22" x2="36" y2="36" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
//         <circle cx="26" cy="38" r="2" fill="#fbbf24"/>
//         <circle cx="38" cy="38" r="2" fill="#fbbf24"/>
//       </svg>
//     ),
//   },
//   {
//     id: "events",
//     label: "Events",
//     href: "/events",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <rect x="20" y="23" width="24" height="18" rx="3" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <line x1="20" y1="28" x2="44" y2="28" stroke="#fbbf24" strokeWidth="1.5"/>
//         <rect x="24" y="19" width="3" height="7" rx="1.5" fill="#fbbf24"/>
//         <rect x="37" y="19" width="3" height="7" rx="1.5" fill="#fbbf24"/>
//         <circle cx="27" cy="33" r="1.5" fill="#fbbf24" opacity="0.6"/>
//         <circle cx="32" cy="33" r="1.5" fill="#fbbf24"/>
//         <circle cx="37" cy="33" r="1.5" fill="#fbbf24" opacity="0.6"/>
//         <circle cx="27" cy="38" r="1.5" fill="#fbbf24" opacity="0.4"/>
//         <circle cx="32" cy="38" r="1.5" fill="#fbbf24" opacity="0.6"/>
//       </svg>
//     ),
//   },
//   {
//     id: "quick-commerce",
//     label: "Quick Commerce",
//     href: "/quick_commerce",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <path d="M19 26 L22 22 L42 22 L45 26 L44 36 L20 36 Z" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/>
//         <line x1="19" y1="26" x2="45" y2="26" stroke="#fbbf24" strokeWidth="1.2"/>
//         <circle cx="25" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
//         <circle cx="39" cy="38" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
//         <path d="M30 29 L34 29 L32 33 L35 33 L29 39 L31 34 L28 34 Z" fill="#fbbf24" opacity="0.8"/>
//       </svg>
//     ),
//   },
//   {
//     id: "nexor-pay",
//     label: "Nexor Pay",
//     href: "/nexor_pay",
//     icon: (
//       <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
//         <circle cx="32" cy="28" r="18" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
//         <rect x="18" y="22" width="28" height="18" rx="3" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1.5"/>
//         <rect x="18" y="26" width="28" height="4" fill="rgba(251,191,36,0.25)"/>
//         <rect x="22" y="33" width="8" height="2" rx="1" fill="#fbbf24" opacity="0.6"/>
//         <rect x="22" y="36" width="5" height="2" rx="1" fill="#fbbf24" opacity="0.4"/>
//         <circle cx="40" cy="34" r="4" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.2"/>
//         <path d="M38 34 L39.5 35.5 L42 32.5" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//   },
// ];

export const cartItems = [
  { ...products[0], quantity: 1 },
  { ...products[1], quantity: 2 },
  { ...products[3], quantity: 1 },
];
