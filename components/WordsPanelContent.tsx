export default function WordsPanelContent({
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
}: any) {
  if (!activeWord) {
    return (
      <div className="flex flex-1 items-center justify-center gap-3 p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center">
            <span className="text-2xl">💡</span>
          </div>
          <p className="text-sm text-slate-400">
            Tap any word in the text
            <br />
            to save and learn it
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-shrink-0 p-5 border-b border-slate-700/40">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate">{activeWord}</h3>
            <p className="text-xs text-slate-500 mt-1 capitalize">
              {textLanguage}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg 
              text-slate-400 hover:text-white hover:bg-slate-800 transition-all ml-3"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Translation
            </label>

            {!loadingTranslation && aiTranslation && panelMode === "new" && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-500/10 
                text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                ✨ AI
              </span>
            )}

            {panelMode === "saved" && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-violet-500/10 
                text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-md">
                ✓ Saved
              </span>
            )}
          </div>

          {loadingTranslation ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Getting translation...</span>
              </div>
              <div className="w-full h-11 rounded-xl bg-slate-800/50 animate-pulse" />
            </div>
          ) : (
            <input
              value={aiTranslation}
              onChange={(e) => setAiTranslation(e.target.value)}
              placeholder="Add translation here"
              className="w-full border border-slate-600 rounded-xl px-4 py-3 text-sm
                bg-slate-800/50 text-white placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                transition-all"
            />
          )}
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 block">
            Note{" "}
            <span className="normal-case font-normal text-slate-500">
              (optional)
            </span>
          </label>
          
          {loadingTranslation ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Generating example...</span>
              </div>
              <div className="w-full h-24 rounded-xl bg-slate-800/50 animate-pulse" />
            </div>
          ) : (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Example: The cat sat on the mat"
              rows={4}
              className="w-full border border-slate-600 rounded-xl px-4 py-3 text-sm
                bg-slate-800/50 text-white placeholder-slate-500 leading-relaxed
                resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 
                focus:border-violet-500/50 transition-all"
            />
          )}
        </div>
      </div>

      <div className="flex-shrink-0 p-4 border-t border-slate-700/40 bg-slate-900/50">
        {panelMode === "saved" ? (
          <button
            onClick={handleUpdate}
            className="w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800
              text-white text-sm font-medium py-3 rounded-xl transition-all
              hover:shadow-lg hover:shadow-violet-500/20"
          >
            Update Word
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white 
                hover:bg-slate-800 rounded-xl transition-all"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loadingTranslation || !aiTranslation.trim()}
              className="flex-1 bg-violet-600 hover:bg-violet-700 active:bg-violet-800
                disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed
                text-white text-sm font-medium py-3 rounded-xl transition-all
                hover:shadow-lg hover:shadow-violet-500/20 disabled:shadow-none"
            >
              Save Word
            </button>
          </div>
        )}
      </div>
    </div>
  );
}