"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DistrictEvent, House, Student } from "@/lib/types";
import { AwardPoints } from "./AwardPoints";
import { EventsManager } from "./EventsManager";
import { RosterManager } from "./RosterManager";

type Tab = "award" | "events" | "roster";

const TABS: { id: Tab; label: string }[] = [
  { id: "award", label: "Award Points" },
  { id: "events", label: "Events" },
  { id: "roster", label: "Roster" },
];

export function AdminPanel({
  houses,
  events,
  students,
  demo,
}: {
  houses: House[];
  events: DistrictEvent[];
  students: Student[];
  demo: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("award");

  const rosterByHouse = useMemo(() => {
    const counts = new Map<number, number>();
    for (const s of students) counts.set(s.house_id, (counts.get(s.house_id) ?? 0) + 1);
    return counts;
  }, [students]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-12 pb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line-strong">
        <div>
          <p className="smallcaps text-xs text-ink-soft">The engine room</p>
          <h1 className="font-display font-semibold tracking-tight text-5xl mt-2">
            Admin Panel
          </h1>
        </div>
        <button
          onClick={logout}
          className="smallcaps text-[10px] text-ink-faint border border-line px-4 py-2 hover:bg-ink hover:text-paper hover:border-line-strong transition-colors"
        >
          Sign out
        </button>
      </section>

      {demo && (
        <p className="mt-6 text-sm text-ink-soft ledger-frame bg-card px-5 py-4">
          <strong>Demo mode:</strong> Supabase isn&apos;t connected, so writes
          are disabled. Add your project keys to <code>.env.local</code> and
          restart to go live.
        </p>
      )}

      <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-3">
        {houses.map((h) => (
          <div key={h.id} className="border border-line bg-card px-3 py-2.5 flex items-center gap-2.5">
            <div className="relative w-7 h-8 shrink-0">
              <Image src={h.crest_url} alt="" fill sizes="28px" className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="smallcaps text-[9px] truncate">{h.name}</p>
              <p className="text-[11px] text-ink-faint tabular">
                {rosterByHouse.get(h.id) ?? 0} students
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex border-b border-line-strong">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`smallcaps text-xs px-5 py-3 -mb-px border border-b-0 transition-colors ${
              tab === t.id
                ? "bg-ink text-paper border-line-strong"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pt-8 pb-4">
        {tab === "award" && <AwardPoints houses={houses} events={events} />}
        {tab === "events" && <EventsManager events={events} />}
        {tab === "roster" && <RosterManager students={students} houses={houses} />}
      </div>
    </div>
  );
}
