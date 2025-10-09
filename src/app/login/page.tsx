"use client";

import { signIn } from "next-auth/react";


export default function Login() {
  const handleLogin = async () => {
    const email = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    console.log("Logging in with:", { email, password });

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard"
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <h1 className="font-bold text-lg">BG Locum Mailer Login</h1>

        <div className="flex flex-col gap-4">
          <span className="flex gap-4 items-center justify-between">
            <label htmlFor="username" className="font-semibold">Email</label>
            <input type="text" id="username" className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none" placeholder="sample@mail.com" />
          </span>

          <span className="flex gap-4 items-center justify-center">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input type="password" id="password" className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none" placeholder="••••••••" />
          </span>
        </div>

        <button
         className="bg-blue-600 text-white rounded-md mt-4 py-1 px-4 font-semibold hover:cursor-pointer hover:bg-blue-500 transition-colors duration-300 ease-in-out"
         onClick={handleLogin}
        >Login</button>

      </div>
    </div>
  )
}