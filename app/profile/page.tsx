"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";
import { supabase } from "@/lib/supabase";

const tabs = ["Overview", "Orders", "Wishlist", "Settings"];

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [settings, setSettings] = useState({
    orderUpdates: true,
    marketing: false,
    securityAlerts: true,
    twoFactor: false,
  });
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !supabase) return;
      try {
        setOrdersLoading(true);
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id);
        
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user && !loading) {
      fetchOrders();
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user || !supabase) return;
      try {
        setWishlistLoading(true);
        const { data, error } = await supabase
          .from("wishlist")
          .select("*, products(*)") // Assumes a relationship
          .eq("user_id", user.id);
        
        if (error) {
          // If the table doesn't exist yet, we'll just show an empty list
          console.warn("Wishlist table not found or error:", error.message);
          setWishlist([]);
        } else {
          setWishlist(data || []);
        }
      } catch (error) {
        console.error("Fetch Wishlist Error:", error);
      } finally {
        setWishlistLoading(false);
      }
    };

    if (user && !loading) {
      fetchWishlist();
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user || !supabase) return;
      try {
        setAddressesLoading(true);
        const { data, error } = await supabase
          .from("addresses")
          .select("*")
          .eq("user_id", user.id);
        
        if (error) {
          console.warn("Addresses table not found or error:", error.message);
          setAddresses([]);
        } else {
          setAddresses(data || []);
        }
      } catch (error) {
        console.error("Fetch Addresses Error:", error);
      } finally {
        setAddressesLoading(false);
      }
    };

    if (user && !loading) {
      fetchAddresses();
    }
  }, [user, loading]);

  const txt = (dark: string, light: string) => (isDark ? dark : light);

  const handlePasswordReset = async () => {
    if (!user || !supabase) return;
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email!, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      alert("Password reset email sent!");
    } catch (err) {
      console.error("Reset Password Error:", err);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#06060e]" : "bg-[#f5f0e6]"}`}>
        <div className={`w-12 h-12 border-4 rounded-full border-t-transparent animate-spin ${isDark ? "border-purple-500" : "border-black"}`}></div>
      </div>
    );
  }

  if (!user) return null;

  const userInitial = user.user_metadata?.first_name 
    ? user.user_metadata.first_name[0].toUpperCase() 
    : user.email ? user.email[0].toUpperCase() : "?";

  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  return (
    <div className={`min-h-screen pt-16 pb-32 transition-colors duration-300 ${isDark ? "bg-[#06060e] text-[#f0eeff]" : "bg-[#f5f0e6] text-gray-900"}`}>
      {/* Hero banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: isDark 
              ? "radial-gradient(circle at 20% 150%, rgba(168,85,247,0.15) 0%, transparent 50%), radial-gradient(circle at 80% -20%, rgba(6,182,212,0.1) 0%, transparent 50%), #06060e"
              : "linear-gradient(to bottom, #ebe4d8, #f5f0e6)",
          }}
        />
        {/* grid pattern */}
        <div
          className={`absolute inset-0 opacity-[0.03] ${isDark ? "invert" : ""}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* decorative orbs */}
        {isDark && (
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-purple-500/20 rounded-full blur-[100px]" />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Avatar row */}
        <div className="relative -mt-16 sm:-mt-20 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex items-end gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0 group">
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 shadow-2xl transition-transform group-hover:scale-105 ${
                isDark ? "border-[#06060e] bg-white/5" : "border-[#f5f0e6] bg-white"
              }`}>
                <div
                  className={`w-full h-full flex items-center justify-center text-4xl font-black ${
                    isDark ? "bg-gradient-to-br from-purple-600 to-cyan-500 text-white" : "bg-black text-white"
                  }`}
                >
                  {userInitial}
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-current animate-pulse text-current" />
            </div>

            {/* Name / meta */}
            <div className="mb-2">
              <div className="flex items-center gap-3">
                <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${txt("text-[#f0eeff]", "text-gray-900")}`}>
                  {fullName}
                </h1>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  isDark ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-black text-white"
                }`}>
                  Nexus Member
                </span>
              </div>
              <p className={`text-sm mt-1 font-medium ${txt("text-[#f0eeff]/50", "text-gray-500")}`}>
                {user.email}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row sm:items-center gap-3 self-start sm:self-auto w-full sm:w-auto">
            <button
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all ${
                editing
                  ? isDark ? "bg-purple-600 text-white" : "bg-black text-white"
                  : isDark ? "border border-white/10 text-[#f0eeff]/60 hover:text-white" : "border border-gray-200 text-gray-600 hover:text-black"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {editing ? <path d="M20 6L9 17l-5-5" /> : <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 00 2 2h14a2 2 0 00 2-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />}
              </svg>
              {editing ? "Save Profile" : "Edit Profile"}
            </button>
            <div className="flex-1 sm:hidden"></div>
            <button 
              onClick={signOut}
              className={`p-3 rounded-2xl border transition-all ${
                isDark ? "border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30" : "border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <div className={`flex gap-1 p-1.5 rounded-2xl mb-6 sm:mb-10 w-fit ${isDark ? "bg-white/5 border border-white/5" : "bg-gray-100 border border-gray-200/50"}`}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? isDark ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : "bg-white text-black shadow-sm"
                    : isDark ? "text-[#f0eeff]/40 hover:text-[#f0eeff]/80" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Sections ── */}
        <div className="animate-fade-up">
          {activeTab === "Overview" && (
            <div className="space-y-8">
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Orders", value: orders.length, icon: "📦" },
                  { label: "Wishlisted", value: wishlist.length, icon: "❤️" },
                  { label: "Nexus Points", value: (orders.length * 120).toLocaleString(), icon: "✨" },
                  { label: "Member Since", value: new Date(user.created_at).getFullYear(), icon: "🗓️" },
                ].map((stat, i) => (
                  <div key={i} className={`p-4 rounded-2xl border transition-all hover:scale-105 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100 shadow-sm"}`}>
                    <span className="text-xl mb-1 block">{stat.icon}</span>
                    <p className="text-xl font-black">{stat.value}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${txt("text-white/30", "text-gray-400")}`}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  <section className={`p-8 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}>
                    <h2 className="text-xl font-black mb-8 tracking-tight">Account Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                      {[
                        { label: "First Name", value: user.user_metadata?.first_name || "Nexus" },
                        { label: "Last Name", value: user.user_metadata?.last_name || "User" },
                        { label: "Email Address", value: user.email || "" },
                        { label: "Phone Number", value: user.phone || "+91 ••••••••••" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className={`text-[10px] font-black uppercase tracking-widest block mb-1.5 ${txt("text-white/30", "text-gray-400")}`}>
                            {field.label}
                          </label>
                          {editing ? (
                            <input
                              defaultValue={field.value}
                              className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border focus:outline-none transition-all ${
                                isDark ? "bg-white/5 border-white/10 text-white focus:border-purple-500/50" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-black"
                              }`}
                            />
                          ) : (
                            <p className={`text-base font-bold ${txt("text-white", "text-gray-900")}`}>{field.value || "Not set"}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={`p-8 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-black tracking-tight">Delivery Addresses</h2>
                      <button className={`text-xs font-black p-2 rounded-lg hover:underline ${txt("text-purple-400", "text-orange-600")}`}>
                        Add New +
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {addressesLoading ? (
                        <div className="py-10 text-center animate-pulse opacity-40">Locating your addresses...</div>
                      ) : addresses.length > 0 ? (
                        addresses.map((addr) => (
                           <div key={addr.id} className={`p-6 rounded-2xl border ${isDark ? "bg-white/5 border-purple-500/30" : "bg-white border-gray-100 shadow-sm"}`}>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-black uppercase tracking-widest">{addr.label || "Home"}</span>
                                {addr.is_default && (
                                   <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${isDark ? "bg-purple-500 text-white" : "bg-black text-white"}`}>Default</span>
                                )}
                              </div>
                              <p className={`text-sm font-bold leading-relaxed mb-1 ${txt("text-white/80", "text-gray-900")}`}>{addr.address_line_1}</p>
                              <p className={`text-xs ${txt("text-white/50", "text-gray-500")}`}>{addr.city}, {addr.pincode}</p>
                           </div>
                        ))
                      ) : (
                        <div className={`col-span-full p-8 text-center border-2 border-dashed rounded-3xl ${isDark ? "border-white/5" : "border-gray-100"}`}>
                           <p className={`text-xs font-bold ${txt("text-white/20", "text-gray-400")}`}>No delivery addresses added yet.</p>
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <section className={`p-8 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}>
                     <h2 className="text-xl font-black mb-6 tracking-tight">Nexus Perks</h2>
                     <div className={`p-6 rounded-2xl relative overflow-hidden ${isDark ? "bg-gradient-to-br from-purple-900 to-black" : "bg-black text-white"}`}>
                        <div className="relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Loyalty Status</p>
                          <h3 className="text-2xl font-black mb-4">{orders.length > 5 ? "Gold Tier" : "Silver Tier"}</h3>
                          <div className="h-1.5 w-full bg-white/10 rounded-full mb-2 overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: orders.length > 5 ? '100%' : `${(orders.length / 5) * 100}%` }} />
                          </div>
                          <p className="text-[10px] font-bold opacity-60">
                            {orders.length > 5 ? "You're at the top!" : `${10 - orders.length} more orders to reach Gold`}
                          </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px]" />
                     </div>
                  </section>

                  <section className={`p-8 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}>
                     <h2 className="text-xl font-black mb-6 tracking-tight">Recent Activity</h2>
                     <div className="space-y-6">
                        {orders.length > 0 ? (
                          <div className="flex gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isDark ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"}`}>
                               📦
                             </div>
                             <div>
                                <p className="text-sm font-bold leading-tight">Order #{orders[0].id.toString().slice(0, 6).toUpperCase()} placed</p>
                                <p className={`text-[10px] font-medium mt-0.5 ${txt("text-white/30", "text-gray-400")}`}>{new Date(orders[0].created_at).toLocaleDateString()}</p>
                             </div>
                          </div>
                        ) : (
                          <p className={`text-xs font-bold opacity-30 italic`}>No recent activity found.</p>
                        )}
                        <div className="flex gap-4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isDark ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"}`}>
                              🔒
                           </div>
                           <div>
                              <p className="text-sm font-bold leading-tight">Secure login active</p>
                              <p className={`text-[10px] font-medium mt-0.5 ${txt("text-white/30", "text-gray-400")}`}>Current Session</p>
                           </div>
                        </div>
                     </div>
                  </section>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Orders" && (
            <div className="max-w-4xl space-y-4">
               {ordersLoading ? (
                 <div className="py-20 text-center animate-pulse opacity-40">Loading your orders...</div>
               ) : orders.length > 0 ? (
                 orders.map(order => (
                   <div key={order.id} className={`p-4 sm:p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 transition-all hover:scale-[1.01] ${isDark ? "bg-white/5 border-white/10 hover:border-purple-500/30" : "bg-white border-gray-100 shadow-sm"}`}>
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center text-2xl self-start sm:self-auto">
                         {order.image ? <img src={order.image} alt="Order" className="w-full h-full object-cover" /> : "📦"}
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-black tracking-tight">{order.id.toString().slice(0, 8).toUpperCase()}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                              order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                            }`}>
                              {order.status || "Pending"}
                            </span>
                         </div>
                         <p className={`text-xs font-bold ${txt("text-white/40", "text-gray-400")}`}>{new Date(order.created_at).toLocaleDateString()} • {order.items || 1} items</p>
                      </div>
                       <div className="flex sm:flex-col justify-between items-end sm:text-right">
                         <p className="text-lg font-black tracking-tighter">₹{order.total}</p>
                         <button className={`text-[10px] font-black uppercase tracking-widest mt-1 hover:underline ${txt("text-purple-400", "text-orange-600")}`}>View Details</button>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className={`p-20 text-center border-2 border-dashed rounded-3xl ${isDark ? "border-white/5" : "border-gray-100"}`}>
                   <p className={`text-lg font-black ${txt("text-white/40", "text-gray-400")}`}>Your shopping cart is waiting for its first victory!</p>
                   <Link href="/" className={`inline-block mt-6 px-8 py-3 rounded-2xl text-sm font-black ${isDark ? "bg-white/5 text-[#f0eeff]" : "bg-black text-white"}`}>Go Shopping</Link>
                 </div>
               )}
            </div>
          )}

          {activeTab === "Wishlist" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlistLoading ? (
                 <div className="col-span-full py-20 text-center animate-pulse opacity-40">Checking your wishlist...</div>
              ) : wishlist.length > 0 ? (
                wishlist.map((item) => {
                  const product = item.products || item; // Handle both direct and joined objects
                  return (
                    <div key={item.id} className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100 shadow-sm"}`}>
                      <div className="aspect-square rounded-xl overflow-hidden mb-3">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-sm font-bold truncate">{product.name}</h4>
                      <p className="text-xs font-black mt-1">₹{product.price}</p>
                    </div>
                  );
                })
              ) : (
                <div className={`col-span-full p-20 text-center border-2 border-dashed rounded-3xl ${isDark ? "border-white/5" : "border-gray-100"}`}>
                   <p className={`text-lg font-black ${txt("text-white/40", "text-gray-400")}`}>Your wishlist is dreaming of gadgets...</p>
                   <Link href="/" className={`inline-block mt-6 px-8 py-3 rounded-2xl text-sm font-black ${isDark ? "bg-white/5 text-[#f0eeff]" : "bg-black text-white"}`}>Explore Items</Link>
                 </div>
              )}
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="max-w-4xl space-y-8 pb-40">
              {/* Security Group */}
              <section className={`p-8 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}>
                <h2 className="text-xl font-black mb-8 tracking-tight">Security & Login</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-black tracking-tight">Password</p>
                      <p className={`text-xs mt-0.5 ${txt("text-white/40", "text-gray-400")}`}>Last changed 3 months ago</p>
                    </div>
                    <button 
                      onClick={handlePasswordReset}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-white/5 border border-white/10 hover:bg-white/10" : "bg-gray-100 border border-gray-200 hover:bg-gray-200"}`}
                    >
                      Update Password
                    </button>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-black tracking-tight">Two-Step Verification</p>
                      <p className={`text-xs mt-0.5 ${txt("text-white/40", "text-gray-400")}`}>Secure your account with 2FA</p>
                    </div>
                    <button 
                      onClick={() => setSettings({...settings, twoFactor: !settings.twoFactor})}
                      className={`w-12 h-6 rounded-full relative transition-all ${settings.twoFactor ? "bg-emerald-500" : isDark ? "bg-white/10" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.twoFactor ? "left-7 shadow-lg" : "left-1"}`} />
                    </button>
                  </div>
                </div>
              </section>

              {/* Notifications Group */}
              <section className={`p-8 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}>
                <h2 className="text-xl font-black mb-8 tracking-tight">Personalized Notifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { key: "orderUpdates", label: "Order & Activity", desc: "Receive updates on your orders" },
                    { key: "marketing", label: "Marketing & Promos", desc: "Get exclusive deals and offers" },
                    { key: "securityAlerts", label: "Security Alerts", desc: "Login attempts and account changes" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-black tracking-tight">{item.label}</p>
                        <p className={`text-[10px] sm:text-xs mt-0.5 ${txt("text-white/40", "text-gray-400")}`}>{item.desc}</p>
                      </div>
                      <button 
                         onClick={() => setSettings({...settings, [item.key]: !settings[item.key as keyof typeof settings]})}
                         className={`w-10 h-5 rounded-full relative transition-all flex-shrink-0 ${settings[item.key as keyof typeof settings] ? "bg-purple-600" : isDark ? "bg-white/10" : "bg-gray-200"}`}
                      >
                         <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${settings[item.key as keyof typeof settings] ? "left-5.5" : "left-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Support & Legal */}
              <section className={`p-8 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}>
                <h2 className="text-xl font-black mb-8 tracking-tight">Support & Policy</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: 'help-circle', label: 'Help Center' },
                    { icon: 'shield', label: 'Privacy Policy' },
                    { icon: 'info', label: 'Terms of Use' },
                    { icon: 'download', label: 'Export Data' }
                  ].map((item) => (
                    <button key={item.label} className={`flex items-center gap-3 p-4 rounded-2xl border text-sm font-bold transition-all ${isDark ? "bg-white/5 border-white/10 hover:bg-white/8" : "bg-gray-50 border-gray-100 hover:bg-gray-100"}`}>
                      <span className="text-lg opacity-60">
                        {item.icon === 'help-circle' ? '❔' : item.icon === 'shield' ? '🛡️' : item.icon === 'info' ? '📄' : '📥'}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Danger Zone */}
              <section className={`p-8 rounded-3xl border transition-all ${isDark ? "bg-red-950/20 border-red-500/20" : "bg-red-50 border-red-100"}`}>
                <h2 className="text-xl font-black mb-2 tracking-tight text-red-500">Danger Zone</h2>
                <p className={`text-xs mb-8 font-bold ${txt("text-red-400/50", "text-red-600/50")}`}>These actions are irreversible. Be careful.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isDark ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" : "bg-red-100 text-red-600 border border-red-200 hover:bg-red-200"}`}>
                    Sign out of all sessions
                  </button>
                  <button className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isDark ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-600 text-white hover:bg-red-700"}`}>
                    Delete Account
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}