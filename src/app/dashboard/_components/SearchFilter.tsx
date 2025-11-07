import { FiltersType } from "../_sections/FilterSection";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearch } from "@/hooks/searchHooks";


type SearchFilterProps = {
  title: string;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
}

export default function SearchFilter({ title, setFilters }: SearchFilterProps) {
  const { searchTerm, setSearchTerm, debouncedTerm } = useSearch();

  useEffect(() => {
    setFilters(prev => prev ? { ...prev, keyword: debouncedTerm || undefined } : {});
  }, [debouncedTerm, setFilters])

  return (
    <div className="border flex flex-col gap-1 border-gray-300 xl:max-w-[300px] rounded-lg px-4 py-2 w-full">
        {<p className="font-semibold">{title}</p>}
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 outline-none border w-full border-gray-300 rounded-lg" 
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
    </div>
  );
}