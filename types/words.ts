export type Word = {
  word?: string;
  translation?: string;
  note?: string;
  id?: number;
  token?: string;
};

export type Props = {
  closeModal: () => void;
  showEdit?: boolean;
  wordData?: Word;
  selectedWord?: string;
  textEdit?: boolean;
};
