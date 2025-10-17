"use client";
    // import { MapContainer, TileLayer } from "react-leaflet";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

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


export default function MapComponent() {
  return (
    <div className="h-full">  
      <div className="w-full flex justify-center mt-4">
        <MapContainer center={[-33.8727, 151.2057]} zoom={12} style={{ height: "600px", width: "600px" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

            <Marker position={[-33.8727, 151.2057]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>

            <Marker position={[-33.8927, 151.2057]}>
              <Popup>
                Second Popup
              </Popup>
            </Marker>
        </MapContainer>
      </div>
    </div>
  )
}