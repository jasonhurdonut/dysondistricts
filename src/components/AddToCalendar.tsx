"use client";

import { googleCalendarHref, icsHref } from "@/lib/calendar";
import { DistrictEvent } from "@/lib/types";
import { CalendarIcon } from "./icons";

export function AddToCalendar({ event }: { event: DistrictEvent }) {
  const slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <div className="space-y-2.5">
      <a
        href={icsHref(event)}
        download={`${slug || "event"}.ics`}
        className="smallcaps text-[10px] w-full inline-flex items-center justify-center gap-2 bg-ink text-paper px-4 py-3 hover:bg-ink-soft transition-colors"
      >
        <CalendarIcon className="w-4 h-4" />
        Download .ics
      </a>
      <a
        href={googleCalendarHref(event)}
        target="_blank"
        rel="noopener noreferrer"
        className="smallcaps text-[10px] w-full inline-flex items-center justify-center gap-2 border border-line-strong px-4 py-3 hover:bg-ink hover:text-paper transition-colors"
      >
        Add to Google Calendar
      </a>
    </div>
  );
}
