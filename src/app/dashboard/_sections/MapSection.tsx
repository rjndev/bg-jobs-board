"use client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../_components/MapComponent"), {
  ssr: false
});

export default function MapSection() {
  return (
    <MapComponent />
  )
}