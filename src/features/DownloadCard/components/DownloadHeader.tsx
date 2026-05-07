import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Download } from 'lucide-react';

export const DownloadHeader = () => (
  <CardHeader className="gap-3 border-b border-white/10 bg-white/3 py-6">
    <div className="flex items-start gap-3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/14 text-cyan-300">
        <Download className="size-5" />
      </div>
      <div className="min-w-0 space-y-1">
        <CardTitle className="text-xl leading-tight text-white">
          Decodificar vídeo
        </CardTitle>
        <CardDescription className="max-w-sm text-white/58">
          Cole um link e escolha como quer transformar o conteúdo.
        </CardDescription>
      </div>
    </div>
  </CardHeader>
);
