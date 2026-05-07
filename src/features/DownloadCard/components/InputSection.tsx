import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Link2 } from 'lucide-react';
import { InputSectionProps } from '../types';

export const InputSection = ({
  errors,
  isDownloading,
  register,
}: InputSectionProps) => (
  <section className="space-y-2">
    <Label className="text-sm font-medium text-white/82">Link do YouTube</Label>
    <div className="relative rounded-2xl">
      <Link2 className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/38" />
      <Input
        type="url"
        {...register('url')}
        disabled={isDownloading}
        placeholder="https://www.youtube.com/watch?v=..."
        className="h-12 rounded-2xl border-white/12 bg-black/20 pl-11 text-white placeholder:text-white/32"
      />
    </div>
    {errors.url && <p className="text-sm text-red-400">{errors.url.message}</p>}
  </section>
);
