"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex items-center justify-center rounded-full focus:outline-none cursor-pointer"
        aria-label="User menu"
      >
        <span
          className={`absolute inset-0 rounded-full transition-all duration-200 ${
            open
              ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-white"
              : "group-hover:ring-2 group-hover:ring-gray-300 group-hover:ring-offset-2"
          }`}
        />
        <Image
          className="rounded-full"
          unoptimized
          src={avatarUrl}
          alt="User avatar"
          width={36}
          height={36}
        />
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
      </button>

      <div
        className={`absolute right-0 mt-2 w-56 origin-top-right transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Image
              className="rounded-full"
              unoptimized
              src={avatarUrl}
              alt="User avatar"
              width={32}
              height={32}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {data?.user?.name ?? "John Doe"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {data?.user?.email ?? "user@example.com"}
              </p>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Settings
            </button>
          </div>
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-400">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </span>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}