'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { tabs } from '@/src/data/constants';
import { TabIdProps } from '../types';
import { DownloadForm } from '../container/DownloadForm';
import { TabsButtons } from './TabsButtons';

export const DownloadTabs = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMode = searchParams.get('mode');
  const activeTab: TabIdProps =
    currentMode === 'audio' || currentMode === 'video' ? currentMode : 'video';

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const handleTabChange = (tabId: TabIdProps) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', tabId);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full space-y-5">
      <TabsButtons activeTab={activeTab} handleTabChange={handleTabChange} />

      {activeTabData && (
        <DownloadForm
          activeTab={activeTab}
          description={activeTabData.description}
        />
      )}
    </div>
  );
};
