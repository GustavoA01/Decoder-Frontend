import { Variants } from 'framer-motion';
import { AudioLines, Video } from 'lucide-react';

export const headerBadges = [
  'YouTube',
  'Resumo com IA',
  'Capítulos automáticos',
  'Transcrição',
  'Posts prontos',
  'Sugestões de cortes',
];

export const tabs = [
  {
    id: 'video',
    label: 'Video',
    icon: Video,
    description: 'Baixa o arquivo em formato de video a partir da URL enviada.',
  },
  {
    id: 'audio',
    label: 'Áudio',
    icon: AudioLines,
    description: 'Extrai o audio do vídeo e faz download em formato mp3',
  },
];

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
