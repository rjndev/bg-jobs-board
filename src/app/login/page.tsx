import { redirect } from "next/navigation";
import { createClient } from "@/utlis/supabase/supabase-server";
import LoginForm from "./LoginForm";
import Image from "next/image";


export default async function Login() {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();

  if(!authError && data?.claims) {
    // Check if user is admin
    const { data: doctor } = await supabase
      .from("doctors")
      .select("is_admin")
      .eq("email", data.claims.email)
      .maybeSingle();
    
    if (doctor?.is_admin) {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex">
      <LoginForm />
      <div className=" bg-linear-to-r from-cyan-300 to-blue-400  w-full lg:block hidden flex-1 flex-col justify-center items-center">
        {/* Decorative side - can add image or branding here */}

        <div className="flex items-center justify-center flex-col h-full">
          <Image className="lg:block hidden" src="/bg-logo.svg" alt="Blugibbon Logo" width={420} height={220} />
          <h2 className="p-8 text-2xl text-blue-900">Welcome to our Locum Mailer!</h2>
          <p className="text-blue-900 p-8 text-xl">Please login to continue.</p>
        </div>
      </div>
    </div>
  )
}