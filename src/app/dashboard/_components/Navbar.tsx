"use client";

import { useAuth } from "@/hooks/authHooks";
import { useTab } from "@/hooks/tabHooks";

export default function Navbar(){
  const { handleSignout } = useAuth();
  const { tab, router } = useTab();


  return(
    <div className="flex justify-between py-4 px-8 border border-gray-300 w-full">
      <div className="flex gap-16">
        <div className="font-bold text-lg rounded-lg px-4 py-2  bg-blue-500 text-white">
          BG Locum Mailer
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button onClick={() => router.replace("/dashboard?tab=home")} className={`hover:cursor-pointer hover:underline ${tab === "home" ? "font-bold" : ""}`}>Home</button>
          <button onClick={() => router.replace("/dashboard?tab=map")} className={`hover:cursor-pointer hover:underline ${tab === "map" ? "font-bold" : ""}`}>Map</button>
        </div>
      </div>

      <div className="flex flex-col">
        Hello, RJ
        <button onClick={handleSignout} className="text-sm hover:cursor-pointer text-blue-500 underline">Logout</button>
      </div>
    </div>
  );
}