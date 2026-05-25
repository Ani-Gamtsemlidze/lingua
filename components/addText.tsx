"use client";
import { saveText } from "@/app/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BiArrowBack } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";

export default function AddText({
  textData: initialText,
}: {
  textData: string;
}) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8">
     <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
            Library
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Add a Text
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Paste any content in your target language and start reading.
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-8">
          <form
            action={async (formData) => {
              const res = await saveText(formData);
              if (res?.error) {
                toast.error(res.error);
              }
            }}
            className="space-y-6"
          >
            <div>
              <label 
                htmlFor="title"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. The Little Prince — Chapter 1"
                className="w-full rounded-xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-sm text-white
                  placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 
                  focus:border-violet-500/50 transition-all"
              />
            </div>

            <div>
              <label 
                htmlFor="content"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Text Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                placeholder="Paste a paragraph, article, or any text in your target language…"
                className="w-full rounded-xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-sm text-white
                  placeholder-slate-500 leading-relaxed resize-none focus:outline-none focus:ring-2 
                  focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
            </div>

            {!initialText && (
              <>
                <div className="flex items-start gap-2 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <HiSparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-300">
                    <strong>Tip:</strong> Shorter texts (200-500 words) work best for focused vocabulary learning.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-slate-700/60 
                      border border-slate-700 text-slate-300 hover:text-white text-sm font-medium px-5 py-3 
                      rounded-xl transition-all"
                  >
                    <BiArrowBack className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 
                      text-white text-sm font-medium px-6 py-3 rounded-xl transition-all 
                      hover:shadow-lg hover:shadow-violet-500/20 hover:scale-[1.02]"
                  >
                    <span>Save and Start Reading</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="mt-6 p-4 bg-slate-800/20 border border-slate-700/40 rounded-xl">
          <p className="text-xs text-slate-500 leading-relaxed">
            📚 <strong className="text-slate-400">Need inspiration?</strong> Try pasting news articles, 
            blog posts, short stories, or song lyrics in your target language. You can tap any word while 
            reading to save it to your vocabulary.
          </p>
        </div>
      </div>
    </div>
  );
}