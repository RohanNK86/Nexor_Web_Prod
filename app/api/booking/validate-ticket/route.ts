import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export const dynamic = 'force-dynamic';

const SECRET = process.env.TICKET_QR_SECRET || "fallback_secret_please_change";

function verifySignature(code: string, sig: string) {
  if (!SECRET) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(code).digest("hex");
  return expected === sig;
}

export async function POST(req: Request) {
  try {
    const { qr_data, scanner_id } = await req.json();

    if (!qr_data || !qr_data.includes(".")) {
      return NextResponse.json({ status: "INVALID", reason: "Invalid QR Format" });
    }

    const [ticket_code, signature] = qr_data.split(".");

    if (!verifySignature(ticket_code, signature)) {
      return NextResponse.json({ status: "INVALID", reason: "Signature Check Failed" });
    }

    // ATOMIC UPDATE FOR ULTRA-FAST SCANNING (1 Round-trip Happy Path)
    const { data: updatedTicket, error: updateError } = await supabase
      .from("tickets")
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq("ticket_code", ticket_code)
      .eq("is_used", false)
      .select("*")
      .single();

    if (updatedTicket) {
      // Async log: We don't await this so the scanner gets a nearly instant response
      supabase.from("scan_logs").insert({
        ticket_id: updatedTicket.id,
        scanner_id: scanner_id || "web_scanner",
        status: "valid"
      }).then(res => { if(res.error) console.error("Log error", res.error); });

      return NextResponse.json({ status: "VALID", quantity: updatedTicket.quantity || 1 });
    }

    // If atomic update failed, it means either: 
    // 1. Ticket doesn't exist
    // 2. Ticket is already used
    const { data: existingTicket } = await supabase
      .from("tickets")
      .select("is_used")
      .eq("ticket_code", ticket_code)
      .single();

    if (!existingTicket) {
      return NextResponse.json({ status: "INVALID", reason: "Ticket Unregistered in DB" });
    }

    if (existingTicket.is_used) {
      return NextResponse.json({ status: "ALREADY_USED", reason: "Ticket has already been scanned!" });
    }

    return NextResponse.json({ status: "ERROR", error: "Database state exception" });
  } catch (error: any) {
    console.error("Scanner API Error:", error);
    return NextResponse.json({ status: "ERROR", error: "System Error" });
  }
}

