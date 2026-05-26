import { Dispatch, SetStateAction } from 'react';

export type TabIdProps = 'video' | 'audio';

export type IAResultContextType = {
  summary: string;
  status: string | null;
  error: string | null;
  isGenerating: boolean;
  setSummary: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  resetIAResult: () => void;
};
