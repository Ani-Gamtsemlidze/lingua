"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { RiStarSmileLine } from "react-icons/ri";

export type Filter = "all" | "new" | "learning" | "known";

const FILTER_CONFIG: { value: Filter; label: string; dot: string }[] = [
  { value: "all", label: "All words", dot: "bg-slate-400" },
  { value: "new", label: "New", dot: "bg-blue-400" },
  { value: "learning", label: "Learning & fuzzy", dot: "bg-amber-400" },
  { value: "known", label: "mastered", dot: "bg-green-400" },
];

const DOT_COLOR: Record<Filter, string> = {
  all: "bg-slate-400",
  new: "bg-blue-400",
  learning: "bg-amber-400",
  known: "bg-green-400",
};

export default function QuizFilter({
  filter,
  setFilter,
  filterCounts,
  hasStarted,
}: {
  filter: Filter | null;
  setFilter: (f: Filter) => void;
  filterCounts: Record<Filter, number>;
  hasStarted: boolean;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        {/* {!hasStarted && (
        <>
          <RiStarSmileLine className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">
            Pick a set for practice!
          </span>
        </>
      )} */}

        {/* <button
        onClick={() => !hasStarted && setDropdownOpen((p) => !p)}
        className={`flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors
    ${
      hasStarted
        ? "opacity-40 cursor-not-allowed"
        : "text-slate-500 cursor-pointer hover:border-slate-300"
    }`}
      >
        <span className="truncate">
          {filter
            ? FILTER_CONFIG.find((f) => f.value === filter)?.label
            : "Select filter"}
        </span>
        <BiChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {dropdownOpen && (
        <div
          className="absolute top-full right-0 mt-1.5 w-44 bg-white border border-slate-200
          rounded-xl overflow-hidden z-50 shadow-sm"
        >
          {FILTER_CONFIG.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value);
                setDropdownOpen(false);
              }}
              disabled={filterCounts[f.value] === 0}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium
                transition-colors cursor-pointer
                ${filter === f.value ? "bg-slate-50 text-slate-800" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${f.dot}`} />
              {f.label}
              <span className="ml-auto text-slate-300">
                {filterCounts[f.value]}
              </span>
            </button>
          ))}
        </div>
      )} */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
  {FILTER_CONFIG.map((f) => {
    const activeFilter = filter === f.value;
    const disabled = filterCounts[f.value] === 0;

    return (
      <button
        key={f.value}
        onClick={() => {
          setFilter(f.value);
          setDropdownOpen(false);
        }}
        disabled={disabled}
        className={`
          group relative overflow-hidden
          flex items-center gap-3
          rounded-2xl border
          px-2 py-2
          text-left
          transition-all duration-200

          ${
            activeFilter
              ? "bg-slate-900 border-slate-900 text-white shadow-md"
              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          }

          ${
            disabled
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer active:scale-[0.985]"
          }
        `}
      >
        <span
          className={`
            w-2.5 h-2.5 rounded-full shrink-0
            ${f.dot}
            ${activeFilter ? "ring-4 ring-white/10" : ""}
          `}
        />

        {/* Label */}
        <div className="flex flex-col items-start">
          <span
            className={`
              text-sm tracking-tight
              ${activeFilter ? "text-white" : "text-slate-800"}
            `}
          >
            {f.label}
          </span>

          <span
            className={`
              text-[11px]
              ${activeFilter ? "text-slate-300" : "text-slate-400"}
            `}
          >
            {filterCounts[f.value] ?? 0} words
          </span>
        </div>
      </button>
    );
  })}
</div>
    </>
  );
}
