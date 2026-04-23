import Link from "next/link"
import SidebarItem from "./sidebarItem"
import { Logo } from "./logo"
import UserInfo from "./UserInfo"

export default function Sidebar() {
  return (
    <aside className="w-52 bg-slate-800 flex flex-col h-full">

      {/* Logo */}
      <Link href="/words" className="h-14 flex items-center px-5 border-b border-slate-700 shrink-0">
        <Logo />
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        <SidebarItem label="words" />
        <SidebarItem label="reader" />
        <SidebarItem label="study" />
      </nav>

      {/* User — pinned to bottom */}
      <div className="px-3 py-4 border-t border-slate-700 shrink-0">
        <UserInfo />
      </div>

    </aside>
  )
}