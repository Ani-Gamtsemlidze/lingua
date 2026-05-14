import { ReaderPanelProps } from "@/types/text";

export default function ReaderPanel({
  savedCount,
  activeWord,
  totalWords,
  handleMouseUp,
  matchWords,
  setActiveWord,
  setAiTranslation,
  setNote,
  handleWordClick,
  setPanelMode,
  loadingTranslation,
}: ReaderPanelProps
) {
  return (
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
      <div
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className="px-4 py-4 leading-8 text-sm text-slate-700 overflow-y-auto max-h-[480px] overflow-x-hidden"
      >
        {matchWords.map((t, i) => (
          <span
            key={i}
            className={`relative group rounded px-0.5 transition-colors ${
              t.isEmpty
                ? "pointer-events-none"
                : t.isPhrase
                  ? "text-blue-700 underline decoration-dotted decoration-blue-300 underline-offset-4 hover:bg-blue-50 cursor-pointer"
                  : t.translation
                    ? "text-green-700 underline decoration-dotted decoration-green-400 underline-offset-4 hover:bg-green-50 cursor-pointer"
                    : activeWord === t.token.replace(/[^\p{L}\p{N}']/gu, "")
                      ? "bg-green-50 text-green-700 cursor-pointer"
                      : "hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            }`}
            onClick={() => {
              if (t.isEmpty) return;
              if ( t.isPhrase || t.translation) {
                setActiveWord(t.word as string);
                setAiTranslation(t.translation ?? "");
                setNote(t.note ?? "");
                setPanelMode("saved")
                return;
              }
             if( loadingTranslation ) return;
              handleWordClick(t.token);
              setPanelMode("new")
            }}
          >
            {t.token}
          </span>
        ))}
      </div>
    </div>
  );
}
