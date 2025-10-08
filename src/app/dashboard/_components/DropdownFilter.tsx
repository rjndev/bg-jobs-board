"use client";

type FilterProps = {
  title : string;
  options : {
    value: string;
    label: string;
  }[];
}

export default function DropdownFilter({ title, options } : FilterProps) {

  return (
    <div className="border flex flex-col gap-1 border-gray-300 max-w-[300px] rounded-lg px-4 py-2">
        {<p className="font-semibold">{title}</p>}
        <select className="p-2 outline-none border w-[200px] border-gray-300 rounded-lg">
            {
              options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            }
        </select>
    </div>
  );
}