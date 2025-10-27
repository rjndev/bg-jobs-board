import CardSection from "./CardSection"
import ListSection from "./ListSection"
import { Job } from "@/types/job-types"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type HomeSectionProps = {
  jobs : Job[] | undefined,
  isLoading : boolean,
  isList : boolean
}

export default function HomeSection({jobs, isLoading, isList} : HomeSectionProps) {

  if(jobs?.length! == 0 && !isLoading) return (
    <div className="w-full flex justify-center items-center mt-24 h-full">
      <p>There are no available jobs.</p>
    </div>
  )
  
  if(isLoading) return (
    <div className="w-full flex justify-center items-center mt-24 h-full">
      <AiOutlineLoading3Quarters className="animate-spin inline-block mx-auto" size={30} />
    </div>
  )

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

