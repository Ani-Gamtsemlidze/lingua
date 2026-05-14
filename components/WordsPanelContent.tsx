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
      <div className="flex flex-1 items-center justify-center gap-3 p-6 text-center text-slate-400 text-xs">
        Click any word
        <br />
        to save it
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-medium text-slate-800">{activeWord}</p>
            <p className="text-xs text-slate-400 mt-0.5 capitalize">
              {textLanguage}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-300 hover:text-slate-500 transition-colors mt-0.5"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-slate-200" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Translation
            </p>

            {!loadingTranslation && aiTranslation && panelMode === "new" && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                AI
              </span>
            )}

            {panelMode === "saved" && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
                Saved
              </span>
            )}
          </div>

          {loadingTranslation ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg
                  className="animate-spin h-3.5 w-3.5"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Translating...</span>
              </div>
              <div className="w-full h-[38px] rounded-lg bg-slate-100 animate-pulse" />
            </div>
          ) : (
            <input
              value={aiTranslation}
              onChange={(e) => setAiTranslation(e.target.value)}
              placeholder="Add translation"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm..."
            />
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            Note{" "}
            <span className="normal-case font-normal text-slate-300">
              (optional)
            </span>
          </p>
          {loadingTranslation ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg
                  className="animate-spin h-3.5 w-3.5"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Translating...</span>
              </div>
              <div className="w-full h-[38px] rounded-lg bg-slate-100 animate-pulse" />
            </div>
          ) : (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Example sentence or note…"
              rows={3}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm
              bg-white text-slate-800 placeholder-slate-300
              resize-none focus:outline-none focus:ring-2 focus:ring-slate-400
              transition min-h-36"
            />
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 flex gap-2">
        {panelMode === "saved" ? (
          <button
            onClick={handleUpdate}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded-lg"
          >
            Update
          </button>
        ) : (
          <>
            <button
              onClick={handleClose}
              className="text-sm text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loadingTranslation}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded-lg
                disabled:opacity-50"
            >
              Save word
            </button>
          </>
        )}
      </div>
    </div>
  );
}
