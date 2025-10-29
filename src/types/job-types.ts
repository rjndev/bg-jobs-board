export type Job = {
  id: string;
  facility: string;
  job: string;
  location: string;
  start_date : Date;
  end_date : Date;
  rate : string;
  shift_type : "Day" | "Night" | "Evening" | "Flexible";
  created_at :  Date;
  state : string;
  lat : number;
  long : number;
}