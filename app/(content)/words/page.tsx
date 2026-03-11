import WordAddForm from "@/components/wordAddForm";
import WordsList from "@/components/wordsList";

export default function words() {
  return (
    <div className="">
      <div className="grid grid-cols-4 bg-gray-200 px-4 py-2 font-semibold rounded-t-lg">
        <p>Word</p>
        <p>Translation</p>
        <p>Note</p>
        <input
          type="search"
          value="search"
          readOnly
          placeholder="Search words..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>
      <WordsList />
      {/* <WordAddForm /> */}
    </div>
  );
}
