type Props = {
  text: string;
  query: string;
};

export default function HighlightText({ text, query }: Props) {
  if (!query || !text) {
    return <span className="break-words">{text}</span>;
  }

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) {
    return <span className="break-words">{text}</span>;
  }

  return (
    <span className="break-words">
      {text.slice(0, index)}
      <mark className="text-purple-300 bg-violet-600/40 rounded px-1 py-0.5 font-medium">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </span>
  );
}