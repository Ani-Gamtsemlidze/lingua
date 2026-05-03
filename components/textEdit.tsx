// "use client";

// import { useState } from "react";
// import WordAddForm from "./wordAddForm";
// import { updateText } from "@/app/action";
// import { BiCheck, BiPencil } from "react-icons/bi";
// import { getAITranslation } from "@/app/actions/ai";

// export default function TextEdit({
//   matchWords,
//   userText,
//   textLanguage,
// }: {
//   matchWords: {
//     token: string;
//     word?: string;
//     note?: string;
//     translation?: string;
//     id?: number;
//     isEmpty?: boolean;
//   }[];
//   userText: {
//     id: number;
//     title: string;
//     content: string;
//   };
//   textLanguage: string;
// }) {
//   const [showWordAddForm, setShowWordAddForm] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [selectedWord, setSelectedWord] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false);
// const [aiTranslation, setAiTranslation] = useState("");

//   const handleClick = (token: string) => {
//     const cleanWord = token.replace(/[^\p{L}\p{N}']/gu, "");
//     setSelectedWord(cleanWord);
//   };

//   const found = matchWords.find((w) => w.word === selectedWord);
//   const savedCount = matchWords.filter((w) => w.translation).length;
//   const totalWords = matchWords.filter((w) => !w.isEmpty).length;

//   return (
//     <div className="min-h-screen bg-slate-50 px-6 py-10">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
//               Reader
//             </p>
//             <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
//               {userText.title}
//             </h1>
//             {savedCount > 0 && (
//               <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1.5">
//                 <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
//                 {savedCount} of {totalWords} words saved
//               </p>
//             )}
//           </div>

//           {/* Edit toggle */}
//           <button
//             onClick={() => setIsEditMode(!isEditMode)}
//             className={`mt-1 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-all cursor-pointer
//               ${
//                 isEditMode
//                   ? "bg-slate-800 text-white border-slate-800"
//                   : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
//               }`}
//           >
//             {isEditMode ? (
//               <>
//                 <BiCheck className="w-3.5 h-3.5" /> Done
//               </>
//             ) : (
//               <>
//                 <BiPencil className="w-3.5 h-3.5" /> Edit
//               </>
//             )}
//           </button>
//         </div>

//         {/* Modals */}
//         {showWordAddForm && (
//           <WordAddForm
//             selectedWord={selectedWord}
//             textEdit={showWordAddForm}
//             closeModal={() => setShowWordAddForm(false)}
//             textLanguage={textLanguage}
//             aiTranslation={aiTranslation}
//           />
//         )}
//         {showEdit && (
//           <WordAddForm
//             wordData={found}
//             closeModal={() => setShowEdit(false)}
//             showEdit={showEdit}
//           />
//         )}

//         {/* Edit mode */}
//         {isEditMode ? (
//           <form action={updateText} className="flex flex-col gap-4">
//             <input type="hidden" name="textId" value={userText.id} />
//             <textarea
//               name="content"
//               rows={12}
//               defaultValue={userText.content
//                 .replace(/\n/g, " ")
//                 .replace(/\s+/g, " ")
//                 .trim()}
//               className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800
//                 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
//             />
//             <div className="flex items-center justify-between">
//               <button
//                 type="button"
//                 onClick={() => setIsEditMode(false)}
//                 className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
//                   transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer"
//               >
//                 Save changes
//               </button>
//             </div>
//           </form>
//         ) : (
//           <>
//             {/* Hint + language tag */}
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-xs font-medium text-slate-400">
//                 Tap a word to save it
//               </p>
//             </div>

//             {/* Text reader */}
//             <div className="max-h-[420px] overflow-y-scroll rounded-xl border border-slate-200">
//               <div className="bg-white px-5 pt-10 pb-5 leading-8 text-sm text-slate-700  rounded-xl">
//                 {matchWords.map((t, i) => (
//                   <span
//                     key={i}
//                     className={`relative group cursor-pointer rounded px-0.5 transition-colors ${
//                       t.isEmpty
//                         ? "pointer-events-none"
//                         : t.translation
//                           ? "text-green-700 underline decoration-dotted decoration-green-400 underline-offset-4 hover:bg-green-50"
//                           : "hover:bg-slate-100 hover:text-slate-900"
//                     }`}
//                     onClick={async() => {
//                       if (t.isEmpty) return;
//                       if (!t.translation) {
//                         handleClick(t.token);
//                         const translation = await getAITranslation(
//                           t.token,
//                           textLanguage,
//                         );
//                         setAiTranslation(translation ?? "");
//                         setShowWordAddForm(true);
//                         setShowWordAddForm(true);
//                       } else {
//                         setShowEdit(true);
//                         setSelectedWord(t.word as string);
//                       }
//                     }}
//                   >
//                     {t.token}
//                     {t.translation && (
//                       <span
//                         className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex
//                       items-center whitespace-nowrap bg-slate-800 text-white text-xs font-medium
//                       px-3 py-1.5 rounded-lg shadow-sm pointer-events-none z-10"
//                       >
//                         {t.translation}
//                       </span>
//                     )}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Progress bar */}
//             {savedCount > 0 && (
//               <div className="mt-4 flex items-center gap-3">
//                 <div className="h-1.5 bg-slate-200 rounded-full flex-1 overflow-hidden">
//                   <div
//                     className="h-full bg-green-500 rounded-full transition-all"
//                     style={{
//                       width: `${Math.min(100, (savedCount / totalWords) * 100)}%`,
//                     }}
//                   />
//                 </div>
//                 <span className="text-xs text-slate-400 shrink-0">
//                   {savedCount} / {totalWords}
//                 </span>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { updateText, addWord } from "@/app/action";
import { BiCheck, BiPencil } from "react-icons/bi";
import { getAITranslation } from "@/app/actions/ai";
import { toast } from "sonner";
import { GiCancel, GiSparkles } from "react-icons/gi";

export default function TextEdit({
  matchWords,
  userText,
  textLanguage,
}: {
  matchWords: {
    token: string;
    word?: string;
    note?: string;
    translation?: string;
    id?: number;
    isEmpty?: boolean;
  }[];
  userText: {
    id: number;
    title: string;
    content: string;
  };
  textLanguage: string;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [aiTranslation, setAiTranslation] = useState("");
  const [note, setNote] = useState("");
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  const savedCount = matchWords.filter((w) => w.translation).length;
  const totalWords = matchWords.filter((w) => !w.isEmpty).length;

  async function handleWordClick(token: string) {
    const cleanWord = token.replace(/[^\p{L}\p{N}']/gu, "");
    if (!cleanWord) return;

    setActiveWord(cleanWord);
    setAiTranslation("");
    setNote("");
    setLoadingTranslation(true);

    // const fullText = userText.content;
    // const sentences = fullText.match(/[^.!?]+[.!?]+/g) ?? [];
    // const context =
    //   sentences.find((s) =>
    //     s.toLowerCase().includes(cleanWord.toLowerCase()),
    //   ) ?? "";

    const result = await getAITranslation(cleanWord, textLanguage,);
    setAiTranslation(result.translation ?? "");
    setNote(
      result.example
        ? result.exampleTranslation
          ? `${result.example}\n${result.exampleTranslation}`
          : result.example
        : "",
    );
    setLoadingTranslation(false);
  }

  function handleClose() {
    setActiveWord(null);
    setAiTranslation("");
    setNote("");
  }

  async function handleSave() {
    if (!activeWord || !aiTranslation.trim()) {
      toast.error("Translation is required");
      return;
    }

    const formData = new FormData();
    formData.set("word", activeWord);
    formData.set("translation", aiTranslation);
    formData.set("note", note);
    formData.set("language", textLanguage);

    await addWord(formData);
    toast.success("Word saved!");
    handleClose();
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Reader
            </p>
            <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
              {userText.title}
            </h1>
            {savedCount > 0 && (
              <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                {savedCount} of {totalWords} words saved
              </p>
            )}
          </div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`mt-1 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-all cursor-pointer
              ${
                isEditMode
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
          >
            {isEditMode ? (
              <>
                <BiCheck className="w-3.5 h-3.5" /> Done
              </>
            ) : (
              <>
                <BiPencil className="w-3.5 h-3.5" /> Edit
              </>
            )}
          </button>
        </div>

        {/* Edit mode */}
        {isEditMode ? (
          <form action={updateText} className="flex flex-col gap-4">
            <input type="hidden" name="textId" value={userText.id} />
            <textarea
              name="content"
              rows={12}
              defaultValue={userText.content
                .replace(/\n/g, " ")
                .replace(/\s+/g, " ")
                .trim()}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800
                leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700
                  text-white text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-[1fr_280px] gap-0 rounded-xl border border-slate-200 overflow-hidden">
            {/* Reader */}
            <div className="bg-white border-r border-slate-200 flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                <p className="text-xs font-medium text-slate-400">
                  Click a word to save it
                </p>
                <div className="flex items-center gap-3">
                  {savedCount > 0 && (
                    <div className="h-1.5 bg-slate-100 rounded-full w-20 overflow-hidden">
                      <div
                        className="h-full bg-green-400 rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (savedCount / totalWords) * 100)}%`,
                        }}
                      />
                    </div>
                  )}
                  <span className="text-xs text-slate-400">
                    {savedCount}/{totalWords}
                  </span>
                </div>
              </div>
              <div className="px-5 py-5 leading-8 text-sm text-slate-700 overflow-y-auto max-h-[480px]">
                {matchWords.map((t, i) => (
                  <span
                    key={i}
                    className={`relative group rounded px-0.5 transition-colors ${
                      t.isEmpty
                        ? "pointer-events-none"
                        : t.translation
                          ? "text-green-700 underline decoration-dotted decoration-green-400 underline-offset-4 hover:bg-green-50 cursor-pointer"
                          : activeWord ===
                              t.token.replace(/[^\p{L}\p{N}']/gu, "")
                            ? "bg-green-50 text-green-700 cursor-pointer"
                            : "hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                    }`}
                    onClick={() => {
                      if (t.isEmpty || t.translation) return;
                      handleWordClick(t.token);
                    }}
                  >
                    {t.token}
                    {t.translation && (
                      <span
                        className="absolute bottom-full left-0 mb-2 hidden group-hover:flex
                        items-center whitespace-nowrap bg-slate-800 text-white text-xs font-medium
                        px-3 py-1.5 rounded-lg shadow-sm pointer-events-none z-10"
                      >
                        {t.translation}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div className="bg-slate-50 flex flex-col">
              {!activeWord ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2v12M2 8h12"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Click any word
                    <br />
                    to save it
                  </p>
                </div>
              ) : (
                <div className="flex flex-col flex-1">
                  <div className="flex-1 flex flex-col gap-4 p-4">
                    {/* Word + close */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-lg font-medium text-slate-800">
                          {activeWord}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 capitalize">
                          {textLanguage}
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="text-slate-300 hover:text-slate-500 transition-colors cursor-pointer mt-0.5"
                      >
                        <GiCancel className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="h-px bg-slate-200" />

                    {/* Translation */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                          Translation
                        </p>
                        {!loadingTranslation && aiTranslation && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                            <GiSparkles className="w-3 h-3" />
                            AI
                          </span>
                        )}
                      </div>
                      <input
                        value={loadingTranslation ? "" : aiTranslation}
                        onChange={(e) => setAiTranslation(e.target.value)}
                        placeholder={
                          loadingTranslation
                            ? "Translating..."
                            : "Add translation"
                        }
                        disabled={loadingTranslation}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800
                          bg-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400
                          focus:border-transparent transition disabled:opacity-50"
                      />
                    </div>

                    {/* Note */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                        Note{" "}
                        <span className="normal-case tracking-normal font-normal text-slate-300">
                          (optional)
                        </span>
                      </p>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Example sentence or note…"
                        rows={3}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800
                          bg-white placeholder-slate-300 resize-none focus:outline-none focus:ring-2
                          focus:ring-slate-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-slate-200 flex gap-2">
                    <button
                      onClick={handleClose}
                      className="text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loadingTranslation}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
                        text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save word
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
