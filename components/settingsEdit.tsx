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
  onSuccess,
}: {
  title: string;
  content: string;
  buttonText: string;
  type: string;
  isPassword: boolean;
  action?: (formData: FormData) => Promise<ActionResult>;
  onSuccess?: (value: string) => void;
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
    await signOut({ callbackUrl: "/login" });
  };

  const isDelete = buttonText === "delete";

  return (
    <div className="flex items-center w-full justify-between border-b border-slate-100 px-4 py-4 last:border-none">
      <Modal
        show={deleteButton}
        onClose={() => setDeleteButton(false)}
        title="Are you sure to delete your account?"
        handleDelete={handleDelete}
      />

      <div className="flex flex-col w-full gap-2">
        <span className="text-sm font-medium text-slate-700">{title}</span>

        {editing ? (
          <form
            action={async (formData) => {
              if (isPassword) {
                const currentPassword = formData.get(
                  "currentPassword",
                ) as string;
                const newPassword = formData.get("newPassword") as string;
                const confirmPassword = formData.get(
                  "confirmPassword",
                ) as string;

                if (!currentPassword || !newPassword || !confirmPassword) {
                  toast.error("Please fill in all fields");
                  return;
                }
                if (newPassword !== confirmPassword) {
                  toast.error("Passwords do not match");
                  return;
                }
              } else {
                const value = formData.get(type) as string;
                if (!value?.trim()) {
                  toast.error("Field cannot be empty");
                  return;
                }
                if (value === content) {
                  toast("Nothing changed");
                  return;
                }
              }

              if (action) {
                const res = await action(formData);
                if ("error" in res) {
                  toast.error(res.error);
                  return;
                }
              }

              toast.success("Updated successfully");
              if (onSuccess) {
                onSuccess?.(formData.get(type) as string);
              }
              setEditing(false);
            }}
            className="flex flex-col gap-2"
          >
            {!isPassword ? (
              <input
                name={type}
                defaultValue={content}
                className="text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition w-full"
              />
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  name="currentPassword"
                  type="password"
                  placeholder="Current password"
                  className="text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
                />
                <input
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  className="text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
                />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
                />
              </div>
            )}

            <div className="flex gap-2 mt-1">
              <button
                type="submit"
                className="py-1 px-3 text-sm font-medium border border-green-800 rounded-lg
                  text-slate-800 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="py-1 px-3 text-sm font-medium border border-slate-200 rounded-lg
                  text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full flex gap-2 items-center justify-between">
            <span className="text-sm text-slate-400">
              {isPassword ? "••••••••" : content}
            </span>
            <button
              onClick={() =>
                isDelete ? setDeleteButton(true) : setEditing(true)
              }
              className={`py-1 px-3 text-sm font-medium rounded-lg border cursor-pointer transition-colors
                ${
                  isDelete
                    ? "border-red-200 text-red-500 hover:bg-red-50"
                    : "border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
