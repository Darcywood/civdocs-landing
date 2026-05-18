-- Signup acquisition for CRM / reporting (marketing site → organisations row).
-- Run against the same Supabase project used by the app and /api/start-trial.

ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS signup_acquisition_source TEXT;

ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS signup_attribution JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN organizations.signup_acquisition_source IS 'google_ads | meta_ads | organic | other — classified from gclid, fbclid, utm, etc.';
COMMENT ON COLUMN organizations.signup_attribution IS 'Sanitized snapshot: gclid, fbclid, utm_*, first landing path, referrer, ts';

CREATE INDEX IF NOT EXISTS idx_organizations_signup_acquisition_source
  ON organizations (signup_acquisition_source);
