-- 1. Create EVENTS table with TEXT id corresponding to frontend IDs
create table if not exists events (
  id text primary key,
  title text,
  description text,
  price numeric,
  date text,
  time text,
  venue text,
  image_url text,
  created_at timestamp default now()
);

-- 2. Create EVENT_PAYMENTS table
create table if not exists event_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  event_id text,
  payment_id text,
  order_id text,
  status text,
  created_at timestamp default now(),
  CONSTRAINT event_payments_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE,
  CONSTRAINT event_payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 3. Create SECURE TICKETS table
create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  event_id text,
  ticket_code text unique,
  qr_signature text,
  is_used boolean default false,
  created_at timestamp default now(),
  used_at timestamp,
  CONSTRAINT tickets_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE,
  CONSTRAINT tickets_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 4. Create SCAN LOGS table
create table if not exists scan_logs (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid,
  scanner_id text,
  status text,
  scanned_at timestamp default now(),
  CONSTRAINT scan_logs_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE
);

-- SPEED INDEX
create index if not exists idx_ticket_code on tickets(ticket_code);
