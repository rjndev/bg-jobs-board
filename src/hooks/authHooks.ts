import { useState } from "react";
import { createClient } from "@/utlis/supabase/supabase-client";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

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
      setFetching(false)
      return {ok: true, message: "Login successful"}
    }
  }


  const handleSignup = async ({
    email,
    password,
    firstName,
    lastName,
    drNumber
  }: { email: string; password: string; firstName: string; lastName: string; drNumber: string; }) => {
    setFetching(true)
    setError(false)

    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      // Supabase handles hashing internally; pass raw password here
      password,
      options: {
        data: {
          firstName,
          lastName,
          drNumber
        }
      }
    });

    if (error) {
      console.error("Signup failed:", error)
      setError(true)
      setFetching(false)
      return { ok: false, message: error.message };
    }

    const user = data?.user;
    if (!user) {
      setError(true)
      setFetching(false)
      return { ok: false, message: "Signup failed: no user returned" };
    }


    // Store hashed copy for local credential checks (NextAuth / legacy)
    const passwordHash = await bcrypt.hash(password, 10);

    const { error: doctorError } = await supabase.from("doctors").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password: passwordHash,
      dr_number: drNumber,
      is_approved: false,
      created_at: new Date().toISOString(),
    });

    if (doctorError) {
      console.error("Doctor profile insert failed:", doctorError)
      setError(true)
      setFetching(false)
      return { ok: false, message: doctorError.message };
    }

    setError(false)
    setFetching(false)
    return { ok: true, message: "Signup successful", data };
  }


  const handleSignout = async () => {
    const supabase = createClient();
    
    await supabase.auth.signOut();
    
    redirect("/login")
  }

  return { handleLogin, handleSignup, handleSignout, error, fetching }
} 