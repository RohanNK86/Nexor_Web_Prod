import { supabase } from "./supabase";

export interface Event {
  id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  time: string;
  venue: string;
  image_url: string;
  created_at?: string;
}

export const eventsService = {
  async getAllEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }
    return data as Event[];
  },

  async getEventById(id: string) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching event:", error);
      return null;
    }
    return data as Event;
  },

  async addEvent(event: Omit<Event, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("events")
      .insert([event])
      .select()
      .single();

    if (error) {
      console.error("Error adding event:", error);
      throw error;
    }
    return data as Event;
  },

  async updateEvent(id: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating event:", error);
      throw error;
    }
    return data as Event;
  },

  async deleteEvent(id: string) {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
    return true;
  }
};
