import Image from "next/image";
type Word = {
  id: number;
  word: string;
  translation: string;
  created_at: string;
};
export default async function WordsList() {
  const res = await fetch("http://localhost:3000/api/words", {
    cache: "no-store",
  });
  const words = await res.json();
  return (
    <div className="">
      {words.map((word: Word) => (
        <div
          key={word.id}
          className="grid grid-cols-3 px-4 py-3 border-b border-slate-200 hover:bg-slate-50"
        >
          <p>{word.word}</p>
          <p className="text-indigo-600">{word.translation}</p>
        <Image className="w-5 h-5" src="/images/trash.png" width={200} height={200} alt="image" />
        </div>
      ))}
    </div>
  );
}
