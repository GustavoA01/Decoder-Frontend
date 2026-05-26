import { TabIdProps } from '.';

export type IAOutputType = 'summary' | 'chapters' | 'cuts' | 'description';

export type IASummaryRequestType = {
  url: string;
  type: IAOutputType;
};

export type IASummaryResponseType = {
  result?: string;
  message?: string;
  status?: string;
};

export type SubmitLinkType = {
  url: string;
  mode: TabIdProps;
};

export type SubmitLinkResponseType = {
  filename: string[];
  message: 'Processamento concluído';
  status: 'success';
};
