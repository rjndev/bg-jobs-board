"use client";

import { useTab } from "@/hooks/tabHooks";
import HomeSection from "./_sections/HomeSection";
import MapSection from "./_sections/MapSection";

export default function Dashboard(){
  const { tab } = useTab();

  return(
    <div>
      { tab == "home" && <HomeSection />}
      { tab == "map" && <MapSection />}
    </div>
  );
}

