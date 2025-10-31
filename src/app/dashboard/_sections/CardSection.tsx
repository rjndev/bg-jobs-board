import JobCard from "../_components/JobCard";
import { Job } from "@/types/job-types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export type CardSectionProps = {
  cards : Job[] | undefined,
  isLoading : boolean,
  zoomToJobLocation : (location: number[]) => void
}

export default function CardSection({ cards, isLoading, zoomToJobLocation}: CardSectionProps) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-fit">
      {
        cards && cards.map((card, index) => (
          <JobCard 
            key={index}
            hospital={card.facility}
            job={card.job}
            location={card.location}
            rate={card.rate}
            shiftType={card.shift_type}
            dateStart={new Date(card.start_date).toDateString()}
            dateEnd={new Date(card.end_date).toDateString()}
            lat={card.lat}
            long={card.long}
            zoomToJobLocation={zoomToJobLocation}
          />
        )) 
      }
    </div>
  );
}