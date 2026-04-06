"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";

export default function ComingSoon({ title = "COMING SOON" }: { title?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#F2F4ED] text-black'} font-sans`}>
      {/* Floating Elements Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-5 w-16 h-16 md:top-10 md:left-10 md:w-32 md:h-32 animate-[float_6s_ease-in-out_infinite] opacity-90 drop-shadow-2xl hover:scale-110 transition-transform">
          <Image src="/coming-soon/pinkstar-removebg-preview.png" alt="Star" fill className="object-contain" />
        </div>
        
        <div className="absolute top-20 right-5 w-24 h-24 md:top-20 md:right-20 md:w-48 md:h-48 animate-[float_7s_ease-in-out_infinite_0.5s] opacity-90 drop-shadow-2xl">
          <Image src="/coming-soon/purplesplat-removebg-preview.png" alt="Splat" fill className="object-contain" />
        </div>

        <div className="absolute top-1/2 left-2 w-20 h-20 md:left-4 md:w-40 md:h-40 animate-[float_8s_ease-in-out_infinite_1s] opacity-90 drop-shadow-2xl">
          <Image src="/coming-soon/purplesplat2-removebg-preview.png" alt="Splat" fill className="object-contain" />
        </div>

        <div className="absolute bottom-20 left-10 w-28 h-28 md:bottom-20 md:left-32 md:w-56 md:h-56 animate-[float_6.5s_ease-in-out_infinite_0.2s] opacity-90 drop-shadow-2xl">
          <Image src="/coming-soon/burststar-removebg-preview.png" alt="Burst" fill className="object-contain" />
        </div>

        <div className="absolute bottom-5 right-5 w-32 h-32 md:bottom-10 md:right-10 md:w-64 md:h-64 animate-[float_7.5s_ease-in-out_infinite_1.5s] opacity-90 drop-shadow-2xl">
          <Image src="/coming-soon/silver-removebg-preview.png" alt="Silver Blob" fill className="object-contain" />
        </div>

        <div className="absolute top-32 right-[15%] w-12 h-12 md:top-32 md:right-[30%] md:w-24 md:h-24 animate-[float_5s_ease-in-out_infinite_0.8s] opacity-90 drop-shadow-2xl">
          <Image src="/coming-soon/silverball-removebg-preview.png" alt="Silver Ball" fill className="object-contain" />
        </div>

        <div className="absolute bottom-40 right-[10%] w-16 h-16 md:bottom-40 md:right-[25%] md:w-32 md:h-32 animate-[float_8s_ease-in-out_infinite_0.3s] opacity-90 drop-shadow-2xl">
          <Image src="/coming-soon/puruplestars-removebg-preview.png" alt="Stars" fill className="object-contain" />
        </div>

        <div className="absolute top-1/3 left-[10%] w-10 h-10 md:left-[20%] md:w-20 md:h-20 animate-[float_6s_ease-in-out_infinite_1.2s] opacity-90 drop-shadow-2xl">
          <Image src="/coming-soon/yellow_light-removebg-preview.png" alt="Yellow Star" fill className="object-contain" />
        </div>

      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center animate-fade-up max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <span className="font-black text-lg md:text-2xl tracking-tighter uppercase px-3 py-1.5 md:px-4 md:py-2 bg-[#D1F121] text-black border-2 border-black rounded-xl inline-block -rotate-3 shadow-[4px_4px_0_0_#000000]">
            NEXOR
          </span>
        </div>
        
        <h1 
          className="text-6xl md:text-[180px] font-black uppercase tracking-tighter leading-[0.85] w-full break-words mt-4 px-2"
          style={{
            color: '#000000',
            WebkitTextStroke: '1px #D1F121',
            textShadow: isDark 
              ? '2px 2px 0 #D1F121, 4px 4px 0 #A855F7' 
              : '4px 4px 0 #D1F121, -2px -2px 0 rgba(0,0,0,0.1)',
            filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))'
          }}
        >
          {title.split(' ').map((word, i) => (
             <React.Fragment key={i}>
                <span className="block">{word}</span>
             </React.Fragment>
          ))}
        </h1>

        <div className="mt-8 md:mt-12 bg-white/40 backdrop-blur-md p-6 md:p-8 border-2 border-black/10 rounded-2xl shadow-xl max-w-lg mx-auto relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-[#D1F121] blur-3xl opacity-50 rounded-full"></div>
           <p className={`text-lg md:text-3xl font-bold bg-clip-text ${isDark ? 'text-white' : 'text-black'} mb-2 relative z-10 drop-shadow-sm`}>
            Get ready for the future. Dropping soon.
          </p>
          <p className={`text-base md:text-xl font-semibold opacity-80 ${isDark ? 'text-white/80' : 'text-black/80'} mb-6 md:mb-8 relative z-10`}>
            Sign up for exclusive updates.
          </p>
          
          <button className="relative z-10 group overflow-hidden px-6 py-3 md:px-8 md:py-4 bg-[#D1F121] border-[3px] md:border-4 border-black rounded-xl md:rounded-2xl font-black text-lg md:text-2xl uppercase tracking-wider text-black shadow-[4px_4px_0_0_#000000] md:shadow-[6px_6px_0_0_#000000] active:shadow-[2px_2px_0_0_#000000] active:translate-x-[2px] active:translate-y-[2px] transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000000]">
            <span className="relative z-10">Join The Waitlist</span>
            <div className="absolute inset-0 h-full w-0 bg-white opacity-20 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </button>
        </div>

        <div className={`mt-16 font-bold text-sm tracking-widest uppercase ${isDark ? 'text-white/40' : 'text-black/40'} flex items-center gap-2`}>
          <span>© {new Date().getFullYear()} NEXOR. All rights reserved.</span>
        </div>
      </div>

    </div>
  );
}
