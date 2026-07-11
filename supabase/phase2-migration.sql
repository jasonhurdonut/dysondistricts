-- Phase 2 schema deltas (see docs/PHASE-2.md §6). Idempotent.

-- Houses: enrich for My House + Meet the Houses
alter table houses add column if not exists tagline     text;
alter table houses add column if not exists description text;
alter table houses add column if not exists groupme_url text; -- existed in v1; kept for doc parity

-- House leaders (for My House)
create table if not exists house_leaders (
  id        bigint generated always as identity primary key,
  house_id  int not null references houses(id),
  name      text not null,
  role      text,          -- e.g. "House President", "Vice President"
  email     text,
  photo_url text
);
alter table house_leaders enable row level security;
drop policy if exists "public read house_leaders" on house_leaders;
create policy "public read house_leaders" on house_leaders for select using (true);

-- Events: enrich for detail pages
alter table events add column if not exists end_time       time;
alter table events add column if not exists image_url      text;
alter table events add column if not exists what_to_bring  text;
alter table events add column if not exists who_can_attend text;
