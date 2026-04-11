type Props = {
  text: string;
  query: string;
};

export default function HighlightText({ text, query }: Props) {
  if (!query)
    return <p className="text-sm font-bold text-purple-950">{text}</p>;

  const index = text?.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1)
    return <p className="text-sm font-bold text-purple-950">{text}</p>;

  return (
    <p className="text-sm font-bold text-purple-950">
      {text?.slice(0, index)}
      <span className="text-violet-600 bg-violet-100 rounded px-0.5">
        {text?.slice(index, index + query.length)}
      </span>
      {text?.slice(index + query.length)}
    </p>
  );
}
