"use client";

import { useTab } from "@/hooks/tabHooks";
import HomeSection from "./_sections/HomeSection";
import MapSection from "./_sections/MapSection";
import { useJobs } from "@/hooks/jobsHooks";
import { useState } from "react";
import FilterSection from "./_sections/FilterSection";
import { FiltersType } from "./_sections/FilterSection";
import { useAuth } from "@/hooks/authHooks";


export default function Dashboard(){
  const [filters, setFilters] = useState<FiltersType>({
    job: undefined,
    state: undefined,
    startDate: undefined,
    endDate: undefined,
    keyword: undefined,
    title: undefined
  });
  const { res, isLoading } = useJobs(filters);
  const jobs = res?.jobs || [];
  const [isList, setIsList] = useState(false);
  const [zoomTo, setZoomTo] = useState<number[] | null>(null);
  const { tab, router } = useTab();
    const { handleSignout } = useAuth();

  const zoomToJobLocation = (location: number[]) => {
    setZoomTo(location);
    router.replace("/dashboard?tab=map");
  };

  return(
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">BG Locum Mailer</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition-colors"
              onClick={handleSignout}
            >
              Sign Out
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => router.replace("/dashboard?tab=home")}
              className={`pb-2 px-4 font-semibold transition-colors hover:cursor-pointer ${
                tab === "home"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Jobs Board
            </button>
            <button
              onClick={() => router.replace("/dashboard?tab=map")}
              className={`pb-2 px-4 font-semibold transition-colors hover:cursor-pointer ${
                tab === "map"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Map View
            </button>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 py-4">
        <FilterSection filters={filters} setFilters={setFilters} />
      </div>

      {/* Main Content */}
      <main className="p-8">
        {/* Jobs Count & View Toggle */}
        {tab === "home" && (
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Available Jobs {jobs.length > 0 && `(${jobs.length})`}
              </h2>
              {isLoading && (
                <span className="text-sm text-gray-500">Loading...</span>
              )}
            </div>
            
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsList(false)}
                className={`px-4 py-2 rounded-md transition-colors hover:cursor-pointer ${
                  !isList
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsList(true)}
                className={`px-4 py-2 rounded-md transition-colors hover:cursor-pointer ${
                  isList
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {tab === "home" && (
            <HomeSection
              setIsList={setIsList}
              zoomToJobLocation={zoomToJobLocation}
              isList={isList}
              isLoading={isLoading}
              jobs={jobs}
            />
          )}
          {tab === "map" && (
            <div className="p-6">
              <MapSection zoomTo={zoomTo} jobs={jobs} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}