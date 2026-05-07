"use client";
import { saveText } from "@/app/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Reader({
  textData: initialText,
}: {
  textData: string;
}) {
  const router = useRouter();
  return (
    <div className="bg-slate-50 px-4 md:px-6 py-6 md:py-10 pt-20 md:pt-10">
  <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Reader
          </p>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Add a text
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Paste any text in your target language and start reading.
          </p>
        </div>

        <form
          action={async (formData) => {
            const res = await saveText(formData);
            if (res?.error) {
              toast.error(res.error);
            }
          }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Title
            </label>
            <input
              name="title"
              placeholder="e.g. The Little Prince — Chapter 1"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800
                placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Text
            </label>
            <textarea
              rows={6}
              name="content"
              placeholder="Paste a paragraph, article, or any text in your target language…"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800
                placeholder-slate-300 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
          </div>

          {!initialText && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-slate-400">
                Tip: shorter texts work best.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className=" ml-3 inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
                  transition-colors text-white text-sm font-medium px-3 py-2 rounded-lg cursor-pointer"
                >
                  Save text
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
