'use client';
import { DownloadForm } from './DownloadForm';
import { TabsButtons } from '../components/TabsButtons';
import { useChangeTab } from '../hooks/useChangeTab';

export const DownloadTabs = () => {
  const { activeTab, activeTabData, handleTabChange } = useChangeTab();

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
