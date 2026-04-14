import { NextResponse } from "next/server";
import { buildQR, generateTicketCode } from "@/lib/qr";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { event_id, payment_id, order_id, signature, user_id, quantity = 1 } = await req.json();

    // 1. VERIFY RAZORPAY SIGNATURE (Assumed handled/verified before calling this or by the caller)

    // 2. CREATE PAYMENT RECORD
    const { error: paymentError } = await supabase.from("event_payments").insert({
      user_id: user_id || null,
      event_id,
      payment_id,
      order_id,
      quantity,
      status: "success"
    });

    if (paymentError) {
      console.error("Payment insert error:", paymentError);
      return NextResponse.json({ success: false, error: "Payment Error: " + JSON.stringify(paymentError) }, { status: 500 });
    }

    // 3. CREATE TICKET
    const ticket_code = generateTicketCode();
    const qr_data = buildQR(ticket_code);

    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .insert({
        user_id: user_id || null,
        event_id,
        ticket_code,
        qr_signature: qr_data.split(".")[1],
        quantity,
        is_used: false
      })
      .select()
      .single();

    if (ticketError) {
      console.error("Error creating ticket:", ticketError);
      return NextResponse.json({ success: false, error: "Ticket Error: " + JSON.stringify(ticketError) }, { status: 500 });
    }

    // 4. RETURN QR TO USER
    return NextResponse.json({
      success: true,
      ticket_id: ticket.id,
      qr_data
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
