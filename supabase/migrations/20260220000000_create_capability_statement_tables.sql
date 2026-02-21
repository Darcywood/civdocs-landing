-- Capability Statement Builder: Tables
-- Run this migration in your Supabase SQL Editor (Dashboard > SQL Editor)

-- Submissions table
create table if not exists capability_statement_submissions (
  id                              uuid primary key default gen_random_uuid(),
  created_at                      timestamptz default now(),
  first_name                      text not null,
  email                           text not null,
  marketing_consent               boolean not null default false,
  answers                         jsonb not null,
  upload_manifest                 jsonb,
  pdf_path                        text,
  pdf_signed_url_last_generated_at timestamptz,
  ai_used                         boolean default false,
  source                          text default 'website',
  status                          text default 'pending',
  error                           text,
  ip_hash                         text,
  user_agent                      text
);

create index if not exists idx_capability_submissions_email on capability_statement_submissions (email);
create index if not exists idx_capability_submissions_created_at on capability_statement_submissions (created_at desc);

-- Events table (for funnel analytics)
create table if not exists capability_statement_events (
  id              uuid primary key default gen_random_uuid(),
  submission_id   uuid references capability_statement_submissions(id) on delete cascade,
  event_type      text not null,
  created_at      timestamptz default now(),
  meta            jsonb
);

create index if not exists idx_capability_events_submission on capability_statement_events (submission_id);

-- RLS: deny all public access (server uses service_role which bypasses RLS)
alter table capability_statement_submissions enable row level security;
alter table capability_statement_events enable row level security;

-- Storage bucket: create via Supabase Dashboard > Storage > New bucket
-- Name: capability-statements
-- Public: false (private)
-- Or run this in SQL if your project supports it:
-- insert into storage.buckets (id, name, public) values ('capability-statements', 'capability-statements', false) on conflict (id) do nothing;
