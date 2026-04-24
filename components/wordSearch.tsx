"use client";

export default function WordSearch({ setQuery }: { setQuery: (query: string) => void }) {
  return (
    <input
      type="search"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search…"
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700
        placeholder-slate-300 outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
    />
  );
}