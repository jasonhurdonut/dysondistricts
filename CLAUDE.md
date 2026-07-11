# Dyson Districts — durable rules

App: Next.js (App Router) + Tailwind 4 + Supabase, for the Dyson Undergraduate
Council district games. Docs live in `/docs` (v1 PRD is frozen; current roadmap is
`docs/PHASE-2.md`; design references in `docs/mockups/`).

## Single source of truth
The app is the authoritative record for roster, scores, and schedule. Social
stays on Instagram/GroupMe — if a feature could live in a group chat, it does
not belong here. Leaderboard totals are always derived from `point_awards`,
never stored or hand-edited.

## District canon
District names, colors, symbols, and taglines are locked to
`dyson_districts_seed.sql`. AI mockups drift on district identity (colors,
symbols) — when a mockup and the seed disagree, the seed wins.

**Terminology:** the user-facing unit is a "district" (renamed from "house").
The data model deliberately keeps the old names — the `houses` table,
`house_id`, `house_leaders`, and the `House` TypeScript types are unchanged.
Only visible copy, routes (`/districts`, `/my-district`), and the roster CSV
column hint say "district". Do not rename the schema.

## Design principle
Mockup-informed, not mockup-cloned. Serif display type (Fraunces) for headings
with Inter for UI/labels, district and per-category color used with intent, on a
clean white base. Small labels are title-case (not all-caps). Category colors:
challenge green, trivia purple, bonding red, collaboration blue.

## Secrets
No plaintext secrets in the repo — Supabase keys and `ADMIN_PASSCODE` live in
`.env.local` (git-ignored) locally and in Vercel env vars in production. The
`SUPABASE_SERVICE_ROLE_KEY` is server-side only; never expose it via
`NEXT_PUBLIC_*` or client code. Students table has no public read policy —
NetID lookup is own-lookup only through the server.

## Architecture decisions
District-level points with no-login NetID lookup (v1 §1 fork, reaffirmed in
Phase 2). Per-student accounts/scoring is deferred unless individual
competition becomes a core goal.
