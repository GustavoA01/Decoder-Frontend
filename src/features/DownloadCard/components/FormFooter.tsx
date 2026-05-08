import { Button } from '@/src/components/ui/button';
import { Spinner } from '@/src/components/ui/spinner';
import { Download, Sparkles } from 'lucide-react';
import { FormFooterProps } from '../types';

export const FormFooter = ({
  isGeneratingIA,
  isDownloading,
  onSubmitDownload,
  onSubmitIA,
}: FormFooterProps) => (
  <footer className="grid gap-3 sm:grid-cols-2">
    <Button
      type="submit"
      size="lg"
      form="download"
      disabled={isDownloading}
      onClick={onSubmitDownload}
      className="h-12 w-full rounded-2xl bg-primary-foreground text-base font-semibold text-slate-950 transition-all duration-200 hover:bg-primary"
    >
      {isDownloading ? (
        <>
          <Spinner className="size-4 text-slate-950" />
          Baixando...
        </>
      ) : (
        <>
          Baixar arquivo
          <Download />
        </>
      )}
    </Button>

    <Button
      type="button"
      size="lg"
      disabled={isGeneratingIA}
      className="h-12 w-full rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-base font-semibold text-cyan-100 transition-all duration-200 hover:bg-cyan-300/16"
      onClick={onSubmitIA}
    >
      {isGeneratingIA ? (
        <>
          <Spinner className="size-4 text-cyan-100" />
          Gerando...
        </>
      ) : (
        <>
          Gerar resultado
          <Sparkles />
        </>
      )}
    </Button>
  </footer>
);
