import { NextRequest } from "next/server";
import { createClient } from "@/utlis/supabase/supabase-server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = params;

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const updateData = {
    title: payload.title,
    job: payload.job,
    facility: payload.facility,
    location: payload.location,
    state: payload.state,
    shift_type: payload.shift_type,
    rate: payload.rate,
    start_date: payload.start_date || null,
    end_date: payload.end_date || null,
    is_urgent: payload.is_urgent ?? false,
    lat: payload.lat,
    long: payload.long,
  };

  const { data, error } = await supabase
    .from("jobs")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return Response.json({ message: "Error updating job", error }, { status: 500 });
  }

  return Response.json({ message: "Job updated", job: data }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = params;

  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) {
    return Response.json({ message: "Error deleting job", error }, { status: 500 });
  }

  return Response.json({ message: "Job deleted" }, { status: 200 });
}