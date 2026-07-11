import Image from "next/image";
import Link from "next/link";
import { getHouseLeaders, getHouses } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DistrictsPage() {
  const [houses, leaders] = await Promise.all([getHouses(), getHouseLeaders()]);
  const leadersByHouse = new Map<number, typeof leaders>();
  for (const l of leaders) {
    const list = leadersByHouse.get(l.house_id) ?? [];
    list.push(l);
    leadersByHouse.set(l.house_id, list);
  }

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-12 pb-10 text-center">
        <p className="smallcaps text-xs text-ink-soft rise rise-1">
          Six ways to lead, compete, and connect
        </p>
        <h1 className="font-display font-semibold tracking-tight text-5xl md:text-6xl mt-2 rise rise-2">
          Meet the Six Districts
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-ink-soft text-sm rise rise-3">
          Every district takes its name from an Ithaca waterfall and its identity
          from the students in it. Find the one that fits you — or the one
          fate already picked.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
        {houses.map((house, i) => {
          const houseLeaders = leadersByHouse.get(house.id) ?? [];
          return (
            <article
              key={house.id}
              className={`ledger-frame bg-card overflow-hidden flex flex-col rise rise-${i + 1}`}
            >
              <div className="h-1.5" style={{ background: house.color }} />
              <div className="px-6 py-6 flex-1 flex flex-col">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-20 shrink-0">
                    <Image
                      src={house.crest_url}
                      alt={`${house.name} crest`}
                      fill
                      sizes="64px"
                      className="object-contain drop-shadow-[0_5px_9px_rgba(34,29,21,0.25)]"
                    />
                  </div>
                  <div>
                    <h2
                      className="font-display font-semibold text-2xl"
                      style={{ color: house.color }}
                    >
                      {house.name}
                    </h2>
                    {house.tagline && (
                      <p className="text-sm text-ink-soft italic mt-1 leading-snug">
                        {house.tagline}
                      </p>
                    )}
                  </div>
                </div>
                {house.description && (
                  <p className="text-sm text-ink-soft mt-4 flex-1">
                    {house.description}
                  </p>
                )}
                {houseLeaders.length > 0 && (
                  <p className="smallcaps text-[9px] text-ink-faint mt-4 pt-3 border-t border-line">
                    Led by{" "}
                    <span className="text-ink-soft normal-case tracking-normal font-normal">
                      {houseLeaders.map((l) => l.name).join(" · ")}
                    </span>
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-8 mb-4 ledger-frame bg-card px-6 py-8 text-center">
        <p className="font-display font-semibold text-2xl md:text-3xl">
          One competition. Six districts. One cup.
        </p>
        <p className="text-sm text-ink-soft mt-2">
          Represent your district. Earn points. Win the Dyson Cup.
        </p>
        <Link
          href="/my-district"
          className="inline-block mt-5 smallcaps text-xs bg-ink text-paper px-8 py-3.5 hover:bg-ink-soft transition-colors"
        >
          Find your district
        </Link>
      </section>
    </div>
  );
}
