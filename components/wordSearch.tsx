"use client";

export default function WordSearch({ setQuery }: { setQuery: (query: string) => void }) {

  return (
     <input
      type="search"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search words..."
      className="w-full rounded-xl border-2 border-purple-200 bg-white px-3 py-1.5 text-sm font-semibold text-purple-950 placeholder-purple-200 outline-none focus:border-violet-500 transition"
    />
  );
}
