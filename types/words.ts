export type Word = {
  word: string;
  translation: string;
  note?: string;
  id: number;
  token: string;
  status: string;
  fail_count: number;
};

export type PartialWord = {
  id?: number;
  token: string;
  word?: string;
  translation?: string;
  note?: string;
};

  export type Props = {
    closeModal: () => void;
    showEdit?: boolean;
    wordData?: PartialWord;
    selectedWord?: string;
    textEdit?: boolean;
  };
