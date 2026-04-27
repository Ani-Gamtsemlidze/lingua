"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SettingsEdit from "./settingsEdit";

export default function SettingsPage({ userName }: { userName: string }) {
  const { data } = useSession();

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
   userName ? userName : data?.user?.name ?? "John Doe",
  )}&backgroundColor=1a1a2e&color=ffffff`;
  

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200  w-full max-w-md">
        <div className="flex gap-2 items-center border-b px-3.5 py-4 border-slate-200">
          <div className="relative shrink-0 ">
            <Image
              className="rounded-full"
              unoptimized
              src={avatarUrl}
              alt="User avatar"
              width={28}
              height={28}
            />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-xs tracking-tight text-slate-800 truncate font-bold">
              {userName ? userName :  data?.user?.name ?? "John Doe"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {data?.user?.email ?? "user@example.com"}
            </p>
          </div>
        </div>
        <SettingsEdit
          title="Display name"
          content={data?.user?.name ?? "John Doe"}
          buttonText="edit"
          userName={userName}
        />
        <SettingsEdit
          title="Email"
          content={data?.user?.email ?? "user@example.com"}
          buttonText="edit"
        />
        <SettingsEdit
          title="Password"
          content="Last changed never"
          buttonText="change"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md  w-full max-w-md mt-4">
        <span className="flex uppercase items-center border-b px-3.5 py-4 border-slate-200 text-[#64748b]">
          danger zone
        </span>
        <SettingsEdit
          title="Delete account"
          content="Permanently delete your account and all data"
          buttonText="delete"

        />
      </div>

    </>
  );
}
