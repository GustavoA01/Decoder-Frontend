import { AudioLines, Video } from 'lucide-react';

export const headerBadges = [
  'URL válida',
  'Escolha rápida de formato',
  'Integrar',
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
    description: 'Extrai o audio e prepara o download em mp3 via backend.',
  },
];
