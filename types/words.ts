export type Word = {
  word: string;
  translation: string;
  note: string;
  id: number;
};

export type Props = {
  closeModal: () => void;
  showEdit?: boolean;
  wordData?: Word;
  selectedWord?: string;
  textEdit?: boolean;
};
