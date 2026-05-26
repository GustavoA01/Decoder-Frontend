'use client';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { IAResultContextType } from './types';

const IAResultContext = createContext<IAResultContextType | null>(null);

export const IAResultProvider = ({ children }: { children: ReactNode }) => {
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

  if (!context)
    throw new Error('useIAResultProvider deve ser usado dentro do provider');

  return context;
};
