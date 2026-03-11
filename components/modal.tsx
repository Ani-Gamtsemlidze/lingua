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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-96 max-w-full p-6 rounded-xl shadow-lg transform transition-all scale-95 animate-fadeIn">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Confirm Delete
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this word? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}
