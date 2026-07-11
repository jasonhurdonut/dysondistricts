"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TYPE_STYLES } from "@/lib/event-types";
import { DistrictEvent, EVENT_TYPES, EventType } from "@/lib/types";
import { ClockIcon, EventTypeIcon, PinIcon } from "./icons";

type Filter = "all" | EventType;

function EventRow({ event, index, past }: { event: DistrictEvent; index: number; past?: boolean }) {
  const d = new Date(event.date);
  const style = TYPE_STYLES[event.type];
  return (
    <li className={`rise rise-${Math.min(index + 1, 6)} ${past ? "opacity-65" : ""}`}>
      <Link
        href={`/schedule/${event.id}`}
        className="group ledger-frame bg-card flex items-stretch hover:-translate-y-0.5 transition-transform"
        style={{ boxShadow: `inset 4px 0 0 ${style.color}` }}
      >
        <div className="w-20 sm:w-24 shrink-0 border-r border-line-strong flex flex-col items-center justify-center py-5 bg-paper-deep">
          <span className="smallcaps text-[10px] text-ink-soft">
            {d.toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="font-display font-semibold text-3xl sm:text-4xl leading-none mt-1">
            {d.getDate()}
          </span>
          <span className="text-[10px] text-ink-faint mt-1">
            {d.toLocaleDateString("en-US", { weekday: "short" })}
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 flex-1 min-w-0">
          <div
            className="hidden sm:flex w-12 h-12 rounded-full items-center justify-center shrink-0"
            style={{ background: style.tint, color: style.color }}
          >
            <EventTypeIcon type={event.type} className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="smallcaps text-[9px]" style={{ color: style.color }}>
              {style.label}
            </p>
            <h3 className="font-display font-semibold text-xl sm:text-2xl leading-tight mt-0.5 group-hover:underline decoration-2 underline-offset-4 truncate">
              {event.title}
            </h3>
            <p className="flex items-center gap-x-3 gap-y-1 flex-wrap text-xs text-ink-soft mt-1.5">
              {event.location && (
                <span className="inline-flex items-center gap-1.5">
                  <PinIcon className="w-3.5 h-3.5" />
                  {event.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="w-3.5 h-3.5" />
                {d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
              </span>
            </p>
            {event.description && (
              <p className="text-sm text-ink-soft mt-2 line-clamp-2 max-w-xl hidden sm:block">
                {event.description}
              </p>
            )}
          </div>

          {event.points_available != null && (
            <div className="shrink-0 text-right pl-2 sm:border-l border-line sm:pl-5">
              <span className="font-display font-semibold text-3xl sm:text-4xl tabular text-crimson leading-none">
                {event.points_available}
              </span>
              <span className="block smallcaps text-[9px] text-ink-faint mt-1">pts</span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

export function ScheduleList({ events }: { events: DistrictEvent[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const now = Date.now();

  const { upcoming, past } = useMemo(() => {
    const visible = filter === "all" ? events : events.filter((e) => e.type === filter);
    return {
      upcoming: visible.filter((e) => Date.parse(e.date) >= now),
      past: visible
        .filter((e) => Date.parse(e.date) < now)
        .sort((a, b) => b.date.localeCompare(a.date)),
    };
  }, [events, filter, now]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 pb-8 rise rise-4">
        <button
          onClick={() => setFilter("all")}
          className={`smallcaps text-[10px] px-4 py-2 border transition-colors ${
            filter === "all"
              ? "bg-ink text-paper border-line-strong"
              : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
          }`}
        >
          All
        </button>
        {EVENT_TYPES.map((t) => {
          const style = TYPE_STYLES[t];
          const active = filter === t;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="smallcaps text-[10px] px-4 py-2 border transition-colors inline-flex items-center gap-2"
              style={
                active
                  ? { background: style.color, borderColor: style.color, color: "#faf7ee" }
                  : { borderColor: "var(--line)", color: style.color }
              }
            >
              <EventTypeIcon type={t} className="w-3.5 h-3.5" />
              {style.label}
            </button>
          );
        })}
      </div>

      <section>
        <h2 className="smallcaps text-xs text-ink-soft mb-5">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-ink-soft ledger-frame bg-card px-6 py-5">
            {filter === "all"
              ? "Nothing on the calendar yet — watch this space (and the DUC Instagram)."
              : `No upcoming ${TYPE_STYLES[filter as EventType].label.toLowerCase()} events right now.`}
          </p>
        ) : (
          <ul className="space-y-5">
            {upcoming.map((e, i) => (
              <EventRow key={e.id} event={e} index={i} />
            ))}
          </ul>
        )}
      </section>

      {past.length > 0 && (
        <section className="pt-12">
          <h2 className="smallcaps text-xs text-ink-soft mb-5">Past events</h2>
          <ul className="space-y-5">
            {past.map((e, i) => (
              <EventRow key={e.id} event={e} index={i} past />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
