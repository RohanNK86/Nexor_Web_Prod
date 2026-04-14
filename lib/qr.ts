import crypto from "crypto";

// We fallback to a default secret for development if it's missing in .env
const SECRET = process.env.TICKET_QR_SECRET || "fallback_secret_please_change";

export function generateTicketCode() {
  return crypto.randomUUID();
}

export function signTicket(ticketCode: string) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(ticketCode)
    .digest("hex");
}

export function buildQR(ticketCode: string) {
  const sig = signTicket(ticketCode);
  return `${ticketCode}.${sig}`;
}
