-- Risk Assessment Generator: Tables and Storage
-- Run: supabase db push (or apply via Dashboard > SQL Editor)

-- Submissions table
create table if not exists risk_assessment_submissions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz default now(),
  first_name        text not null,
  email             text not null,
  company_name      text,
  phone             text,
  marketing_consent  boolean not null default false,
  machine_make      text not null,
  machine_model     text not null,
  machine_type      text not null,
  asset_number      text,
  report_number    text not null,
  answers           jsonb,
  specs             jsonb,
  status            text default 'pending',
  pdf_path          text,
  source            text default 'website'
);

create index if not exists idx_risk_assessment_submissions_email on risk_assessment_submissions (email);
create index if not exists idx_risk_assessment_submissions_created_at on risk_assessment_submissions (created_at desc);

-- RLS: deny all public access (server uses service_role which bypasses RLS)
alter table risk_assessment_submissions enable row level security;

-- Storage bucket for risk assessment PDFs (if your project supports storage via SQL)
insert into storage.buckets (id, name, public) 
values ('risk-assessments', 'risk-assessments', false) 
on conflict (id) do nothing;
