import Link from "next/link"
import SidebarItem from "./sidebarItem"
export default function Sidebar() {
    return (
      <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
        
        <Link href="/" className="h-16 flex items-center px-6 border-b border-slate-200">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            L<span className="text-indigo-600">i</span>ngua
          </h1>
        </Link>
  
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem label="words" />
          <SidebarItem label="study"  />
          <SidebarItem label="reader" />
        </nav>
  
      </aside>
    )
  }