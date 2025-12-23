"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { FiltersType } from "../_sections/FilterSection";

type FilterProps = {
  title : string;
  options : {
    value: string;
    label: string;
  }[];
  onChangeHandler : (value: string) => void
}

export default function DropdownFilter({ title, options, onChangeHandler } : FilterProps) {
  const isTitle = title === "Title";
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(options[0]?.value || "all");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(o => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const grouped = useMemo(() => {
    if (!isTitle) return null;
    const allOpt = filtered.find(o => o.value === "all");
    const rest = filtered.filter(o => o.value !== "all");
    type GroupMap = Record<string, { value: string; label: string }[]>;
    const map: GroupMap = {};
    for (const opt of rest) {
      const prefix = opt.label.includes(" - ") ? opt.label.split(" - ")[0] : opt.label;
      if (!map[prefix]) map[prefix] = [];
      map[prefix].push(opt);
    }
    const groupNames = Object.keys(map).sort((a, b) => a.localeCompare(b));
    for (const g of groupNames) map[g].sort((a, b) => a.label.localeCompare(b.label));
    return { allOpt, map, groupNames };
  }, [filtered, isTitle]);

  const selectValue = (value: string) => {
    setSelected(value);
    onChangeHandler(value);
    setOpen(false);
  };

  if (!isTitle) {
    // Non-title: simple select without inline search
    return (
      <div className="border flex flex-col gap-1 border-gray-300 xl:max-w-[300px] rounded-lg px-4 py-2 w-full">
        <p className="font-semibold">{title}</p>
        <select
          onChange={(e) => onChangeHandler(e.target.value)}
          className="p-2 outline-none border w-full border-gray-300 rounded-lg"
          defaultValue={options[0]?.value || "all"}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  // Title: custom dropdown with search inside the options container
  return (
    <div ref={containerRef} className="border flex flex-col gap-1 border-gray-300 xl:max-w-[300px] rounded-lg px-4 py-2 w-full relative">
      <p className="font-semibold">{title}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-2 outline-none border w-full border-gray-300 rounded-lg text-left bg-white"
      >
        {options.find(o => o.value === selected)?.label || "Select"}
      </button>

      {open && (
        <div className="absolute z-20 mt-1 left-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Search attached within dropdown panel */}
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
            <input
              autoFocus
              type="text"
              placeholder="Search categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-2 outline-none border w-full border-gray-300 rounded"
            />
          </div>
          <div className="max-h-64 overflow-auto p-2">
            {/* All option on top if present */}
            {grouped?.allOpt && (
              <div
                className={`px-2 py-1 rounded cursor-pointer hover:bg-gray-100 ${selected === "all" ? "bg-gray-100" : ""}`}
                onClick={() => selectValue("all")}
              >
                {grouped.allOpt.label}
              </div>
            )}

            {grouped && grouped.groupNames.map((group) => (
              <div key={group} className="mt-2">
                <div className="px-2 py-1 text-xs font-semibold text-gray-600 uppercase">{group}</div>
                {grouped.map[group].map((opt) => (
                  <div
                    key={opt.value}
                    className={`px-2 py-1 rounded cursor-pointer hover:bg-gray-100 ${selected === opt.value ? "bg-gray-100" : ""}`}
                    onClick={() => selectValue(opt.value)}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}