import { NextRequest, NextResponse } from "next/server";
import { adminName, isAdminRequest } from "@/lib/admin-auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not connected yet — awarding points is disabled in demo mode." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const houseId = Number(body.house_id);
  const points = Number(body.points);
  const eventId = typeof body.event_id === "string" && body.event_id ? body.event_id : null;
  const note = typeof body.note === "string" && body.note.trim() ? body.note.trim() : null;

  if (!Number.isInteger(houseId) || houseId <= 0) {
    return NextResponse.json({ error: "Pick a house." }, { status: 400 });
  }
  if (!eventId) {
    return NextResponse.json({ error: "Pick the event this award ties back to." }, { status: 400 });
  }
  if (!Number.isFinite(points) || points === 0) {
    return NextResponse.json({ error: "Points must be a non-zero number." }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("point_awards")
    .insert({
      house_id: houseId,
      event_id: eventId,
      points: Math.trunc(points),
      note,
      awarded_by: await adminName(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, award: data });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not connected yet — demo data can't be changed." },
      { status: 503 }
    );
  }
  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Award id is required." }, { status: 400 });
  }
  const { error } = await getSupabase().from("point_awards").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
