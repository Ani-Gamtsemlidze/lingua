"use client";

import { updateActiveLanguage } from "@/app/actions/user";
import { AVAILABLE_LANGUAGES, getFlag } from "@/lib/languages";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiPlus } from "react-icons/bi";

export default function LanguageSwitcher({
  activeLanguage,
}: {
  activeLanguage: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(activeLanguage);
  const [lang] = AVAILABLE_LANGUAGES.filter((l) => l.name === activeLanguage);

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
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full max-w-[200px] flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm
          font-medium transition-colors cursor-pointer 
          ${open ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`}
      >
        <div className="flex items-center gap-2">
             <span
                className={`fi fi-${getFlag(lang.code)}`}
                style={{
                  width: "20px",
                  height: "14px",
                  display: "inline-block",
                }}
              />{" "}
          <span className="text-sm capitalize">{active}</span>
        </div>
        <BiChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute bottom-full left-0 mb-2 w-full max-w-[200px] bg-slate-900 border border-slate-700
          rounded-lg overflow-y-auto max-h-32 shadow-xl z-50"
        >
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                handleUpdateLanguage(lang.name);
              }}
              className={`w-full capitalize flex items-center gap-2 px-2 py-2 text-sm transition-colors cursor-pointer
                ${
                  active === lang.name
                    ? "text-white bg-slate-700"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
            >
              {active === lang.name&& (
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
              )}
              {active !== lang.name&& (
                <span className="h-1.5 w-1.5 rounded-full shrink-0 " />
              )}
              <span
                className={`fi fi-${getFlag(lang?.code)}`}
                style={{
                  width: "20px",
                  height: "14px",
                  display: "inline-block",
                }}
              />{" "}
              <span className="text-md">{lang?.name}</span>{" "}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
