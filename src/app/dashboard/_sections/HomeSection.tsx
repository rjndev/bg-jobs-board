import FilterSection from "./FilterSection"
import CardSection from "./CardSection"

export default function HomeSection() {
  return (
    <div>
      <div className="flex flex-col gap-12 justify-center items-center p-8 pb-20">
        <FilterSection />
        <CardSection cards={sampleCards} />
      </div>      
    </div>
  )
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
