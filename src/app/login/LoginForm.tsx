"use client";

import { useState } from "react"
import { useAuth } from "@/hooks/authHooks";
import { redirect } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";



export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { handleLogin, error, fetching } = useAuth()

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await handleLogin(email, password)

    if (res?.ok)
      redirect("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 items-center justify-center min-h-screen">
      <Image className="lg:hidden block" src="/bg-logo.svg" alt="Blugibbon Logo" width={200} height={100} />
      <h1 className="font-bold text-4xl mt-8 mb-4">Welcome Back!👋</h1>
      <h2 className="text-lg">Sign in to see your next Locum jobs now!</h2>

      <div className="flex-col grid grid-rows-2 gap-4 mt-4">
        <span className="flex gap-4 items-center justify-between">
          <label htmlFor="username" className="font-semibold text-lg">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="username" className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none" placeholder="sample@mail.com" />
        </span>

        <span className="flex gap-4 items-center justify-between">
          <label htmlFor="password" className="font-semibold text-lg">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none" placeholder="••••••••" />
        </span>
      </div>

      <p className={`${error ? "text-red-500" : "hidden"}`}>Login failed. Please try again.</p>

      {/* {
        fetching ?  (<span className="flex gap-2 mt-6 justify-center items-center"><p>Logging in...</p> <AiOutlineLoading3Quarters className="animate-spin inline-block" size={20} /></span>) : 
        (
        <button
          className="bg-blue-600 text-white rounded-md mt-4 py-1 px-4 font-semibold hover:cursor-pointer hover:bg-blue-500 transition-colors duration-300 ease-in-out disabled:bg-gray-500"
          disabled={email == "" || password == ""}
          type="submit">
            {fetching ? <AiOutlineLoading3Quarters className="animate-spin inline-block" size={20} /> : "Login"}
          </button>
        )
      } */}

      <button
        className="bg-blue-600 flex items-center justify-center text-white rounded-md mt-4 py-1 px-4 w-[72px] h-[36px] font-semibold hover:cursor-pointer hover:bg-blue-500 transition-colors duration-300 ease-in-out disabled:bg-gray-500"
        disabled={email == "" || password == ""}
        type="submit">
          {fetching ? <AiOutlineLoading3Quarters className="animate-spin inline-block" size={20} /> : "Login"}
      </button>

    </form>
  )
}