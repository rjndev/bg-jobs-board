import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utlis/supabase/supabase-server";
import { parseJobsFromText } from "@/utlis/jobParser";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Increase max file size to 10MB
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

function monthToNumber(month: string): number | null {
  const map: Record<string, number> = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11,
  };
  const key = month.toLowerCase();
  return key in map ? map[key] : null;
}

function parseStartDateFromSchedule(schedule: string): string | null {
  // Examples: "28–30 Jan 2026 08:00–08:00", "24 Dec 2025 12:00–20:30", "24–28 Nov 2025 08:00–17:00"
  const regex = /(\d{1,2})[\s–-]*(?:\d{1,2}\s+)?([A-Za-z]{3,})\s+(\d{4})/;
  const match = schedule.match(regex);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const monthIdx = monthToNumber(match[2]);
  const year = parseInt(match[3], 10);
  if (Number.isNaN(day) || monthIdx === null || Number.isNaN(year)) return null;
  const date = new Date(Date.UTC(year, monthIdx, day));
  return date.toISOString();
}

function auStateToCode(name?: string | null): string | null {
  if (!name) return null;
  const n = name.toLowerCase();
  if (n.includes("new south wales") || n === "nsw") return "nsw";
  if (n.includes("victoria") || n === "vic") return "vic";
  if (n.includes("queensland") || n === "qld") return "qld";
  if (n.includes("south australia") || n === "sa") return "sa";
  if (n.includes("western australia") || n === "wa") return "wa";
  if (n.includes("tasmania") || n === "tas") return "tas";
  if (n.includes("northern territory") || n === "nt") return "nt";
  if (n.includes("australian capital territory") || n === "act") return "act";
  return null;
}

async function geocodeLocation(
  location: string,
  cache: Map<string, { lat: number | null; long: number | null; state: string | null }>
) {
  if (cache.has(location)) return cache.get(location)!;

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=au&q=${encodeURIComponent(location)}&limit=1`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "blugibbon-jobs-board/1.0 (jobs upload)",
      },
    });
    if (!res.ok) throw new Error("Geocode request failed");
    const data: any[] = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];
      const lat = first?.lat ? Number(first.lat) : null;
      const long = first?.lon ? Number(first.lon) : null;
      const addr = first?.address || {};
      const isAU = (addr?.country_code === "au") || (addr?.country?.toLowerCase?.() === "australia");
      const stateName: string | null = addr?.state || addr?.region || addr?.state_district || null;
      const state = isAU ? auStateToCode(stateName) : null;
      const result = { lat: Number.isFinite(lat) ? lat : null, long: Number.isFinite(long) ? long : null, state };
      cache.set(location, result);
      return result;
    }
  } catch (err) {
    console.error("Geocode error for", location, err);
  }
  const fallback = { lat: null, long: null, state: null };
  cache.set(location, fallback);
  return fallback;
}

async function getTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  if (fileType === "text/plain" || fileName.endsWith(".txt")) {
    return await file.text();
  }

  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    const pdfParse = require("pdf-parse/lib/pdf-parse");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);
    return data.text as string;
  }

  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const mammoth = require("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await mammoth.extractRawText({ buffer });
    return result.value as string;
  }

  throw new Error("Unsupported file type. Please upload a .txt, .pdf, or .docx file.");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    let text = "";
    try {
      text = await getTextFromFile(file);
    } catch (err: any) {
      return NextResponse.json({ error: err?.message || "Failed to parse file" }, { status: 400 });
    }

    const parsedJobs = parseJobsFromText(text);
    if (!parsedJobs.length) {
      return NextResponse.json({ error: "No jobs found in file" }, { status: 400 });
    }

    const supabase = await createClient();
    const geoCache = new Map<string, { lat: number | null; long: number | null; state: string | null }>();

    const records = await Promise.all(
      parsedJobs.map(async (job) => {
        const startDate = parseStartDateFromSchedule(job.schedule);
        const geo = await geocodeLocation(job.location, geoCache);

        return {
          title: job.category,
          job: job.jobTitle,
          facility: job.hospital || job.location,
          location: job.location,
          state: geo.state,
          start_date: startDate,
          end_date: null,
          rate: job.pay ? `$${job.pay}` : null,
          shift_type: "Flexible",
          is_urgent: false,
          lat: geo.lat,
          long: geo.long,
        };
      })
    );

    const { data, error } = await supabase.from("jobs").insert(records).select("id");
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      parsed: parsedJobs.length,
      inserted: data?.length || 0,
    });
  } catch (error: any) {
    console.error("Error processing upload:", error);
    return NextResponse.json({ error: error?.message || "Failed to process file" }, { status: 500 });
  }
}
