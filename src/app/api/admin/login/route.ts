import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_NAME_COOKIE,
  sessionToken,
  verifyPasscode,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { passcode, name } = await req.json().catch(() => ({}));
  if (!verifyPasscode(passcode ?? "")) {
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12, // 12-hour session
  };
  res.cookies.set(ADMIN_COOKIE, sessionToken(), opts);
  if (typeof name === "string" && name.trim()) {
    res.cookies.set(ADMIN_NAME_COOKIE, name.trim().slice(0, 60), opts);
  }
  return res;
}
