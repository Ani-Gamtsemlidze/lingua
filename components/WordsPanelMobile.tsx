import WordsPanelContent from "./WordsPanelContent";

export default function WordsPanelMobile({  ...props }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 md:hidden"
      />

      <div
        className="fixed inset-x-0 bottom-0 z-50 md:hidden
        bg-white rounded-t-2xl shadow-xl
        max-h-[70vh] overflow-y-auto
        animate-slideUp"
      >
        <div className="w-full flex justify-center py-2">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        <WordsPanelContent {...props} />
      </div>
    </>
  );
}