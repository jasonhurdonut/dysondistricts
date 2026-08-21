import Image from "next/image";
import Link from "next/link";
import { getHouses } from "@/lib/data";
import { TypicalWeek } from "@/components/TypicalWeek";
import { TYPE_STYLES } from "@/lib/event-types";
import {
  BulbIcon,
  HandshakeIcon,
  MountainIcon,
  PeopleIcon,
  TrophyIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    n: 1,
    title: "Find Your District",
    body: "Enter your Cornell NetID to discover your district.",
    href: "/my-district",
    cta: "Look up your NetID",
  },
  {
    n: 2,
    title: "Join the Fun",
    body: "Participate in weekly challenges, events, and activities with your district.",
    href: "/schedule",
    cta: "See what's coming up",
  },
  {
    n: 3,
    title: "Earn Points",
    body: "Every showing counts. Climb the leaderboard and compete for the Dyson Cup.",
    href: "#points",
    cta: "How points work",
  },
];

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
    body: "Just spend time together. Casual, district-specific hangouts to eat, relax, and get to know each other.",
    examples: ["Grab a meal together", "Low-key district hangouts", "Coffee and conversation"],
    cap: "Up to 100 pts",
  },
  {
    title: "Trivia",
    color: TYPE_STYLES.trivia.color,
    tint: TYPE_STYLES.trivia.tint,
    icon: BulbIcon,
    body: "Test your knowledge and think fast under pressure.",
    examples: ["District trivia nights", "Themed quiz rounds", "Knowledge challenges"],
    cap: "Up to 100 pts",
  },
  {
    title: "Collaboration",
    color: TYPE_STYLES.collaboration.color,
    tint: TYPE_STYLES.collaboration.tint,
    icon: HandshakeIcon,
    body: "Build connections and show district pride through events and activities.",
    examples: ["Attend district events", "Bring a friend", "District spirit activities"],
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

export default async function HomePage() {
  const houses = await getHouses();

  return (
    <div className="relative overflow-hidden">
      {/* Dyson Games crest (desktop, full opacity) */}
      <div className="pointer-events-none absolute right-[250px] top-[30px] w-[320px] h-[340px] select-none hidden md:block">
        <Image src="/crests/dyson-games.png" alt="" fill className="object-contain" />
      </div>

      <div className="mx-auto max-w-6xl px-5 relative">
        <section className="pt-8 pb-20 md:pt-20 md:pb-12">
          <h1 className="font-display font-semibold tracking-tight leading-[0.97] text-6xl md:text-7xl mt-4 max-w-3xl rise rise-2">
            Welcome to Dyson Districts!
          </h1>
          {/* Mobile-only crest beneath the heading */}
          <div className="md:hidden relative w-64 h-64 mt-10 mx-auto rise rise-3">
            <Image
              src="/crests/dyson-games.png"
              alt="Dyson Games crest"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-10 md:mt-6 max-w-xl text-ink-soft rise rise-3">
            A yearlong bonding opportunity for Dyson freshmen and upperclassmen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 rise rise-4">
            <Link
              href="/my-district"
              className="smallcaps text-xs bg-ink text-paper px-7 py-3.5 hover:bg-ink-soft transition-colors"
            >
              Find my district
            </Link>
            <Link
              href="/leaderboard"
              className="smallcaps text-xs border border-line-strong px-7 py-3.5 hover:bg-ink hover:text-paper transition-colors"
            >
              View the standings
            </Link>
          </div>
        </section>

        <section className="py-12 border-t border-line-strong">
          <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight">
            How Dyson Districts works
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <Link
                key={step.n}
                href={step.href}
                className={`group ledger-frame bg-card px-6 py-6 flex flex-col rise rise-${i + 1} hover:-translate-y-1 transition-transform`}
              >
                <span className="font-display font-semibold text-5xl text-[#B81820]">
                  {step.n}
                </span>
                <h3 className="font-display font-semibold text-2xl mt-3">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-soft mt-2 flex-1">{step.body}</p>
                <span className="smallcaps text-[10px] mt-5 border-b border-line-strong self-start pb-1 group-hover:text-crimson group-hover:border-crimson transition-colors">
                  {step.cta} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-line">
          <div className="flex items-baseline justify-between flex-wrap gap-3">
            <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight">
              A typical month
            </h2>
            <Link href="/schedule" className="smallcaps text-[10px] text-ink-soft hover:text-ink">
              Full schedule →
            </Link>
          </div>
          <div className="mt-10">
            <TypicalWeek />
          </div>
        </section>

        <section className="py-12 border-t border-line">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
            {houses.map((house, i) => (
              <Link
                key={house.id}
                href="/my-district"
                className={`group flex flex-col items-center gap-3 rise rise-${i + 1}`}
              >
                <div className="relative w-16 h-20 md:w-20 md:h-24 transition-transform duration-300 group-hover:-translate-y-1.5">
                  <Image
                    src={house.crest_url}
                    alt={`${house.name} crest`}
                    fill
                    sizes="80px"
                    className="object-contain drop-shadow-[0_6px_10px_rgba(34,29,21,0.25)]"
                  />
                </div>
                <span
                  className="smallcaps text-[9px] border-b-2 pb-1"
                  style={{ borderColor: house.color }}
                >
                  {house.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="points" className="py-12 border-t border-line-strong">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-end">
            <div>
              <p className="smallcaps text-xs text-ink-soft">The rules of the game</p>
              <h2 className="font-display font-semibold tracking-tight text-3xl md:text-4xl mt-2">
                How Points Work
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft text-sm">
                Earn points all semester long by participating in challenges,
                building connections, and sharing your knowledge. Every point
                brings your district closer to the Dyson Cup.
              </p>
            </div>
            <div className="ledger-frame bg-card px-6 py-5">
              <div className="flex items-center gap-3">
                <TrophyIcon className="w-7 h-7 text-gold" />
                <p className="font-display font-semibold text-2xl">The Dyson Cup</p>
              </div>
              <p className="text-sm text-ink-soft mt-2">
                At the end of the semester, the district with the most points earns
                the Dyson Cup — and district glory until the next class arrives.
              </p>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WAYS.map((way) => (
              <article key={way.title} className="ledger-frame bg-card px-6 py-6 flex flex-col">
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

        <section className="py-12 border-t border-line">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
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
          </div>
        </section>

        <section className="mb-8 px-6 py-8 md:px-10 bg-ink text-paper flex flex-wrap items-center justify-between gap-5">
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
    </div>
  );
}
