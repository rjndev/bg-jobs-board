import { Job } from "@/types/job-types"
import ListComponent from "../_components/ListComponent"
import { AiOutlineLoading3Quarters } from "react-icons/ai"


type ListSectionProps = {
  jobs : Job[],
  isLoading : boolean,
  zoomToJobLocation : (location: number[]) => void
}

export default function ListSection({ jobs , isLoading, zoomToJobLocation } : ListSectionProps) {

  if(isLoading) return (
    <div className="w-full flex justify-center items-center mt-24 h-full">
      <AiOutlineLoading3Quarters className="animate-spin inline-block mx-auto" size={30} />
    </div>
  )

  return (
    <table className="w-full">
      <Header />
      <tbody>
        {
          jobs && jobs.map(job => (
            <ListComponent
              zoomToJobLocation={zoomToJobLocation}
              key={job.id} 
              job={job}
            />
          ) 
        )
        }
      </tbody>
    </table>
  )
}

function Header() {
  return (
    <thead className="font-bold py-2 border-gray-400 border-t border-b">
      <tr>
        <th></th>
        <th className="py-2">Job</th>
        <th>Location</th>
        <th>Date</th>
        <th>Rate</th>
        <th>Shift</th>
      </tr>
    </thead>
  )
}