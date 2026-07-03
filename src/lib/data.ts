import { getSupabase, isSupabaseConfigured } from "./supabase";
import {
  DEMO_AWARDS,
  DEMO_EVENTS,
  DEMO_HOUSES,
  DEMO_STUDENTS,
} from "./demo-data";
import {
  ActivityItem,
  DistrictEvent,
  House,
  LeaderboardRow,
  PointAward,
  Student,
} from "./types";

export const demoMode = () => !isSupabaseConfigured();

export async function getHouses(): Promise<House[]> {
  if (demoMode()) return DEMO_HOUSES;
  const { data, error } = await getSupabase()
    .from("houses")
    .select("*")
    .order("id");
  if (error) throw error;
  return data as House[];
}

export async function getEvents(): Promise<DistrictEvent[]> {
  if (demoMode()) return [...DEMO_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  const { data, error } = await getSupabase()
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return data as DistrictEvent[];
}

export async function getAwards(): Promise<PointAward[]> {
  if (demoMode()) return DEMO_AWARDS;
  const { data, error } = await getSupabase()
    .from("point_awards")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as PointAward[];
}

export async function getStudents(): Promise<Student[]> {
  if (demoMode()) return DEMO_STUDENTS;
  const { data, error } = await getSupabase()
    .from("students")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as Student[];
}

export async function lookupStudent(
  netid: string
): Promise<{ student: Student; house: House } | null> {
  const clean = netid.trim().toLowerCase();
  if (!clean) return null;
  if (demoMode()) {
    const student = DEMO_STUDENTS.find((s) => s.netid === clean);
    if (!student) return null;
    const house = DEMO_HOUSES.find((h) => h.id === student.house_id)!;
    return { student, house };
  }
  const { data, error } = await getSupabase()
    .from("students")
    .select("*, houses(*)")
    .eq("netid", clean)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const { houses, ...student } = data as Student & { houses: House };
  return { student: student as Student, house: houses };
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  const [houses, awards] = await Promise.all([getHouses(), getAwards()]);
  const totals = new Map<number, number>();
  for (const a of awards) {
    totals.set(a.house_id, (totals.get(a.house_id) ?? 0) + a.points);
  }
  const rows = houses
    .map((house) => ({ house, total: totals.get(house.id) ?? 0, rank: 0 }))
    .sort((a, b) => b.total - a.total || a.house.name.localeCompare(b.house.name));
  // Standard competition ranking: ties share a rank.
  rows.forEach((row, i) => {
    row.rank = i > 0 && rows[i - 1].total === row.total ? rows[i - 1].rank : i + 1;
  });
  return rows;
}

export async function getRecentActivity(limit = 8): Promise<ActivityItem[]> {
  const [houses, events, awards] = await Promise.all([
    getHouses(),
    getEvents(),
    getAwards(),
  ]);
  const houseById = new Map(houses.map((h) => [h.id, h]));
  const eventById = new Map(events.map((e) => [e.id, e]));
  return [...awards]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
    .map((a) => {
      const house = houseById.get(a.house_id);
      return {
        id: a.id,
        houseName: house?.name ?? "Unknown",
        houseColor: house?.color ?? "#999",
        points: a.points,
        eventTitle: a.event_id ? eventById.get(a.event_id)?.title ?? null : null,
        note: a.note,
        created_at: a.created_at,
      };
    });
}
