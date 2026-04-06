"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ label }: {label: string}) {
    const pathName = usePathname()
    const isActive = pathName.startsWith(`/${label}`)
    return (
      <Link
      href={`/${label}`}
        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
        ${
            isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-slate-400"></span>
        {label}
      </Link>
    )
  }