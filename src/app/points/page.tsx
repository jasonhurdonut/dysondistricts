import Link from "next/link";
import { TYPE_STYLES } from "@/lib/event-types";
import {
  BulbIcon,
  MountainIcon,
  PeopleIcon,
  TrophyIcon,
} from "@/components/icons";

const WAYS = [
  {
    title: "Challenges",
    color: TYPE_STYLES.challenge.color,
    tint: TYPE_STYLES.challenge.tint,
    icon: MountainIcon,
    body: "Complete district challenges that inspire, test, and bring out your best.",
    examples: ["Monthly district challenges", "Skill or creativity tasks", "Service and impact projects"],
    cap: "Up to 150 pts",
  },
  {
    title: "Bonding",
    color: TYPE_STYLES.bonding.color,
    tint: TYPE_STYLES.bonding.tint,
    icon: PeopleIcon,
    body: "Build connections and show district pride through events and activities.",
    examples: ["Attend district events", "Bring a friend", "District spirit activities"],
    cap: "Up to 100 pts",
  },
  {
    title: "Trivia & Collaboration",
    color: TYPE_STYLES.trivia.color,
    tint: TYPE_STYLES.trivia.tint,
    icon: BulbIcon,
    body: "Test your knowledge and team up to solve, think, and win.",
    examples: ["District trivia", "Collaborative puzzles", "Knowledge challenges"],
    cap: "Up to 100 pts",
  },
];

const FAQ = [
  {
    q: "What is Dyson Districts?",
    a: "A semester-long district competition for Dyson freshmen, run by the Dyson Undergraduate Council. Every student is assigned to one of six districts named after Ithaca waterfalls, and districts earn points through challenges, events, trivia, and collaborations.",
  },
  {
    q: "How do I find my district?",
    a: "Go to My District and enter your Cornell NetID — no account or password needed. If you're not on the roster yet, contact your orientation lead.",
  },
  {
    q: "How are points awarded?",
    a: "DUC admins award points to districts after each event, and every award is timestamped, attributed, and tied to a specific event. The leaderboard total is the sum of those awards — nothing is hand-edited, so the score is always auditable.",
  },
  {
    q: "Where do I submit challenges?",
    a: "On Instagram — challenge posts and submissions live there, and district chatter lives on GroupMe. The app is where the official scores, roster, and schedule live.",
  },
  {
    q: "Can I switch districts?",
    a: "Districts are pre-assigned to keep the competition balanced. If your roster entry looks wrong, talk to your orientation lead and admins can fix the roster.",
  },
];

export default function PointsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-12 pb-10 border-b border-line-strong grid lg:grid-cols-[1fr_360px] gap-8 items-end">
        <div>
          <p className="smallcaps text-xs text-ink-soft rise rise-1">
            The rules of the game
          </p>
          <h1 className="font-display font-semibold tracking-tight text-5xl md:text-6xl mt-2 rise rise-2">
            How Points Work
          </h1>
          <p className="mt-4 max-w-xl text-ink-soft text-sm rise rise-3">
            Earn points all semester long by participating in challenges,
            building connections, and sharing your knowledge. Every point
            brings your district closer to the Dyson Cup.
          </p>
        </div>
        <div className="ledger-frame bg-card px-6 py-5 rise rise-4">
          <div className="flex items-center gap-3">
            <TrophyIcon className="w-7 h-7 text-gold" />
            <p className="font-display font-semibold text-2xl">The Dyson Cup</p>
          </div>
          <p className="text-sm text-ink-soft mt-2">
            At the end of the semester, the district with the most points earns
            the Dyson Cup — and district glory until the next class arrives.
          </p>
        </div>
      </section>

      <section className="pt-10">
        <h2 className="smallcaps text-xs text-ink-soft mb-6">Ways to earn points</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {WAYS.map((way, i) => (
            <article key={way.title} className={`ledger-frame bg-card px-6 py-6 flex flex-col rise rise-${i + 1}`}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: way.tint, color: way.color }}
              >
                <way.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-2xl mt-4" style={{ color: way.color }}>
                {way.title}
              </h3>
              <p className="text-sm text-ink-soft mt-2">{way.body}</p>
              <ul className="mt-4 text-xs text-ink-soft space-y-1.5 flex-1">
                {way.examples.map((ex) => (
                  <li key={ex} className="flex gap-2">
                    <span style={{ color: way.color }}>•</span>
                    {ex}
                  </li>
                ))}
              </ul>
              <span
                className="smallcaps text-[9px] mt-5 self-start px-3 py-1.5 border"
                style={{ color: way.color, borderColor: way.color }}
              >
                {way.cap}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-12 grid lg:grid-cols-[280px_1fr] gap-8">
        <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="border-t border-line-strong">
          {FAQ.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="cursor-pointer list-none py-4 flex items-center justify-between gap-4 font-display font-semibold text-lg hover:text-crimson transition-colors">
                {item.q}
                <span className="text-ink-faint text-2xl font-normal leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-sm text-ink-soft pb-5 max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 mb-4 px-6 py-8 md:px-10 bg-ink text-paper flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="font-display font-semibold text-2xl md:text-3xl">
            See where your district stands.
          </p>
          <p className="text-sm opacity-70 mt-1">
            Check the leaderboard and upcoming events.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/leaderboard"
            className="smallcaps text-xs bg-paper text-ink px-6 py-3 hover:opacity-90 transition-opacity"
          >
            View leaderboard
          </Link>
          <Link
            href="/schedule"
            className="smallcaps text-xs border border-paper px-6 py-3 hover:bg-paper hover:text-ink transition-colors"
          >
            View schedule
          </Link>
        </div>
      </section>
    </div>
  );
}
