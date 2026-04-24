"use client";
import { deleteWord } from "@/app/action";
import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";
import WordAddForm from "./wordAddForm";
import { Word } from "@/types/words";
import { MdDeleteSweep } from "react-icons/md";
import { BiPencil, BiSolidMessageSquareEdit } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
export default function EditWord({
  wordId,
  wordData,
}: {
  wordId: number;
  wordData: Word;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  async function handleDelete() {
    await deleteWord(wordId);
    setShowConfirm(false);
  }

  return (
    <div className="flex justify-end">
      <Modal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        handleDelete={handleDelete}
        title="Delete this word?"
      />
      {showEdit && (
        <WordAddForm
          wordData={wordData}
          showEdit={showEdit}
          closeModal={() => setShowEdit(false)}
        />
      )}
      <BsTrash2
        className="w-4 h-4 mr-2 text-slate-400 hover:text-red-400 cursor-pointer transition-colors"
        onClick={() => setShowConfirm(true)}
      />
      <BiPencil
        className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={() => setShowEdit(true)}
      />

      {/* <Image
        className="w-5 h-5"
        src="/images/trash.png"
        width={200}
        height={200}
        alt="image"
        onClick={() => setShowConfirm(true)}
      />
      <Image
        className="w-5 h-5 ml-2"
        src="/images/edit.png"
        width={200}
        height={200}
        alt="image"
          
      /> */}
    </div>
  );
}
