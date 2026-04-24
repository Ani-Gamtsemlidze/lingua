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
  return (
    show && (
      <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
        <div className="bg-white border border-slate-200 shadow-xl w-96 max-w-full p-6 rounded-xl">

          {/* Header */}
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Hold on!
          </p>
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight mb-1">
            {title}
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}