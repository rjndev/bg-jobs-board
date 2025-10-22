export type Job = {
  id: string;
  facility: string;
  job: string;
  location: string;
  startDate : Date;
  endDate : Date;
  rate : string;
  shiftType : "Day" | "Night" | "Evening" | "Flexible";
  createdAt: Date;
  state : string;
  lat : number;
  long : number;
}