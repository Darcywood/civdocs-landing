-- Posi-Track / compact track loader specifications cache (Firecrawl-scraped data)
-- Avoids re-scraping on every Auto-fill — protects Firecrawl/GPT margin
-- Populate via: npm run seed:posi-track-specs

create table if not exists posi_track_specs (
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

create index if not exists idx_posi_track_specs_make_model on posi_track_specs (make, model);
create index if not exists idx_posi_track_specs_search_keys on posi_track_specs using gin (search_keys);

alter table posi_track_specs enable row level security;
