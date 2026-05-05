import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import WordsPanelContent from "./WordsPanelContent";

export default function WordsPanelDesktop(props) {
  const { isOpen, setIsOpen } = props;

  return (
    <div
      className={`bg-slate-50 flex flex-col transition-all duration-300
      ${isOpen ? "w-64 lg:w-80" : "w-12"}`}
    >
      {" "}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex ${!isOpen ? "justify-center" : "justify-end mr-2"}  py-3 hover:bg-slate-100`}
      >
        {!isOpen ? <GoSidebarCollapse /> :<GoSidebarExpand />

}
      </button>
      {isOpen && <WordsPanelContent {...props} />}
    </div>
  );
}
