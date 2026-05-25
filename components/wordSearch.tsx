"use client";

export default function WordSearch({ setQuery }: { setQuery: (query: string) => void }) {
  return (
    <input
      type="search"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search words or translations..."
      className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3.5 py-2 text-sm text-slate-100
        placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent 
        transition-all hover:border-slate-500"
    />
  );
}