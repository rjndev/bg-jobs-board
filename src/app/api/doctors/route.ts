import { NextRequest } from "next/server";
import { createClient } from "@/utlis/supabase/supabase-server";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  const is_admin = request.nextUrl.searchParams.get("is_admin");

  const supabase = await createClient();

  //Query using email and is_admin
  let query = supabase.from("doctors").select("id, email, first_name, last_name, is_admin");
  if (email) {
    query = query.eq("email", email);
  }
  if (is_admin) {
    query = query.eq("is_admin", is_admin === "true");
  }
  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ doctors: data }), { status: 200 });
}