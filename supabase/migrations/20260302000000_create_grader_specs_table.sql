-- Grader specifications cache (Firecrawl-scraped data)
-- Avoids re-scraping on every Auto-fill — protects Firecrawl/GPT margin
-- Populate via: npm run seed:grader-specs

create table if not exists grader_specs (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  make        text not null,
  model       text not null,
  name        text not null,
  search_keys text[] not null,
  specs       jsonb not null default '{}',
  source      text,
  unique (make, model)
);

create index if not exists idx_grader_specs_make_model on grader_specs (make, model);
create index if not exists idx_grader_specs_search_keys on grader_specs using gin (search_keys);

alter table grader_specs enable row level security;
