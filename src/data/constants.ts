import type { Variants } from 'framer-motion';
import {
  AudioLines,
  FileText,
  ListTree,
  Scissors,
  Sparkles,
  Video,
} from 'lucide-react';

export const headerBadges = [
  'YouTube',
  'Descrição',
  'Resumo',
  'Capítulos',
  'Cortes sugeridos',
];

export const outputOptions = [
  {
    id: 'summary',
    label: 'Resumo',
    icon: Sparkles,
    description: 'Uma visão direta com os pontos mais importantes do vídeo.',
  },
  {
    id: 'chapters',
    label: 'Capítulos',
    icon: ListTree,
    description: 'Divisão por momentos para navegar pelo conteúdo com clareza.',
  },
  {
    id: 'cuts',
    label: 'Cortes',
    icon: Scissors,
    description: 'Sugestões de trechos fortes para shorts, reels e posts.',
  },
  {
    id: 'description',
    label: 'Descrição',
    icon: FileText,
    description: 'Texto pronto para contextualizar ou publicar o conteúdo.',
  },
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
