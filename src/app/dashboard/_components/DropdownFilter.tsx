"use client";

import { ChangeEvent } from "react";
import { Dispatch, SetStateAction } from "react";
import { FiltersType } from "../_sections/FilterSection";

type FilterProps = {
  title : string;
  options : {
    value: string;
    label: string;
  }[];
  onChangeHandler : (e : ChangeEvent<HTMLSelectElement>) => void
}

export default function DropdownFilter({ title, options, onChangeHandler } : FilterProps) {

  return (
    <div className="border flex flex-col gap-1 border-gray-300 xl:max-w-[300px] rounded-lg px-4 py-2 w-full">
        {<p className="font-semibold">{title}</p>}
        <select onChange={onChangeHandler} className="p-2 outline-none border w-full border-gray-300 rounded-lg">
            {
              options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            }
        </select>
    </div>
  );
}