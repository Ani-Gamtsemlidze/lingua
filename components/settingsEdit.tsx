"use client";

import { updateUserName } from "@/app/action";
import { useState } from "react";

export default function SettingsEdit({
  title,
  content,
  buttonText,
  userName,
  type,
  action,
  isPassword,
}: {
  title: string;
  content: string;
  buttonText: string;
  userName?: string;
  type: string;
  isPassword: boolean;
  action: (formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  // const [localUserName, setLocalUserName] = useState(userName || content);
  // const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  // setTimeout(() => {
  //   setError(false);
  // }, 1000);

  return (
    <div className="flex items-center w-full justify-between border-b px-3.5 py-4 border-slate-200">
      <div className="flex flex-col w-full justify-between">
        <span className="text-sm font-semibold text-slate-700 mt-2">
          {title}
        </span>

        {editing ? (
          <form
            action={async (formData) => {
              if (isPassword) {
                const newPassword = formData.get("newPassword");
                const confirmPassword = formData.get("confirmPassword");
                if(!newPassword || !confirmPassword) {
                  return;
                }
                if (newPassword !== confirmPassword) {
                  setError(true);
                  return;
                }
              }
              setError(false);

              await action(formData);
              setEditing(false);
            }}
            className="w-full"
          >
            <div className="w-full flex items-center justify-between">
              {!isPassword && (
                <input
                  name={type}
                  defaultValue={content}
                  className=" mt-2 text-sm text-[#94a3b8] border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              )}
              {isPassword && (
                <div>
                  <input
                    name="currentPassword"
                    type="password"
                    // defaultValue={content}
                    placeholder="current password"
                    className=" mt-2 text-sm text-[#94a3b8] border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                  <div className="flex gap-2 items-center">
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="new password"
                      className=" mt-2 text-sm text-[#94a3b8] border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      className=" mt-2 text-sm text-[#94a3b8] border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div className="text-red-900!">
                    {error && (
                      <p className="text-sm text-red-900! mt-2 flex">
                        passwords do not match
                      </p>
                    )}
                  </div>{" "}
                </div>
              )}
              <button
                type="submit"
                className="py-1 px-3 text-sm capitalize font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className="text-sm text-[#94a3b8]">{content}</span>
            <button
              // type="submit"
              onClick={() => setEditing(true)}
              className="py-1 px-3 text-sm capitalize font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
