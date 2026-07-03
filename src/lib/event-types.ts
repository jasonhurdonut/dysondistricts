import { EventType } from "./types";

export const TYPE_STYLES: Record<EventType, { label: string; color: string }> = {
  challenge: { label: "Challenge", color: "#be4b44" },
  bonding: { label: "Bonding", color: "#dfa733" },
  trivia: { label: "Trivia", color: "#5e7fc4" },
  collaboration: { label: "Collaboration", color: "#2e8f3e" },
};
