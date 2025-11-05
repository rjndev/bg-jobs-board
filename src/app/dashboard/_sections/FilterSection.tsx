import DropdownFilter from "../_components/DropdownFilter";
import DateFilter from "../_components/DateFilter";
import { titleOptions, stateOptions } from "../_data/constants";
import SearchFilter from "../_components/SearchFilter";
import { Dispatch, SetStateAction } from "react";

export type FiltersType = {
  job?: string | undefined,
  state?: string | undefined,
  startDate?: string | undefined,  // Changed to string for ISO date
  endDate?: string | undefined,    // Changed to string for ISO date
  keyword?: string | undefined,
  title?: string | undefined
}

type FilterSectionProps = {
  filters : FiltersType,
  setFilters : Dispatch<SetStateAction<FiltersType>>
}

export default function FilterSection({filters , setFilters} : FilterSectionProps) {
  const handleDateChange = (field: 'startDate' | 'endDate') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => {
      if (!prev) return filters;
      if (!e.target.value) return { ...prev, [field]: undefined };
      return { ...prev, [field]: e.target.value }; // Store as ISO string directly
    });
  };

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
      <DateFilter 
        onChangeHandler={handleDateChange('startDate')} 
        title="Start Date" 
      />
      <DateFilter 
        onChangeHandler={handleDateChange('endDate')} 
        title="End Date" 
      />
      <SearchFilter title="Keyword" />
    </div>
  );
}