import { Card, CardContent } from '@/src/components/ui/card';
import { DownloadHeader } from '../components/DownloadHeader';
import { DownloadTabs } from './DownloadTabs';

export const DownloadCard = () => (
  <Card className="border bg-white/4 py-0 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
    <DownloadHeader />
    <CardContent className="space-y-6 py-6">
      <DownloadTabs />
    </CardContent>
  </Card>
);
