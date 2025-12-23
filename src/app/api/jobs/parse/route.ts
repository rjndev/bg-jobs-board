import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    error: "This endpoint has moved to /api/jobs/upload",
    moved: "/api/jobs/upload",
  }, { status: 410 });
}
