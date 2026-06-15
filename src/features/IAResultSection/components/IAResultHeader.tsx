import { Sparkles } from 'lucide-react';
import { IAResultHeaderProps } from '../types';

export const IAResultHeader = ({
  status,
  isGenerating,
}: IAResultHeaderProps) => (
  <header className="flex min-w-0 items-center gap-3">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-200">
      <Sparkles className="size-4" />
    </div>
    <div className="min-w-0">
      <h2 className="text-base font-semibold leading-tight text-white">
        Resultado da IA
      </h2>
      {status && (
        <p className={`${isGenerating ? 'animate-pulse' : ''} text-sm`}>
          {status}
        </p>
      )}
    </div>
  </header>
);
