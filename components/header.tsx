"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import WordAddForm from "./wordAddForm";
import UserInfo from "./UserInfo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();
  const titles: Record<string, string> = {
    "/words": "My Words",
    "/study": "Study Mode",
    "/reader": "It`s time to read",
  };
  return (
    <header className="h-16 w-full border-b bg-white flex items-center  px-6 justify-between">
      <div className="flex items-center">
        <h1>{titles[pathName]}</h1>
        <div onClick={() => setIsOpen(true)} className="ml-4 cursor-pointer">
          {pathName === "/words" && (
            <Image
              className="w-4 h-4"
              src="/images/add.png"
              alt="add"
              width={40}
              height={40}
            />
          )}
        </div>
      </div>

      <div>
        <UserInfo />
      </div>
      {isOpen && <WordAddForm closeModal={() => setIsOpen(false)} />}
    </header>
  );
}
