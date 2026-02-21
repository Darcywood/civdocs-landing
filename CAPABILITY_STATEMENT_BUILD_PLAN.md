# Capability Statement Builder — Implementation Plan

## Overview

A free lead magnet at `/capability-statement` that walks civil contractors through a 3-step wizard, generates a professional PDF capability statement using their answers + AI, and emails them a signed download link.

---

## Stack (no new infra required)

| Concern | Solution |
|---|---|
| Frontend | Next.js App Router (existing) |
| DB | Supabase (existing — service role) |
| Storage | Supabase Storage (new bucket) |
| Email | Resend + @react-email/render (existing) |
| PDF | `@react-pdf/renderer` (needs install) |
| AI | OpenAI GPT-4o-mini (needs install + API key) |
| Validation | Zod (needs install) |
| Forms | React Hook Form (needs install) |

### Packages to install
```bash
npm install @react-pdf/renderer openai zod react-hook-form @hookform/resolvers
```

---

## File Structure

```
app/
  capability-statement/
    page.tsx                          # Entry point, renders wizard
    success/
      page.tsx                        # Success screen after generation
    _components/
      CapabilityWizard.tsx            # Orchestrator — manages step state
      WizardProgress.tsx              # Step 1 / 2 / 3 progress bar
      Step1Basics.tsx                 # 6 questions: business basics
      Step2Proof.tsx                  # Projects, personnel, plant, compliance
      Step3UploadsAndLead.tsx         # File uploads + name/email + generate
      UploadDropzone.tsx              # Reusable drag-and-drop upload component
      SuccessScreen.tsx               # Post-generation CTA screen
      FormField.tsx                   # Shared input wrapper with label + error

app/api/
  capability-statement/
    create-upload-urls/route.ts       # Returns Supabase signed upload URLs
    generate/route.ts                 # Core: validate → DB → AI → PDF → email

lib/
  capability-statement/
    schema.ts                         # Zod schemas for all 3 steps
    buildContent.ts                   # Maps raw answers → PDF sections (AI fallback)
    ai.ts                             # GPT-4o-mini call with strict JSON schema
    storage.ts                        # Supabase Storage helpers
    email.ts                          # Resend capability statement email
  pdf/
    CapabilityStatementPdf.tsx        # React PDF template
    PdfStyles.ts                      # Shared StyleSheet for PDF

supabase/migrations/
  20260220000000_create_capability_statement_tables.sql
```

---

## Database Schema

### Table: `capability_statement_submissions`

```sql
create table capability_statement_submissions (
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
  status                          text default 'pending',  -- pending | generated | emailed | failed
  error                           text,
  ip_hash                         text,
  user_agent                      text
);

create index on capability_statement_submissions (email);
create index on capability_statement_submissions (created_at desc);
```

### Table: `capability_statement_events` (optional Phase 1, recommended)

```sql
create table capability_statement_events (
  id              uuid primary key default gen_random_uuid(),
  submission_id   uuid references capability_statement_submissions(id) on delete cascade,
  event_type      text not null,  -- step1_complete | step2_complete | generated | email_sent | video_clicked | book_clicked
  created_at      timestamptz default now(),
  meta            jsonb
);
```

### RLS Policy
```sql
-- Deny all public access. Server uses service_role key only.
alter table capability_statement_submissions enable row level security;
alter table capability_statement_events enable row level security;
-- No public policies — service role bypasses RLS automatically
```

### Supabase Storage Bucket
- Bucket name: `capability-statements` (private)
- Path structure:
  - `uploads/{submissionId}/logo.{ext}`
  - `uploads/{submissionId}/projects/{n}.{ext}`
  - `uploads/{submissionId}/plant/{n}.{ext}`
  - `uploads/{submissionId}/team/{n}.{ext}`
  - `pdf/{submissionId}/capability-statement.pdf`

---

## Question Set (locked)

### Step 1 — Basics
| # | Question | Input Type |
|---|---|---|
| 1 | Business name | Text (short) |
| 2 | Location / regions you operate in | Text (short) |
| 3 | Years in operation | Select: Under 2 / 2–5 years / 5–10 years / 10+ years |
| 4 | Business type | Select: Civil Contractor / Plant Hire / Both / Subcontractor |
| 5 | Core services | Multi-select: Earthworks / Roads / Drainage / Demolition / Bulk Excavation / Other (free text) |
| 6 | Typical clients | Multi-select: Local Council / State Government / Tier 1 Contractor / Private Developer / Mining |

### Step 2 — Proof
| # | Question | Input Type |
|---|---|---|
| 1 | Featured projects | Repeatable (2–4): name, client (opt), scope, value (opt), outcome (opt) |
| 2 | Average project size | Select: Under $100k / $100k–$500k / $500k–$2M / $2M+ |
| 3 | Key personnel | Repeatable (1–3): name, role, years experience |
| 4 | Plant & equipment | Multi-select + optional free text |
| 5 | Compliance & certifications | Multi-select: Public Liability / Workers Comp / SWMS/WHS / ISO 9001 / ISO 14001 / ISO 45001 + free text for prequals |
| 6 | Primary audience for this document | Select: Head Contractors / Government / Private Clients / Mining Companies |

### Step 3 — Uploads & Lead Capture
| Field | Detail |
|---|---|
| Logo | 1 file, JPG/PNG, max 5MB |
| Project photos | Up to 4 files, JPG/PNG, max 10MB each |
| Plant photos | Up to 4 files, JPG/PNG, max 10MB each |
| Team photo | Up to 2 files, JPG/PNG, max 5MB each |
| First name | Text |
| Email | Email |
| Marketing consent | Checkbox (unchecked by default) |

---

## API Routes

### `POST /api/capability-statement/create-upload-urls`
- Input: `{ submissionDraftId?: string, files: [{category, filename, contentType}] }`
- Generates a draft `submissionId` (uuid) if not provided
- Returns Supabase signed upload URLs for each file
- Client uploads directly to Supabase (no server bandwidth)
- Output: `{ submissionId, uploadUrls: [{path, signedUrl}] }`

### `POST /api/capability-statement/generate`
Server-side steps in order:

1. **Validate** payload with Zod (strict — reject unknown fields)
2. **Honeypot check** (bot detection)
3. **Rate limit** by IP (max 3 requests per hour)
4. **Create submission row** in Supabase (status: `pending`)
5. **Build content** from raw answers via `buildContent.ts` (no-AI fallback)
6. **AI enrichment** — if `OPENAI_API_KEY` is set:
   - Call GPT-4o-mini with strict JSON schema
   - Rule: only use provided answers, never invent facts
   - On failure: fall back to `buildContent.ts` output silently
7. **Generate PDF buffer** with `@react-pdf/renderer`
8. **Upload PDF** to Supabase Storage (`pdf/{submissionId}/capability-statement.pdf`)
9. **Create signed URL** (7-day expiry)
10. **Send email** via Resend with signed URL
11. **Update submission row** (status: `emailed`, `pdf_path`, `ai_used`)
12. **Return** `{ submissionId, previewData }` to client → redirect to `/capability-statement/success`

---

## AI Integration (GPT-4o-mini)

### Rules enforced in prompt
- Only use information provided in the answers
- If a field is missing or empty → omit that section
- Never add ISO certifications, project values, client names, or awards unless explicitly provided
- Output must be valid JSON matching the schema exactly

### Output schema
```json
{
  "company_overview": "string (2-3 sentences)",
  "core_capabilities": ["string"],
  "regions": ["string"],
  "project_experience": [{
    "name": "string",
    "client": "string | null",
    "scope": "string",
    "value": "string | null",
    "outcome": "string | null"
  }],
  "plant_and_equipment": ["string"],
  "key_personnel": [{
    "name": "string",
    "role": "string",
    "experience": "string"
  }],
  "compliance": ["string"],
  "audience_note": "string | null"
}
```

### Toggle
- AI runs if `OPENAI_API_KEY` is present in env
- If missing or call fails → silently use `buildContent.ts` fallback
- `ai_used` boolean stored in DB row

---

## PDF Template Layout

**Cover page**
- Logo top-left (if uploaded)
- Business name (large heading)
- Tagline: regions + business type
- Hero project photo (if uploaded, fills right side or bottom third)
- Thin orange accent bar at bottom

**Page 2**
- Company overview paragraph
- Core capabilities (icon list or bullets)
- Compliance & certifications
- Typical clients

**Page 3**
- Featured projects (2-column card layout, max 4)
- Project photos inline (if uploaded)

**Page 4**
- Plant & equipment list
- Key personnel (name + role + exp)
- Footer: "Prepared using CivDocs Capability Statement Builder · civdocs.com.au"

**Design rules**
- Neutral, professional — not CivDocs branded
- User's logo takes priority
- CivDocs only appears in small footer text
- Font: clean sans-serif (Helvetica via react-pdf)
- Accent colour: derived from orange (`#FF8C32`) for headings only — subtle

---

## Email Template

**Subject:** Your Capability Statement is ready — {business_name}

**Body:**
- Hi {first_name}
- Your PDF is attached as a secure link (expires in 7 days)
- Download button → signed URL
- Watch 3-min CivDocs video → `CAPABILITY_VIDEO_URL` (placeholder)
- Book 15-min walkthrough → `CAPABILITY_BOOK_URL` (placeholder)
- Disclaimer: "Generated from the information you provided. Review before submitting to clients."

**Marketing consent:**
- If unchecked: only this transactional email
- If checked: `marketing_consent = true` stored in DB (for future nurture sequence)

---

## Success Page CTAs

- Heading: "Your capability statement is on its way"
- Subheading: "Check your inbox — the link expires in 7 days"
- CTA 1: Watch 3-min CivDocs video (placeholder URL)
- CTA 2: Book a 15-min walkthrough (Calendly placeholder)
- Small note: "While you wait, here's what CivDocs can do for your business"

---

## Security

| Concern | Implementation |
|---|---|
| Rate limiting | In-memory or Upstash — max 3 generate calls per IP per hour |
| Honeypot | Hidden `_gotcha` field in form — reject if filled |
| File validation | Check MIME type + extension server-side (JPG/PNG only) |
| File size | Enforced in upload URL creation (max 10MB per file) |
| Max files | Enforced server-side per category |
| Service role | Never exposed to client — API routes only |
| Signed URLs | 7-day expiry, private bucket |

---

## Environment Variables Needed

```env
# Existing (already set)
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
FROM_EMAIL=

# New — add to .env.local + Vercel
OPENAI_API_KEY=                        # Provide when ready — AI skipped if missing
CAPABILITY_PDF_LINK_EXPIRY_DAYS=7
CAPABILITY_VIDEO_URL=https://placeholder.com/video    # Update when ready
CAPABILITY_BOOK_URL=https://calendly.com/placeholder  # Update when ready
```

---

## Build Order (phases in Cursor)

### Phase 1 — UI + Wizard (no backend yet)
- [ ] `/capability-statement/page.tsx` — route shell with Header/Footer
- [ ] `CapabilityWizard.tsx` — step state, localStorage persistence, navigation
- [ ] `WizardProgress.tsx` — step indicator
- [ ] `Step1Basics.tsx` — 6 questions with React Hook Form + Zod validation
- [ ] `Step2Proof.tsx` — repeatable project/personnel fields
- [ ] `Step3UploadsAndLead.tsx` — upload UI + name/email + consent
- [ ] `UploadDropzone.tsx` — drag-and-drop, file type/size validation (client-side)
- [ ] `FormField.tsx` — shared label + input + error wrapper

### Phase 2 — Backend: DB + Uploads
- [ ] Supabase migration SQL
- [ ] Create `capability-statements` storage bucket (private)
- [ ] `lib/capability-statement/storage.ts`
- [ ] `POST /api/capability-statement/create-upload-urls/route.ts`
- [ ] Wire `UploadDropzone` to hit create-upload-urls → upload direct to Supabase

### Phase 3 — Generate: PDF + AI + Email
- [ ] `lib/capability-statement/schema.ts` — Zod schemas
- [ ] `lib/capability-statement/buildContent.ts` — raw answer → sections
- [ ] `lib/capability-statement/ai.ts` — GPT-4o-mini call (skips if no key)
- [ ] `lib/pdf/PdfStyles.ts` — StyleSheet
- [ ] `lib/pdf/CapabilityStatementPdf.tsx` — React PDF template
- [ ] `lib/capability-statement/email.ts` — Resend helper
- [ ] `POST /api/capability-statement/generate/route.ts` — full pipeline
- [ ] Wire Step 3 "Generate" button to generate endpoint
- [ ] `/capability-statement/success/page.tsx` — success screen

### Phase 4 — Polish + Security
- [ ] Rate limiting on generate endpoint
- [ ] Honeypot field
- [ ] Server-side file validation
- [ ] End-to-end test (fill wizard → receive email → open PDF)
- [ ] Mobile responsiveness check

---

## Notes

- **`react-pdf` vs `@react-pdf/renderer`**: You already have `react-pdf` installed (this is for *viewing* PDFs). We need `@react-pdf/renderer` for *generating* them — different package, needs a separate install.
- **`puppeteer`**: Already in your `package.json` but not needed for this feature. `@react-pdf/renderer` is the right approach on Vercel serverless.
- **No resume if user leaves**: localStorage is used only to survive accidental refreshes during the wizard — it clears on successful generation.
- **Supabase bucket**: Create this manually in the Supabase dashboard (Storage → New bucket → `capability-statements` → Private) before running Phase 2.
