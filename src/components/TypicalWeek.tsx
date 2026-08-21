"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { CalendarIcon, PeopleIcon, TrophyIcon } from "./icons";

const RED = "#be4b44";
const DARK = "#1e1b17";

const STEPS = [
  {
    day: "Sept 1st",
    title: "Challenge Drops",
    body: "A new challenge drops at the start of the month.",
    icon: CalendarIcon,
  },
  {
    day: "All month",
    title: "Participate & Connect",
    body: "Complete challenges, attend events, and earn points for your district.",
    icon: PeopleIcon,
  },
  {
    day: "Sept 30th",
    title: "Leaderboard Reveal",
    body: "See how your district ranks and celebrate the month's top performers.",
    icon: TrophyIcon,
  },
];

// Vertical (mobile) geometry: equal segments so the midpoint dot lights at 50%.
const SEG = 96; // px between consecutive dots
const TRACK_V = SEG * 2;

export function TypicalWeek() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, { duration: 2.4, ease: [0.33, 0, 0.25, 1] });
    return () => controls.stop();
  }, [inView, reduce, progress]);

  // Each station goes DARK → RED the instant the moving dot reaches it.
  const cMon = useTransform(progress, [0, 0.02], [DARK, RED]);
  const cAll = useTransform(progress, [0.46, 0.5], [DARK, RED]);
  const cFri = useTransform(progress, [0.96, 1], [DARK, RED]);
  const colors = [cMon, cAll, cFri];

  // Glow ring that blooms as the fill reaches the 2nd (≈0.5) and 3rd (≈1) dots,
  // then settles to a soft halo — the "active" pulse.
  const gAll = useTransform(
    progress,
    [0.44, 0.5, 0.62],
    [
      "0 0 0 0px rgba(190,75,68,0)",
      "0 0 0 8px rgba(190,75,68,0.35)",
      "0 0 0 4px rgba(190,75,68,0.2)",
    ]
  );
  const gFri = useTransform(
    progress,
    [0.9, 0.97, 1],
    [
      "0 0 0 0px rgba(190,75,68,0)",
      "0 0 0 8px rgba(190,75,68,0.35)",
      "0 0 0 4px rgba(190,75,68,0.2)",
    ]
  );
  const glows = [undefined, gAll, gFri];

  return (
    <div ref={ref}>
      {/* ---------- Desktop: horizontal timeline, text above the line ---------- */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-6 mb-6">
          {STEPS.map((s, i) => (
            <div key={s.day} className="text-center px-2">
              <motion.span
                style={{ color: colors[i] }}
                className="inline-flex items-center gap-2 smallcaps text-[10px]"
              >
                <s.icon className="w-4 h-4" />
                {s.day}
              </motion.span>
              <h3 className="font-display font-semibold text-xl mt-2.5">{s.title}</h3>
              <p className="text-sm text-ink-soft mt-1.5">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="relative h-4">
          {/* black baseline between first and last station */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[2px]"
            style={{ left: "16.667%", right: "16.667%", background: DARK }}
          />
          {/* red fill that grows behind the moving dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-[2px] origin-left"
            style={{ left: "16.667%", width: "66.666%", background: RED, scaleX: progress }}
          />
          {/* station dots */}
          {STEPS.map((s, i) => (
            <motion.div
              key={s.day}
              className="absolute top-1/2 w-3.5 h-3.5 rounded-full"
              style={{
                left: `${16.667 + i * 33.333}%`,
                x: "-50%",
                y: "-50%",
                backgroundColor: colors[i],
                boxShadow: glows[i],
              }}
            />
          ))}
        </div>
      </div>

      {/* ---------- Mobile: vertical timeline, text to the right ---------- */}
      <div className="md:hidden flex gap-5">
        <div className="relative w-4 shrink-0" style={{ minHeight: TRACK_V + 8 }}>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[6px] w-[2px]"
            style={{ height: TRACK_V, background: DARK }}
          />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-[6px] w-[2px] origin-top"
            style={{ height: TRACK_V, background: RED, scaleY: progress }}
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.day}
              className="absolute left-1/2 w-3.5 h-3.5 rounded-full"
              style={{
                top: 6 + i * SEG,
                x: "-50%",
                y: "-50%",
                backgroundColor: colors[i],
                boxShadow: glows[i],
              }}
            />
          ))}
        </div>

        <div className="flex-1">
          {STEPS.map((s, i) => (
            <div
              key={s.day}
              className="flex flex-col justify-start"
              style={{ minHeight: i < STEPS.length - 1 ? SEG : undefined }}
            >
              <motion.span
                style={{ color: colors[i] }}
                className="inline-flex items-center gap-2 smallcaps text-[10px]"
              >
                <s.icon className="w-4 h-4" />
                {s.day}
              </motion.span>
              <h3 className="font-display font-semibold text-xl mt-1.5">{s.title}</h3>
              <p className="text-sm text-ink-soft mt-1">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
