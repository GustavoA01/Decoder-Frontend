import { DownloadFormData } from '@/src/data/schemas';
import { IAOutputType } from '@/src/data/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

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

export type IASectionProps = {
  setSelectedOutput: (outputId: IAOutputType) => void;
  selectedOutput: IAOutputType;
};

export type FormFooterProps = {
  onSubmitDownload: () => void;
  onSubmitIA: () => void;
  isGeneratingIA: boolean;
  isDownloading: boolean;
};

export type InputSectionProps = {
  register: UseFormRegister<DownloadFormData>;
  errors: FieldErrors<DownloadFormData>;
  isDownloading: boolean;
};
