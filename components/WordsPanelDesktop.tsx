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
      className={`bg-slate-50 flex flex-col transition-all duration-300
      ${isOpen ? "w-64 lg:w-80" : "w-12"}`}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex ${
          !isOpen ? "justify-center" : "justify-end"
        } py-3 hover:bg-slate-100`}
      >
        {isOpen ? (
          <GoSidebarCollapse className="text-slate-700 mr-2" />
        ) : (
          <GoSidebarExpand className="text-slate-700" />
        )}
      </button>

      {isOpen && <WordsPanelContent {...props} />}
    </div>
  );
}
