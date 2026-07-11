"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TYPE_STYLES } from "@/lib/event-types";
import { DistrictEvent, EVENT_TYPES, EventType } from "@/lib/types";

type Draft = {
  id?: string;
  title: string;
  description: string;
  date: string; // datetime-local value
  location: string;
  points_available: string;
  type: EventType;
  end_time: string; // "HH:MM"
  image_url: string;
  what_to_bring: string;
  who_can_attend: string;
};

const EMPTY: Draft = {
  title: "",
  description: "",
  date: "",
  location: "",
  points_available: "",
  type: "challenge",
  end_time: "",
  image_url: "",
  what_to_bring: "",
  who_can_attend: "",
};

function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventsManager({ events }: { events: DistrictEvent[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editing = Boolean(draft.id);
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/events", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...draft,
        date: draft.date ? new Date(draft.date).toISOString() : "",
        points_available: draft.points_available === "" ? null : Number(draft.points_available),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      setDraft(EMPTY);
      router.refresh();
    } else {
      setError(data.error ?? "Failed to save the event.");
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this event? Point awards tied to it will remain, but lose their event label.")) return;
    const res = await fetch("/api/admin/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      if (draft.id === id) setDraft(EMPTY);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to delete the event.");
    }
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-10">
      <form onSubmit={onSubmit} className="ledger-frame bg-card px-6 py-6 space-y-4 self-start">
        <p className="smallcaps text-[10px] text-ink-soft">
          {editing ? "Edit event" : "New event"}
        </p>
        <label className="block">
          <span className="smallcaps text-[10px] text-ink-soft">Title</span>
          <input
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="smallcaps text-[10px] text-ink-soft">Date & time</span>
            <input
              type="datetime-local"
              value={draft.date}
              onChange={(e) => set("date", e.target.value)}
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong"
            />
          </label>
          <label className="block">
            <span className="smallcaps text-[10px] text-ink-soft">Points available</span>
            <input
              type="number"
              min="0"
              value={draft.points_available}
              onChange={(e) => set("points_available", e.target.value)}
              placeholder="Optional"
              className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong placeholder:text-ink-faint"
            />
          </label>
        </div>
        <label className="block">
          <span className="smallcaps text-[10px] text-ink-soft">Location</span>
          <input
            value={draft.location}
            onChange={(e) => set("location", e.target.value)}
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong"
          />
        </label>
        <div>
          <span className="smallcaps text-[10px] text-ink-soft">Type</span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {EVENT_TYPES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => set("type", t)}
                className={`smallcaps text-[9px] px-3 py-2.5 border transition-colors ${
                  draft.type === t
                    ? "text-paper border-transparent"
                    : "border-line text-ink-soft hover:border-line-strong"
                }`}
                style={draft.type === t ? { background: TYPE_STYLES[t].color } : undefined}
              >
                {TYPE_STYLES[t].label}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="smallcaps text-[10px] text-ink-soft">Description</span>
          <textarea
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong resize-y"
          />
        </label>
        <details className="border-t border-line pt-4">
          <summary className="smallcaps text-[10px] text-ink-soft cursor-pointer">
            Detail-page extras (optional)
          </summary>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="smallcaps text-[10px] text-ink-soft">End time</span>
                <input
                  type="time"
                  value={draft.end_time}
                  onChange={(e) => set("end_time", e.target.value)}
                  className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong"
                />
              </label>
              <label className="block">
                <span className="smallcaps text-[10px] text-ink-soft">Image URL</span>
                <input
                  value={draft.image_url}
                  onChange={(e) => set("image_url", e.target.value)}
                  placeholder="https://…"
                  className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong placeholder:text-ink-faint"
                />
              </label>
            </div>
            <label className="block">
              <span className="smallcaps text-[10px] text-ink-soft">What to bring</span>
              <textarea
                value={draft.what_to_bring}
                onChange={(e) => set("what_to_bring", e.target.value)}
                rows={2}
                className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong resize-y"
              />
            </label>
            <label className="block">
              <span className="smallcaps text-[10px] text-ink-soft">Who can attend</span>
              <textarea
                value={draft.who_can_attend}
                onChange={(e) => set("who_can_attend", e.target.value)}
                rows={2}
                className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong resize-y"
              />
            </label>
          </div>
        </details>
        {error && <p className="text-sm text-crimson">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={busy || !draft.title || !draft.date}
            className="smallcaps text-xs bg-ink text-paper px-6 py-3 hover:bg-ink-soft transition-colors disabled:opacity-50"
          >
            {busy ? "Saving…" : editing ? "Save changes" : "Create event"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => setDraft(EMPTY)}
              className="smallcaps text-xs border border-line px-5 py-3 text-ink-soft hover:border-line-strong transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <p className="smallcaps text-[10px] text-ink-soft mb-4">
          All events ({sorted.length})
        </p>
        {sorted.length === 0 ? (
          <p className="text-sm text-ink-soft">No events yet — create the first one.</p>
        ) : (
          <ul className="divide-y divide-line border-t border-b border-line">
            {sorted.map((ev) => (
              <li key={ev.id} className="py-3.5 flex items-center gap-4">
                <span
                  className="w-2 h-10 shrink-0"
                  style={{ background: TYPE_STYLES[ev.type].color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-lg leading-tight truncate">
                    {ev.title}
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">
                    {new Date(ev.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {ev.location ? ` · ${ev.location}` : ""}
                    {ev.points_available != null ? ` · ${ev.points_available} pts` : ""}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setDraft({
                      id: ev.id,
                      title: ev.title,
                      description: ev.description ?? "",
                      date: toLocalInput(ev.date),
                      location: ev.location ?? "",
                      points_available: ev.points_available?.toString() ?? "",
                      type: ev.type,
                      end_time: ev.end_time?.slice(0, 5) ?? "",
                      image_url: ev.image_url ?? "",
                      what_to_bring: ev.what_to_bring ?? "",
                      who_can_attend: ev.who_can_attend ?? "",
                    })
                  }
                  className="smallcaps text-[9px] border border-line px-3 py-1.5 text-ink-soft hover:border-line-strong hover:text-ink transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(ev.id)}
                  className="smallcaps text-[9px] border border-line px-3 py-1.5 text-crimson hover:border-crimson transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
