'use client';
import { Button } from '@/src/components/ui/button';
import { useIAResultProvider } from '@/src/data/IAResultContext';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  CopyCheck,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

export const IAResultSection = () => {
  const { error, isGenerating, status, summary } = useIAResultProvider();
  const shouldShow = Boolean(summary || status || error || isGenerating);
  const [copied, setCopied] = useState(false);

  if (!shouldShow) return null;

  const handleCopy = () => {
    if (summary) {
      if (!copied) {
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-black/18 p-5 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-200">
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-tight text-white">
              Resultado da IA
            </h2>
            {status && <p className="text-sm animate-pulse">{status}</p>}
          </div>
        </div>

        {isGenerating ? (
          <Loader2 className="size-5 shrink-0 animate-spin text-cyan-200" />
        ) : (
          summary && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? (
                  <CopyCheck className="size-5 animate-icon-appear transition-all duration-300 text-green-400" />
                ) : (
                  <Copy />
                )}
              </Button>
              <CheckCircle2 className="size-5 animate-icon-appear transition-all duration-300  text-emerald-300" />
            </div>
          )
        )}
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/8 p-3 text-sm text-red-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="min-h-28 whitespace-pre-wrap rounded-xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-white/76">
          {summary}
          {isGenerating && (
            <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-cyan-200 align-[-2px]" />
          )}
        </div>
      )}
    </section>
  );
};
