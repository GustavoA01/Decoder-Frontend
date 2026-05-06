'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/src/components/ui/card';
import { DownloadHeader } from '../components/DownloadHeader';
import { DownloadTabs } from '../components/DownloadTabs';

export const DownloadCard = () => (
  <motion.div
    initial={{
      opacity: 0,
      y: 36,
      scale: 0.97,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: 0.8,
      delay: 0.35,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <Card className="border bg-white/4 py-0 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
      <DownloadHeader />
      <CardContent className="space-y-6 py-6">
        <DownloadTabs />
      </CardContent>
    </Card>
  </motion.div>
);
