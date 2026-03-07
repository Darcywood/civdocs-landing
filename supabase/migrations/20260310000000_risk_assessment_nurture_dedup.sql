-- Risk assessment nurture email deduplication
-- Ensures the 24h/72h follow-up sequence is scheduled at most once per email per 30 days.
-- Replaces the naive risk_assessment_follow_up_sent table (drops it if it was already applied).

drop table if exists risk_assessment_follow_up_sent;

create table if not exists risk_assessment_nurture_schedule (
  email               text        primary key,
  first_scheduled_at  timestamptz not null default now(),
  last_scheduled_at   timestamptz not null default now(),
  last_machine_type   text,
  schedule_count      integer     not null default 1,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- RLS: server uses service_role which bypasses RLS
alter table risk_assessment_nurture_schedule enable row level security;

-- Atomic dedup check and schedule guard.
--
-- Behaviour:
--   • New email           → insert row, return allowed = true,  reason = 'first_schedule'
--   • Same email, within 30-day window  → no changes, return allowed = false, reason = 'within_dedup_window'
--   • Same email, window expired        → update timestamps + increment count, return allowed = true, reason = 'window_expired'
--   • Concurrent insert race            → losing request returns allowed = false, reason = 'concurrent_dedup'
--
-- The SELECT ... FOR UPDATE locks the row before we decide anything, preventing duplicate
-- scheduling when multiple reports are submitted in quick succession for the same email.
create or replace function check_and_schedule_risk_assessment_nurture(
  p_email       text,
  p_machine_type text default null
)
returns table (
  allowed           boolean,
  reason            text,
  last_scheduled_at timestamptz,
  schedule_count    integer
)
language plpgsql
security definer
as $$
declare
  v_email  text        := lower(trim(p_email));
  v_row    risk_assessment_nurture_schedule%rowtype;
  v_cutoff timestamptz := now() - interval '30 days';
begin
  -- Lock the row if it exists, preventing concurrent decisions for the same email
  select * into v_row
  from risk_assessment_nurture_schedule
  where email = v_email
  for update;

  if not found then
    -- First submission for this email — insert and allow scheduling
    begin
      insert into risk_assessment_nurture_schedule (email, last_machine_type)
      values (v_email, p_machine_type);

      return query select true, 'first_schedule'::text, now(), 1;
      return;

    exception when unique_violation then
      -- Extremely rare concurrent insert won the race; treat as deduped
      select * into v_row
      from risk_assessment_nurture_schedule
      where email = v_email;

      return query select false, 'concurrent_dedup'::text, v_row.last_scheduled_at, v_row.schedule_count;
      return;
    end;
  end if;

  if v_row.last_scheduled_at >= v_cutoff then
    -- Already scheduled within the 30-day window; skip
    return query select false, 'within_dedup_window'::text, v_row.last_scheduled_at, v_row.schedule_count;
    return;
  end if;

  -- Window has expired — reset and allow scheduling again
  update risk_assessment_nurture_schedule
  set
    last_scheduled_at = now(),
    last_machine_type = p_machine_type,
    schedule_count    = v_row.schedule_count + 1,
    updated_at        = now()
  where email = v_email;

  return query select true, 'window_expired'::text, now(), v_row.schedule_count + 1;
end;
$$;
