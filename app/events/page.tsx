"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";
import { eventsService, Event } from "@/lib/events-service";
import { loadRazorpayScript } from "@/lib/razorpay";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

interface PurchasedTicket {
  event_id: string;
  payment_id: string;
  qr_value: string;
  quantity: number;
}

const TICKET_STORAGE_KEY = "nexor_purchased_tickets";

export default function EventsPage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showPurchaseSection, setShowPurchaseSection] = useState(false);
  const [showSuccessTicket, setShowSuccessTicket] = useState(false);
  const [activeEventDetails, setActiveEventDetails] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [purchasedTickets, setPurchasedTickets] = useState<Record<string, PurchasedTicket>>({});
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Admin Scanner Auth States
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState("");

  const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',') : ["rohannk86@gmail.com", "admin@nexor.com"];
  const isAdmin = user?.email && (ADMIN_EMAILS.includes(user.email) || user.email.includes("admin"));

  const posterUrl = "https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/events/Screenshot%202026-04-11%20205913.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJldmVudHMvU2NyZWVuc2hvdCAyMDI2LTA0LTExIDIwNTkxMy5wbmciLCJpYXQiOjE3NzU5MjE1NjMsImV4cCI6MTc3ODUxMzU2M30.VQY1pRZstT9SF1bJp0u9ZdaMsuMqKcCzUMyoK5D1jSI";

  useEffect(() => {
    const storedTickets = window.localStorage.getItem(TICKET_STORAGE_KEY);
    if (storedTickets) {
      try {
        const parsed = JSON.parse(storedTickets) as Record<string, PurchasedTicket>;
        setPurchasedTickets(parsed);
      } catch (storageError) {
        console.error("Invalid local ticket cache:", storageError);
      }
    }

    const fetchEvents = async () => {
      const data = await eventsService.getAllEvents();
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, [posterUrl]);

  useEffect(() => {
    const loadPurchasedTickets = async () => {
      if (!supabase || !user?.id) {
        setPurchasedTickets({});
        return;
      }

      const { data, error } = await supabase
        .from("tickets")
        .select("event_id, ticket_code, qr_signature, id")
        .eq("user_id", user.id);

      if (error || !data) {
        console.error("Failed to load purchased tickets:", error);
        return;
      }

      const ticketMap = data.reduce((acc: Record<string, PurchasedTicket>, ticket: any) => {
        acc[ticket.event_id] = {
           event_id: ticket.event_id,
           payment_id: ticket.id,
           qr_value: `${ticket.ticket_code}.${ticket.qr_signature}`,
           quantity: ticket.quantity || 1
        };
        return acc;
      }, {});

      setPurchasedTickets((prev) => {
        const merged = { ...prev, ...ticketMap };
        window.localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      });
    };

    loadPurchasedTickets();
  }, [user?.id]);

  const handleRegister = (eventId: string) => {
    setActiveEventDetails(activeEventDetails === eventId ? null : eventId);
  };

  const openPurchaseSection = (event: Event) => {
    if (purchasedTickets[event.id]) {
      setSelectedEvent(event);
      setPaymentId(purchasedTickets[event.id].payment_id);
      setShowSuccessTicket(true);
      return;
    }

    setSelectedEvent(event);
    setTicketQuantity(1);
    setShowPurchaseSection(true);
  };

  const handlePayment = async (event: Event) => {
    if (!user?.email) {
      alert("Please login first to purchase tickets.");
      return;
    }

    if (purchasedTickets[event.id]) {
      alert("You have already purchased this ticket. Click View Ticket.");
      return;
    }

    // TEST MODE: Charging 2 Rupees per ticket so you don't burn money during testing!
    // TODO: Change '2' back to 'event.price' when you launch.
    const paymentAmountInr = 2 * ticketQuantity;
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpayKey || razorpayKey === "YOUR_RAZORPAY_KEY_ID") {
      alert("Razorpay public key missing. Set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local and restart the dev server.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    try {
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: paymentAmountInr }),
      });

      if (!orderRes.ok) {
        const failedOrder = await orderRes.json().catch(() => ({}));
        alert(`Unable to create Razorpay order: ${failedOrder.error || "Unknown error"}`);
        return;
      }

      const orderData = await orderRes.json();

      if (orderData.error || !orderData.id) {
        alert("CRITICAL ERROR: " + (orderData.error || "Order creation failed") + "\n\nREQUIRED ACTION: Go to .env.local and check if you have entered VALID Razorpay keys.");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Nexor Events",
        description: `Admission Pass for ${event.title}`,
        order_id: orderData.id,
        handler: (response: any) => {
          const confirmPayment = async () => {
            try {
              const confirmRes = await fetch("/api/booking/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  event_id: event.id,
                  payment_id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  user_id: user?.id,
                  quantity: ticketQuantity,
                }),
              });

              const confirmData = await confirmRes.json();
              if (!confirmRes.ok || !confirmData.success) {
                alert(confirmData.error || "Payment captured but ticket generation failed.");
                return;
              }

              setPurchasedTickets((prev) => {
                const next = {
                  ...prev,
                  [event.id]: {
                    event_id: event.id,
                    payment_id: response.razorpay_payment_id,
                    qr_value: confirmData.qr_data,
                    quantity: ticketQuantity,
                  },
                };
                window.localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(next));
                return next;
              });
              setPaymentId(response.razorpay_payment_id);
              setShowPurchaseSection(false);
              setShowSuccessTicket(true);
              alert(
                confirmData.emailSent
                  ? "Payment successful. Ticket purchased and QR pass sent to your email."
                  : "Payment successful. Ticket purchased and saved. Email is not configured yet."
              );
            } catch (confirmError) {
              console.error(confirmError);
              alert("Payment succeeded but ticket confirmation failed. Please contact support with your payment ID.");
            }
          };

          confirmPayment();
        },
        prefill: {
          name: user.user_metadata?.full_name || "Nexor User",
          email: user.email,
          contact: "919999999999"
        },
        notes: {
          event_id: event.id,
          venue: event.venue
        },
        theme: { color: "#FACC15" },
        modal: {
          ondismiss: () => {
            console.log("Payment window closed");
          }
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", (response: any) => {
        const reason = response?.error?.description || "Payment failed at Razorpay checkout.";
        alert(reason);
      });
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed. Please check the browser console.");
    }
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById("ticket-component");
    if (!element) return;
    try {
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(element, { backgroundColor: "#ffffff", scale: 2 });
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `Nexor-Ticket-${selectedEvent?.title.replace(/\s+/g, "_")}.png`;
        link.href = dataUrl;
        link.click();
    } catch (e) {
        console.error("Failed to download image", e);
        alert("Failed to download image.");
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("ticket-component");
    if (!element) return;
    try {
        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");
        
        const canvas = await html2canvas(element, { backgroundColor: "#ffffff", scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        // Add some margin at the top
        const margin = 10;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 0, margin, pdfWidth, pdfHeight);
        pdf.save(`Nexor-Ticket-${selectedEvent?.title.replace(/\s+/g, "_")}.pdf`);
    } catch (e) {
        console.error("Failed to download PDF", e);
        alert("Failed to download PDF.");
    }
  };

  const closeTicket = () => {
    setShowSuccessTicket(false);
    setSelectedEvent(null);
    setPaymentId(null);
  };

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthLoading(true);
    setAdminAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      
      if (data.success) {
        window.location.href = data.redirectUrl;
      } else {
        setAdminAuthError(data.error || "Incorrect Password");
      }
    } catch (err: any) {
      setAdminAuthError(err.message || "Something went wrong.");
    } finally {
      setAdminAuthLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-700 ${isDark ? 'bg-[#030308]' : 'bg-[#FAF9F6]'}`}>

      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-1/4 -right-1/4 w-[70%] h-[70%] rounded-full blur-[150px] transition-opacity duration-1000 ${isDark ? 'bg-purple-600/10 opacity-60' : 'bg-amber-200/20 opacity-40'}`} />
        <div className={`absolute -bottom-1/4 -left-1/4 w-[60%] h-[60%] rounded-full blur-[120px] transition-opacity duration-1000 ${isDark ? 'bg-amber-500/5 opacity-50' : 'bg-purple-100/30 opacity-30'}`} />
        <div className={`absolute inset-0 opacity-[0.05] ${isDark ? 'invert-0' : 'invert'}`}
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 lg:pb-40">
        <header className="mb-10 sm:mb-14 lg:mb-20 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-amber-400" />
              <span className="text-amber-400 font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[9px] sm:text-[10px]">Prime Experiences</span>
            </div>
            <button 
              onClick={() => setShowAdminModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/50 text-rose-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-xl transition-all"
              title="Host Access"
            >
              <span>🔏</span> Validate Ticket Scan
            </button>
          </div>
          <h1 className={`text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight sm:tracking-tighter leading-[0.95] ${isDark ? 'text-white' : 'text-black'}`}>
            Live<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-[0_0_20px_rgba(251,191,36,0.2)]">Events</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7 lg:gap-10">
        {events.length === 0 && !loading ? (
          <div className={`col-span-full py-20 text-center rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <h3 className={`text-2xl font-black uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-black/50'}`}>No Active Events</h3>
            <p className={`mt-4 font-medium ${isDark ? 'text-white/30' : 'text-black/40'}`}>Stay tuned for upcoming massive experiences!</p>
          </div>
        ) : (
          events.map((event, idx) => (
            <div key={event.id} className="group relative rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 lg:p-4 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className={`relative h-full rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden border transition-all duration-500 ${isDark ? 'bg-white/[0.03] border-white/10 group-hover:border-amber-400/30' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="relative aspect-[4/5] overflow-hidden m-3 sm:m-4 rounded-[1.4rem] sm:rounded-[2rem]">
                  <img src={event.image_url || 'https://images.unsplash.com/photo-1540039155732-680ab8082627?q=80&w=1200'} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-xs sm:text-sm">₹{event.price}</div>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 pb-5 sm:pb-7 lg:pb-8 space-y-4 sm:space-y-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className={`text-xl sm:text-2xl font-black uppercase italic tracking-tight leading-tight ${isDark ? 'text-white' : 'text-black'}`}>{event.title}</h3>
                    <p className={`text-xs sm:text-sm line-clamp-3 sm:line-clamp-2 leading-relaxed min-h-[54px] sm:h-10 ${isDark ? 'text-white/50' : 'text-black/50'}`}>{event.description}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ${activeEventDetails === event.id ? 'max-h-48 opacity-100 mt-3 sm:mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className={`p-4 sm:p-5 rounded-2xl space-y-2 border ${isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
                      <p className="text-xs font-bold uppercase tracking-widest text-amber-400">📍 {event.venue}</p>
                      <p className={`text-[11px] sm:text-xs font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>📅 {event.date} | ⏰ {event.time}</p>
                      <p className={`text-[11px] sm:text-xs font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>🎧 Featuring: DJ Merli, Super Bro&apos;s</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                    <button onClick={() => handleRegister(event.id)} className={`flex-1 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-widest border transition-all ${isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'}`}>{activeEventDetails === event.id ? "Hide Info" : "Details"}</button>
                    <button onClick={() => openPurchaseSection(event)} className="flex-1 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-widest bg-amber-400 text-black shadow-[0_10px_20px_-5px_rgba(251,191,36,0.3)] hover:bg-amber-300 transition-all">{purchasedTickets[event.id] ? "View Ticket" : "Tickets"}</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseSection && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className={`max-w-4xl w-full rounded-[1.8rem] sm:rounded-[3rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl relative my-6 ${isDark ? 'bg-[#0a0a14] border border-white/10' : 'bg-white'}`}>
            <button onClick={() => setShowPurchaseSection(false)} className="absolute top-4 right-4 sm:top-7 sm:right-7 lg:top-10 lg:right-10 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all z-20">✕</button>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-[45%] relative aspect-[4/5] lg:aspect-auto">
                <img src={selectedEvent.image_url || 'https://images.unsplash.com/photo-1540039155732-680ab8082627?q=80&w=1200'} alt="Purchase Poster" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 sm:p-9 lg:p-14 flex-1 space-y-7 sm:space-y-8 lg:space-y-10">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2"><div className="h-1 w-6 bg-amber-400" /><span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">Confirmation</span></div>
                  <h3 className={`text-2xl sm:text-3xl lg:text-5xl font-black uppercase italic tracking-tight sm:tracking-tighter leading-none ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.title}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5">
                    <span className="text-xl sm:text-2xl">🏛️</span>
                    <div><p className="font-black text-[10px] uppercase text-amber-400 mb-1">Venue</p><p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.venue}</p></div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5">
                    <span className="text-xl sm:text-2xl">⏳</span>
                    <div><p className="font-black text-[10px] uppercase text-amber-400 mb-1">Schedule</p><p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.date} @ {selectedEvent.time}</p></div>
                  </div>
                </div>
                <div className="pt-6 sm:pt-8 lg:pt-10 border-t border-white/10 space-y-6 sm:space-y-8">
                  <div className="flex justify-between items-end">
                    <div className="space-y-3">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>Grand Total</p>
                      <div className={`flex items-center gap-3 ${isDark ? 'text-white' : 'text-black'}`}>
                        <p className="text-xl font-bold">All Access Pass</p>
                        <div className={`flex items-center gap-4 px-2 py-1 rounded-full border ${isDark ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'}`}>
                          <button onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">-</button>
                          <span className="text-sm font-black w-3 text-center">{ticketQuantity}</span>
                          <button onClick={() => setTicketQuantity(Math.min(8, ticketQuantity + 1))} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">+</button>
                        </div>
                      </div>
                    </div>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400">₹{selectedEvent.price * ticketQuantity}</span>
                  </div>
                  <button onClick={() => handlePayment(selectedEvent)} className="w-full py-4 sm:py-5 lg:py-6 bg-amber-400 text-black font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] rounded-2xl sm:rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(251,191,36,0.4)] hover:scale-[1.02] transition-all">Complete Payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS TICKET SECTION */}
      {showSuccessTicket && selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-[#030308] animate-fade-in overflow-y-auto">
          <div className="max-w-md w-full bg-[#12121e] rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 lg:p-10 relative border border-white/10 shadow-[0_0_100px_rgba(251,191,36,0.15)] text-center space-y-6 sm:space-y-8 lg:space-y-10 my-auto">
            <header className="space-y-3 sm:space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6">
                <span className="text-3xl sm:text-4xl">🎟️</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-[0.15em] sm:tracking-widest">Booking Confirmed</h2>
              <p className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-widest break-all">Payment Success ID: {paymentId}</p>
            </header>

            {/* THE TICKET */}
            <div id="ticket-component" className="bg-white rounded-[1.6rem] sm:rounded-[2.2rem] p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-7 lg:space-y-8 relative overflow-hidden group">
              {/* Ticket Notches */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#12121e] rounded-full border-r border-white/5" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#12121e] rounded-full border-l border-white/5" />

              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-black text-black uppercase italic tracking-tight leading-none">{selectedEvent.title}</h3>
                <div className="h-px bg-black/5 w-full" />
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-black/30 tracking-widest">Date</p>
                    <p className="text-xs font-bold text-black">{selectedEvent.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-black/30 tracking-widest">Time</p>
                    <p className="text-xs font-bold text-black">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="text-left space-y-1">
                  <p className="text-[8px] font-black uppercase text-black/30 tracking-widest">Venue</p>
                  <p className="text-xs font-bold text-black">{selectedEvent.venue}</p>
                </div>
              </div>

              {/* QR CODE SECTION */}
              <div className="pt-8 border-t border-black/5 flex flex-col items-center space-y-4">
                <div className="p-4 bg-white border-2 border-black/5 rounded-3xl group-hover:scale-105 transition-transform duration-500">
                  <QRCodeSVG
                    value={purchasedTickets[selectedEvent.id]?.qr_value || `NEXOR-EVENT-${selectedEvent.id}-${paymentId}`}
                    size={128}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ring-1 ring-amber-400 shadow-sm">
                    Valid for {purchasedTickets[selectedEvent.id]?.quantity || 1} Entry
                  </div>
                </div>
                <p className="text-[8px] font-black uppercase tracking-[0.28em] sm:tracking-[0.4em] text-black/20">Digital Admission Pass</p>
              </div>
            </div>

            <footer className="pt-2 sm:pt-4 lg:pt-6 space-y-3 sm:space-y-4">
              <div className="flex gap-3">
                 <button
                   onClick={handleDownloadImage}
                   className="flex-1 py-3 sm:py-4 bg-white/10 text-white font-black uppercase text-[9px] sm:text-[10px] tracking-widest rounded-xl hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2"
                 >
                   <span>🖼️</span> Save PNG
                 </button>
                 <button
                   onClick={handleDownloadPDF}
                   className="flex-1 py-3 sm:py-4 bg-white/10 text-white font-black uppercase text-[9px] sm:text-[10px] tracking-widest rounded-xl hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2"
                 >
                   <span>📄</span> Save PDF
                 </button>
              </div>
              <button
                onClick={closeTicket}
                className="w-full py-4 sm:py-5 bg-amber-400 text-black font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-widest rounded-xl sm:rounded-2xl shadow-lg hover:scale-[1.02] transition-all"
              >
                Return to Events
              </button>
              <p className="text-[10px] font-medium text-white/30">Screenshot this pass for entry at the venue</p>
            </footer>
          </div>
        </div>
      )}
      {/* Admin Password Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="max-w-md w-full bg-[#12121e] rounded-[2rem] p-8 relative border border-white/10 shadow-2xl space-y-6">
            <button onClick={() => setShowAdminModal(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all">✕</button>
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
                <span className="text-3xl">🔏</span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white">Host Access</h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Enter Admin Scanner Vault Password</p>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all text-center tracking-widest font-mono"
                  placeholder="••••••••"
                  autoFocus
                  required
                />
              </div>

              {adminAuthError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center py-3 rounded-lg uppercase tracking-widest">
                  {adminAuthError}
                </div>
              )}

              <button
                type="submit"
                disabled={adminAuthLoading}
                className="w-full bg-rose-500 hover:bg-rose-400 text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all disabled:opacity-50"
              >
                {adminAuthLoading ? "Verifying..." : "Unlock Scanner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}