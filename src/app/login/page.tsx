import { redirect } from "next/navigation";
import { createClient } from "@/utlis/supabase/supabase-server";
import LoginForm from "./LoginForm";


export default async function Login() {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();

  if(!authError && data?.claims) {
    redirect("/dashboard")
  }

  return (
    <div>
      <LoginForm />
    </div>
  )
}