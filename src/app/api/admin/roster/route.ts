import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { parseRosterCsv } from "@/lib/csv";
import { getHouses, getStudents } from "@/lib/data";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const [students, houses] = await Promise.all([getStudents(), getHouses()]);
  return NextResponse.json({ students, houses });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not connected yet — roster upload is disabled in demo mode." },
      { status: 503 }
    );
  }

  const { csv } = await req.json().catch(() => ({}));
  if (typeof csv !== "string" || !csv.trim()) {
    return NextResponse.json({ error: "Empty CSV." }, { status: 400 });
  }

  const { rows, errors } = parseRosterCsv(csv);
  if (rows.length === 0) {
    return NextResponse.json(
      { error: "No valid rows found.", details: errors },
      { status: 400 }
    );
  }

  const houses = await getHouses();
  const houseByName = new Map(houses.map((h) => [h.name.toLowerCase(), h.id]));
  const students: { name: string; netid: string; house_id: number }[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    const houseId = houseByName.get(row.house.toLowerCase());
    if (!houseId) {
      errors.push(`"${row.netid}": unknown house "${row.house}".`);
      continue;
    }
    if (seen.has(row.netid)) {
      errors.push(`"${row.netid}": duplicate NetID, kept first occurrence.`);
      continue;
    }
    seen.add(row.netid);
    students.push({ name: row.name, netid: row.netid, house_id: houseId });
  }

  if (students.length === 0) {
    return NextResponse.json(
      { error: "No rows matched a valid house.", details: errors },
      { status: 400 }
    );
  }

  // The uploaded CSV is the source of truth: replace the whole roster.
  const supabase = getSupabase();
  const del = await supabase.from("students").delete().neq("netid", "");
  if (del.error) {
    return NextResponse.json({ error: del.error.message }, { status: 500 });
  }
  const ins = await supabase.from("students").insert(students);
  if (ins.error) {
    return NextResponse.json({ error: ins.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, imported: students.length, warnings: errors });
}
