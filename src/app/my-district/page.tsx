import Image from "next/image";
import { getHouses } from "@/lib/data";
import { HouseLookup } from "@/components/HouseLookup";

export const dynamic = "force-dynamic";

export default async function MyDistrictPage() {
  const houses = await getHouses();

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-14 pb-10 md:pt-20 md:pb-14 text-center">
        <h1 className="font-display font-semibold tracking-tight leading-[0.95] text-[13vw] sm:text-6xl md:text-7xl mt-4 rise rise-2">
          Every Dyson freshman
          <br />
          belongs to a{" "}
          <em className="not-italic underline decoration-gold decoration-4 underline-offset-8">
            district
          </em>
          .
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-ink-soft rise rise-3">
          Enter your Cornell NetID to find yours.
        </p>
        <div className="mt-8 rise rise-4">
          <HouseLookup />
        </div>
      </section>

      <section className="py-10 border-t border-line">
        <p className="smallcaps text-xs text-ink-soft text-center mb-8">
          The six districts of Dyson
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
          {houses.map((house, i) => (
            <div
              key={house.id}
              className={`group flex flex-col items-center gap-3 rise rise-${i + 1}`}
            >
              <div className="relative w-20 h-24 md:w-24 md:h-28 transition-transform duration-300 group-hover:-translate-y-1.5">
                <Image
                  src={house.crest_url}
                  alt={`${house.name} crest`}
                  fill
                  sizes="96px"
                  className="object-contain drop-shadow-[0_6px_10px_rgba(34,29,21,0.25)]"
                />
              </div>
              <span
                className="smallcaps text-[10px] border-b-2 pb-1"
                style={{ borderColor: house.color }}
              >
                {house.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
