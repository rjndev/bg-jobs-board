import { NextResponse } from "next/server";
import { createClient } from "@/utlis/supabase/supabase-server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("doctors")
      .update({ is_approved: true })
      .eq("id", id)
      .select("id, email, first_name, last_name")
      .single();

    if (error) {
      console.error("Error approving doctor:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Doctor approved successfully",
      doctor: data 
    }, { status: 200 });
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 });
  }
}
