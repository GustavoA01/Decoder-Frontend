'use server';
import { IASummaryRequestType, IASummaryResponseType } from '@/src/data/types';

export const iaSummary = async ({
  url,
  type,
}: IASummaryRequestType): Promise<IASummaryResponseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PYTHON_URL}/ia-summary`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type }),
    },
  );

  if (!response.ok) throw new Error('Erro ao gerar resultado com IA');

  return response.json();
};
