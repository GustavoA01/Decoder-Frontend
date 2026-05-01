'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { tabs } from '@/src/data/constants';
import { TabIdProps } from '../types';
import { DownloadForm } from '../container/DownloadForm';

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
      <div className="grid h-auto w-full grid-cols-2 rounded-2xl bg-white/8 p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id as TabIdProps)}
              className={`flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm transition ${
                isActive ? 'bg-primary text-slate-950' : 'text-white'
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTabData && (
        <DownloadForm
          activeTab={activeTab}
          description={activeTabData.description}
        />
      )}
    </div>
  );
};
