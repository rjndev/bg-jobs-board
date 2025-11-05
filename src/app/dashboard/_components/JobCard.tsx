import { Job } from "@/types/job-types";
import { FaMapMarkedAlt  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export type JobCardProps = {
  job : Job;
  zoomToJobLocation : (location: number[]) => void
}

export default function JobCard({ job, zoomToJobLocation }: JobCardProps) {    
  return (
    <div className="border relative hover:cursor-pointer border-gray-300 rounded-lg p-4 max-w-[300px] shadow-md hover:shadow-lg transition-shadow duration-300">
      {
        job.is_urgent && <div className="rounded-lg absolute right-1 top-1 animate-pulse border-gray-500 w-fit p-1 text-[11px] bg-purple-500 text-white font-semibold">URGENT</div>
      }
      <h2 className="text-xl font-bold mb-2">{job.facility}</h2>
      <p className="text-gray-800">
        <span className="font-semibold">Job</span>: {job.job}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Location</span>: {job.location}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Date</span>: {job.start_date} -- {job.end_date}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Rate</span>: {job.rate}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Shift Type</span>: {job.shift_type}
      </p>

        <div className="flex gap-8 justify-center items-center mt-6">
          <FaMapMarkedAlt onClick={() => zoomToJobLocation([job.lat, job. long])} className="hover:cursor-pointer font text-blue-700 hover:text-blue-500 transition-colors"  size={28} />
          <MdEmail className="hover:cursor-pointer text-green-600 hover:text-green-500 transition-colors" size={28} />
        </div>
    </div>
  );
}