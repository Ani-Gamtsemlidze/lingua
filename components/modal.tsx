export default function Modal({
  show,
  onClose,
  handleDelete,
  title
}: {
  show: boolean;
  onClose: () => void;
  handleDelete: () => void;
  title: string;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-slate-800 border border-slate-700 shadow-2xl w-full max-w-md p-6 rounded-2xl">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
            Hold on!
          </p>
          <h2 className="text-xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            This action cannot be undone. Are you sure you want to proceed?
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 
              border border-slate-600 text-slate-300 hover:text-white text-sm font-medium 
              transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 
              text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-500/20"
          >
            Delete Forever
          </button>
        </div>
      </div>
    </div>
  );
}