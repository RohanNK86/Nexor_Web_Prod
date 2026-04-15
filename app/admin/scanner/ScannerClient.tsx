"use client";

import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Link from "next/link";

export default function ScannerClient() {
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanning, setScanning] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [stats, setStats] = useState({ total: 0, used: 0, loading: false });
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (scanning) {
      const initTimer = setTimeout(async () => {
        try {
          const html5QrCode = new Html5Qrcode("qr-reader-fast");
          scannerRef.current = html5QrCode;
          
          await html5QrCode.start(
            { facingMode: "environment" },
            { fps: 15, qrbox: { width: 250, height: 250 } },
            onScanSuccess,
            onScanFailure
          );
          setCameraError(null);
        } catch (err: any) {
          console.error("Camera access error:", err);
          setCameraError(err.message || "Failed to start camera.");
        }
      }, 100);

      return () => clearTimeout(initTimer);
    } else {
      if (scannerRef.current) {
        try {
          scannerRef.current.stop().then(() => scannerRef.current?.clear()).catch(() => {});
        } catch(e) {}
      }
    }
  }, [scanning]);

  // Handle cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.stop().then(() => scannerRef.current?.clear()).catch(() => {});
        } catch(e) {}
      }
    };
  }, []);

  const onScanSuccess = async (decodedText: string) => {
    // Only scan once per ticket presentation
    if (!scanning || isProcessing) return;
    setScanning(false);
    setIsProcessing(true);
    
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {}
    }

    try {
      const res = await fetch("/api/booking/validate-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_data: decodedText, scanner_id: "admin_secure_scanner" }),
      });
      const data = await res.json();
      setScanResult({ ...data, raw_data: decodedText });
      setIsProcessing(false);
      
      // Silently auto-update the dashboard stats locally
      fetchStats();
    } catch (error: any) {
      setScanResult({ status: "ERROR", error: error.message });
      setIsProcessing(false);
    }
  };

  const onScanFailure = (error: any) => {};

  const resetScanner = () => {
    setScanResult(null);
    setIsProcessing(false);
    setScanning(true);
  };

  const fetchStats = async () => {
    setStats(s => ({ ...s, loading: true }));
    try {
      const res = await fetch(`/api/admin/stats?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
         setStats({ total: data.totalTickets, used: data.usedTickets, loading: false });
      } else {
         setStats(s => ({ ...s, loading: false }));
      }
    } catch (e) {
      setStats(s => ({ ...s, loading: false }));
    }
  };

  useEffect(() => {
    if (showDashboard) {
      fetchStats();
    }
  }, [showDashboard]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-8 sm:pt-20 px-4">
       <div className="w-full max-w-lg mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-[0.2em] uppercase">Fast Scanner</h1>
            <p className="text-white/40 text-xs mt-1 font-medium tracking-widest uppercase">Admin Secure Access</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowDashboard(true)} 
              className="px-4 py-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-500/30 transition shadow-lg shrink-0"
            >
              Dashboard
            </button>
            <Link href="/events" className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition border border-white/5">Exit</Link>
          </div>
       </div>

       <div className="max-w-lg w-full">
         {scanning ? (
           <div className="bg-black/40 rounded-[2rem] overflow-hidden p-2 border border-white/10 shadow-2xl relative">
             <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
               <div className="w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
               <div className="w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-xl" />
             </div>
             
             {cameraError ? (
               <div className="p-8 text-center text-rose-400 bg-rose-500/10 rounded-2xl">
                 <p className="font-bold mb-2">Camera Error</p>
                 <p className="text-sm opacity-80">{cameraError}</p>
                 <p className="text-xs mt-4 opacity-60">If testing on mobile over Wi-Fi, ensure you use HTTPS (e.g., Ngrok) or localhost.</p>
               </div>
             ) : (
               <div className="relative">
                 <div id="qr-reader-fast" className="w-full bg-black text-white rounded-[1.5rem] overflow-hidden"></div>
                 <div className="absolute inset-0 border-[40px] border-black/50 rounded-[1.5rem] pointer-events-none" />
               </div>
             )}
             
             <div className="absolute bottom-4 left-4 right-4 flex justify-between z-10 mix-blend-difference">
               <div className="w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-xl mix-blend-exclusion" />
               <div className="w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-xl mix-blend-exclusion" />
             </div>
             <p className="text-center text-xs text-amber-400/80 uppercase tracking-widest mt-4 pb-2 animate-pulse">Scanning QR Signature...</p>
           </div>
         ) : isProcessing ? (
           <div className={`p-8 sm:p-12 rounded-[2rem] backdrop-blur-3xl shadow-2xl transition-all duration-300 bg-cyan-500/20 border-2 border-cyan-500 box-shadow-[0_0_100px_rgba(6,182,212,0.3)]`}>
             <div className="text-center">
               <div className="text-6xl sm:text-8xl mb-4 inline-block drop-shadow-2xl animate-spin">
                 ⏳
               </div>
               <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse">
                 Processing
               </h2>
               <p className="text-cyan-200 mt-4 text-sm font-bold tracking-widest uppercase bg-black/40 py-2 px-4 rounded-xl inline-block border border-white/10">
                 Verifying securely
               </p>
             </div>
           </div>
         ) : (
           <div className={`p-8 sm:p-12 rounded-[2rem] backdrop-blur-3xl shadow-2xl transition-all duration-300 ${
             scanResult?.status === 'VALID' ? 'bg-emerald-500/20 border-2 border-emerald-500 box-shadow-[0_0_100px_rgba(16,185,129,0.3)]' :
             scanResult?.status === 'ALREADY_USED' ? 'bg-amber-500/20 border-2 border-amber-500 box-shadow-[0_0_100px_rgba(245,158,11,0.3)]' :
             'bg-rose-500/20 border-2 border-rose-500 box-shadow-[0_0_100px_rgba(225,29,72,0.3)]'
           }`}>
             
             <div className="text-center mb-8">
               <div className="text-6xl sm:text-8xl mb-4 inline-block drop-shadow-2xl">
                 {scanResult?.status === 'VALID' ? '✅' :
                  scanResult?.status === 'ALREADY_USED' ? '⚠️' : '❌'}
               </div>
               <h2 className={`font-black text-4xl sm:text-5xl uppercase tracking-widest ${
                 scanResult?.status === 'VALID' ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' :
                 scanResult?.status === 'ALREADY_USED' ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 
                 'text-rose-400 drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]'
               }`}>
                 {scanResult?.status === 'VALID' ? `Admit ${scanResult.quantity || 1}` :
                  scanResult?.status === 'ALREADY_USED' ? 'Used Ticket' :
                  'Access Denied'}
               </h2>
               
               {scanResult?.status !== 'VALID' && (
                 <p className="text-red-200 mt-4 text-sm font-bold tracking-widest uppercase bg-black/40 py-2 px-4 rounded-xl inline-block border border-white/10">
                   {scanResult?.reason || scanResult?.error || "Invalid QR"}
                 </p>
               )}
             </div>

             <div className="bg-black/40 p-4 rounded-2xl mb-8 border border-white/10">
               <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-center">Raw Signature</p>
               <p className="text-white font-mono text-[10px] sm:text-xs break-all opacity-80 text-center">
                 {scanResult?.raw_data || "N/A"}
               </p>
             </div>
             
             <button
               onClick={resetScanner}
               className={`w-full font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-95 ${
                 scanResult?.status === 'VALID' ? 'bg-emerald-500 hover:bg-emerald-400 text-black' :
                 scanResult?.status === 'ALREADY_USED' ? 'bg-amber-500 hover:bg-amber-400 text-black' : 
                 'bg-rose-500 hover:bg-rose-400 text-black'
               }`}
             >
               Scan Next Ticket
             </button>
             
             <p className="text-center text-white/30 text-[10px] font-bold tracking-widest uppercase mt-6">
               Tap to initialize camera again
             </p>
           </div>
         )}
       </div>
       {/* Dashboard Modal */}
       {showDashboard && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="bg-[#12121e] border border-white/10 p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">
             <button 
               onClick={() => setShowDashboard(false)}
               className="absolute top-6 right-6 text-white/50 hover:text-white transition"
             >
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
             </button>
             
             <h2 className="text-2xl font-black uppercase tracking-widest text-amber-400 mb-8 border-b border-white/10 pb-4">Live Dashboard</h2>
             
             {stats.loading ? (
               <div className="flex justify-center items-center py-12">
                 <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin"></div>
               </div>
             ) : (
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center shadow-inner">
                   <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Total Tickets Sold</p>
                   <p className="text-5xl font-black text-white drop-shadow-md">{stats.total}</p>
                 </div>
                 
                 <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 text-center shadow-inner">
                   <p className="text-emerald-400/60 text-[10px] font-bold uppercase tracking-widest mb-2">Checked In</p>
                   <p className="text-5xl font-black text-emerald-400 drop-shadow-md">{stats.used}</p>
                 </div>
                 
                 <div className="col-span-2 mt-2 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 flex justify-between items-center shadow-sm">
                   <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Pending Check-ins</span>
                   <span className="text-amber-400 text-xl font-black">{stats.total - stats.used}</span>
                 </div>
               </div>
             )}
             
             <button
               onClick={fetchStats}
               className="w-full mt-8 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2"
             >
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
               Refresh Data
             </button>
           </div>
         </div>
       )}
    </div>
  );
}
