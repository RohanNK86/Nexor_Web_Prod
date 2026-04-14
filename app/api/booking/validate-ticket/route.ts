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

    const { data: ticket, error: fetchError } = await supabase
      .from("tickets")
      .select("*")
      .eq("ticket_code", ticket_code)
      .single();

    if (fetchError || !ticket) {
      return NextResponse.json({ status: "INVALID", reason: "Ticket Unregistered in DB" });
    }

    if (ticket.is_used) {
      return NextResponse.json({ status: "ALREADY_USED" });
    }

    const { error: updateError } = await supabase
      .from("tickets")
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq("ticket_code", ticket_code);

    if (updateError) throw updateError;

    await supabase.from("scan_logs").insert({
      ticket_id: ticket.id,
      scanner_id: scanner_id || "web_scanner",
      status: "valid"
    });

    return NextResponse.json({ status: "VALID", quantity: ticket.quantity || 1 });
  } catch (error: any) {
    console.error("Scanner API Error:", error);
    return NextResponse.json({ status: "ERROR", error: "System Error" });
  }
}

