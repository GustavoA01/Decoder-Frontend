'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { IAResultContextType, StoredIAResultType } from './types';

const IA_RESULT_STORAGE_KEY = 'decoder:last-ia-result';
const IA_RESULT_STORAGE_EVENT = 'decoder:ia-result-storage-change';

const IAResultContext = createContext<IAResultContextType | null>(null);

const getStoredIAResultSnapshot = () => {
  if (typeof window === 'undefined') return null;

  return window.localStorage.getItem(IA_RESULT_STORAGE_KEY);
};

const subscribeToStoredIAResult = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener(IA_RESULT_STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(IA_RESULT_STORAGE_EVENT, callback);
  };
};

const notifyStoredIAResultChange = () => {
  window.dispatchEvent(new Event(IA_RESULT_STORAGE_EVENT));
};

const parseStoredIAResult = (
  storedValue: string | null,
): StoredIAResultType | null => {
  if (!storedValue) return null;

  try {
    const parsed = JSON.parse(storedValue) as StoredIAResultType;

    if (!parsed.summary) return null;

    return parsed;
  } catch {
    return null;
  }
};

export const IAResultProvider = ({ children }: { children: ReactNode }) => {
  const storedValue = useSyncExternalStore(
    subscribeToStoredIAResult,
    getStoredIAResultSnapshot,
    () => null,
  );
  const storedResult = useMemo(
    () => parseStoredIAResult(storedValue),
    [storedValue],
  );
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const visibleSummary = summary || storedResult?.summary || '';
  const visibleStatus = status;

  useEffect(() => {
    if (isGenerating || error || !summary) return;

    window.localStorage.setItem(
      IA_RESULT_STORAGE_KEY,
      JSON.stringify({ summary, status: null }),
    );
    notifyStoredIAResultChange();
  }, [error, isGenerating, status, summary]);

  const resetIAResult = useCallback(() => {
    setSummary('');
    setStatus(null);
    setError(null);
    setIsGenerating(false);
    window.localStorage.removeItem(IA_RESULT_STORAGE_KEY);
    notifyStoredIAResultChange();
  }, []);

  const value = useMemo(
    () => ({
      summary: visibleSummary,
      status: visibleStatus,
      error,
      isGenerating,
      setSummary,
      setStatus,
      setError,
      setIsGenerating,
      resetIAResult,
    }),
    [error, isGenerating, resetIAResult, visibleStatus, visibleSummary],
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
