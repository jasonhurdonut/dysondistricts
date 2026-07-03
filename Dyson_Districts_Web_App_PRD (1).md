# Dyson Districts — Web App PRD (v1)

**Owner:** Dyson Undergraduate Council
**Status:** Draft for build
**Scope:** Minimal v1 — roster, leaderboard, schedule

---

## 1. Problem & Framing

Dyson Districts already runs its *social* layer on tools students use: **Instagram** for challenge posts and submissions, **GroupMe** for house communication. Those tools are good at conversation but bad at being authoritative — they can't reliably answer "what house am I in?", "what's the actual score?", or "what's happening this week?"

The web app fills exactly that gap. It is the **single source of truth** for the roster, the standings, and the schedule. It does *not* try to replace Instagram or GroupMe.

If a feature could live in a group chat or an IG post, it stays there. If it needs to be authoritative, auditable, or persistent, it goes in the app.

## 2. Goals & Non-Goals

**Goals (v1)**
- Any freshman can find their house in under 10 seconds, with no account.
- One live leaderboard everyone trusts as the official score.
- One schedule everyone checks for upcoming challenges and events.
- Admins run the whole program from a simple panel — no spreadsheets passed around.

**Non-Goals (v1)**
- No in-app challenge submissions (stays on Instagram).
- No house communication or chat (stays on GroupMe).
- No automatic house sorting — houses are pre-assigned by admins.
- No Cornell NetID single sign-on / authenticated login (the NetID is a lookup key only, not verified).
- No per-student participation grading engine (deferred to v2).

## 3. Users & Roles

| Role | Who | What they do in v1 |
|---|---|---|
| **Student** | Dyson freshmen | Look up their house; view leaderboard; view schedule. Read-only, no login. |
| **Admin** | DUC organizers | Upload roster, create/edit events, award points. Behind a shared passcode. |

House Leaders are *not* a separate app role in v1 — they operate through GroupMe and the public views like everyone else. (Leader write-access is a v2 consideration.)

## 4. v1 Scope — The Three Core Features

### 4.1 Find My House
- Public page: student enters their Cornell NetID.
- App matches it against the admin-uploaded roster and returns:
  - House name, color, and crest
  - (Optional) house leaders and a link to the house GroupMe
- No account creation, no password. If the NetID isn't found, show a friendly "not on the roster yet — contact your orientation lead" message.

### 4.2 Live Leaderboard
- Six houses ranked by total points: Triphammer, Lucifer, Rocky, Cascadilla, Taughannock, Buttermilk.
- **Points are derived, never stored as a single editable number.** A house's total = the sum of all its point awards. This keeps every point auditable (who awarded it, for what, when) — essential when houses contest scores.
- Each row shows rank, crest, house name, and total.
- Nice-to-have: a short recent-activity feed (e.g. "Lucifer +50 — Trivia Night").

### 4.3 Schedule of Events
- A list (and/or simple calendar) of upcoming and past events.
- Each event shows: title, date, location, description, points available, and type (challenge / bonding / trivia / collaboration).
- Admins create and edit events here; awarding points ties back to a specific event.

## 5. Admin Panel

The engine behind the three public views. Gated by a single shared admin passcode.

- **Roster management:** upload a CSV (`name, netid, house`) to populate students and assign houses. Re-upload to update.
- **Event management:** create, edit, and delete events.
- **Award points:** pick a house + an event + a point value + an optional note. Every award is timestamped and attributed to the admin account.

## 6. Data Model

Five tables; the leaderboard is computed, not stored.

**students**
- `id`, `name`, `netid`, `house_id`, *(optional)* `participation_flags`

**houses**
- `id`, `name`, `color`, `crest_url`

**events**
- `id`, `title`, `description`, `date`, `location`, `points_available`, `type`

**point_awards**
- `id`, `house_id`, `event_id`, `points`, `awarded_by`, `timestamp`, `note`

**(v2) participation**
- per-student records feeding the A/B/C/D grade engine

> Leaderboard total for a house = `SUM(point_awards.points WHERE house_id = X)`.

## 7. Key Flows

1. **Onboarding (admin):** export the orientation roster with houses already assigned → upload CSV → houses populated.
2. **Student lookup:** open link → enter NetID → see house, crest, and (optional) GroupMe link.
3. **Weekly cycle (admin):** create the week's event(s) → after results come in, award points per house → leaderboard updates instantly for everyone.

## 8. Tech Approach (keep it basic)

- **Frontend:** React (single-page app).
- **Backend / DB:** a hosted service like **Supabase** (Postgres) or **Firebase** — gives you the database, CSV-friendly imports, and hosting without standing up a server.
- **Access control:** public read for leaderboard + schedule; NetID lookup is a simple query against `students`; admin panel behind one shared passcode.
- **Maintainability:** chosen so it survives leadership handoff each year (a live companion to the Districts Binder).

## 9. Success Metrics (v1)

- A majority of freshmen successfully use "Find My House."
- The app leaderboard — not an Instagram graphic — becomes the score students reference.
- Admins run a full week of programming through the app without falling back to spreadsheets.

## 10. Open Questions

- **Roster privacy:** should anyone be able to browse who's in each house, or only look up their *own*? (Recommend: own-lookup only in v1.)
- **GroupMe links:** store per-house links in the app, or keep them in IG/email?
- **House leaders:** confirm they have no write access in v1.
- **Admin passcode:** one shared code, or a short list of named admin logins for accountability on point awards?

## 11. Future (v2+)

- In-app challenge submissions (replacing IG forms)
- Participation → A/B/C/D → points scoring engine (from the *Measuring Success* slide)
- Per-student "my house" dashboard
- End-of-semester survey hook (the 85% meaningful-connections target)
- Cornell NetID auth
