'use client';
import {
  createContext,
  type Dispatch,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type SetStateAction,
} from 'react';

type IAResultContextValue = {
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

type IAResultProviderProps = {
  children: ReactNode;
};

const IAResultContext = createContext<IAResultContextValue | null>(null);

export const IAResultProvider = ({ children }: IAResultProviderProps) => {
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const resetIAResult = useCallback(() => {
    setSummary('');
    setStatus(null);
    setError(null);
    setIsGenerating(false);
  }, []);

  const value = useMemo(
    () => ({
      summary,
      status,
      error,
      isGenerating,
      setSummary,
      setStatus,
      setError,
      setIsGenerating,
      resetIAResult,
    }),
    [error, isGenerating, resetIAResult, status, summary],
  );

  return (
    <IAResultContext.Provider value={value}>
      {children}
    </IAResultContext.Provider>
  );
};

export const useIAResultProvider = () => {
  const context = useContext(IAResultContext);

  if (!context) {
    throw new Error(
      'useIAResultProvider deve ser usado dentro de IAResultProvider',
    );
  }

  return context;
};
