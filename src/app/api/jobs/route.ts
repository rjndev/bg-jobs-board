import { NextRequest } from "next/server";
import { createClient } from "@/utlis/supabase/supabase-server";
import { searchJobs } from "../_services/search.service";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Extract filters
  const job = request.nextUrl.searchParams.get("job");
  const location = request.nextUrl.searchParams.get("location");
  const shiftType = request.nextUrl.searchParams.get("shiftType");
  const startDate = request.nextUrl.searchParams.get("startDate");
  const endDate = request.nextUrl.searchParams.get("endDate");
  const limitParam = request.nextUrl.searchParams.get("limit");
  const state = request.nextUrl.searchParams.get("state");
  const title = request.nextUrl.searchParams.get("title");
  const keyword = request.nextUrl.searchParams.get("keyword");

  const limit = limitParam ? parseInt(limitParam) : 20;

  // Start with keyword search if present
  let jobs;
  if (keyword) {
    try {
      jobs = await searchJobs(keyword);
    } catch (error) {
      return Response.json({ message: "Error searching jobs", error }, { status: 500 });
    }
  }

  // If we have keyword results, filter them in memory
  if (jobs) {
    if (job) {
      jobs = jobs.filter(j => j.job.toLowerCase().includes(job.toLowerCase()));
    }
    if (location) {
      jobs = jobs.filter(j => j.location === location);
    }
    if (shiftType) {
      jobs = jobs.filter(j => j.shift_type === shiftType);
    }
    if (startDate) {
      jobs = jobs.filter(j => new Date(j.start_date) >= new Date(startDate));
    }
    if (endDate) {
      jobs = jobs.filter(j => new Date(j.end_date) <= new Date(endDate));
    }
    if (state) {
      jobs = jobs.filter(j => j.state === state);
    }
    if (title) {
      jobs = jobs.filter(j => j.title === title);
    }

    // Apply limit after all filters
    jobs = jobs.slice(0, limit);

    return Response.json({ count: jobs.length, jobs }, { status: 200 });
  }

  // If no keyword search, use regular query with all filters
  let query = supabase.from("jobs").select("*").order("created_at", { ascending: false });

  if (job) {
    query = query.ilike("job", `%${job}%`);
  }
  if (location) {
    query = query.ilike("location", `%${location}%`);
  }
  if (shiftType) {
    query = query.eq("shift_type", shiftType);
  }
  if (startDate) {
    query = query.gte("start_date", startDate);
  }
  if (endDate) {
    query = query.lte("end_date", endDate);
  }
  if (state && state !== "all") {
    query = query.eq("state", state.toLowerCase());
  }
  if (title && title !== "all") {
    // Title corresponds to parsed category string
    query = query.eq("title", title);
  }

  query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    return Response.json({ message: "Error fetching jobs", error }, { status: 500 });
  }

  return Response.json({ count: data?.length || 0, jobs: data || [] }, { status: 200 });
}