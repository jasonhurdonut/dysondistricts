# Dyson Districts — Web App

The single source of truth for the Dyson Districts games: roster,
leaderboard, and schedule. Built for the Dyson Undergraduate Council.
See [the PRD](<Dyson_Districts_Web_App_PRD (1).md>) for scope.

## Pages

| Route | What it is |
|---|---|
| `/` | **Home** — how it works, a typical week, and the social banner (IG/GroupMe for social, app for truth). |
| `/my-district` | **Find My District** — students enter a NetID, get their district, crest, tagline, leaders, and GroupMe link. Own-lookup only; the roster is never browsable. |
| `/districts` | **Meet the Six Districts** — crest, color, personality, and leaders per district. |
| `/points` | **How Points Work** — the Dyson Cup, point categories, and FAQ. |
| `/leaderboard` | **Standings** — six districts ranked by the sum of point awards, plus "The Ledger" recent-activity feed. Totals are always derived, never edited. |
| `/schedule` | **Schedule** — filterable by category (challenge/bonding/trivia/collaboration); each event links to a detail page with calendar export (.ics + Google). |
| `/admin` | **Admin panel** — passcode-gated. Roster CSV upload, event create/edit/delete (incl. detail-page extras), and point awards (district + event + points + note, stamped with your name and timestamp). |

## Running locally

```bash
npm install
npm run dev   # http://localhost:3000
```

With no Supabase keys set, the app runs in **demo mode**: all pages work with
sample data, and admin writes are disabled.

## Going live (Supabase)

1. In the Supabase dashboard, open the **SQL editor** and run, in order:
   [`supabase/schema.sql`](supabase/schema.sql) (v1 tables, RLS, six districts),
   [`supabase/phase2-migration.sql`](supabase/phase2-migration.sql) (district/event
   enrichment + the `house_leaders` table), and
   [`dyson_districts_seed.sql`](dyson_districts_seed.sql) (canonical district
   taglines and descriptions).
2. In **Settings → API**, copy the project URL and the `service_role` key
   into `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ADMIN_PASSCODE=pick-something-good
   ```

3. Restart the dev server. The demo banner disappears and the admin panel
   goes live.
4. Log in at `/admin` (enter your name so awards are attributed to you) and
   upload the roster CSV — columns `name, netid, district`
   ([sample](sample-roster.csv)). Re-uploading replaces the whole roster.

The service-role key is only ever used server-side (API routes and server
components); it is never shipped to the browser. Students table has no public
read policy, so NetID lookups can't be used to browse the roster even with
the anon key.

## Data model

`houses`, `students`, `events`, `point_awards` — a district's score is
`SUM(point_awards.points)` for that district, computed on every page load, so
every point stays auditable (who, what event, when, why).
