"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import WordAddForm from "./wordAddForm";
import UserInfo from "./UserInfo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();
  const titles: Record<string, string> = {
    "/words": "My Words",
    "/study": "Study Mode",
    "/reader": "It's time to read",
  };

  return (
    <header className="h-16 w-full bg-fuchsia-50 border-b-2 border-purple-200 flex items-center px-6 justify-between">

      {/* Left — title + add button */}
      <div className="flex items-center gap-3">
        <h1 className="font-serif text-xl font-bold text-purple-950">
          {titles[pathName]}
        </h1>
        {pathName === "/words" && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-7 h-7 flex items-center justify-center bg-violet-600 hover:bg-violet-700 transition-colors rounded-lg cursor-pointer"
            aria-label="Add word"
          >
            <HiPlus className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Right — user info */}
      <UserInfo />

      {/* Modal */}
      {isOpen && <WordAddForm closeModal={() => setIsOpen(false)} />}
    </header>
  );
}