export type JobCardProps = {
  hospital: string;
  job : string;
  location: string;
  rate: string;
  shiftType: string;
  dateStart: string;
  dateEnd: string;
}

export default function JobCard({ hospital, job, location, dateStart, dateEnd, rate, shiftType }: JobCardProps) {
  return (
    <div className="border hover:cursor-pointer border-gray-300 rounded-lg p-4 max-w-[300px] shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-2">{hospital}</h2>
      <p className="text-gray-800">
        <span className="font-semibold">Job</span>: {job}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Location</span>: {location}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Date</span>: {dateStart} -- {dateEnd}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Rate</span>: {rate}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Shift Type</span>: {shiftType}
      </p>
    </div>
  );
}