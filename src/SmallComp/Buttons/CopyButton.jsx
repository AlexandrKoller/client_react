import { useState } from "react";

export default function CopyButtonWithFeedback({ textToCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" className="btn btn-dark" onClick={handleCopy}>
      {copied ? "Готово!" : "Копировать ссылку"}
    </button>
  );
}
