"use client";

import FilterSection from "./_sections/FilterSection";
import CardSection from "./_sections/CardSection";
import { useSession } from "next-auth/react";


export default function Dashboard(){
  const {data : session} = useSession();

  console.log("Session data:", session);

  return(
    <div className="flex flex-col gap-12 justify-center items-center p-8 pb-20">
      <FilterSection />
      <CardSection cards={sampleCards} />
    </div>
  );
}

const sampleCards = [
  {
    hospital: "City Hospital",
    job: "Registered Nurse",
    location: "New York, NY",
    rate: "$45/hr",                   
    shiftType: "Day",
    dateStart: "2023-10-01",
    dateEnd: "2023-10-15"
  },
  {
    hospital: "City Hospital",
    job: "Registered Nurse",
    location: "New York, NY",
    rate: "$45/hr",
    shiftType: "Day",
    dateStart: "2023-10-01",
    dateEnd: "2023-10-15"
  },
  {
    hospital: "City Hospital",
    job: "Registered Nurse",
    location: "New York, NY",
    rate: "$45/hr",
    shiftType: "Day",
    dateStart: "2023-10-01",
    dateEnd: "2023-10-15"
  },
  {
    hospital: "City Hospital",
    job: "Registered Nurse",
    location: "New York, NY",
    rate: "$45/hr",
    shiftType: "Day",
    dateStart: "2023-10-01",
    dateEnd: "2023-10-15"
  },
  {
    hospital: "City Hospital",
    job: "Registered Nurse",
    location: "New York, NY",
    rate: "$45/hr",
    shiftType: "Day",
    dateStart: "2023-10-01",
    dateEnd: "2023-10-15"
  },
  {
    hospital: "City Hospital",
    job: "Registered Nurse",
    location: "New York, NY",
    rate: "$45/hr",
    shiftType: "Day",
    dateStart: "2023-10-01",
    dateEnd: "2023-10-15"
  }
]
