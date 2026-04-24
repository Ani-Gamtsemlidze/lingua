import { useFormStatus } from "react-dom";

export default function SubmitButton({ showEdit }: { showEdit?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
        transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving…" : showEdit ? "Update word" : "Save word"}
    </button>
  );
}