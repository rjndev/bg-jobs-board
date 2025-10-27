import JobCard from "../_components/JobCard";
import { Job } from "@/types/job-types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export type CardSectionProps = {
  cards : Job[] | undefined,
  isLoading : boolean
}

export default function CardSection({ cards, isLoading }: CardSectionProps) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {
        cards && cards.map((card, index) => (
          <JobCard 
            key={index}
            hospital={card.facility}
            job={card.job}
            location={card.location}
            rate={card.rate}
            shiftType={card.shiftType}
            dateStart={card.startDate?.toDateString()}
            dateEnd={card.endDate?.toDateString()}
          />
        )) 
      }
    </div>
  );
}