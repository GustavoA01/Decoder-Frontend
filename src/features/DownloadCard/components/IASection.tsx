import { Label } from '@/src/components/ui/label';
import { outputOptions } from '@/src/data/constants';
import { IASectionProps } from '../types';

export const IASection = ({
  setSelectedOutput,
  selectedOutput,
}: IASectionProps) => (
  <section className="space-y-3">
    <Label className="text-sm font-medium text-white/82">
      Resultado desejado
    </Label>

    <div className="grid gap-2 sm:grid-cols-2">
      {outputOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedOutput === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelectedOutput(option.id)}
            className={`group relative min-h-24 overflow-hidden rounded-2xl border p-3 text-left transition ${
              isSelected
                ? 'border-cyan-300/45 bg-cyan-300/10'
                : 'border-white/10 bg-white/5 hover:border-white/18 hover:bg-white/8'
            }`}
          >
            <span className="relative z-10 flex items-start gap-3">
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition ${
                  isSelected
                    ? 'bg-cyan-300 text-slate-950'
                    : 'bg-white/8 text-cyan-200 group-hover:bg-white/12'
                }`}
              >
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 space-y-1">
                <span className="block text-sm font-semibold text-white">
                  {option.label}
                </span>
                <span className="block text-xs leading-5 text-white/52">
                  {option.description}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  </section>
);
