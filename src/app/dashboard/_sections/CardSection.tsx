import JobCard from "../_components/JobCard";

export type CardSectionProps = {
  cards : {
    hospital: string;
    job : string;
    location: string;
    rate: string;
    shiftType: string;
    dateStart: string;
    dateEnd: string;
  }[]
}

export default function CardSection({ cards }: CardSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {
        cards.map((card, index) => (
          <JobCard 
            key={index}
            hospital={card.hospital}
            job={card.job}
            location={card.location}
            rate={card.rate}
            shiftType={card.shiftType}
            dateStart={card.dateStart}
            dateEnd={card.dateEnd}
          />
        ))
      }
    </div>
  );
}