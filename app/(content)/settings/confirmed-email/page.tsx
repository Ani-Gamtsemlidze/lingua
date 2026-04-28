import Link from "next/link";
import { BiCheck } from "react-icons/bi";

export default function EmailConfirmed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-6">
      <div className="bg-white  border border-slate-200 rounded-xl px-10 py-10  max-w-sm w-full text-center">

        <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <BiCheck className="w-5 h-5 text-green-600" />
        </div>

        <h1 className="text-xl font-semibold text-slate-800 tracking-tight mb-2">
          Email confirmed!
        </h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Your email has been updated successfully. Please log in again with your new email.
        </p>

        <Link
          href="/login"
          className="w-full inline-flex justify-center items-center bg-slate-800 hover:bg-slate-700
            active:bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}