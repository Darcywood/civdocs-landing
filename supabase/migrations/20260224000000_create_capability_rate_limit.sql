-- Rate limit table for capability statement generator (10 per hour per IP)
-- Run in Supabase SQL Editor if not using migrations

create table if not exists capability_statement_rate_limit (
  ip          text not null,
  hour_bucket text not null,
  count       int not null default 1,
  primary key (ip, hour_bucket)
);

alter table capability_statement_rate_limit enable row level security;

-- Atomic increment and return new count (used by API to enforce limit)
create or replace function check_and_increment_capability_rate_limit(
  p_ip text,
  p_hour_bucket text,
  p_limit int default 10
)
returns int
language plpgsql
security definer
as $$
declare
  v_count int;
begin
  insert into capability_statement_rate_limit (ip, hour_bucket, count)
  values (p_ip, p_hour_bucket, 1)
  on conflict (ip, hour_bucket)
  do update set count = capability_statement_rate_limit.count + 1
  returning count into v_count;
  return v_count;
end;
$$;
