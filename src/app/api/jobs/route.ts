
import { NextRequest } from "next/server";
import { createClient } from "@/utlis/supabase/supabase-server";


export async function GET(request : NextRequest) {

  const supabase = await createClient();

  //Extract filters
  const job = request.nextUrl.searchParams.get("job");
  const location = request.nextUrl.searchParams.get("location");
  const shiftType = request.nextUrl.searchParams.get("shiftType");
  const dateStart = request.nextUrl.searchParams.get("dateStart");
  const dateEnd = request.nextUrl.searchParams.get("dateEnd");
  const limitParam = request.nextUrl.searchParams.get("limit");
  const state = request.nextUrl.searchParams.get("state")
  const title = request.nextUrl.searchParams.get("title")

  const limit = limitParam ? parseInt(limitParam) : 20;

  let query = supabase.from("jobs").select("*").order("created_at", { ascending: false });

  if (job) {
    query = query.ilike("job", `%${job}%`);
  }

  if (location) {
    query = query.eq("location", location);
  }

  if (shiftType) {
    query = query.eq("shiftType", shiftType);
  }

  if (dateStart) {
    query = query.gte("dateStart", dateStart);
  }

  if (dateEnd) {
    query = query.lte("dateEnd", dateEnd);
  }

  if (state) {
    query = query.eq("state", state)
  }

  if (title) {
    query = query.eq("title", title)
  }

  console.log("Job ", job)

  query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    return Response.json({ message: "Error fetching jobs", error }, { status: 500 });
  }

  return Response.json({ count: data?.length || 0, jobs: data || [] }, { status: 200 });
}