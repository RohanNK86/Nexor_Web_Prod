import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    
    let user_id;
    if (token) {
        const { data: { user } } = await supabase.auth.getUser(token);
        user_id = user?.id;
    }
    
    // Fallback: Check query params if not using token directly
    const url = new URL(req.url);
    if (!user_id && url.searchParams.has("user_id")) {
        user_id = url.searchParams.get("user_id");
    }

    if (!user_id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;

    const formattedTickets = (tickets || []).map(t => ({
      ...t,
      qr_data: `${t.ticket_code}.${t.qr_signature}`
    }));

    return NextResponse.json(formattedTickets);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
