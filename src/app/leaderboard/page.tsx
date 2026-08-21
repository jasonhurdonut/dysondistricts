import Image from "next/image";
import { getLeaderboard, getRecentActivity } from "@/lib/data";

export const dynamic = "force-dynamic";

function timeAgo(iso: string): string {
  const seconds = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default async function LeaderboardPage() {
  const [rows, activity] = await Promise.all([
    getLeaderboard(),
    getRecentActivity(8),
  ]);
  const max = Math.max(1, ...rows.map((r) => r.total));

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-12 pb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line-strong">
        <div>
          <p className="smallcaps text-xs text-ink-soft rise rise-1">
            The official score
          </p>
          <h1 className="font-display font-semibold tracking-tight text-5xl md:text-6xl mt-2 rise rise-2">
            Standings
          </h1>
        </div>
      </section>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10 pt-10">
        <ol className="space-y-4">
          {rows.map((row, i) => (
            <li
              key={row.house.id}
              className={`ledger-frame bg-card px-5 py-4 sm:px-6 flex items-center gap-4 sm:gap-6 rise rise-${i + 1}`}
            >
              <span
                className={`font-display font-semibold tabular text-4xl sm:text-5xl w-12 text-center shrink-0 ${
                  row.rank === 1 ? "text-gold" : "text-ink-faint"
                }`}
              >
                {row.rank}
              </span>
              <div className="relative w-14 h-16 sm:w-16 sm:h-20 shrink-0">
                <Image
                  src={row.house.crest_url}
                  alt={`${row.house.name} crest`}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display font-semibold text-xl sm:text-2xl truncate">
                    {row.house.name}
                  </span>
                  <span className="font-display font-semibold tabular text-2xl sm:text-3xl shrink-0">
                    {row.total}
                    <span className="smallcaps text-[9px] text-ink-faint ml-2">
                      pts
                    </span>
                  </span>
                </div>
                <div className="mt-2 h-2 bg-paper-deep overflow-hidden">
                  <div
                    className="h-full score-bar"
                    style={{
                      width: `${(row.total / max) * 100}%`,
                      background: row.house.color,
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <aside className="rise rise-4">
          <h2 className="smallcaps text-xs border-b border-line-strong pb-3">
            Recent awards
          </h2>
          {activity.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">
              No points awarded yet. The games are young.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {activity.map((item) => (
                <li key={item.id} className="py-3.5 flex gap-3 items-baseline">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 translate-y-0.5"
                    style={{ background: item.houseColor }}
                  />
                  <div className="text-sm leading-snug">
                    <span className="font-semibold">{item.houseName}</span>{" "}
                    <span className="font-display font-semibold">
                      {item.points > 0 ? `+${item.points}` : item.points}
                    </span>
                    {item.eventTitle && (
                      <span className="text-ink-soft"> — {item.eventTitle}</span>
                    )}
                    {item.note && (
                      <span className="text-ink-faint"> · {item.note}</span>
                    )}
                    <span className="block text-[11px] text-ink-faint mt-0.5">
                      {timeAgo(item.created_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
