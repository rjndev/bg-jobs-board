"use client";

import { createClient } from "@/utlis/supabase/supabase-client";
import { redirect } from "next/navigation";

export default function Navbar(){
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    redirect("/login");
  }

  return(
    <div className="flex justify-between py-4 px-8 border border-gray-300 w-full">
      <div className="font-bold text-lg rounded-lg px-4 py-2  bg-blue-500 text-white">
        BG Locum Mailer
      </div>

      <div className="flex flex-col">
        Hello, RJ
        <button onClick={handleSignOut} className="text-sm hover:cursor-pointer text-blue-500 underline">Logout</button>
      </div>
    </div>
  );
}