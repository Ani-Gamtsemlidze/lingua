"use client";

import { useState } from "react";
import { toast } from "sonner";
import Modal from "./modal";
import { deleteAccount } from "@/app/actions/user";
import { signOut } from "next-auth/react";
export type ActionResult = { success: true } | { error: string };

export default function SettingsEdit({
  title,
  content,
  buttonText,
  type,
  action,
  isPassword,
}: {
  title: string;
  content: string;
  buttonText: string;
  type: string;
  isPassword: boolean;
  action?: (formData: FormData) => Promise<ActionResult>;
}) {
  const [editing, setEditing] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);

  const handleDelete = async () => {
    const res = await deleteAccount();

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Account deleted");

    // important: log out user
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex items-center w-full justify-between border-b px-3.5 py-4 border-slate-200">
      <Modal
        show={deleteButton}
        onClose={() => setDeleteButton(false)}
        title="Are you sure to delete your account?"
        handleDelete={handleDelete}
      />
      <div className="flex flex-col w-full justify-between">
        <span className="text-sm font-semibold text-slate-700 mt-2">
          {title}
        </span>

        {editing ? (
          <form
            action={async (formData) => {
              if (isPassword) {
                const newPassword = formData.get("newPassword") as string;
                const confirmPassword = formData.get(
                  "confirmPassword",
                ) as string;
                const currentPassword = formData.get(
                  "currentPassword",
                ) as string;

                if (!currentPassword || !newPassword || !confirmPassword) {
                  toast.error("Please fill in all fields", {});
                  return;
                }

                if (newPassword !== confirmPassword) {
                  toast.error("Passwords do not match");
                  return;
                }
              }
              const value = formData.get(type) as string;
              if (!value?.trim()) {
                toast.error("Field cannot be empty");
                return;
              }

              if (value === content) {
                toast("Nothing changed");
                return;
              }

              if (action) {
                const res = await action(formData);
                if ("error" in res) {
                  toast.error(res.error);
                  return;
                }
              }

              toast.success("Updated successfully", {});
              setEditing(false);
            }}
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
                </div>
              )}
              <div
                className={`${type === "password" && "!flex-col"}  flex gap-2`}
              >
                <button
                  type="submit"
                  className="py-1 px-3 text-sm capitalize font-medium border border-green-800 rounded-md text-green-800 hover:bg-slate-100 cursor-pointer"
                >
                  Save
                </button>
                <button
                  // type="submit"
                  onClick={() => setEditing(false)}
                  className="py-1 px-3 text-sm capitalize font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className="text-sm text-[#94a3b8]">{content}</span>
            <button
              // type="submit"
              onClick={() =>
                buttonText === "delete"
                  ? setDeleteButton(true)
                  : setEditing(true)
              }
              className={` ${buttonText === "delete" && "!border-red-800 !text-red-800"}  py-1 px-3 text-sm capitalize font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer`}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
