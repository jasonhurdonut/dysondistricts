export type House = {
  id: number;
  name: string;
  slug: string;
  color: string;
  crest_url: string;
  groupme_url: string | null;
  leaders: string[] | null;
};

export type EventType = "challenge" | "bonding" | "trivia" | "collaboration";

export type DistrictEvent = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  points_available: number | null;
  type: EventType;
};

export type PointAward = {
  id: string;
  house_id: number;
  event_id: string | null;
  points: number;
  awarded_by: string;
  note: string | null;
  created_at: string;
};

export type Student = {
  id: string;
  name: string;
  netid: string;
  house_id: number;
};

export type LeaderboardRow = {
  house: House;
  total: number;
  rank: number;
};

export type ActivityItem = {
  id: string;
  houseName: string;
  houseColor: string;
  points: number;
  eventTitle: string | null;
  note: string | null;
  created_at: string;
};

export const EVENT_TYPES: EventType[] = [
  "challenge",
  "bonding",
  "trivia",
  "collaboration",
];
