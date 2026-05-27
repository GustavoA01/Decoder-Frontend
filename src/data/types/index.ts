import { Dispatch, SetStateAction } from 'react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';
import { IAOutputType } from './api';

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

export type OutputOptionsType = {
  id: IAOutputType;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  description: string;
}[];
