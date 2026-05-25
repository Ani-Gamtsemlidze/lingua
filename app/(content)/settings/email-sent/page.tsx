import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { MdOutlineAttachEmail } from "react-icons/md";

export default async function EmailSent() {
  const session = await getServerSession(authOptions);
  const result = await sql`SELECT pending_email FROM users WHERE id = ${session?.user.id}`;
  const newEmail = result[0]?.pending_email;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 px-6">
      <div className="bg-slate-900/60 border border-slate-700 rounded-xl px-10 py-10 max-w-sm w-full text-center">
        <div className="w-12 h-12 bg-violet-500/15 border border-violet-400/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <MdOutlineAttachEmail className="w-5 h-5 text-violet-400" />
        </div>

        <h1 className="text-xl font-semibold text-slate-50 tracking-tight mb-2">
          Check your inbox
        </h1>
        <p className="text-sm text-slate-300 mb-2 leading-relaxed">
          We sent a confirmation link to
        </p>
        <p className="text-sm font-medium text-slate-100 mb-8">
          {newEmail}
        </p>

        <p className="text-xs text-slate-400 mb-6">
          Click the link in the email to confirm your new address. If you don't see it, check your spam folder.
        </p>

        <Link
          href="/settings"
          className="text-sm text-slate-300 hover:text-slate-100 font-medium transition-colors"
        >
          ← Back to settings
        </Link>
      </div>
    </div>
  );
}