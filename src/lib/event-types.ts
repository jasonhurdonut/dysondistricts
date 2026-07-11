import { EventType } from "./types";

// Phase 2 category canon (docs/PHASE-2.md §5):
// challenge green · trivia purple · bonding red · collaboration blue
export const TYPE_STYLES: Record<
  EventType,
  { label: string; color: string; tint: string }
> = {
  challenge: { label: "Challenge", color: "#2E8F3E", tint: "#2E8F3E1A" },
  trivia: { label: "Trivia", color: "#8B5CA5", tint: "#8B5CA51A" },
  bonding: { label: "Bonding", color: "#BE4B44", tint: "#BE4B441A" },
  collaboration: { label: "Collaboration", color: "#5E7FC4", tint: "#5E7FC41A" },
};
