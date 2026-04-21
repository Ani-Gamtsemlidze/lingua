import Link from "next/link";

export default function study() {
  return (
    <div className="bg-fuchsia-50 min-h-screen">
      <ul>
        <li>
          <Link href="/study/flashcards">Flashcards</Link>
        </li>
      </ul>
    </div>
  );
}
