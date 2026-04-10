"use client";
import { deleteText } from "@/app/action";
import { textData } from "@/types/text";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function TextsList({ textData }: { textData: textData[] }) {
  return (
    <ul className="flex flex-col divide-y divide-zinc-100">
      {textData.map((text, index) => (
        <div key={index} className="flex items-center">
          <Link
            href={`/reader/${text.id}`}
            className="py-3 text-sm text-zinc-800 hover:text-zinc-500 transition-colors cursor-pointer"
          >
            {text.title}
          </Link>
          <div onClick={() => deleteText(text?.id)}>
            <RiDeleteBin6Line className="ml-4 cursor-pointer" />
          </div>
        </div>
      ))}
    </ul>
  );
}
