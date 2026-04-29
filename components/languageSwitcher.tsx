"use client";

import { updateActiveLanguage } from "@/app/actions/user";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiPlus } from "react-icons/bi";

const LANGUAGES = ["english", "turkish"];

export default function LanguageSwitcher({
  activeLanguage,
}: {
  activeLanguage: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(activeLanguage);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleUpdateLanguage(lang: string) {
    setActive(lang);
    setOpen(false);
    await updateActiveLanguage(lang);
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm
          font-medium transition-colors cursor-pointer
          ${open ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
          <span className="text-sm capitalize">{active}</span>
        </div>
        <BiChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute bottom-full left-0 mb-2 w-full bg-slate-900 border border-slate-700
          rounded-lg overflow-hidden shadow-xl z-50"
        >
          {LANGUAGES.map((lang: string) => (
            <button
              key={lang}
              onClick={() => {
                handleUpdateLanguage(lang);
              }}
              className={`w-full capitalize flex items-center gap-2 px-3 py-2 text-sm transition-colors cursor-pointer
                ${
                  active === lang
                    ? "text-white bg-slate-700"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
            >
              {active === lang && (
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
              )}
              {active !== lang && (
                <span className="h-1.5 w-1.5 rounded-full shrink-0 " />
              )}
              {lang}
            </button>
          ))}

          <div
            className="border-t border-slate-700"
          >
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500
              hover:text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <BiPlus className="w-3.5 h-3.5" />
              Add language
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
