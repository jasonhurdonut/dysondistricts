"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdminLogin() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode, name }),
    });
    setBusy(false);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Incorrect passcode.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="ledger-frame bg-card px-6 py-6 space-y-4">
      <label className="block">
        <span className="smallcaps text-[10px] text-ink-soft">Passcode</span>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong"
          autoFocus
        />
      </label>
      <label className="block">
        <span className="smallcaps text-[10px] text-ink-soft">
          Your name
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jason L."
          className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 outline-none focus:border-line-strong placeholder:text-ink-faint"
        />
      </label>
      {error && <p className="text-sm text-crimson">{error}</p>}
      <button
        type="submit"
        disabled={busy || !passcode}
        className="w-full smallcaps text-xs bg-ink text-paper py-3 hover:bg-ink-soft transition-colors disabled:opacity-60"
      >
        {busy ? "Checking…" : "Enter the panel"}
      </button>
    </form>
  );
}
