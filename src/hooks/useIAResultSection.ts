import { useState } from 'react';

export const useIAResultSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (summary: string) => {
    if (summary && !copied) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return {
    copied,
    handleCopy,
  };
};
