export default function HighlightText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query) return <p>{text}</p>;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <p>{text}</p>;
  return (
    <div>
      <p>
        {text.slice(0, index)}
        <span className="text-indigo-600 font-semibold">{text.slice(index, index + query.length)}</span>
        {text.slice(index + query.length)}
      </p>
    </div>
  );
}
