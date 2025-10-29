"use client";

import dynamic from "next/dynamic";
import { Job } from "@/types/job-types";
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false
});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false
});

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false
});

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false
});

type MapComponentProps = {
  jobs : Job[],
  zoomTo : number[] | null  
}

export default function MapComponent({ jobs, zoomTo } : MapComponentProps) {
  return (
    <div className="h-full">  
      <div className="w-full flex justify-center mt-4">
        <MapContainer 
          center={[-33.8727, 151.2057]} zoom={12} style={{ height: "600px", width: "600px" }}>
          <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapWrapper zoomTo={zoomTo} jobs={jobs} />
        </MapContainer>
      </div>
    </div>
  )
}

function MapWrapper({jobs, zoomTo} : {jobs : Job[], zoomTo : number[] | null}) {
  const map = useMap()

  useEffect(() => {
    if(map && zoomTo)
      map.panTo([zoomTo[0], zoomTo[1]])
  }, [map, zoomTo])

  return (
    <>
      {
        jobs?.map(job => (
          <Marker key={job.id} position={[job.lat, job.long]}>
            <Popup>
              {job.facility}
            </Popup>
          </Marker>
        ))
      }      
    </>
  )
}