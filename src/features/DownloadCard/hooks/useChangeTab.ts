import { tabs } from '@/src/data/constants';
import { TabIdProps } from '@/src/data/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useChangeTab = () => {
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

  return {
    activeTab,
    activeTabData,
    handleTabChange,
  };
};
