# Dyson Districts — Phase 2 Roadmap (QOL & Polish)

**Status:** Proposed. Additive to shipped v1.
**Relationship to v1:** The v1 PRD (`Dyson_Districts_Web_App_PRD.md`) stays frozen as the record of what shipped. This doc is the next batch of work. Where a feature here changes something the PRD specified (mainly the data model), the change is noted in the "Schema deltas" section; leave a one-line pointer in the PRD rather than rewriting it.

---

## 0. Design principle (read first)

**Mockup-informed, not mockup-cloned.** The mockups are the aspiration for *warmth and polish*, not a spec to copy pixel-for-pixel. The clean v1 base is good bones; what makes it feel bland is the absence of three things the mockups have:

1. A distinctive **display typeface** for headings (serif, per the mockups).
2. **Color used with intent** — house colors and per-category colors, not just red accents.
3. A **texture / imagery layer** — the faded crest watermark (mockup 7), the campus photo hero (mockup 6).

Pull those three moves onto the existing base. Do not re-theme wholesale.

> Recommend codifying this principle (plus the rules below) in a root `CLAUDE.md` so every session inherits it.

---

## Mockups (design reference)

Claude Code should pull visual inspiration from these files. The numbered references throughout this doc ("mockup 7") resolve here. The uploaded filenames are opaque — renaming to the suggested names and placing them in `/docs/mockups/` makes the references self-explanatory to any future session.

| Ref | Screen | Uploaded file | Suggested name |
|---|---|---|---|
| mockup 1 | Home landing (how-it-works, typical week, social banner) | `ChatGPT_Image_Jul_3__2026__01_35_36_AM__2_.png` | `01-home.png` |
| mockup 2 | Meet the Six Houses | `ChatGPT_Image_Jul_3__2026__01_35_36_AM__3_.png` | `02-houses.png` |
| mockup 3 | How Points Work / Dyson Cup / FAQ | `ChatGPT_Image_Jul_3__2026__01_35_37_AM__4_.png` | `03-points.png` |
| mockup 4 | My House (hero variant) | `ChatGPT_Image_Jul_3__2026__01_35_37_AM__5_.png` | `04-my-house-hero.png` |
| mockup 5 | My House (dashboard variant) | `ChatGPT_Image_Jul_3__2026__01_35_37_AM__6_.png` | `05-my-house-dashboard.png` |
| mockup 6 | Leaderboard | `ChatGPT_Image_Jul_3__2026__01_35_37_AM__7_.png` | `06-leaderboard.png` |
| mockup 7 | Schedule | `ChatGPT_Image_Jul_3__2026__01_35_37_AM__8_.png` | `07-schedule.png` |
| mockup 8 | Event detail | `ChatGPT_Image_Jul_3__2026__01_35_37_AM__9_.png` | `08-event-detail.png` |

> Where the mockups and the seed file disagree on house canon (colors/symbols), follow the seed file (§1).

---

## 1. The fork to decide first: house-level vs. per-student points

Several mockups (the "My House" screens with a logged-in Jordan Lee '28, and activity rows like "Ava Chen +50 pts") quietly assume **real user accounts and per-student scoring**. v1 is deliberately **house-level with a no-login NetID lookup**.

| | House-level (recommended) | Per-student |
|---|---|---|
| Auth | None (NetID lookup) | Real accounts / login required |
| Points | Awarded to houses | Tracked per individual |
| Admin burden | Low | High (award per person) |
| Build cost | Low | Large (auth, profiles, new data model) |
| Fit | Matches "house competition" spirit | Individual competition |

**Recommendation:** stay house-level. Render the "recent activity" feeds as *house* activity, not individual. Only pursue per-student (Tier C) if individual competition becomes a core goal.

**House canon:** lock house names, colors, and symbols to the seed file (`dyson_districts_seed.sql`) as the source of truth. The AI-generated mockups drift (e.g., Lucifer appears red-with-candle in one and purple-with-trident in another) — ignore the drift and follow the seed.

---

## 2. Tier A — High polish, no backend change (recommended)

All pure frontend/content. Highest value per unit effort.

- **Home landing content** — the how-it-works 3-step, "A Typical Week" (Mon challenge drop / all-week participate / Fri leaderboard reveal), and the social banner reinforcing "we're social on IG + GroupMe, but the app is the single source of truth."
- **Meet the Six Houses** — house cards with crest, color, and one-line personality (descriptions below).
- **How Points Work + FAQ accordion** — static explainer of the Dyson Cup and point categories.
- **Leaderboard "Recent Activity" feed** — near-free. The data already exists in `point_awards` (house, event, points, awarded_by, created_at). Just query and render. Ship this early.
- **Calendar export** — "Add to Calendar" generates an `.ics` download and a Google Calendar link, entirely client-side. No backend.
- **Schedule redesign** — see §5.

House personalities (from mockup 2; store as `houses.tagline` or hardcode):
- Triphammer — Bold leaders who build momentum and inspire action.
- Lucifer — Passionate and fearless, lighting the way for others.
- Rocky — Steady and resilient, standing strong through every challenge.
- Cascadilla — Grounded and growing, cultivating community and balance.
- Taughannock — Adaptable and thoughtful, flowing with purpose and creativity.
- Buttermilk — Reliable and uplifting, nourishing success together.

---

## 3. Tier B — Small schema additions (recommended, adds depth)

- **My House enrichment** (the "it's bare" fix). Adds house leaders, a GroupMe join link, and house description/traditions to the My House page.
  - New: `houses.groupme_url`, `houses.tagline`, `houses.description`
  - New table `house_leaders`: `id`, `house_id`, `name`, `role`, `email`, `photo_url`
- **Event detail pages** (mockup 8). Richer per-event content.
  - New: `events.end_time`, `events.image_url`, `events.what_to_bring`, `events.who_can_attend`
  - Tradeoff: more data entry per event for admins. Optional fields with sensible fallbacks.

---

## 4. Tier C — Architecture fork (defer unless core)

Per-student accounts, individual profiles, and per-person scoring (the logged-in mockups). Large lift: real auth, a student-level points model, profile management, and a permanent per-person admin burden. **Defer** unless individual competition is decided to be a core goal (see §1).

---

## 5. Schedule redesign spec (bounded)

Keep the current structure and base styling. Layer on, from mockup 7:

1. **Category color + icon system** applied to the event's icon, category label, and a left accent bar:
   - Challenge → green
   - Trivia → purple
   - Bonding → red
   - Collaboration → blue
2. **Filter chips**: All / Challenge / Bonding / Trivia / Collaboration. Filters on the existing `events.type` field.
3. **Row layout**: left date block (month / day / weekday) → tinted category icon → colored uppercase category label → serif display title → meta row (location pin + time clock) → short description → large points figure on the right.
4. **Closing CTA banner**: "Every event. Every point. Every house counts." → View Leaderboard.
5. *(If Tier B ships)* rows link to event detail pages.

This is a targeted reformat, not an overhaul. Do not restyle the rest of the app to match.

---

## 6. Consolidated schema deltas

Only Tier B touches the schema. Nothing in Tier A does.

```sql
-- Houses: enrich for My House + Meet the Houses
alter table houses add column tagline     text;
alter table houses add column description text;
alter table houses add column groupme_url text;

-- House leaders (for My House)
create table house_leaders (
  id        bigint generated always as identity primary key,
  house_id  int not null references houses(id),
  name      text not null,
  role      text,          -- e.g. "House President", "Vice President"
  email     text,
  photo_url text
);
alter table house_leaders enable row level security;
create policy "public read house_leaders" on house_leaders for select using (true);

-- Events: enrich for detail pages
alter table events add column end_time      time;
alter table events add column image_url     text;
alter table events add column what_to_bring text;
alter table events add column who_can_attend text;
```

---

## 7. Suggested build order

1. Leaderboard recent-activity feed (Tier A, near-free, uses existing data)
2. Schedule redesign (Tier A, the requested fix)
3. Home landing + Meet the Houses + How Points Work/FAQ (Tier A content)
4. Calendar export (Tier A, client-side)
5. My House enrichment (Tier B, first schema delta)
6. Event detail pages (Tier B)
7. *(Only if chosen)* Tier C per-student system

---

## 8. Repo docs structure

```
/docs
  Dyson_Districts_Web_App_PRD.md   <- v1, frozen
  PHASE-2.md                        <- this file
  /mockups                          <- the 8 reference PNGs (renamed per table above)
CLAUDE.md                           <- durable rules: SSOT framing, no plaintext
                                       secrets, houses locked to seed, design principle
dyson_districts_seed.sql            <- source of truth for houses/data
```
