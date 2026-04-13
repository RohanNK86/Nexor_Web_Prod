import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";


interface ConfirmPayload {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  amountInr: number;
  userEmail: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const razorpaySecret = process.env.RAZORPAY_KEY_SECRET || "";

const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
    : null;

function getExpectedSignature(orderId: string, paymentId: string) {
  return crypto
    .createHmac("sha256", razorpaySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}



export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ConfirmPayload;
    const {
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventVenue,
      amountInr,
      userEmail,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin is not configured on server." },
        { status: 500 }
      );
    }

    if (!razorpaySecret) {
      return NextResponse.json(
        { error: "Razorpay secret is missing on server." },
        { status: 500 }
      );
    }

    if (!eventId || !userEmail || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required ticket confirmation data." }, { status: 400 });
    }

    const expected = getExpectedSignature(razorpay_order_id, razorpay_payment_id);
    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
    }

    const qrValue = `NEXOR-EVENT-${eventId}-${razorpay_payment_id}`;

    const { error: upsertError } = await supabaseAdmin.from("event_tickets").upsert(
      {
        event_id: eventId,
        user_email: userEmail,
        event_title: eventTitle,
        event_date: eventDate,
        event_time: eventTime,
        event_venue: eventVenue,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        amount_inr: amountInr,
        status: "paid",
        qr_value: qrValue,
      },
      { onConflict: "event_id,user_email" }
    );

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: "Ticket purchased successfully",
      ticket: {
        event_id: eventId,
        user_email: userEmail,
        payment_id: razorpay_payment_id,
        qr_value: qrValue,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to confirm ticket." }, { status: 500 });
  }
}

