import { NextRequest, NextResponse } from "next/server";
import { lookupStudent } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const netid = req.nextUrl.searchParams.get("netid") ?? "";
  if (!netid.trim()) {
    return NextResponse.json({ error: "Enter a NetID." }, { status: 400 });
  }
  try {
    const result = await lookupStudent(netid);
    if (!result) return NextResponse.json({ found: false });
    const { student, house } = result;
    // Own-lookup only: return the student's first name + house, nothing else.
    return NextResponse.json({
      found: true,
      firstName: student.name.split(" ")[0],
      house: {
        name: house.name,
        slug: house.slug,
        color: house.color,
        crest_url: house.crest_url,
        groupme_url: house.groupme_url,
        leaders: house.leaders ?? [],
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Lookup failed." }, { status: 500 });
  }
}
