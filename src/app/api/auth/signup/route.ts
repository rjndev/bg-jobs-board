import { NextResponse } from "next/server";
import { createClient } from "@/utlis/supabase/supabase-server";
// Uses bcryptjs; ensure it's installed: npm i bcryptjs
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { firstName, lastName, email, password, drNumber } = payload || {};

    if (!firstName || !lastName || !email || !password || !drNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // Check if email already exists
    const { data: existing, error: existingErr } = await supabase
      .from("doctors")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingErr) {
      return NextResponse.json({ error: existingErr.message }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Hash password for local credential checks (Supabase Auth hashes internally for its own table)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert doctor record
    const { data, error } = await supabase.from("doctors").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password_hash: passwordHash,
      dr_number: drNumber,
      created_at: new Date().toISOString(),
    }).select("id").maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 });
  }
}
