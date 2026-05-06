export type TabIdProps = 'video' | 'audio';

export type DownloadTabsProps = {
  activeTab: TabIdProps;
  onTabChange: (tabId: TabIdProps) => void;
};

export type DownloadFormProps = {
  activeTab: TabIdProps;
  description: string;
};

export type TabsButtonsProps = {
  activeTab: TabIdProps;
  handleTabChange: (tabId: TabIdProps) => void;
};
