import { DistrictEvent, House, HouseLeader, PointAward, Student } from "./types";

/**
 * Demo dataset used only while Supabase env vars are absent, so the app is
 * fully browsable before the database is connected. Never used in writes.
 * House canon (names/colors/taglines) mirrors dyson_districts_seed.sql.
 */

export const DEMO_HOUSES: House[] = [
  { id: 1, name: "Triphammer", slug: "triphammer", color: "#A84860", crest_url: "/crests/triphammer.png", groupme_url: "https://groupme.com/join_group/demo-triphammer", leaders: null, tagline: "Bold leaders who build momentum and inspire action.", description: "Named for Triphammer Falls, Triphammer is the district of drive. Expect them first in line at every challenge drop and loudest at the leaderboard reveal." },
  { id: 2, name: "Lucifer", slug: "lucifer", color: "#CC5424", crest_url: "/crests/lucifer.png", groupme_url: "https://groupme.com/join_group/demo-lucifer", leaders: null, tagline: "Passionate and fearless, lighting the way for others.", description: "Named for Lucifer Falls at Treman, Lucifer burns bright. A district that turns up in force, competes with heart, and never leaves a teammate behind." },
  { id: 3, name: "Rocky", slug: "rocky", color: "#E4A884", crest_url: "/crests/rocky.png", groupme_url: "https://groupme.com/join_group/demo-rocky", leaders: null, tagline: "Steady and resilient, standing strong through every challenge.", description: "Named for Rocky Falls, Rocky is the bedrock district — consistent, dependable, and impossible to rattle when the semester gets loud." },
  { id: 4, name: "Cascadilla", slug: "cascadilla", color: "#6C8478", crest_url: "/crests/cascadilla.png", groupme_url: "https://groupme.com/join_group/demo-cascadilla", leaders: null, tagline: "Grounded and growing, cultivating community and balance.", description: "Named for Cascadilla Gorge, Cascadilla grows on connection. The district most likely to bring a friend, start a tradition, and make Dyson feel small in the best way." },
  { id: 5, name: "Taughannock", slug: "taughannock", color: "#546090", crest_url: "/crests/taughannock.png", groupme_url: "https://groupme.com/join_group/demo-taughannock", leaders: null, tagline: "Adaptable and thoughtful, flowing with purpose and creativity.", description: "Named for Taughannock Falls — taller than Niagara — Taughannock takes the creative line through every problem and makes it look easy." },
  { id: 6, name: "Buttermilk", slug: "buttermilk", color: "#E4A860", crest_url: "/crests/buttermilk.png", groupme_url: "https://groupme.com/join_group/demo-buttermilk", leaders: null, tagline: "Reliable and uplifting, nourishing success together.", description: "Named for Buttermilk Falls, Buttermilk is the district that feeds the whole program — steady points, warm welcomes, and the best team spirit in Dyson." },
];

export const DEMO_LEADERS: HouseLeader[] = [
  { id: 1, house_id: 1, name: "Avery Chen", role: "District President", email: null, photo_url: null },
  { id: 2, house_id: 1, name: "Sam Rodriguez", role: "Vice President", email: null, photo_url: null },
  { id: 3, house_id: 2, name: "Jordan Lee", role: "District President", email: null, photo_url: null },
  { id: 4, house_id: 2, name: "Priya Patel", role: "Vice President", email: null, photo_url: null },
  { id: 5, house_id: 3, name: "Mia Thompson", role: "District President", email: null, photo_url: null },
  { id: 6, house_id: 4, name: "Noah Kim", role: "District President", email: null, photo_url: null },
  { id: 7, house_id: 5, name: "Liam O'Brien", role: "District President", email: null, photo_url: null },
  { id: 8, house_id: 6, name: "Zoe Williams", role: "District President", email: null, photo_url: null },
];

export const DEMO_STUDENTS: Student[] = [
  { id: "s1", name: "Jason Liaw", netid: "jhl384", house_id: 2 },
  { id: "s2", name: "Taylor Reed", netid: "tr455", house_id: 1 },
  { id: "s3", name: "Casey Nguyen", netid: "cn212", house_id: 4 },
  { id: "s4", name: "Riley Park", netid: "rp389", house_id: 6 },
];

const day = 24 * 60 * 60 * 1000;
const now = Date.now();

export const DEMO_EVENTS: DistrictEvent[] = [
  { id: "e1", title: "Trivia Night", description: "Six districts, one champion. Cornell and Dyson trivia across five rounds.", date: new Date(now - 6 * day).toISOString(), location: "Sage Hall B08", points_available: 50, type: "trivia", end_time: "20:30:00", image_url: null, what_to_bring: "Your Cornell ID and your best trivia knowledge. Pens and scratch paper provided.", who_can_attend: "All Dyson students — solo or teams of up to 4." },
  { id: "e2", title: "Gorge Scavenger Hunt", description: "Photo scavenger hunt across the gorges. Submit finds on Instagram.", date: new Date(now - 2 * day).toISOString(), location: "Cascadilla Gorge Trail", points_available: 75, type: "challenge", end_time: null, image_url: null, what_to_bring: "Comfortable shoes, a charged phone, water.", who_can_attend: "All districts; teams form at the trailhead." },
  { id: "e3", title: "House Dinner Mixer", description: "Cross-house dinner. Sit with someone you haven't met.", date: new Date(now + 3 * day).toISOString(), location: "Morrison Dining", points_available: 25, type: "bonding", end_time: "19:30:00", image_url: null, what_to_bring: "Just yourself — swipe in with your meal plan.", who_can_attend: "All Dyson freshmen." },
  { id: "e4", title: "Case Sprint: Local Business", description: "Teams from different houses pair up to pitch a growth plan for an Ithaca business.", date: new Date(now + 8 * day).toISOString(), location: "Breazzano Center 223", points_available: 100, type: "collaboration", end_time: "21:00:00", image_url: null, what_to_bring: "A laptop per team; case packet handed out on arrival.", who_can_attend: "Open to all — cross-house teams required." },
];

export const DEMO_AWARDS: PointAward[] = [
  { id: "a1", house_id: 2, event_id: "e1", points: 50, awarded_by: "DUC Admin", note: "1st place", created_at: new Date(now - 6 * day + 3 * 60 * 60 * 1000).toISOString() },
  { id: "a2", house_id: 5, event_id: "e1", points: 30, awarded_by: "DUC Admin", note: "2nd place", created_at: new Date(now - 6 * day + 3 * 60 * 60 * 1000).toISOString() },
  { id: "a3", house_id: 1, event_id: "e1", points: 20, awarded_by: "DUC Admin", note: "3rd place", created_at: new Date(now - 6 * day + 3 * 60 * 60 * 1000).toISOString() },
  { id: "a4", house_id: 4, event_id: "e2", points: 75, awarded_by: "DUC Admin", note: "Most finds", created_at: new Date(now - 1 * day).toISOString() },
  { id: "a5", house_id: 6, event_id: "e2", points: 40, awarded_by: "DUC Admin", note: "Runner-up", created_at: new Date(now - 1 * day).toISOString() },
  { id: "a6", house_id: 3, event_id: "e2", points: 25, awarded_by: "DUC Admin", note: "Best photo", created_at: new Date(now - 1 * day).toISOString() },
  { id: "a7", house_id: 2, event_id: "e2", points: 15, awarded_by: "DUC Admin", note: null, created_at: new Date(now - 1 * day).toISOString() },
];
