import { Card, CardContent } from '@/src/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { DownloadHeader } from '../components/DownloadHeader';
import { DownloadTabs } from '../components/DownloadTabs';

export const DownloadCard = () => (
  <Card className="border bg-white/4 py-0 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
    <DownloadHeader />
    <CardContent className="space-y-6 py-6">
      <DownloadTabs />

      <Button
        size="lg"
        form="download"
        className="h-12 w-full rounded-2xl bg-primary-foreground hover:bg-primary transition-all duration-200 text-base font-semibold text-slate-950"
      >
        Baixar agora
        <ArrowRight />
      </Button>
    </CardContent>
  </Card>
);
