import { getEvents } from "@/lib/data";
import { TYPE_STYLES } from "@/lib/event-types";
import { DistrictEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

function EventCard({ event, index, past }: { event: DistrictEvent; index: number; past?: boolean }) {
  const d = new Date(event.date);
  const type = TYPE_STYLES[event.type];
  return (
    <li
      className={`ledger-frame bg-card flex rise rise-${Math.min(index + 1, 6)} ${
        past ? "opacity-70" : ""
      }`}
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
      <div className="flex-1 px-5 py-4 sm:px-6 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="font-display font-semibold text-xl sm:text-2xl leading-tight">
            {event.title}
          </h3>
          <span
            className="smallcaps text-[9px] px-2 py-1 text-paper"
            style={{ background: type.color }}
          >
            {type.label}
          </span>
          {event.points_available != null && (
            <span className="smallcaps text-[9px] px-2 py-1 border border-line-strong">
              {event.points_available} pts at stake
            </span>
          )}
        </div>
        <p className="text-xs text-ink-soft mt-1.5">
          {d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          {event.location ? ` · ${event.location}` : ""}
        </p>
        {event.description && (
          <p className="text-sm text-ink-soft mt-2.5 max-w-2xl">
            {event.description}
          </p>
        )}
      </div>
    </li>
  );
}

export default async function SchedulePage() {
  const events = await getEvents();
  const now = Date.now();
  const upcoming = events.filter((e) => Date.parse(e.date) >= now);
  const past = events
    .filter((e) => Date.parse(e.date) < now)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-4xl px-5">
      <section className="pt-12 pb-8 border-b border-line-strong">
        <p className="smallcaps text-xs text-ink-soft rise rise-1">
          Challenges · Bonding · Trivia · Collaboration
        </p>
        <h1 className="font-display font-semibold tracking-tight text-5xl md:text-6xl mt-2 rise rise-2">
          Schedule
        </h1>
      </section>

      <section className="pt-10">
        <h2 className="smallcaps text-xs text-ink-soft mb-5">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-ink-soft ledger-frame bg-card px-6 py-5">
            Nothing on the calendar yet — watch this space (and the DUC
            Instagram).
          </p>
        ) : (
          <ul className="space-y-5">
            {upcoming.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </ul>
        )}
      </section>

      {past.length > 0 && (
        <section className="pt-12">
          <h2 className="smallcaps text-xs text-ink-soft mb-5">Past events</h2>
          <ul className="space-y-5">
            {past.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} past />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
