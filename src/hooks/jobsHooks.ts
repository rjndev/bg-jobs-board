import { useQuery} from "@tanstack/react-query";
import { buildApiUrl } from "@/utlis/supabase/utils";
import { FiltersType } from "@/app/dashboard/_sections/FilterSection";
import { Job } from "@/types/job-types";

type ResponseType = {
  count : number,
  jobs : Job[]
}

export function useJobs(params : FiltersType | undefined) {
  const cleanedParams = {
    ...params,
    state : params?.state === "all" ? undefined : params?.state,
    title : params?.title === "all" ? undefined : params?.title,
    startDate : params?.startDate || undefined,
    endDate : params?.endDate || undefined,
  }

  console.log("cleanedParams", cleanedParams);
  console.log("start date string", cleanedParams?.startDate);

  const url = buildApiUrl('/api/jobs', cleanedParams || {})

  async function getJobs() : Promise<ResponseType> {
    const data = await fetch(url)
    
    return data.json()
  } 
  const query = useQuery({queryKey : ['jobs', url], queryFn : getJobs})
  
  return { res : query.data, isLoading : query.isFetching }
}