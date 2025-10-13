import { useState } from "react";
import { createClient } from "@/utlis/supabase/supabase-client";
import { redirect } from "next/navigation";

export function useAuth() {
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false)

  const handleLogin = async (email : string, password : string) => {
    setFetching(true)
    setError(false)

    const supabase = createClient() 

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    console.log("Login response:", {data, error})

    if(error || !data?.session) {
      console.error("Login failed:", error)
      setError(true)
      setFetching(false)
      return {ok :false, message: error?.message};
    }
    else {
      setError(false)
      return {ok: true, message: "Login successful"}
    }
  }


  const handleSignout = async () => {
    const supabase = createClient();
    
    await supabase.auth.signOut();
    
    redirect("/login")
  }

  return { handleLogin, handleSignout, error, fetching }
} 