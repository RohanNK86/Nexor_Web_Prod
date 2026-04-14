"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Html5Qrcode } from "html5-qrcode";

export default function AdminScanner() {
  const { user, loading } = useAuth();
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanning, setScanning] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!user || loading) return;

    if (scanning) {
      // Delay initialization slightly to ensure DOM element is ready
      const initTimer = setTimeout(async () => {
        try {
          const html5QrCode = new Html5Qrcode("qr-reader");
          scannerRef.current = html5QrCode;
          
          await html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
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
          scannerRef.current.stop().then(() => {
            scannerRef.current?.clear();
          }).catch(() => {});
        } catch(e) {}
      }
    }

    return () => {
      if (scannerRef.current) {
         try {
           scannerRef.current.stop().then(() => {
             scannerRef.current?.clear();
           }).catch(() => {});
         } catch(e) {}
      }
    };
  }, [user, loading, scanning]);

  const onScanSuccess = async (decodedText: string) => {
    setScanning(false);
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {
        console.error(e);
      }
    }

    try {
      const res = await fetch("/api/booking/validate-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_data: decodedText, scanner_id: user?.email }),
      });
      const data = await res.json();
      setScanResult({
        ...data,
        raw_data: decodedText
      });
    } catch (error: any) {
      setScanResult({ status: "ERROR", error: error.message });
    }
  };

  const onScanFailure = (error: any) => {
    // Ignore mostly, happens when no QR in frame
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    });
  };

  const resetScanner = () => {
    setScanResult(null);
    setScanning(true);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading Auth...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-[2rem] shadow-2xl w-full max-w-md text-center backdrop-blur-xl">
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 font-bold">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-white mb-2">Host Portal</h1>
          <p className="text-white/40 text-sm mb-8 font-medium">Authentication required to access scanner</p>
          <button
            onClick={handleLogin}
            className="w-full bg-white text-black font-black uppercase tracking-widest py-4 px-4 rounded-xl hover:bg-gray-200 transition shadow-[0_10px_20px_-10px_rgba(255,255,255,0.3)]"
          >
            Google Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-24 px-4">
       <div className="max-w-lg w-full">
         <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-black text-amber-400 tracking-[0.2em] uppercase">Security Gate</h1>
              <p className="text-white/40 text-xs mt-2 font-medium tracking-widest uppercase">Host: {user.email}</p>
            </div>
         </div>

         {scanning ? (
           <div className="bg-black/40 rounded-3xl overflow-hidden p-2 border border-white/10 shadow-2xl">
             {cameraError ? (
               <div className="p-8 text-center text-rose-400 bg-rose-500/10 rounded-2xl">
                 <p className="font-bold mb-2">Camera Error</p>
                 <p className="text-sm opacity-80">{cameraError}</p>
                 <p className="text-xs mt-4 opacity-60">If testing on mobile over Wi-Fi, ensure you use HTTPS (e.g., via Ngrok or deployment).</p>
               </div>
             ) : (
               <>
                 <div id="qr-reader" className="w-full bg-black text-white" style={{ borderRadius: '1.2rem', overflow: 'hidden' }}></div>
                 <p className="text-center text-xs text-white/30 uppercase tracking-widest mt-4 pb-2">Align QR Code within the frame</p>
               </>
             )}
           </div>
         ) : (
           <div className={`p-8 rounded-3xl backdrop-blur-xl ${
             scanResult?.status === 'VALID' ? 'bg-emerald-500/10 border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.1)]' :
             scanResult?.status === 'ALREADY_USED' ? 'bg-amber-500/10 border border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.1)]' :
             'bg-rose-500/10 border border-rose-500/50 shadow-[0_0_50px_rgba(225,29,72,0.1)]'
           }`}>
             <h2 className={`text-center font-black text-4xl mb-6 uppercase tracking-widest ${
               scanResult?.status === 'VALID' ? 'text-emerald-400' :
               scanResult?.status === 'ALREADY_USED' ? 'text-amber-400' : 'text-rose-400'
             }`}>
               {scanResult?.status === 'VALID' ? `✅ Admit ${scanResult.quantity || 1}` :
                scanResult?.status === 'ALREADY_USED' ? '⚠️ Used' :
                `❌ Deny ${scanResult?.reason ? `(${scanResult.reason})` : scanResult?.error ? `(${scanResult.error})` : ''}`}
             </h2>
             <div className="bg-black/40 p-4 rounded-2xl mb-8">
               <p className="text-center text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Scanned Signature</p>
               <p className="text-center text-white font-mono text-xs break-all opacity-80">
                 {scanResult?.raw_data}
               </p>
             </div>
             
             <button
               onClick={resetScanner}
               className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)]"
             >
               Scan Next Ticket
             </button>
           </div>
         )}
       </div>
    </div>
  );
}
