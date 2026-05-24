import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import WordsPanelContent from "./WordsPanelContent";

type WordsPanelBaseProps = {
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
};

type WordsPanelDesktopProps = WordsPanelBaseProps & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WordsPanelDesktop({
  isOpen,
  setIsOpen,
  ...props
}: WordsPanelDesktopProps) {
  return (
    <div
      className={`bg-slate-900 border-l border-slate-700/40 flex flex-col transition-all duration-300
      ${isOpen ? "w-80 lg:w-96 h-full" : "w-14"}`}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex ${
          !isOpen ? "justify-center" : "justify-end"
        } py-4 px-3 hover:bg-slate-800/50 transition-colors border-b border-slate-700/40`}
        aria-label={isOpen ? "Collapse panel" : "Expand panel"}
      >
        {isOpen ? (
          <GoSidebarCollapse className="text-slate-400 hover:text-white transition-colors w-5 h-5" />
        ) : (
          <GoSidebarExpand className="text-slate-400 hover:text-white transition-colors w-5 h-5" />
        )}
      </button>

      {isOpen && <WordsPanelContent {...props} />}
    </div>
  );
}