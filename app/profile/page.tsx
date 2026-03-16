"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

const tabs = ["Overview", "Orders", "Wishlist", "Settings"];

const orders = [
  {
    id: "ORD-4821",
    date: "Mar 12, 2026",
    status: "Delivered",
    total: 638,
    items: 3,
    image: products[0].image,
  },
  {
    id: "ORD-4790",
    date: "Feb 28, 2026",
    status: "In Transit",
    total: 289,
    items: 1,
    image: products[1].image,
  },
  {
    id: "ORD-4744",
    date: "Feb 10, 2026",
    status: "Delivered",
    total: 173,
    items: 2,
    image: products[2].image,
  },
  {
    id: "ORD-4701",
    date: "Jan 22, 2026",
    status: "Cancelled",
    total: 94,
    items: 1,
    image: products[7].image,
  },
];

const wishlist = products.slice(0, 4);

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "In Transit": "bg-amber-400/10 text-amber-400 border border-amber-400/20",
  Cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen pt-16 pb-32">
      {/* Hero banner */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 120%, rgba(251,191,36,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 60%), #05050a",
          }}
        />
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* decorative orb */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 h-24 bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Avatar row */}
        <div className="relative -mt-14 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-end gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-obsidian-950 bg-obsidian-800 shadow-2xl shadow-black/50">
                <div
                  className="w-full h-full flex items-center justify-center text-4xl font-display font-bold text-amber-400"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #1e1e36, #0a0a12)",
                  }}
                >
                  A
                </div>
              </div>
              {/* Online dot */}
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-obsidian-950" />
            </div>

            {/* Name / meta */}
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Alex Chen
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-mono uppercase tracking-widest">
                  Pro
                </span>
              </div>
              <p className="text-ash-500 text-sm mt-0.5">alex@example.com</p>
            </div>
          </div>

          {/* Edit button */}
          <button
            onClick={() => setEditing(!editing)}
            className={`self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              editing
                ? "bg-amber-400 text-black hover:bg-amber-300"
                : "border border-white/10 text-ash-300 hover:text-white hover:border-white/20"
            }`}
          >
            {editing ? (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save Changes
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Orders", value: "24" },
            { label: "Total Spent", value: "$4,821" },
            { label: "Wishlist", value: "12" },
            { label: "Member Since", value: "2024" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl bg-obsidian-800 border border-white/5 hover:border-amber-400/10 transition-colors"
            >
              <p className="text-2xl font-display font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-ash-600 text-xs uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl bg-obsidian-800 border border-white/5 mb-8 w-full sm:w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-amber-400 text-black shadow-[0_0_16px_rgba(251,191,36,0.3)]"
                  : "text-ash-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: personal info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-obsidian-800 border border-white/5">
                <h2 className="font-display font-bold text-lg text-white mb-5">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", value: "Alex" },
                    { label: "Last Name", value: "Chen" },
                    { label: "Email", value: "alex@example.com" },
                    { label: "Phone", value: "+1 (555) 012-3456" },
                    { label: "Date of Birth", value: "Jan 14, 1995" },
                    { label: "Gender", value: "Prefer not to say" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-ash-600 text-[10px] uppercase tracking-widest block mb-1.5">
                        {field.label}
                      </label>
                      {editing ? (
                        <input
                          defaultValue={field.value}
                          className="w-full px-4 py-2.5 bg-obsidian-950 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400/30 transition-colors"
                        />
                      ) : (
                        <p className="text-white text-sm font-medium">
                          {field.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping address */}
              <div className="p-6 rounded-2xl bg-obsidian-800 border border-white/5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-bold text-lg text-white">
                    Saved Addresses
                  </h2>
                  <button className="text-amber-400 text-xs hover:text-amber-300 transition-colors font-medium">
                    + Add New
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      tag: "Home",
                      address: "123 Main Street, Apt 4B",
                      city: "New York, NY 10001",
                      default: true,
                    },
                    {
                      tag: "Work",
                      address: "456 Office Plaza, Floor 12",
                      city: "New York, NY 10018",
                      default: false,
                    },
                  ].map((addr) => (
                    <div
                      key={addr.tag}
                      className={`p-4 rounded-xl border transition-colors relative ${
                        addr.default
                          ? "border-amber-400/30 bg-amber-400/5"
                          : "border-white/8 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white text-sm font-semibold">
                          {addr.tag}
                        </span>
                        {addr.default && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-[9px] font-mono uppercase tracking-widest">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-ash-400 text-xs leading-relaxed">
                        {addr.address}
                      </p>
                      <p className="text-ash-400 text-xs">{addr.city}</p>
                      <button className="absolute top-3 right-3 text-ash-700 hover:text-amber-400 transition-colors">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: activity + recent order */}
            <div className="space-y-6">
              {/* Activity */}
              <div className="p-6 rounded-2xl bg-obsidian-800 border border-white/5">
                <h2 className="font-display font-bold text-lg text-white mb-5">
                  Activity
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: "⚡", text: "Order #ORD-4821 delivered", time: "2 days ago" },
                    { icon: "✦", text: "Added 3 items to wishlist", time: "5 days ago" },
                    { icon: "↩", text: "Return approved for #ORD-4700", time: "1 week ago" },
                    { icon: "◎", text: "Profile updated", time: "2 weeks ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-obsidian-700 border border-white/8 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium leading-snug">
                          {item.text}
                        </p>
                        <p className="text-ash-600 text-[10px] mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loyalty card */}
              <div
                className="p-6 rounded-2xl border border-amber-400/15 relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, rgba(251,191,36,0.1), transparent 60%), #10101e",
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl" />
                <p className="text-amber-400 text-[10px] uppercase tracking-widest font-mono mb-2">
                  Vault Member
                </p>
                <p className="font-display font-bold text-2xl text-white mb-4">
                  Gold Tier
                </p>
                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-ash-500">$4,821 spent</span>
                    <span className="text-ash-500">$5,000 for Platinum</span>
                  </div>
                  <div className="h-1.5 bg-obsidian-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
                      style={{ width: "96%" }}
                    />
                  </div>
                </div>
                <p className="text-ash-600 text-xs">$179 away from Platinum</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Orders ── */}
        {activeTab === "Orders" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-ash-500 text-sm">{orders.length} orders</p>
              <select className="px-3 py-2 bg-obsidian-800 border border-white/8 rounded-xl text-ash-300 text-xs focus:outline-none">
                <option>All Time</option>
                <option>Last 30 days</option>
                <option>Last 6 months</option>
              </select>
            </div>

            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-obsidian-800 border border-white/5 hover:border-white/10 transition-all group"
              >
                {/* Thumbnail */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-obsidian-700">
                  <Image src={order.image} alt={order.id} fill className="object-cover" sizes="56px" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{order.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-ash-500 text-xs">
                    {order.date} · {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between sm:justify-end sm:gap-6">
                  <span className="text-white font-bold font-display text-lg">
                    ${order.total.toLocaleString()}
                  </span>
                  <button className="px-4 py-2 rounded-full border border-white/10 text-ash-400 hover:text-amber-400 hover:border-amber-400/30 text-xs font-medium transition-all">
                    View Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Wishlist ── */}
        {activeTab === "Wishlist" && (
          <div>
            <p className="text-ash-500 text-sm mb-6">{wishlist.length} saved items</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-obsidian-800 border border-white/5 hover:border-amber-400/15 overflow-hidden transition-all hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="25vw"
                    />
                    <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-ash-600 text-[10px] uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-white text-sm font-medium mb-3 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold font-display">${product.price}</span>
                      <Link
                        href={`/products/${product.id}`}
                        className="px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium hover:bg-amber-400 hover:text-black transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Settings ── */}
        {activeTab === "Settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications */}
            <div className="p-6 rounded-2xl bg-obsidian-800 border border-white/5">
              <h2 className="font-display font-bold text-lg text-white mb-5">
                Notifications
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Order updates", desc: "Shipping and delivery alerts", on: true },
                  { label: "Promotions", desc: "Sales, deals and new arrivals", on: true },
                  { label: "Wishlist alerts", desc: "Price drops on saved items", on: false },
                  { label: "Newsletter", desc: "Weekly editorial digest", on: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p className="text-ash-600 text-xs">{item.desc}</p>
                    </div>
                    <button
                      className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0 ${
                        item.on ? "bg-amber-400" : "bg-obsidian-600 border border-white/10"
                      }`}
                      style={{ height: "22px", width: "40px" }}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                          item.on ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="p-6 rounded-2xl bg-obsidian-800 border border-white/5">
              <h2 className="font-display font-bold text-lg text-white mb-5">
                Security
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Change Password", icon: "🔑" },
                  { label: "Two-Factor Authentication", icon: "🛡" },
                  { label: "Active Sessions", icon: "📱" },
                  { label: "Download My Data", icon: "⬇︎" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-white/8 hover:border-amber-400/20 hover:bg-amber-400/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-ash-300 group-hover:text-white text-sm font-medium transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-ash-600 group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="p-6 rounded-2xl bg-obsidian-800 border border-white/5">
              <h2 className="font-display font-bold text-lg text-white mb-5">
                Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Currency", options: ["USD", "EUR", "GBP"], selected: "USD" },
                  { label: "Language", options: ["English", "French", "Spanish"], selected: "English" },
                ].map((pref) => (
                  <div key={pref.label}>
                    <label className="text-ash-500 text-xs uppercase tracking-widest block mb-2">
                      {pref.label}
                    </label>
                    <select className="w-full px-4 py-2.5 bg-obsidian-950 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400/30 transition-colors appearance-none">
                      {pref.options.map((o) => (
                        <option key={o} selected={o === pref.selected}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/15">
              <h2 className="font-display font-bold text-lg text-white mb-2">
                Danger Zone
              </h2>
              <p className="text-ash-500 text-xs mb-5 leading-relaxed">
                Once you delete your account, all your data will be permanently removed. This action cannot be undone.
              </p>
              <button className="px-5 py-2.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}