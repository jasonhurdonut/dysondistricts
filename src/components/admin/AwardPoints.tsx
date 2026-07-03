"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { DistrictEvent, House } from "@/lib/types";

export function AwardPoints({
  houses,
  events,
}: {
  houses: House[];
  events: DistrictEvent[];
}) {
  const router = useRouter();
  const [houseId, setHouseId] = useState<number | null>(null);
  const [eventId, setEventId] = useState("");
  const [points, setPoints] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const sortedEvents = [...events].sort((a, b) => b.date.localeCompare(a.date));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const res = await fetch("/api/admin/awards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        house_id: houseId,
        event_id: eventId,
        points: Number(points),
        note,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      const house = houses.find((h) => h.id === houseId);
      setMessage({
        ok: true,
        text: `Recorded: ${house?.name} ${Number(points) > 0 ? "+" : ""}${points} pts. The leaderboard is already updated.`,
      });
      setPoints("");
      setNote("");
      router.refresh();
    } else {
      setMessage({ ok: false, text: data.error ?? "Failed to record the award." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-7">
      <div>
        <p className="smallcaps text-[10px] text-ink-soft mb-3">1 — Pick the house</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {houses.map((h) => (
            <button
              type="button"
              key={h.id}
              onClick={() => setHouseId(h.id)}
              className={`flex flex-col items-center gap-1.5 border px-2 py-3 transition-all ${
                houseId === h.id
                  ? "border-line-strong bg-card -translate-y-0.5 shadow-[0_4px_0_rgba(34,29,21,0.9)]"
                  : "border-line bg-transparent hover:border-line-strong"
              }`}
            >
              <div className="relative w-10 h-12">
                <Image src={h.crest_url} alt="" fill sizes="40px" className="object-contain" />
              </div>
              <span className="smallcaps text-[8px]">{h.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="smallcaps text-[10px] text-ink-soft">2 — For which event</span>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong"
          >
            <option value="">Select an event…</option>
            {sortedEvents.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title} — {new Date(ev.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="smallcaps text-[10px] text-ink-soft">3 — Points</span>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="e.g. 50 (negatives allowed)"
            className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong placeholder:text-ink-faint tabular"
          />
        </label>
      </div>

      <label className="block">
        <span className="smallcaps text-[10px] text-ink-soft">
          4 — Note <span className="normal-case tracking-normal font-normal text-ink-faint">(optional)</span>
        </span>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder='e.g. "1st place" or "Best team spirit"'
          className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong placeholder:text-ink-faint"
        />
      </label>

      {message && (
        <p className={`text-sm ${message.ok ? "text-ink" : "text-crimson"}`}>
          {message.ok ? "✓ " : ""}
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || !houseId || !eventId || !points}
        className="smallcaps text-xs bg-ink text-paper px-8 py-3.5 hover:bg-ink-soft transition-colors disabled:opacity-50"
      >
        {busy ? "Recording…" : "Record the award"}
      </button>
    </form>
  );
}
