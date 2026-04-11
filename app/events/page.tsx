"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeContext";

export default function EventsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const posterUrl = "https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/events/Screenshot%202026-04-11%20205913.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJldmVudHMvU2NyZWVuc2hvdCAyMDI2LTA0LTExIDIwNTkxMy5wbmciLCJpYXQiOjE3NzU5MjE1NjMsImV4cCI6MTc3ODUxMzU2M30.VQY1pRZstT9SF1bJp0u9ZdaMsuMqKcCzUMyoK5D1jSI";

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#06060e]' : 'bg-[#f5f0e6]'}`}>
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#A855F7]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#EAB308]/5 rounded-full blur-[100px]" />
        {/* Animated grid overlay */}
        <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'invert' : ''}`} style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Content */}
          <div className="flex-1 space-y-8 animate-fade-up">
            <div className="space-y-4">
              <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border ${
                isDark ? 'bg-[#A855F7]/10 border-[#A855F7]/30 text-purple-400' : 'bg-black text-white border-black'
              }`}>
                Next Big Move
              </span>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] uppercase">
                <span className={isDark ? 'text-[#f0eeff]' : 'text-black'}>Bolly</span>
                <br />
                <span className="text-[#EAB308] drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Vibe</span>
                <br />
                <span className={`text-4xl md:text-5xl font-black normal-case tracking-normal ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  Coming Soon
                </span>
              </h1>
            </div>

            <p className={`text-lg md:text-xl font-medium max-w-md leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              The ultimate Bollywood experience is being curated just for you. Get ready for a night of rhythm, beats, and pure energy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-[#EAB308] text-black font-black uppercase text-xl rounded-2xl shadow-[0_8px_30px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95 transition-all">
                Notify Me
              </button>
              <Link href="/" className={`px-10 py-5 font-black uppercase text-xl rounded-2xl border flex items-center justify-center gap-2 transition-all hover:bg-white/5 ${
                isDark ? 'border-white/10 text-white' : 'border-gray-200 text-black'
              }`}>
                Back to Home
              </Link>
            </div>
          </div>

          {/* Right Side: Poster (Not screen full size, top right focus) */}
          <div className="w-full lg:w-[450px] flex-shrink-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className={`relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-8 shadow-2xl group transition-all hover:scale-[1.02] ${
              isDark ? 'border-white/5 shadow-purple-500/10' : 'border-white shadow-xl'
            }`}>
              <Image 
                src={posterUrl} 
                alt="BollyVibe Poster" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              {/* Floating Badge on Poster */}
              <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Waitlist Open</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}