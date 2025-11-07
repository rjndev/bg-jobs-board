export type Job = {
  id: string;
  facility: string;
  job: string;
  location: string;
  start_date : string;
  end_date : string;
  rate : string;
  shift_type : "Day" | "Night" | "Evening" | "Flexible";
  created_at :  Date;
  state : string;
  lat : number;
  long : number;
  is_urgent : boolean;
  title : string;
}