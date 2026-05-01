import { z } from 'zod';

export const downloadSchema = z.object({
  url: z
    .url('Digite uma URL válida')
    .min(1, 'Cole uma URL do YouTube')
    .refine(
      (value) => {
        const normalizedValue = value.toLowerCase();

        return (
          normalizedValue.includes('youtube.com/') ||
          normalizedValue.includes('youtu.be/')
        );
      },
      {
        message: 'A URL precisa ser do YouTube',
      },
    ),
});

export type DownloadFormData = z.infer<typeof downloadSchema>;
