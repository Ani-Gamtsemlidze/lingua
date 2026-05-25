import Link from "next/link";
import { BiCheck } from "react-icons/bi";

export default function EmailConfirmed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 px-6">
      <div className="bg-slate-900/60 border border-slate-700 rounded-xl px-10 py-10 max-w-sm w-full text-center">
        <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <BiCheck className="w-6 h-6 text-emerald-400" />
        </div>

        <h1 className="text-xl font-semibold text-slate-50 tracking-tight mb-2">
          Email confirmed!
        </h1>
        <p className="text-sm text-slate-300 mb-8 leading-relaxed">
          Your email has been updated successfully. Please log in again with your new email.
        </p>

        <Link
          href="/login"
          className="w-full inline-flex justify-center items-center bg-violet-600 hover:bg-violet-700
            active:bg-violet-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}