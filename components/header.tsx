'use client'

import { usePathname } from "next/navigation";

export default function Header() {
const pathName = usePathname()
const titles: Record<string, string> = {
    '/words': 'My Words',
    '/study': 'Study Mode',
    '/reader': 'It`s time to read',
  }
  return (
    <header className="h-16 w-full border-b bg-white flex items-center justify-between px-6">
        {titles[pathName]}
    </header>
  );
}
