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
          <h1 className="font-display font-semibold tracking-tight text-5xl md:text-6xl mt-2 rise rise-2">
            Schedule
          </h1>
          <p className="mt-4 max-w-md text-ink-soft text-sm rise rise-3">
            Explore upcoming events, earn points for your district, and help your
            district take home the Dyson Cup.
          </p>
        </section>

        <ScheduleList events={events} />

        <section className="mt-12 mb-8 px-6 py-8 md:px-10 bg-ink text-paper flex flex-wrap items-center justify-between gap-5">
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
