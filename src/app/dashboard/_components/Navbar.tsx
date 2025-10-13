"use client";

import { useAuth } from "@/hooks/authHooks";

export default function Navbar(){
  const { handleSignout } = useAuth();

  return(
    <div className="flex justify-between py-4 px-8 border border-gray-300 w-full">
      <div className="font-bold text-lg rounded-lg px-4 py-2  bg-blue-500 text-white">
        BG Locum Mailer
      </div>

      <div className="flex flex-col">
        Hello, RJ
        <button onClick={handleSignout} className="text-sm hover:cursor-pointer text-blue-500 underline">Logout</button>
      </div>
    </div>
  );
}