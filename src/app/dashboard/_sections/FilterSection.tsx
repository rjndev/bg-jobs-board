import DropdownFilter from "../_components/DropdownFilter";
import DateFilter from "../_components/DateFilter";
import { titleOptions, stateOptions } from "../_data/constants";
import SearchFilter from "../_components/SearchFilter";
import { Dispatch, SetStateAction } from "react";

export type FiltersType = {
  job?: String | undefined,
  state? : String | undefined,
  startDate? : Date | undefined,
  endDate? : Date | undefined,
  keyword? : String | undefined,
  title? : String | undefined
}

type FilterSectionProps = {
  filters : FiltersType,
  setFilters : Dispatch<SetStateAction<FiltersType>>
}

export default function FilterSection({filters , setFilters} : FilterSectionProps) {
  return (
    <div className="flex xl:flex-row gap-8 flex-col mt-4 w-full justify-between px-8">
      <DropdownFilter 
        onChangeHandler={(e) => setFilters(prev => prev ? {...prev, title : e.target.value} : filters)} 
        title="Title" 
        options={titleOptions} />
      <DropdownFilter 
        onChangeHandler={(e) => setFilters(prev => prev ? {...prev, state : e.target.value} : filters)}
        title="State" 
        options={stateOptions} />
      <DateFilter title="Start Date" />
      <DateFilter title="End Date" />
      <SearchFilter title="Keyword" />
    </div>
  );
}