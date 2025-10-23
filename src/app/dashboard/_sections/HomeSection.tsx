import FilterSection from "./FilterSection"
import CardSection from "./CardSection"
import ListSection from "./ListSection"
import { Job } from "@/types/job-types"

type HomeSectionProps = {
  jobs : Job[] | undefined,
  isLoading : boolean,
  isList : boolean
}

export default function HomeSection({jobs, isLoading, isList} : HomeSectionProps) {
  return (
    <div>
      <div className="flex flex-col gap-12 justify-center items-center p-8 mt-4 pb-20">
        { isList ? 
          <ListSection />
          :
          <CardSection isLoading={isLoading} cards={jobs} /> 
        }
      </div>      
    </div>
  )
}