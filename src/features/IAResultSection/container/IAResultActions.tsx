import { Button } from '@/src/components/ui/button';
import { CheckCircle2, Copy, CopyCheck, Loader2 } from 'lucide-react';
import { useCopySummary } from '@/src/features/IAResultSection/hooks/useCopySummary';

type IAResultActionsProps = {
  isGenerating: boolean;
  summary: string;
};

export const IAResultActions = ({
  isGenerating,
  summary,
}: IAResultActionsProps) => {
  const { copied, handleCopy } = useCopySummary();

  if (isGenerating)
    return <Loader2 className="size-5 shrink-0 animate-spin text-cyan-200" />;

  if (!summary) return null;

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={() => handleCopy(summary)}>
        {copied ? (
          <CopyCheck className="size-5 animate-icon-appear text-green-400 transition-all duration-300" />
        ) : (
          <Copy />
        )}
      </Button>
      <CheckCircle2 className="size-5 animate-icon-appear text-muted-foreground transition-all duration-300" />
    </div>
  );
};
