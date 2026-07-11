"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type LookupHouse = {
  name: string;
  slug: string;
  color: string;
  crest_url: string;
  groupme_url: string | null;
  tagline: string | null;
  description: string | null;
  leaders: { name: string; role: string | null }[];
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
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="ledger-frame bg-card flex max-w-md mx-auto">
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
          {state.status === "loading" ? "Searching…" : "Find my district"}
        </button>
      </form>

      <div aria-live="polite">
        {state.status === "error" && (
          <p className="mt-4 text-sm text-crimson">{state.message}</p>
        )}

        {state.status === "notfound" && (
          <div className="mt-6 ledger-frame bg-card px-6 py-5 text-sm text-ink-soft rise max-w-md mx-auto">
            That NetID isn&apos;t on the roster yet — contact your orientation
            lead and they&apos;ll get you sorted.
          </div>
        )}

        {state.status === "found" && (
          <div className="mt-8 ledger-frame bg-card overflow-hidden rise text-left">
            <div className="h-2" style={{ background: state.house.color }} />
            <div className="px-6 py-6 sm:px-8">
              <div className="flex items-center gap-6">
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
                  {state.house.tagline && (
                    <p className="mt-1.5 text-sm text-ink-soft italic">
                      {state.house.tagline}
                    </p>
                  )}
                </div>
              </div>

              {state.house.description && (
                <p className="mt-5 text-sm text-ink-soft border-t border-line pt-4">
                  {state.house.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                {state.house.leaders.length > 0 && (
                  <div>
                    <p className="smallcaps text-[9px] text-ink-faint mb-1.5">
                      District leaders
                    </p>
                    <ul className="text-sm space-y-0.5">
                      {state.house.leaders.map((l) => (
                        <li key={l.name}>
                          <span className="font-semibold">{l.name}</span>
                          {l.role && (
                            <span className="text-ink-faint"> — {l.role}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {state.house.groupme_url && (
                  <a
                    href={state.house.groupme_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="smallcaps text-[10px] px-5 py-2.5 text-paper hover:opacity-90 transition-opacity"
                    style={{ background: state.house.color }}
                  >
                    Join the district GroupMe →
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
