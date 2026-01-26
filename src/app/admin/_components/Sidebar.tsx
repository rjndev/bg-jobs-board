"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FiUsers, FiBriefcase, FiLogOut, FiUpload } from "react-icons/fi";
import { useAuth } from "@/hooks/authHooks";

export function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "jobs";
  const { handleSignout } = useAuth();

  const handleTabChange = (tab: "jobs" | "doctors" | "upload") => {
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

      {/* Upload Jobs Tab */}
      <button
        onClick={() => handleTabChange("upload")}
        className={`flex flex-col gap-2 items-center justify-center p-3 rounded-lg transition-all ${
          currentTab === "upload"
            ? "bg-blue-100 border border-blue-400"
            : "hover:bg-gray-100"
        }`}
        title="Upload Jobs"
      >
        <FiUpload
          size={24}
          className={currentTab === "upload" ? "text-blue-600" : "text-gray-600"}
        />
        <p className="text-xs text-center">Upload</p>
      </button>

      {/* Sign Out Button */}
      <button
        onClick={handleSignout}
        className="flex flex-col gap-2 items-center justify-center p-3 rounded-lg transition-all hover:bg-red-50 border border-transparent hover:border-red-400 mt-auto"
        title="Sign Out"
      >
        <FiLogOut
          size={24}
          className="text-gray-600 hover:text-red-600"
        />
        <p className="text-xs text-center">Sign Out</p>
      </button>
    </div>
  );
}