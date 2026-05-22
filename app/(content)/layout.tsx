import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { authOptions } from "../api/auth/[...nextauth]/route";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-sans",
});

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  const user = (await sql`
  SELECT username, active_language 
  FROM users 
  WHERE id = ${userId}
`) as { username: string; active_language: string }[];

  const username = user?.[0]?.username ?? session?.user?.name ?? "John Doe";
  const activeLanguage = user?.[0]?.active_language ?? "english";
  return (
    <div
      className={`flex relative h-screen overflow-hidden ${dmSans.variable} font-sans`}
    >
      <Sidebar userName={username} activeLanguage={activeLanguage} />
      <div className="flex flex-col flex-1">
        {/* <Header /> */}
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Toaster position="top-center" richColors />
      </div>
    </div>
  );
}
