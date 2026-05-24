"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebarItem";
import { Logo } from "./logo";
import UserInfo from "./UserInfo";
import LanguageSwitcher from "./languageSwitcher";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { BiMenu } from "react-icons/bi";

export default function Sidebar({ 
  userName, 
  activeLanguage 
}: {
  userName: string;
  activeLanguage: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <div className="nav:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-800/50
        flex items-center justify-between px-4 z-30 backdrop-blur-sm">
        <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <BiMenu className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="nav:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed nav:relative top-0 left-0 h-full z-50
        w-64 nav:w-60 bg-slate-900 border-r border-slate-800/50 
        flex flex-col shadow-2xl nav:shadow-none
        transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isOpen ? "translate-x-0" : "-translate-x-full nav:translate-x-0"}
      `}>
        
        <div className="h-14 flex items-center justify-between px-5 border-b border-slate-800/50 shrink-0">
          <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="nav:hidden text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <GiCancel className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <SidebarItem label="dashboard" onNavigate={() => setIsOpen(false)} />
          <SidebarItem label="reader" onNavigate={() => setIsOpen(false)} />
          <SidebarItem label="words" onNavigate={() => setIsOpen(false)} />
          <SidebarItem label="study" onNavigate={() => setIsOpen(false)} />
          <SidebarItem label="chat" onNavigate={() => setIsOpen(false)} />
        </nav>

        <div className="px-3 py-4 border-t border-slate-800/50 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 px-2">
            Target Language
          </p>
          <LanguageSwitcher activeLanguage={activeLanguage} />
        </div>

        <div className="px-3 py-4 border-t border-slate-800/50 shrink-0">
          <UserInfo onNavigate={() => setIsOpen(false)} userName={userName} />
        </div>
      </aside>
    </>
  );
}