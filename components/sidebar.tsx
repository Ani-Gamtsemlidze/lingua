import Link from "next/link";
import SidebarItem from "./sidebarItem";
import { Logo } from "./logo";
import UserInfo from "./UserInfo";
import { sql } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import LanguageSwitcher from "./languageSwitcher";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  const userName =
    await sql`SELECT username FROM users WHERE id = ${session?.user?.id}`;
  const activeLanguage =
    await sql`SELECT active_language FROM users WHERE id = ${session?.user?.id}`;

  return (
    <aside className="w-52 bg-slate-800 flex flex-col h-full">

      {/* Logo */}
      <Link
        href="/words"
        className="h-14 flex items-center px-5 border-b border-slate-700 shrink-0"
      >
        <Logo />
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        <SidebarItem label="words" />
        <SidebarItem label="reader" />
        <SidebarItem label="study" />
      </nav>

      {/* Language switcher */}
      <div className="px-3 py-3 border-t border-slate-700 shrink-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2 px-1">
          Language
        </p>
        <LanguageSwitcher  activeLanguage={activeLanguage[0]?.active_language ?? "english"}  />
      </div>

      {/* User — pinned to bottom */}
      <div className="px-3 py-4 border-t border-slate-700 shrink-0">
        <UserInfo userName={userName[0]?.username} />
      </div>
    </aside>
  );
}