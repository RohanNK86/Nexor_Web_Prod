import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

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

async function sendTicketEmail(input: {
  to: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  paymentId: string;
  qrValue: string;
}) {
  const fromEmail = process.env.TICKET_FROM_EMAIL || "Nexor Super App <nexorsuperapp@gmail.com>";
  const qrUrl = `https://quickchart.io/qr?size=300&text=${encodeURIComponent(input.qrValue)}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
      <h2>Ticket Purchased Successfully</h2>
      <p>Your event pass is confirmed.</p>
      <ul>
        <li><strong>Event:</strong> ${input.eventTitle}</li>
        <li><strong>Date:</strong> ${input.eventDate}</li>
        <li><strong>Time:</strong> ${input.eventTime}</li>
        <li><strong>Venue:</strong> ${input.eventVenue}</li>
        <li><strong>Payment ID:</strong> ${input.paymentId}</li>
      </ul>
      <p>Show this QR pass at entry:</p>
      <img src="${qrUrl}" alt="Ticket QR Code" width="220" height="220" />
      <p style="font-size:12px;color:#555">If image is blocked, pass code: ${input.qrValue}</p>
    </div>
  `;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: input.to,
      subject: "Your Nexor Event Ticket",
      html,
    });
    return true;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [input.to],
        subject: "Your Nexor Event Ticket",
        html,
      }),
    });

    if (!response.ok) {
      throw new Error("Resend email send failed.");
    }
    return true;
  }

  return false;
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

    let emailSent = false;
    try {
      emailSent = await sendTicketEmail({
        to: userEmail,
        eventTitle,
        eventDate,
        eventTime,
        eventVenue,
        paymentId: razorpay_payment_id,
        qrValue,
      });
    } catch (emailError) {
      console.error("Ticket email send failed:", emailError);
      emailSent = false;
    }

    return NextResponse.json({
      ok: true,
      message: "Ticket purchased successfully",
      emailSent,
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

