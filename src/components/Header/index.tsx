'use client';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '../../data/constants';
import { SmallTitle } from './SmallTitle';
import { BadgesSection } from './BadgesSection';

export const Header = () => (
  <motion.header
    className="space-y-8 select-none"
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.12,
        },
      },
    }}
  >
    <section className="space-y-5">
      <div className="space-y-3">
        <SmallTitle />
        <motion.h1
          variants={fadeUpVariants}
          className="max-w-3xl font-(family-name:--font-heading) text-5xl leading-none font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          Decodifique vídeos em minutos
        </motion.h1>
      </div>
      <motion.p
        variants={fadeUpVariants}
        className="max-w-2xl text-base leading-7 text-white/68 sm:text-lg"
      >
        Transforme vídeos longos em resumos inteligentes, capítulos, posts e
        ideias de cortes em poucos minutos.
      </motion.p>
    </section>
    <BadgesSection />
  </motion.header>
);
