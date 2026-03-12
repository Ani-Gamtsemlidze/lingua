"use client";

export default function WordSearch({ setQuery }: { setQuery: (query: string) => void }) {

  return (
    <input
      type="search"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search words..."
      className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    />
  );
}
