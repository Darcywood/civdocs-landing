-- Add public_token for QR code hosted report links
alter table risk_assessment_submissions
  add column if not exists public_token uuid default gen_random_uuid() not null;

create unique index if not exists idx_risk_assessment_submissions_public_token
  on risk_assessment_submissions (public_token);
