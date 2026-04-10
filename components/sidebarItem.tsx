"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ label }: { label: string }) {
  const pathName = usePathname()
  const isActive = pathName.startsWith(`/${label}`)

  return (
    <Link
      href={`/${label}`}
      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-extrabold capitalize transition-colors
        ${isActive
          ? "bg-violet-600 text-white"
          : "text-purple-300 hover:bg-purple-100 hover:text-violet-600"
        }`}
    >
      <span className={`h-2 w-2 rounded-full flex-shrink-0 ${isActive ? "bg-white opacity-60" : "bg-purple-200"}`} />
      {label}
    </Link>
  )
}