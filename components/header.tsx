"use client";

import { usePathname } from "next/navigation";
import UserInfo from "./UserInfo";

export default function Header() {
  const pathName = usePathname();
  const titles: Record<string, string> = {
    "/words": "My words",
    "/study": "Study mode",
    "/reader": "Reader",
  };

  return (
    <header className="h-14 w-full bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0">
      <h1 className="text-sm font-semibold text-slate-700">
        {titles[pathName]}
      </h1>
      <UserInfo />
    </header>
  );
}