import FilterSection from "./FilterSection"
import CardSection from "./CardSection"
import { Job } from "@/types/job-types"

type HomeSectionProps = {
  jobs : Job[] | undefined,
  isLoading : boolean
}

export default function HomeSection({jobs, isLoading} : HomeSectionProps) {
  return (
    <div>
      <div className="flex flex-col gap-12 justify-center items-center p-8 mt-4 pb-20">
        <CardSection isLoading={isLoading} cards={jobs} />
      </div>      
    </div>
  )
}