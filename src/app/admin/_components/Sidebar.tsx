"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FiUsers, FiBriefcase } from "react-icons/fi";

export function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "jobs";

  const handleTabChange = (tab: "jobs" | "doctors") => {
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <div className="border border-gray-400 p-2 rounded-md mx-2 my-4 flex flex-col gap-2">
      {/* Jobs Tab */}
      <button
        onClick={() => handleTabChange("jobs")}
        className={`flex flex-col gap-2 items-center justify-center p-3 rounded-lg transition-all ${
          currentTab === "jobs"
            ? "bg-blue-100 border border-blue-400"
            : "hover:bg-gray-100"
        }`}
        title="Jobs"
      >
        <FiBriefcase
          size={24}
          className={currentTab === "jobs" ? "text-blue-600" : "text-gray-600"}
        />
        <p className="text-xs text-center">Jobs</p>
      </button>

      {/* Pending Doctors Tab */}
      <button
        onClick={() => handleTabChange("doctors")}
        className={`flex flex-col gap-2 items-center justify-center p-3 rounded-lg transition-all ${
          currentTab === "doctors"
            ? "bg-blue-100 border border-blue-400"
            : "hover:bg-gray-100"
        }`}
        title="Pending Doctors"
      >
        <FiUsers
          size={24}
          className={currentTab === "doctors" ? "text-blue-600" : "text-gray-600"}
        />
        <p className="text-xs text-center">Doctors</p>
      </button>
    </div>
  );
}