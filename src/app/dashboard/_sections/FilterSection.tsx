import DropdownFilter from "../_components/DropdownFilter";
import DateFilter from "../_components/DateFilter";
import { titleOptions, stateOptions } from "../_data/constants";
import SearchFilter from "../_components/SearchFilter";

export default function FilterSection() {
  return (
    <div className="flex xl:flex-row gap-8 flex-col w-full justify-between px-8">
      <DropdownFilter title="Title" options={titleOptions} />
      <DropdownFilter title="State" options={stateOptions} />
      <DateFilter title="Start Date" />
      <DateFilter title="End Date" />
      <SearchFilter title="Keyword" />
    </div>
  );
}