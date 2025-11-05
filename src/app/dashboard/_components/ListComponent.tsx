import { Job } from "@/types/job-types"
import { FaMapMarkedAlt  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type ListComponentProps ={
  job : Job,
  zoomToJobLocation : (location: number[]) => void
}

export default function ListComponent({ job, zoomToJobLocation } : ListComponentProps) {

  console.log("Start date", job.start_date)
  return (
    <tr className="border-gray-300 border-b relative">
      {
        job.is_urgent ? <td className="text-center rounded-lg absolute left-3 top-4 animate-pulse border-gray-500 w-fit p-1 text-[11px] bg-purple-500 text-white font-semibold">URGENT</td> : <td></td>
      }
      <th className="py-4 font-bold text-center">{job.job}</th>
      <td className="text-center">{job.location}</td>
      <td className="text-center">{`${new Date(job.start_date).toLocaleDateString()} - ${new Date(job.end_date).toLocaleDateString()}`}</td>
      <td className="text-center">{job.rate}</td>
      <td className="text-center">{job.shift_type}</td>
      <td>
        <div className="flex gap-8 justify-center items-center">
          <FaMapMarkedAlt onClick={() => zoomToJobLocation([job.lat, job.long])} className="hover:cursor-pointer font text-blue-700 hover:text-blue-500 transition-colors"  size={24} />
          <MdEmail className="hover:cursor-pointer text-green-600 hover:text-green-500 transition-colors" size={24} />
        </div>
      </td>
    </tr>
  )
}