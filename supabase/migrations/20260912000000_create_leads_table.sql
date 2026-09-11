-- Callback / CRM leads captured from marketing forms (e.g. /get-a-callback).
-- Server uses service_role which bypasses RLS.

create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  first_name    text not null,
  last_name     text not null,
  mobile        text not null,
  company_name  text not null,
  time_sink     text,
  source        text not null default 'get-a-callback',
  status        text not null default 'new',
  attribution   jsonb,
  user_agent    text,
  ip_hash       text
);

create index if not exists idx_leads_created_at on leads (created_at desc);
create index if not exists idx_leads_source on leads (source);
create index if not exists idx_leads_status on leads (status);
create index if not exists idx_leads_mobile on leads (mobile);

alter table leads enable row level security;
