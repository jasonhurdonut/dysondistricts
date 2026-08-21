-- Dyson Districts — canonical house seed (SOURCE OF TRUTH for house canon).
-- Names, colors, symbols, and taglines are locked here; mockups drift — this wins.
-- Idempotent: safe to re-run.

insert into houses (name, slug, color, crest_url, tagline, description) values
  ('Triphammer',  'triphammer',  '#A84860', '/crests/triphammer.png',
   'Bold leaders who build momentum and inspire action.',
   'Named for Triphammer Falls, Triphammer is the district of drive. Expect them first in line at every challenge drop and loudest at the leaderboard reveal.'),
  ('Lucifer',     'lucifer',     '#CC5424', '/crests/lucifer.png',
   'Passionate and fearless, lighting the way for others.',
   'Named for Lucifer Falls at Treman, Lucifer burns bright. A district that turns up in force, competes with heart, and never leaves a teammate behind.'),
  ('Rocky',       'rocky',       '#E4A884', '/crests/rocky.png',
   'Steady and resilient, standing strong through every challenge.',
   'Named for Rocky Falls, Rocky is the bedrock district — consistent, dependable, and impossible to rattle when the semester gets loud.'),
  ('Cascadilla',  'cascadilla',  '#6C8478', '/crests/cascadilla.png',
   'Grounded and growing, cultivating community and balance.',
   'Named for Cascadilla Gorge, Cascadilla grows on connection. The district most likely to bring a friend, start a tradition, and make Dyson feel small in the best way.'),
  ('Taughannock', 'taughannock', '#546090', '/crests/taughannock.png',
   'Adaptable and thoughtful, flowing with purpose and creativity.',
   'Named for Taughannock Falls — taller than Niagara — Taughannock takes the creative line through every problem and makes it look easy.'),
  ('Buttermilk',  'buttermilk',  '#E4A860', '/crests/buttermilk.png',
   'Reliable and uplifting, nourishing success together.',
   'Named for Buttermilk Falls, Buttermilk is the district that feeds the whole program — steady points, warm welcomes, and the best team spirit in Dyson.')
on conflict (name) do update set
  slug = excluded.slug,
  color = excluded.color,
  crest_url = excluded.crest_url,
  tagline = excluded.tagline,
  description = excluded.description;
