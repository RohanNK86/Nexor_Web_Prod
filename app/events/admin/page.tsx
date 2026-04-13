"use client";

import React, { useState, useEffect } from "react";
import { eventsService, Event } from "@/lib/events-service";
import { useTheme } from "@/lib/ThemeContext";

export default function EventsAdminPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventsService.getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this event? This action cannot be undone.")) {
      await eventsService.deleteEvent(id);
      fetchEvents();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      if (editingEvent.id) {
        await eventsService.updateEvent(editingEvent.id, editingEvent);
      } else {
        await eventsService.addEvent(editingEvent as Omit<Event, "id">);
      }
      setIsModalOpen(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (error) {
      alert("Verification Failed: Ensure your Supabase table 'events' has the correct schema.");
    }
  };

  const openAddModal = () => {
    setEditingEvent({
      title: "",
      description: "",
      price: 0,
      date: "",
      time: "",
      venue: "",
      image_url: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 px-8 transition-colors duration-700 ${isDark ? 'bg-[#030308]' : 'bg-[#FAF9F6]'}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-amber-400" />
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.4em]">Administrative</span>
            </div>
            <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter italic ${isDark ? 'text-white' : 'text-black'}`}>
              Event Control <span className="text-amber-400">Hub</span>
            </h1>
          </div>
          <button 
            onClick={openAddModal}
            className="px-10 py-4 bg-amber-400 text-black font-black uppercase text-xs tracking-widest rounded-2xl shadow-[0_15px_30px_-10px_rgba(251,191,36,0.4)] hover:scale-[1.05] hover:bg-amber-300 transition-all active:scale-95"
          >
            Create New Experience
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Synchronizing...</span>
          </div>
        ) : (
          <div className="grid gap-6">
            {events.length === 0 ? (
              <div className="p-20 rounded-[3rem] border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center space-y-4">
                <span className="text-4xl">📭</span>
                <p className="text-sm font-medium text-white/30 italic">No active events found in your Supabase instance.</p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} 
                     className={`group p-6 rounded-[2.5rem] border transition-all duration-500 flex flex-col md:flex-row gap-8 items-center ${
                       isDark 
                       ? 'bg-white/[0.03] border-white/5 hover:border-amber-400/30' 
                       : 'bg-white border-black/5 shadow-xl'
                     }`}>
                  
                  <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden flex-shrink-0">
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h3 className={`text-2xl font-black uppercase italic tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                      {event.title}
                    </h3>
                    <div className={`flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                      <span className="flex items-center gap-1">📅 {event.date}</span>
                      <span className="flex items-center gap-1">⏰ {event.time}</span>
                      <span className="flex items-center gap-1 text-amber-400">🏛️ {event.venue}</span>
                    </div>
                    <p className="text-amber-400 font-black text-xl tracking-tighter">₹{event.price}</p>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => openEditModal(event)}
                      className={`px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                        isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-black hover:bg-black/10'
                      }`}
                    >
                      Refine
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="px-8 py-3 rounded-xl bg-red-500/10 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className={`max-w-3xl w-full p-12 rounded-[3.5rem] relative shadow-[0_0_100px_rgba(251,191,36,0.1)] ${
            isDark ? 'bg-[#0a0a14] border border-white/10' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-10">
              <div className="space-y-1">
                <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Configuration</span>
                <h2 className={`text-3xl font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
                  {editingEvent.id ? 'Refine Experience' : 'New Experience'}
                </h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">✕</button>
            </div>
            
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Event Title</label>
                <input 
                  type="text" 
                  value={editingEvent.title} 
                  onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-400 transition-all outline-none font-bold text-sm" required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Entry Price (INR)</label>
                <input 
                  type="number" 
                  value={editingEvent.price} 
                  onChange={(e) => setEditingEvent({...editingEvent, price: Number(e.target.value)})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-400 transition-all outline-none font-bold text-sm" required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Description</label>
                <textarea 
                  value={editingEvent.description} 
                  onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-400 transition-all outline-none font-medium text-sm min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Scheduled Date</label>
                <input 
                  type="text" 
                  placeholder="e.g. 18th April, Sat"
                  value={editingEvent.date} 
                  onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-400 transition-all outline-none font-bold text-sm" required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Scheduled Time</label>
                <input 
                  type="text" 
                  placeholder="e.g. 12:00 PM"
                  value={editingEvent.time} 
                  onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-400 transition-all outline-none font-bold text-sm" required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Venue Location</label>
                <input 
                  type="text" 
                  value={editingEvent.venue} 
                  onChange={(e) => setEditingEvent({...editingEvent, venue: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-400 transition-all outline-none font-bold text-sm" required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Experience Poster URL</label>
                <input 
                  type="text" 
                  value={editingEvent.image_url} 
                  onChange={(e) => setEditingEvent({...editingEvent, image_url: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-400 transition-all outline-none font-bold text-sm" required
                />
              </div>
              
              <div className="md:col-span-2 flex gap-4 pt-10">
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-amber-400 text-black font-black uppercase text-xs tracking-widest rounded-2xl shadow-[0_15px_30px_-10px_rgba(251,191,36,0.3)] hover:scale-[1.02] transition-all"
                >
                  Save Configuration
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-10 py-5 bg-white/5 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
