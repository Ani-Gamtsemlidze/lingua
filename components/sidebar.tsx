"use client";
import Link from "next/link";
import SidebarItem from "./sidebarItem";
import { Logo } from "./logo";
import UserInfo from "./UserInfo";
import LanguageSwitcher from "./languageSwitcher";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { BiMenu } from "react-icons/bi";

export default function Sidebar({ userName, activeLanguage }: {
  userName: string;
  activeLanguage: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  document.body.style.overflow = isOpen ? "hidden" : "auto";
}, [isOpen]);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-slate-800 border-b border-slate-700
        flex items-center justify-between px-4 z-30">
        <Link href="/words">
          <Logo />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <BiMenu className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed md:relative top-0 left-0 h-full md:h-auto z-50
        w-64 md:w-52 bg-slate-800 flex flex-col
        transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>

        <div className="h-14 flex items-center justify-between px-5 border-b border-slate-700 shrink-0">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <GiCancel className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          <SidebarItem label="reader" onNavigate={() => setIsOpen(false)} />
          <SidebarItem label="words" onNavigate={() => setIsOpen(false)} />
          <SidebarItem label="study" onNavigate={() => setIsOpen(false)} />
          <SidebarItem label="chat" onNavigate={() => setIsOpen(false)} />
        </nav>

        <div className="px-3 py-3 border-t border-slate-700 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2 px-1">
            target language
          </p>
          <LanguageSwitcher
            activeLanguage={activeLanguage}
          />
        </div>

        <div className="px-3 py-4 border-t border-slate-700 shrink-0">
          <UserInfo onNavigate={() => setIsOpen(false)} userName={userName} />
        </div>
      </aside>
    </>
  );
}