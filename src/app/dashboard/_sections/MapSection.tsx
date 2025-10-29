"use client";
import dynamic from "next/dynamic";
import { Job } from "@/types/job-types";

const MapComponent = dynamic(() => import("../_components/MapComponent"), {
  ssr: false
});

type MapSectionProps = {
  jobs : Job[],
  zoomTo : number[] | null
}

export default function MapSection({ jobs, zoomTo } : MapSectionProps) {
  return (
    <MapComponent zoomTo={zoomTo} jobs={jobs} />
  )
}