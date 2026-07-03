"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { House, Student } from "@/lib/types";

export function RosterManager({
  students,
  houses,
}: {
  students: Student[];
  houses: House[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    text: string;
    warnings?: string[];
  } | null>(null);
  const [filter, setFilter] = useState("");

  const houseById = useMemo(
    () => new Map(houses.map((h) => [h.id, h])),
    [houses]
  );

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.netid.includes(q) ||
        houseById.get(s.house_id)?.name.toLowerCase().includes(q)
    );
  }, [students, filter, houseById]);

  async function onUpload(file: File) {
    setBusy(true);
    setResult(null);
    const csv = await file.text();
    const res = await fetch("/api/admin/roster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csv }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      setResult({
        ok: true,
        text: `Imported ${data.imported} students. The roster has been replaced with this file.`,
        warnings: data.warnings?.length ? data.warnings : undefined,
      });
      router.refresh();
    } else {
      setResult({
        ok: false,
        text: data.error ?? "Upload failed.",
        warnings: data.details?.length ? data.details : undefined,
      });
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-8">
      <div className="ledger-frame bg-card px-6 py-6 max-w-2xl">
        <p className="smallcaps text-[10px] text-ink-soft">Upload roster CSV</p>
        <p className="text-sm text-ink-soft mt-2">
          Three columns: <code className="bg-paper-deep px-1.5 py-0.5">name, netid, house</code>.
          A header row is fine. Re-uploading <strong>replaces the whole roster</strong> —
          the CSV is the source of truth.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
            }}
            className="hidden"
            id="roster-file"
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="smallcaps text-xs bg-ink text-paper px-6 py-3 hover:bg-ink-soft transition-colors disabled:opacity-60"
          >
            {busy ? "Uploading…" : "Choose CSV file"}
          </button>
          <span className="text-xs text-ink-faint tabular">
            Currently on roster: {students.length}
          </span>
        </div>
        {result && (
          <div className={`mt-4 text-sm ${result.ok ? "text-ink" : "text-crimson"}`}>
            <p>
              {result.ok ? "✓ " : ""}
              {result.text}
            </p>
            {result.warnings && (
              <ul className="mt-2 text-xs text-ink-soft list-disc pl-5 space-y-0.5">
                {result.warnings.slice(0, 8).map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
                {result.warnings.length > 8 && (
                  <li>…and {result.warnings.length - 8} more.</li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="smallcaps text-[10px] text-ink-soft">
            Roster ({visible.length}
            {filter ? ` of ${students.length}` : ""})
          </p>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search name, NetID, or house…"
            className="border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-line-strong placeholder:text-ink-faint w-64"
          />
        </div>
        {visible.length === 0 ? (
          <p className="text-sm text-ink-soft">
            {students.length === 0
              ? "No students yet — upload the orientation CSV above."
              : "No matches."}
          </p>
        ) : (
          <div className="border-t border-line max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left sticky top-0 bg-paper">
                  <th className="smallcaps text-[9px] text-ink-soft font-semibold py-2.5 pr-4">Name</th>
                  <th className="smallcaps text-[9px] text-ink-soft font-semibold py-2.5 pr-4">NetID</th>
                  <th className="smallcaps text-[9px] text-ink-soft font-semibold py-2.5">House</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.map((s) => {
                  const house = houseById.get(s.house_id);
                  return (
                    <tr key={s.id}>
                      <td className="py-2.5 pr-4">{s.name}</td>
                      <td className="py-2.5 pr-4 text-ink-soft">{s.netid}</td>
                      <td className="py-2.5">
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: house?.color }}
                          />
                          {house?.name ?? "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
