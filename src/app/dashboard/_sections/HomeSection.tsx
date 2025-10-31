import CardSection from "./CardSection"
import ListSection from "./ListSection"
import { Job } from "@/types/job-types"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ViewOptions } from "../_components/ViewOptions";
import { Dispatch, SetStateAction } from "react";

type HomeSectionProps = {
  jobs : Job[] | undefined,
  isLoading : boolean,
  isList : boolean,
  zoomToJobLocation : (location: number[]) => void,
  setIsList :  Dispatch<SetStateAction<boolean>>
}

export default function HomeSection({jobs, isLoading, isList, zoomToJobLocation, setIsList} : HomeSectionProps) {

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
      <span className="flex justify-between mt-8 items-center px-8">
        <h1 className="text-xl h-full text-center self-center">Jobs Available today! 🚀</h1>
          <ViewOptions isList={isList} setIsList={setIsList} />
      </span>
      
      <div className="flex flex-col gap-12 justify-center items-center p-8 mt-4 pb-20">
        { isList ? 
          <ListSection zoomToJobLocation={zoomToJobLocation} isLoading={isLoading} jobs={jobs!} />
          :
          <CardSection zoomToJobLocation={zoomToJobLocation} isLoading={isLoading} cards={jobs} /> 
        }
      </div>      
    </div>
  )
}

