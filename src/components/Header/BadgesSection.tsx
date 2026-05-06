import { headerBadges } from '@/src/data/constants';
import { motion } from 'framer-motion';

export const BadgesSection = () => (
  <motion.section
    className="flex flex-wrap gap-3 text-sm text-white/72"
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.07,
        },
      },
    }}
  >
    {headerBadges.map((text) => (
      <motion.div
        key={text}
        className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-sm"
        variants={{
          hidden: {
            opacity: 0,
            y: 14,
            scale: 0.96,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
        whileHover={{
          y: -2,
          borderColor: 'rgba(103, 232, 249, 0.36)',
          backgroundColor: 'rgba(255, 255, 255, 0.09)',
        }}
      >
        {text}
      </motion.div>
    ))}
  </motion.section>
);
