export type IAResultHeaderProps = {
  status: string | null;
  isGenerating: boolean;
};

export type IAResultActionsProps = {
  isGenerating: boolean;
  summary: string;
};

export type IAResultContentProps = {
  error: string | null;
  isGenerating: boolean;
  summary: string;
};
