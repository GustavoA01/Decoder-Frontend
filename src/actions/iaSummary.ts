'use server';
import { IASummaryRequestType, IASummaryResponseType } from '../data/types/api';

export const iaSummary = async ({
  url,
  type,
}: IASummaryRequestType): Promise<IASummaryResponseType> => {
  const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_URL}/ia-summary-stream`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, type }),
  });

  if (!response.ok) throw new Error('Erro ao gerar resultado com IA');

  return response.json();
};
