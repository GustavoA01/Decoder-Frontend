import { ArrowRight, Link2 } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { DownloadFormProps } from '../types';
import { useDownloadForm } from '../hooks/useDownloadForm';
import { Button } from '@/src/components/ui/button';
import { Spinner } from '@/src/components/ui/spinner';

export const DownloadForm = ({ description, activeTab }: DownloadFormProps) => {
  const { handleSubmit, handleDownload, register, errors, isDownloading } =
    useDownloadForm(activeTab);

  return (
    <form
      id="download"
      className="space-y-4"
      onSubmit={handleSubmit(handleDownload)}
    >
      <div className="space-y-2">
        <Label className="text-sm font-medium text-white/82">
          Link do YouTube
        </Label>
        <div className="relative">
          <Link2 className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/38" />
          <Input
            type="url"
            {...register('url')}
            disabled={isDownloading}
            placeholder="https://www.youtube.com/watch?v=..."
            className="h-12 rounded-2xl border-white/12 bg-black/20 pl-11 text-white placeholder:text-white/32"
          />
        </div>
        {errors.url && (
          <p className="text-sm text-red-400">{errors.url.message}</p>
        )}
      </div>

      <p className="text-sm leading-6 text-white/56">{description}</p>
      <Button
        type="submit"
        size="lg"
        form="download"
        disabled={isDownloading}
        className={` h-12 w-full rounded-2xl bg-primary-foreground hover:bg-primary transition-all duration-200 text-base font-semibold text-slate-950`}
      >
        {isDownloading ? (
          <>
            <Spinner className="size-4 text-slate-950" />
            Baixando...
          </>
        ) : (
          <>
            Baixar agora
            <ArrowRight />
          </>
        )}
      </Button>
    </form>
  );
};
