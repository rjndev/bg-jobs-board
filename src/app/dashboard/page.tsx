"use client";

import { useTab } from "@/hooks/tabHooks";
import HomeSection from "./_sections/HomeSection";
import MapSection from "./_sections/MapSection";
import { useJobs } from "@/hooks/jobsHooks";
import { useState } from "react";
import FilterSection from "./_sections/FilterSection";
import { FiltersType } from "./_sections/FilterSection";
import { ViewOptions } from "./_components/ViewOptions";




export default function Dashboard(){
  const { tab } = useTab();
  const [filters , setFilters] = useState<FiltersType>({
    job : undefined,
    state : undefined,
    startDate : undefined,
    endDate : undefined,
    keyword : undefined,
    title: undefined
  })
  const { res, isLoading } = useJobs(filters);
  const jobs = res?.jobs
  const [isList , setIsList] = useState(false)

  return(
    <div>
      <FilterSection 
        filters={filters}
        setFilters={setFilters}
      />

      <span className="flex justify-between mt-8 items-center px-8">
        <h1 className="text-xl h-full text-center self-center">Jobs Available today! 🚀</h1>
        <ViewOptions isList={isList} setIsList={setIsList} />
      </span>

      { tab == "home" && <HomeSection isLoading={isLoading} jobs={jobs} />}
      { tab == "map" && <MapSection jobs={jobs!} />}
    </div>
  );
}

