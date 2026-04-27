"use client";

import { updateUserName } from "@/app/action";
import { useState } from "react";

export default function SettingsEdit({
  title,
  content,
  buttonText,
  userName,
}: {
  title: string;
  content: string;
  buttonText: string;
  userName?: string;
}) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex items-center w-full justify-between border-b px-3.5 py-4 border-slate-200">
      <div className="flex flex-col w-full justify-between">
        <span className="text-sm font-semibold text-slate-700 mt-2">
          {title}
        </span>

        {editing ? (
          <form
            action={async (formData) => {
              const name = formData.get("name") as string;

              await updateUserName(formData);

              setEditing(false);
            }}
            className="w-full"
          >
            <div className="w-full flex items-center justify-between">
              <input
                //   type="text"
                name="name"
                defaultValue={userName ? userName : content}
                className=" mt-2 text-sm text-[#94a3b8] border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
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
            <span className="text-sm text-[#94a3b8]">
              {userName ? userName : content}
            </span>
            <button
              // type="submit"
              onClick={() => setEditing(true)}
              className="py-1 px-3 text-sm capitalize font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
