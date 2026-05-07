import { motion } from 'framer-motion';

const decoderLetters = 'Decoder'.split('');

export const SmallTitle = () => (
  <motion.p
    aria-label="Decoder"
    className="font-mono uppercase text-lg tracking-[0.5em] text-cyan-300/80"
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.15,
        },
      },
    }}
  >
    {decoderLetters.map((letter, index) => (
      <motion.span
        key={`${letter}-${index}`}
        aria-hidden="true"
        className="inline-block"
        variants={{
          hidden: {
            opacity: 0,
            y: -12,
            filter: 'blur(8px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
      >
        {letter}
      </motion.span>
    ))}
  </motion.p>
);
