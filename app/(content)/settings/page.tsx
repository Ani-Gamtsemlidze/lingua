import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsPage from "@/components/settingsPage";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession(authOptions);
  const userName = await sql`SELECT username FROM users WHERE id = ${session?.user?.id}`;
  return (
    <div className="flex items-center justify-center bg-slate-950 flex-col p-3">
      <SettingsPage userName={userName[0]?.username} />
    </div>
  );
}