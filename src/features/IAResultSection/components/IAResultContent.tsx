import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

type IAResultContentProps = {
  error: string | null;
  isGenerating: boolean;
  summary: string;
};

export const IAResultContent = ({
  error,
  isGenerating,
  summary,
}: IAResultContentProps) => {
  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/8 p-3 text-sm text-red-200">
        <AlertCircle className="mt-0.5 size-4 shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-28 rounded-xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-white/76">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
            strong: ({ children }) => (
              <strong className="font-semibold text-white">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="my-3 list-disc space-y-1 pl-5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-3 list-decimal space-y-1 pl-5">{children}</ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            h1: ({ children }) => (
              <h1 className="mb-3 text-xl font-semibold text-white">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 text-lg font-semibold text-white">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-2 text-base font-semibold text-white">
                {children}
              </h3>
            ),
          }}
        >
          {summary}
        </ReactMarkdown>
      </motion.div>
      {isGenerating && (
        <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-cyan-200 align-[-2px]" />
      )}
    </div>
  );
};
