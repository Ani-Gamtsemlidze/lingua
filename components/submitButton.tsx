import { useFormStatus } from "react-dom";

export default function SubmitButton({ showEdit }: { showEdit?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : showEdit ? "Update Word" : "Save Word"}
    </button>
  );
}