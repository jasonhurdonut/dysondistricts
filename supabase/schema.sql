-- Dyson Districts — v1 schema
-- Run this once in the Supabase SQL editor (or via psql).

create table if not exists houses (
  id          serial primary key,
  name        text unique not null,
  slug        text unique not null,
  color       text not null,
  crest_url   text not null,
  groupme_url text,
  leaders     text[] default '{}'
);

create table if not exists students (
  id       uuid primary key default gen_random_uuid(),
  name     text not null,
  netid    text unique not null,
  house_id int not null references houses(id)
);

create table if not exists events (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  description      text,
  date             timestamptz not null,
  location         text,
  points_available int,
  type             text not null check (type in ('challenge','bonding','trivia','collaboration'))
);

create table if not exists point_awards (
  id         uuid primary key default gen_random_uuid(),
  house_id   int not null references houses(id),
  event_id   uuid references events(id) on delete set null,
  points     int not null,
  awarded_by text not null,
  note       text,
  created_at timestamptz not null default now()
);

-- Row-level security: public may read houses/events/awards (leaderboard + schedule).
-- Students are NOT publicly readable — NetID lookup goes through the server only.
-- All writes go through the app server with the service-role key (bypasses RLS).
alter table houses       enable row level security;
alter table students     enable row level security;
alter table events       enable row level security;
alter table point_awards enable row level security;

drop policy if exists "public read houses" on houses;
create policy "public read houses" on houses for select using (true);
drop policy if exists "public read events" on events;
create policy "public read events" on events for select using (true);
drop policy if exists "public read awards" on point_awards;
create policy "public read awards" on point_awards for select using (true);

-- Seed the six houses (idempotent).
insert into houses (name, slug, color, crest_url) values
  ('Triphammer',  'triphammer',  '#8B5CA5', '/crests/triphammer.png'),
  ('Lucifer',     'lucifer',     '#BE4B44', '/crests/lucifer.png'),
  ('Rocky',       'rocky',       '#8E8E8E', '/crests/rocky.png'),
  ('Cascadilla',  'cascadilla',  '#2E8F3E', '/crests/cascadilla.png'),
  ('Taughannock', 'taughannock', '#5E7FC4', '/crests/taughannock.png'),
  ('Buttermilk',  'buttermilk',  '#DFA733', '/crests/buttermilk.png')
on conflict (name) do nothing;
