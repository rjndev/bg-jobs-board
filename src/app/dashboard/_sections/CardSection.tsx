import JobCard from "../_components/JobCard";
import { Job } from "@/types/job-types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export type CardSectionProps = {
  cards : Job[] | undefined,
  isLoading : boolean,
  zoomToJobLocation : (location: number[]) => void
}

export default function CardSection({ cards, isLoading, zoomToJobLocation}: CardSectionProps) {

  if(isLoading) return (
    <div className="w-full flex justify-center items-center mt-24 h-full">
      <AiOutlineLoading3Quarters className="animate-spin inline-block mx-auto" size={30} />
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-fit">
      {
        cards && cards.map((card, index) => (
          <JobCard 
            key={index}
            job={card}
            zoomToJobLocation={zoomToJobLocation}
          />
        )) 
      }
    </div>
  );
}