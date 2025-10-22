"use client";

import { useTab } from "@/hooks/tabHooks";
import HomeSection from "./_sections/HomeSection";
import MapSection from "./_sections/MapSection";
import { useJobs } from "@/hooks/jobsHooks";
import { useState } from "react";
import FilterSection from "./_sections/FilterSection";
import { FiltersType } from "./_sections/FilterSection";


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

  return(
    <div>
      <FilterSection 
        filters={filters}
        setFilters={setFilters}
      />
      { tab == "home" && <HomeSection isLoading={isLoading} jobs={jobs} />}
      { tab == "map" && <MapSection jobs={jobs!} />}
    </div>
  );
}

