"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
// import { Settings, LogOut } from "lucide-react";

export default function UserInfo() {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    data?.user?.name ?? "John Doe"
  )}&backgroundColor=1a1a2e&color=ffffff`;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">

      {/* Trigger — full-width row */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center gap-3 rounded-lg px-2 py-2 transition-colors cursor-pointer
          ${open ? "bg-slate-700" : "hover:bg-slate-700"}`}
        aria-label="User menu"
      >
        <div className="relative shrink-0">
          <Image
            className="rounded-full"
            unoptimized
            src={avatarUrl}
            alt="User avatar"
            width={28}
            height={28}
          />
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-slate-800" />
        </div>
        <div className="min-w-0 text-left">
          <p className="text-xs font-medium text-slate-200 truncate">
            {data?.user?.name ?? "John Doe"}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {data?.user?.email ?? "user@example.com"}
          </p>
        </div>
      </button>

      {/* Dropdown — opens upward */}
      <div
        className={`absolute bottom-full left-0 mb-2 w-52 transition-all duration-150 ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-1 pointer-events-none"
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="rounded-xl border border-slate-700 bg-slate-800 overflow-hidden shadow-xl shadow-black/30">

          {/* Menu items */}
          <div className="py-1">
            <Link href="/settings"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <CiSettings className="w-4 h-4 text-slate-400 shrink-0" />
              Settings
            </Link>
          </div>

          <div className="border-t border-slate-700 py-1">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-700 transition-colors"
            >
              <BiLogOut className="w-4 h-4 shrink-0" />
              Sign out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}