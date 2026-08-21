import Link from "next/link";
import { getEvents } from "@/lib/data";
import { ScheduleList } from "@/components/ScheduleList";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const events = await getEvents();

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 relative">
        <section className="pt-12 pb-8">
          <p className="smallcaps text-xs text-ink-soft rise rise-1">
            Challenges · Bonding · Trivia · Collaboration
          </p>
          <h1 className="font-display font-semibold tracking-tight text-5xl md:text-6xl mt-2 rise rise-2">
            Schedule
          </h1>
          <p className="mt-4 max-w-md text-ink-soft text-sm rise rise-3">
            Explore upcoming events, earn points for your district, and help your
            district take home the Dyson Cup.
          </p>
        </section>

        <ScheduleList events={events} />

        <section className="mt-12 mb-4 ledger-frame bg-card px-6 py-6 md:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-xl md:text-2xl">
              Every event. Every point. Every district counts.
            </p>
            <p className="text-sm text-ink-soft mt-1">
              Check back often — new events are added throughout the semester.
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="smallcaps text-xs bg-ink text-paper px-6 py-3 hover:bg-ink-soft transition-colors"
          >
            View leaderboard →
          </Link>
        </section>
      </div>
    </div>
  );
}
