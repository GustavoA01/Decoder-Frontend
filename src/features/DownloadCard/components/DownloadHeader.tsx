import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Download } from 'lucide-react';

export const DownloadHeader = () => (
  <CardHeader className="gap-3 border-b border-white/10 bg-white/3 py-6">
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-400/14 text-cyan-300">
        <Download className="size-5" />
      </div>
      <div>
        <CardTitle className="text-xl text-white">Iniciar download</CardTitle>
        <CardDescription className="text-white/58">
          Layout pronto para enviar a URL ao backend.
        </CardDescription>
      </div>
    </div>
  </CardHeader>
);
