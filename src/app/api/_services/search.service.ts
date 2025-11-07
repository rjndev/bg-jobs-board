import { createClient } from '@/utlis/supabase/supabase-server';
import { Job } from '@/types/job-types';

export async function searchJobs(keyword: string): Promise<Job[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .or(
      `facility.ilike.%${keyword}%,job.ilike.%${keyword}%,location.ilike.%${keyword}%,state.ilike.%${keyword}%`
    );

  if (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
 
  return data as Job[];
}