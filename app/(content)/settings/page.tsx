import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsPage from "@/components/settingsPage";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession(authOptions);
  const userName = await sql `SELECT username FROM users WHERE id = ${session?.user?.id}`; 
  return (
    <div className="flex items-center justify-center flex-col p-3">
      <div className="flex flex-col text-sm mb-2 justify-end w-full max-w-md ">
        <span className="uppercase tracking-wider text-slate-400">
          Settings
        </span>
        <h1 className="text-lg font-bold text-slate-800">Account</h1>
      </div>
      <SettingsPage userName={userName[0]?.username} />
    </div>
  );
}
