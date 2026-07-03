import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { EVENT_TYPES } from "@/lib/types";

export const dynamic = "force-dynamic";

const DEMO_ERROR = NextResponse.json(
  { error: "Supabase is not connected yet — event changes are disabled in demo mode." },
  { status: 503 }
);

type EventInput = {
  title?: unknown;
  description?: unknown;
  date?: unknown;
  location?: unknown;
  points_available?: unknown;
  type?: unknown;
};

function validateEvent(body: EventInput) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const date = typeof body.date === "string" ? body.date : "";
  const type = typeof body.type === "string" ? body.type : "";
  if (!title) return { error: "Title is required." };
  if (!date || Number.isNaN(Date.parse(date))) return { error: "A valid date is required." };
  if (!EVENT_TYPES.includes(type as (typeof EVENT_TYPES)[number])) {
    return { error: "Type must be challenge, bonding, trivia, or collaboration." };
  }
  const points =
    body.points_available === null || body.points_available === undefined || body.points_available === ""
      ? null
      : Number(body.points_available);
  if (points !== null && (!Number.isFinite(points) || points < 0)) {
    return { error: "Points available must be a non-negative number." };
  }
  return {
    value: {
      title,
      description: typeof body.description === "string" && body.description.trim() ? body.description.trim() : null,
      date: new Date(date).toISOString(),
      location: typeof body.location === "string" && body.location.trim() ? body.location.trim() : null,
      points_available: points,
      type,
    },
  };
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSupabaseConfigured()) return DEMO_ERROR;
  const body = await req.json().catch(() => ({}));
  const check = validateEvent(body);
  if ("error" in check) return NextResponse.json({ error: check.error }, { status: 400 });
  const { data, error } = await getSupabase().from("events").insert(check.value).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, event: data });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSupabaseConfigured()) return DEMO_ERROR;
  const body = await req.json().catch(() => ({}));
  if (typeof body.id !== "string" || !body.id) {
    return NextResponse.json({ error: "Event id is required." }, { status: 400 });
  }
  const check = validateEvent(body);
  if ("error" in check) return NextResponse.json({ error: check.error }, { status: 400 });
  const { data, error } = await getSupabase()
    .from("events")
    .update(check.value)
    .eq("id", body.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, event: data });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSupabaseConfigured()) return DEMO_ERROR;
  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Event id is required." }, { status: 400 });
  }
  const { error } = await getSupabase().from("events").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
