import { TabIdProps } from '.';

export type IAOutputType = 'summary' | 'chapters' | 'cuts' | 'description';

export type IASummaryRequestType = {
  url: string;
  type: IAOutputType;
};

export type IASummaryResponseType = {
  status: 'success';
  message: string;
  video_id: string;
  url: string;
  title: string;
  author: string;
  video_file: string;
  summary_source: 'video_file';
  summary: string;
};

export type SubmitLinkType = {
  url: string;
  mode: TabIdProps;
};

export type SubmitLinkResponseType = {
  filename: string[];
  message: 'Processamento concluÃ­do';
  status: 'success';
};
