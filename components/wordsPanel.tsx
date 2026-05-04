import { GiCancel, GiSparkles } from "react-icons/gi";

export default function WordsPanel({
  activeWord,
  textLanguage,
  handleClose,
  aiTranslation,
  setAiTranslation,
  note,
  setNote,
  loadingTranslation,
  handleSave,
  handleUpdate,
  panelMode,
}: {
  activeWord: string | null;
  textLanguage: string;
  handleClose: () => void;
  aiTranslation: string;
  setAiTranslation: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
  loadingTranslation: boolean;
  handleSave: () => void;
  handleUpdate: () => void;
  panelMode: "new" | "saved";
}) {
  return (
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
                {!loadingTranslation &&
                  aiTranslation &&
                  panelMode === "new" && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                      <GiSparkles className="w-3 h-3" />
                      AI
                    </span>
                  )}
                {panelMode === "saved" && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
                    Saved
                  </span>
                )}
              </div>
              <input
                value={loadingTranslation ? "" : aiTranslation}
                onChange={(e) => setAiTranslation(e.target.value)}
                placeholder={
                  loadingTranslation ? "Translating..." : "Add translation"
                }
                disabled={loadingTranslation}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800
                  bg-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400
                  focus:border-transparent transition disabled:opacity-50"
              />
            </div>

            {/* <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Base form{" "}
              </p>
              <input
                value={baseWord}
                onChange={(e) => setBaseWord(e.target.value)}
                placeholder="base form"
               className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800
                  bg-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400
                  focus:border-transparent transition disabled:opacity-50" />
            </div> */}

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
                  focus:ring-slate-400 focus:border-transparent transition min-h-36"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 flex gap-2">
            {panelMode === "saved" ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
                    text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Update
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
