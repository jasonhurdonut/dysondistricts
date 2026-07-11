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
  end_time?: unknown;
  image_url?: unknown;
  what_to_bring?: unknown;
  who_can_attend?: unknown;
};

function optionalText(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

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
  const endTime = optionalText(body.end_time);
  if (endTime && !/^\d{2}:\d{2}(:\d{2})?$/.test(endTime)) {
    return { error: "End time must be HH:MM." };
  }
  return {
    value: {
      title,
      description: optionalText(body.description),
      date: new Date(date).toISOString(),
      location: optionalText(body.location),
      points_available: points,
      type,
      end_time: endTime,
      image_url: optionalText(body.image_url),
      what_to_bring: optionalText(body.what_to_bring),
      who_can_attend: optionalText(body.who_can_attend),
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
