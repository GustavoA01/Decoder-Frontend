import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [isUrlFocused, setIsUrlFocused] = useState(false);
  const urlField = register('url');

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
        <motion.div
          className="relative rounded-2xl"
          animate={{
            boxShadow: isUrlFocused
              ? '0 0 0 1px rgba(103, 232, 249, 0.28), 0 18px 45px rgba(34, 211, 238, 0.12)'
              : '0 0 0 0 rgba(103, 232, 249, 0)',
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <Link2 className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/38" />
          <Input
            type="url"
            {...urlField}
            onFocus={() => setIsUrlFocused(true)}
            onBlur={(event) => {
              setIsUrlFocused(false);
              urlField.onBlur(event);
            }}
            disabled={isDownloading}
            placeholder="https://www.youtube.com/watch?v=..."
            className="h-12 rounded-2xl border-white/12 bg-black/20 pl-11 text-white placeholder:text-white/32"
          />
        </motion.div>
        {errors.url && (
          <p className="text-sm text-red-400">{errors.url.message}</p>
        )}
      </div>

      <p className="text-sm leading-6 text-white/56">{description}</p>
      <motion.div
        whileHover={{
          scale: isDownloading ? 1 : 1.015,
        }}
        whileTap={{
          scale: isDownloading ? 1 : 0.985,
        }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 24,
        }}
      >
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
      </motion.div>
    </form>
  );
};
