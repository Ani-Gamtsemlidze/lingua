"use client";
import { deleteWord } from "@/app/action";
import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";
import WordAddForm from "./wordAddForm";
import { Word } from "@/types/words";
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
      />
      {showEdit && (
        <WordAddForm
          wordData={wordData}
          showEdit={showEdit}
          closeModal={() => setShowEdit(false)}
        />
      )}
      <Image
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
        onClick={() => setShowEdit(true)}
      />
    </div>
  );
}
