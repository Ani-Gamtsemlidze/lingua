export default function Modal({
  show,
  onClose,
  handleDelete,
}: {
  show: boolean;
  onClose: () => void;
  handleDelete: () => void;
}) {
  return (
    show && (
      <div className="fixed inset-0 bg-purple-950/40 flex items-center justify-center z-50">
        <div className="bg-fuchsia-50 border-2 border-purple-200 w-96 max-w-full p-6 rounded-3xl">

          {/* Header */}
          <p className="text-xs font-extrabold uppercase tracking-widest text-purple-300 mb-1">
            Hold on!
          </p>
          <h2 className="font-serif text-2xl font-bold text-purple-950 mb-2">
            Delete this word?
          </h2>
          <p className="text-sm font-semibold text-purple-400 mb-6">
            This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border-2 border-purple-200 text-purple-400 text-sm font-extrabold hover:border-violet-400 hover:text-violet-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-extrabold transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}