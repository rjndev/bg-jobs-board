"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAuth} from "@/hooks/authHooks";
import { useState } from "react";


export default function Login() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { handleLogin, error, fetching } = useAuth(email, password)

  console.log("Fetching ", fetching)

  if (session)
    redirect("/dashboard");


  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <h1 className="font-bold text-lg">BG Locum Mailer Login</h1>

        <div className="flex flex-col gap-4">
          <span className="flex gap-4 items-center justify-between">
            <label htmlFor="username" className="font-semibold">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="username" className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none" placeholder="sample@mail.com" />
          </span>

          <span className="flex gap-4 items-center justify-center">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none" placeholder="••••••••" />
          </span>
        </div>

        <p className={`${error ? "text-red-500" : "hidden"}`}>Login failed. Please try again.</p>

        {
          fetching ?  (<p>Logging in...</p>) : 
          (
          <button
            className="bg-blue-600 text-white rounded-md mt-4 py-1 px-4 font-semibold hover:cursor-pointer hover:bg-blue-500 transition-colors duration-300 ease-in-out disabled:bg-gray-500"
            disabled={email == "" || password == ""}
            onClick={handleLogin}>
              Login
            </button>
          )
        }
        
      </div>
    </div>
  )
}