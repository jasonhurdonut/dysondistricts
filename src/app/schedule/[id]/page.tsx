import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/data";
import { eventTimes } from "@/lib/calendar";
import { TYPE_STYLES } from "@/lib/event-types";
import { AddToCalendar } from "@/components/AddToCalendar";
import {
  CalendarIcon,
  ClockIcon,
  EventTypeIcon,
  PeopleIcon,
  PinIcon,
  TrophyIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

function fmtTimeRange(event: Parameters<typeof eventTimes>[0]): string {
  const { start, end } = eventTimes(event);
  const fmt = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return event.end_time ? `${fmt(start)} – ${fmt(end)}` : fmt(start);
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();

  const style = TYPE_STYLES[event.type];
  const d = new Date(event.date);
  const dateLabel = d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeLabel = fmtTimeRange(event);

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero band (mockup 8) */}
      <section className="relative mt-8 bg-ink text-paper overflow-hidden rise rise-1">
        {event.image_url && (
          <Image
            src={event.image_url}
            alt=""
            fill
            className="object-cover opacity-35"
          />
        )}
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: style.color }} />
        <div className="relative px-6 py-10 md:px-10 md:py-12 grid lg:grid-cols-[1fr_280px] gap-8">
          <div>
            <Link
              href="/schedule"
              className="smallcaps text-[10px] opacity-70 hover:opacity-100 transition-opacity"
            >
              ← Back to schedule
            </Link>
            <span
              className="mt-5 mb-3 smallcaps text-[9px] px-3 py-1.5 inline-flex items-center gap-2 text-paper w-fit"
              style={{ background: style.color }}
            >
              <EventTypeIcon type={event.type} className="w-3.5 h-3.5" />
              {style.label}
            </span>
            <h1 className="font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[0.98]">
              {event.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {dateLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                {timeLabel}
              </span>
              {event.location && (
                <span className="inline-flex items-center gap-2">
                  <PinIcon className="w-4 h-4" />
                  {event.location}
                </span>
              )}
            </div>
          </div>
          {event.points_available != null && (
            <div className="bg-paper text-ink px-6 py-6 self-start ledger-frame">
              <p className="smallcaps text-[10px] text-ink-soft text-center">
                Points available
              </p>
              <p className="font-display font-semibold text-6xl text-crimson text-center mt-1 tabular">
                {event.points_available}
              </p>
              <p className="text-xs text-ink-soft text-center mt-3 border-t border-line pt-3">
                Help your district earn points in the Dyson Cup competition.
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10 pt-10">
        <div className="space-y-8">
          <section className="rise rise-2">
            <h2 className="font-display font-semibold text-3xl">About this event</h2>
            <p className="text-ink-soft mt-3 max-w-2xl">
              {event.description ??
                "Details coming soon — check the DUC Instagram for updates."}
            </p>
          </section>

          {(event.what_to_bring || event.who_can_attend) && (
            <section className="space-y-5 rise rise-3">
              {event.what_to_bring && (
                <div className="flex gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: style.tint, color: style.color }}
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl">What to bring</h3>
                    <p className="text-sm text-ink-soft mt-1 max-w-xl">{event.what_to_bring}</p>
                  </div>
                </div>
              )}
              {event.who_can_attend && (
                <div className="flex gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: style.tint, color: style.color }}
                  >
                    <PeopleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl">Who can attend</h3>
                    <p className="text-sm text-ink-soft mt-1 max-w-xl">{event.who_can_attend}</p>
                  </div>
                </div>
              )}
            </section>
          )}

          <section className="ledger-frame bg-card px-5 py-4 flex gap-3 items-center rise rise-4">
            <TrophyIcon className="w-5 h-5 text-gold shrink-0" />
            <p className="text-sm text-ink-soft">
              Every point counts toward the Dyson Cup. Show up, participate,
              and help your district climb the leaderboard.
            </p>
          </section>
        </div>

        <aside className="space-y-6 rise rise-3">
          <div className="ledger-frame bg-card px-6 py-5">
            <h3 className="font-display font-semibold text-xl">Add to calendar</h3>
            <p className="text-xs text-ink-soft mt-1 mb-4">
              Put it on your personal calendar so you don&apos;t miss it.
            </p>
            <AddToCalendar event={event} />
          </div>

          <div className="ledger-frame bg-card px-6 py-5">
            <h3 className="font-display font-semibold text-xl mb-3">Event details</h3>
            <ul className="text-sm text-ink-soft space-y-2.5">
              <li className="flex items-center gap-2.5">
                <CalendarIcon className="w-4 h-4 shrink-0" />
                {dateLabel}
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon className="w-4 h-4 shrink-0" />
                {timeLabel}
              </li>
              {event.location && (
                <li className="flex items-center gap-2.5">
                  <PinIcon className="w-4 h-4 shrink-0" />
                  {event.location}
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
