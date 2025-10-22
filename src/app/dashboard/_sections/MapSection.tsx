"use client";
import dynamic from "next/dynamic";
import { Job } from "@/types/job-types";

const MapComponent = dynamic(() => import("../_components/MapComponent"), {
  ssr: false
});

type MapSectionProps = {
  jobs : Job[]
}

export default function MapSection({ jobs } : MapSectionProps) {
  return (
    <MapComponent jobs={jobs} />
  )
}