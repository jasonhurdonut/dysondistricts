"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type LookupHouse = {
  name: string;
  slug: string;
  color: string;
  crest_url: string;
  groupme_url: string | null;
  leaders: string[];
};

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "notfound" }
  | { status: "found"; firstName: string; house: LookupHouse };

export function HouseLookup() {
  const [netid, setNetid] = useState("");
  const [state, setState] = useState<LookupState>({ status: "idle" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!netid.trim()) return;
    setState({ status: "loading" });
    try {
      const res = await fetch(
        `/api/lookup?netid=${encodeURIComponent(netid.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Lookup failed." });
      } else if (!data.found) {
        setState({ status: "notfound" });
      } else {
        setState({ status: "found", firstName: data.firstName, house: data.house });
      }
    } catch {
      setState({ status: "error", message: "Something went wrong — try again." });
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={onSubmit} className="ledger-frame bg-card flex">
        <input
          value={netid}
          onChange={(e) => setNetid(e.target.value)}
          placeholder="Your NetID — e.g. abc123"
          aria-label="Cornell NetID"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 bg-transparent px-4 py-3.5 outline-none placeholder:text-ink-faint min-w-0"
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="smallcaps text-xs bg-ink text-paper px-6 hover:bg-ink-soft transition-colors disabled:opacity-60 shrink-0"
        >
          {state.status === "loading" ? "Searching…" : "Find my house"}
        </button>
      </form>

      <div aria-live="polite">
        {state.status === "error" && (
          <p className="mt-4 text-sm text-crimson">{state.message}</p>
        )}

        {state.status === "notfound" && (
          <div className="mt-6 ledger-frame bg-card px-6 py-5 text-sm text-ink-soft rise">
            That NetID isn&apos;t on the roster yet — contact your orientation
            lead and they&apos;ll get you sorted.
          </div>
        )}

        {state.status === "found" && (
          <div className="mt-8 ledger-frame bg-card overflow-hidden rise text-left">
            <div className="h-2" style={{ background: state.house.color }} />
            <div className="px-6 py-6 sm:px-8 flex items-center gap-6">
              <div className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0">
                <Image
                  src={state.house.crest_url}
                  alt={`${state.house.name} crest`}
                  fill
                  sizes="112px"
                  className="object-contain drop-shadow-[0_8px_14px_rgba(34,29,21,0.3)]"
                />
              </div>
              <div className="min-w-0">
                <p className="smallcaps text-[10px] text-ink-soft">
                  {state.firstName}, you belong to
                </p>
                <p
                  className="font-display font-semibold text-3xl sm:text-4xl leading-tight"
                  style={{ color: state.house.color }}
                >
                  {state.house.name}
                </p>
                {state.house.leaders.length > 0 && (
                  <p className="mt-2 text-xs text-ink-soft">
                    Led by {state.house.leaders.join(" & ")}
                  </p>
                )}
                {state.house.groupme_url && (
                  <a
                    href={state.house.groupme_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 smallcaps text-[10px] border border-line-strong px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
                  >
                    Join the house GroupMe →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
