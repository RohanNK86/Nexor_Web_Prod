import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Ensure this route is completely dynamic and never caches server-side or database calls
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export async function GET() {
  try {
    const { data: tickets, error } = await supabaseAdmin
      .from("tickets")
      .select("quantity, is_used");

    if (error) throw error;

    let totalTickets = 0;
    let usedTickets = 0;

    if (tickets) {
      for (const ticket of tickets) {
        const qty = ticket.quantity || 1; // Default to 1 if column doesn't exist or is null
        totalTickets += qty;
        if (ticket.is_used) {
          usedTickets += qty;
        }
      }
    }

    return NextResponse.json({
      success: true,
      totalTickets,
      usedTickets,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
