import { DistrictEvent } from "./types";

/**
 * Client-side calendar export (docs/PHASE-2.md Tier A): builds an .ics data
 * URL and a Google Calendar link from event data. No backend involved.
 */

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// Local floating time (no Z) so the event lands at the right wall-clock time
// for attendees; campus events are all one timezone anyway.
function toIcsStamp(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

export function eventTimes(event: DistrictEvent): { start: Date; end: Date } {
  const start = new Date(event.date);
  let end: Date;
  if (event.end_time) {
    const [h, m] = event.end_time.split(":").map(Number);
    end = new Date(start);
    end.setHours(h, m, 0, 0);
    if (end <= start) end = new Date(start.getTime() + 60 * 60 * 1000);
  } else {
    end = new Date(start.getTime() + 60 * 60 * 1000);
  }
  return { start, end };
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function icsHref(event: DistrictEvent): string {
  const { start, end } = eventTimes(event);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dyson Districts//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@dysondistricts`,
    `DTSTAMP:${toIcsStamp(start)}`,
    `DTSTART:${toIcsStamp(start)}`,
    `DTEND:${toIcsStamp(end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    ...(event.location ? [`LOCATION:${escapeIcs(event.location)}`] : []),
    ...(event.description ? [`DESCRIPTION:${escapeIcs(event.description)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function googleCalendarHref(event: DistrictEvent): string {
  const { start, end } = eventTimes(event);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toIcsStamp(start)}/${toIcsStamp(end)}`,
    ...(event.location ? { location: event.location } : {}),
    ...(event.description ? { details: event.description } : {}),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
