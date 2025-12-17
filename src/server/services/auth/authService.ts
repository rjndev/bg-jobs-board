import { createClient } from "@/utlis/supabase/supabase-server";
import bcrypt from "bcryptjs";

export async function authUser(email: string | undefined, password: string | undefined) {
  if (!email || !password) throw new Error("Missing credentials");

  const supabase = await createClient();
  const { data: doctor, error } = await supabase
    .from("doctors")
    .select("id, email, password_hash, first_name, last_name")
    .eq("email", email)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!doctor) throw new Error("Invalid User");

  const ok = await bcrypt.compare(password, doctor.password_hash);
  if (!ok) throw new Error("Invalid User");

  return {
    user: {
      id: doctor.id,
      email: doctor.email,
      name: `${doctor.first_name} ${doctor.last_name}`,
    },
  };
}