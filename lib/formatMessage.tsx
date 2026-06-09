export function formatMessage(content: string) {
  const parts: React.ReactNode[] = [];
  const lines = content.split("\n");
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      parts.push(
        <h3
          key={key++}
          className="text-sm sm:text-base font-bold text-violet-300 mt-3 mb-1.5 first:mt-0"
        >
          {line.replace("### ", "")}
        </h3>,
      );
      continue;
    }

    if (line.trim().startsWith("* ")) {
      const text = line.trim().slice(2);
      const keyValueMatch = text.match(/\*\*(.*?)\*\*:\s*(.*)/);

      if (keyValueMatch) {
        const [, label, value] = keyValueMatch;
        parts.push(
          <div key={key++} className="flex gap-2 mb-1.5 ml-2">
            <span className="text-violet-400">•</span>
            <div>
              <span className="font-semibold text-emerald-300">{label}:</span>{" "}
              <span className="text-slate-200">{value}</span>
            </div>
          </div>,
        );
      } else {
        parts.push(
          <div key={key++} className="flex gap-2 mb-1.5 ml-2">
            <span className="text-violet-400">•</span>
            <span>{renderInlineBold(text, key)}</span>
          </div>,
        );
      }
      continue;
    }

    if (line.trim()) {
      parts.push(
        <p key={key++} className="mb-1">
          {renderInlineBold(line, key)}
        </p>,
      );
    } else {
      parts.push(<br key={key++} />);
    }
  }

  return <>{parts}</>;
}

function renderInlineBold(text: string, baseKey: number) {
  return text.split(/(\*\*.*?\*\*)/g).map((seg, idx) =>
    seg.startsWith("**") && seg.endsWith("**") ? (
      <strong key={`${baseKey}-${idx}`} className="font-semibold text-violet-200">
        {seg.slice(2, -2)}
      </strong>
    ) : (
      seg
    ),
  );
}
