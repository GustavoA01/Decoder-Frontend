import { TabIdProps } from '../features/DownloadCard/types';

export type SubmitLinkType = {
  url: string;
  mode: TabIdProps;
};

export type SubmitLinkResponseType = {
  filename: string[];
  message: 'Processamento concluído';
  status: 'success';
};
