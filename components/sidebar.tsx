import Link from "next/link"
import SidebarItem from "./sidebarItem"
import { Logo } from "./logo"

export default function Sidebar() {
  return (
    <aside className="w-52  bg-fuchsia-50 border-r-2 border-purple-200 flex flex-col">

      {/* Logo */}
      <Link href="/" className="h-16 flex items-center px-5 border-b-2 border-purple-200">
        <Logo />
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1.5">
        <SidebarItem label="words" />
        <SidebarItem label="reader" />
        <SidebarItem label="study" />
      </nav>

    </aside>
  )
}