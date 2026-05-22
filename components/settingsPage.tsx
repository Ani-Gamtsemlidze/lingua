"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SettingsEdit from "./settingsEdit";
import { updateUserName } from "@/app/action";
import { updateUserEmail, updateUserPassword } from "@/app/actions/user";
import { useState } from "react";

export default function SettingsPage({ userName }: { userName: string }) {
  const { data } = useSession();

  const [optimisticName, setOptimisticName] = useState(userName);


  const displayName = userName ?? data?.user?.name ?? "John Doe";
  const displayEmail = data?.user?.email ?? "user@example.com";

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    displayName,
  )}&backgroundColor=1e293b&color=ffffff`;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className=" md:mt-0 mt-8 max-w-md mx-auto">

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Settings
        </p>
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-6">
          Account
        </h1>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-4">

          <div className="flex gap-3 items-center px-4 py-4 border-b border-slate-100">
            <Image
              className="rounded-full shrink-0"
              unoptimized
              src={avatarUrl}
              alt="User avatar"
              width={32}
              height={32}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate tracking-tight">
                { optimisticName || displayName}
              </p>
              <p className="text-xs text-slate-400 truncate">{displayEmail}</p>
            </div>
          </div>

          <SettingsEdit
            title="Display name"
            content={optimisticName || displayName}
            buttonText="edit"
            action={updateUserName}
            type="name"
            onSuccess={(newName) => setOptimisticName(newName)}
            isPassword={false}
          />
          <SettingsEdit
            title="Email"
            content={displayEmail}
            buttonText="edit"
            type="email"
            action={updateUserEmail}
            isPassword={false}
          />
          <SettingsEdit
            title="Password"
            content="password"
            buttonText="change"
            type="password"
            action={updateUserPassword}
            isPassword={true}
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Danger zone
            </p>
          </div>
          <SettingsEdit
            title="Delete account"
            content="Permanently delete your account and all data"
            buttonText="delete"
            type="delete"
            isPassword={false}
            // onSuccess={null}
          />
        </div>

      </div>
    </div>
  );
}