'use client';
import { useIAResultProvider } from '@/src/data/IAResultContext';
import { motion } from 'framer-motion';
import { IAResultActions } from './IAResultActions';
import { IAResultContent } from '../components/IAResultContent';
import { IAResultHeader } from '../components/IAResultHeader';

export const IAResultSection = () => {
  const { error, isGenerating, status, summary } = useIAResultProvider();
  const shouldShow = Boolean(summary || status || error || isGenerating);

  if (!shouldShow) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-white/10 bg-black/18 p-5 text-white shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <IAResultHeader status={status} isGenerating={isGenerating} />
        <IAResultActions isGenerating={isGenerating} summary={summary} />
      </div>

      <IAResultContent
        error={error}
        isGenerating={isGenerating}
        summary={summary}
      />
    </motion.section>
  );
};
